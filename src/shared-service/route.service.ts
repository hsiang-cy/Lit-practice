/*
 * @Author:Kerwin
 * @Date:2024-09-12 11:47:10
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-06 16:33:16
 * @Description:
 */

import {
  HttpService
} from '@nestjs/axios'

import {
  Injectable
} from '@nestjs/common'

import {
  SpanKind
} from '@opentelemetry/api'

import TypeCheck from '@saico/type-check-js'

import {
  PromisePool
} from '@supercharge/promise-pool'

import {
  Coordinate,
  VehicleType
} from '@zuellig-pharma-2/database'

import {
  AxiosError
} from 'axios'

import _ from 'lodash'
import {
  encode
} from 'ngeohash'

import {
  catchError,
  firstValueFrom
} from 'rxjs'

import {
  config as configInstance
} from './config'

import {
  tracer
} from './trace'

import {
  Category
} from '$errors'

import {
  SaicoApiErrorData,
  SaicoApiSuccessData
} from '$types'

import {
  handleCommonErrorSpan
} from '$utility'

/** 地址解析回應 */
interface GeocodingResponse {
  /** 原始地址 */
  source: string
  /** 格式化地址 */
  formatted: string
  /** 經緯度 */
  location: Coordinate,
  /** 錯誤 */
  error?: Record<string, any>
}

/** 導航路徑行程資訊 */
export interface RouteMapTripInfo {
  /** 唯一識別碼 (fromGeoHash|toGeoHash) */
  id: string
  /** 起點 */
  from: Coordinate
  /** 終點 */
  to: Coordinate
  /** 車輛是否順向停靠 */
  approaches: boolean
}

/** 路徑地圖回應資料 */
interface RoutePathResponseData {
  /** 唯一識別碼 (fromGeoHash|toGeoHash) */
  routingId: string,
  /** 路徑資訊 */
  paths: {
    /** 距離 */
    distance: number,
    /** 時間 */
    time: number,
    /** 編碼路徑 */
    encodedRoute: string
  }
}
/** 多點路線成本 */
interface RouteMatrixMultipleCost {
  /** 路線距離（公尺） */
  distance: number[][],
  /** 路線時間（秒） */
  time: number[][]
  /** 起始點 */
  sources: { location: [lng: number, lat: number] }[]
  /** 結束點 */
  destinations: { location: [lng: number, lat: number] }[]
}

/** 多點路線成本回應 */
interface RouteMatrixResponse {
  /** 路線識別碼 */
  matrixId: string
  /** 多個路線成本 */
  multipleCost: RouteMatrixMultipleCost
}

@Injectable()
export class RouteService {
  private readonly placement = configInstance.appConfig.services.externalAPI.placement
  private readonly route = configInstance.appConfig.services.externalAPI.route

  constructor (
    private readonly httpService: HttpService
  ) { }

  /**
    * 解析地址
    * @param addressList 地址列表
    * @param concurrency 同時解析的數量 (預設1)
    * @param batchSize 一次解析的數量 (預設10)
    * @param delay 每次解析的延遲時間 (預設1000ms)
    * @returns 成功解析的地址 Map<原始地址, 解析結果>
    */
  async parseAddress (
    addressList: string[],
    concurrency = 1,
    batchSize = 10,
    delay = 1000
  ) {
    const span = tracer.startSpan('RouteService.parseAddress')

    try {
      const apiUrl = `${this.placement.baseUrl}/geocoding`

      // 排除重複地址和空字串或undefined或null
      const uniqueAddressList = [...new Set(addressList.filter(d => TypeCheck.isNotEmpty(d)))]

      // 初始化地址結果的 Map => key: 原始地址, value: 解析結果
      const addressMap = new Map<string, Omit<GeocodingResponse, 'error'>>()

      // 把地址分成多個陣列，一次傳送的地址數量由 batchSize 決定
      const addressChunks = _.chunk(uniqueAddressList, batchSize)

      const executeWithRetry = async (chunk: string[], retryLimit: number) => {
        let attempts = 0

        while (attempts <= retryLimit) {
          try {
            const { data } = await firstValueFrom(
              this.httpService.post<GeocodingResponse[]>(
                apiUrl,
                chunk,
                { timeout: this.placement.timeout }
              ).pipe(catchError(error => { throw error }))
            )

            for (const d of data) {
              if (TypeCheck.isUndefined(d.error)) addressMap.set(d.source, d)
            }

            return
          } catch (error) {
            attempts++

            if (attempts > retryLimit) throw new Error(`重試次數已達上限仍無法解析地址: ${error.message}`)

            // 延遲再重試
            await new Promise(resolve => setTimeout(resolve, delay))
          }
        }
      }

      await PromisePool
        .for(addressChunks)
        .withConcurrency(concurrency)
        .handleError(error => { throw error })
        .process(async chunk => {
          const retryLimit = 3

          await executeWithRetry(chunk, retryLimit)

          // 延遲一段時間再繼續下一個
          await new Promise(resolve => setTimeout(resolve, delay))
        })

      return addressMap
    } catch (error) {
      handleCommonErrorSpan(span, error, '解析地址發生錯誤')

      throw Category.ExternalServerError.ExternalServiceError
    } finally {
      span.end()
    }
  }

  /**
   * 取得導航路徑
   * @param tripsList 行程列表 (起點終點不可相同)
   * @param vehicleType 車輛類型
   * @param concurrency 同時處理數量 (預設: 10)
   * @param batchSize 批次處理數量 (預設: 20)
   * @returns 路徑列表
   * @description
   * 1. 依據行程列表取得導航路徑，會批次批量處理行程列表
   * 2. 會確保所有行程都有取得導航路徑，否則拋出錯誤
   */
  async getRoutePath (
    tripsList: RouteMapTripInfo[],
    vehicleType: VehicleType,
    concurrency = 10,
    batchSize = 20
  ) {
    const span = tracer.startSpan('RouteService.getRouteMap', { kind: SpanKind.CLIENT })

    try {
      const apiUrl = `${this.route.baseUrl}/route`
      const vehicle = vehicleType === VehicleType.TRUCK ? 'car' : 'motorcycle'
      const pathMap: Map<string, RoutePathResponseData> = new Map() // key: fromGeoHash|toGeoHash, value: RouteMapResponseData

      const executeWithRetry = async (trip: RouteMapTripInfo[], retryLimit: number) => {
        let attempts = 0

        while (attempts <= retryLimit) {
          try {
            const { data } = await firstValueFrom(
              this.httpService.post<SaicoApiSuccessData<RoutePathResponseData[]>>(
                apiUrl,
                { trips: trip },
                {
                  params: {
                    attributes: 'errors,data', // 只回傳 errors 和 data
                    includeQuery: false, // 不回傳查詢條件
                    vehicle
                  },
                  headers: {
                    appid: this.route.appId,
                    apptoken: this.route.appToken
                  },
                  timeout: this.route.timeout
                }
              ).pipe(
                catchError((error: AxiosError<SaicoApiErrorData>) => {
                  // 如果有錯誤，會放在errors裡面的第一個
                  if (TypeCheck.isNotEmpty(error.response?.data?.errors)) {
                    throw new Error(error.response.data.errors[0].message)
                  }

                  throw error
                })
              )
            )

            // 確認有取得路線資訊才放入 Map
            if (TypeCheck.isNotEmpty(data.data)) {
              for (const route of data.data) {
                pathMap.set(route.routingId, route)
              }
            }

            // 成功後直接返回，跳出迴圈
            return
          } catch (error) {
            attempts++
            if (attempts > retryLimit) throw new Error(`重試次數已達上限仍無法取得導航路徑: ${error.message}`)
          }
        }
      }

      const tripChunks = _.chunk(tripsList, batchSize)
      await PromisePool
        .for(tripChunks)
        .withConcurrency(concurrency)
        .handleError(async (error) => { throw error })
        .process(async trip => {
          const retryLimit = 2
          await executeWithRetry(trip, retryLimit)
        })

      // 確認是否有取得所有路線 => 有缺少路線資訊則拋出錯誤
      if (pathMap.size !== tripsList.length) throw new Error('部分行程無法取得導航路徑')

      return pathMap
    } catch (error) {
      handleCommonErrorSpan(span, error, '取得導航路徑發生錯誤')

      throw Category.ExternalServerError.ExternalServiceError
    } finally {
      span.end()
    }
  }

  async getRouteMatrix (
    coordinates: Coordinate[],
    vehicleType: VehicleType
  ) {
    const span = tracer.startSpan('RouteService.getRouteMatrix')
    const vehicle = vehicleType === VehicleType.TRUCK ? 'car' : 'motorcycle'

    try {
      const apiUrl = `${this.route.baseUrl}/matrix`
      const input = {
        coordinates,
        approaches: true
      }

      const executeWithRetry = async (retryLimit: number) => {
        let attempts = 0

        while (attempts <= retryLimit) {
          try {
            const { data } = await firstValueFrom(
              this.httpService.post<SaicoApiSuccessData<RouteMatrixResponse>>(
                apiUrl,
                input,
                {
                  params: {
                    attributes: 'errors,data', // 只回傳 errors 和 data
                    includeQuery: false, // 不回傳查詢條件
                    vehicle
                  },
                  headers: {
                    appid: this.route.appId,
                    apptoken: this.route.appToken
                  },
                  timeout: this.route.timeout
                }
              ).pipe(catchError(error => { throw error }))
            )

            if (TypeCheck.isEmpty(data.data)) throw new Error('No data returned')

            return data.data
          } catch (error) {
            attempts++

            if (attempts > retryLimit) throw new Error(`重試次數已達上限仍無法取得距離矩陣: ${error.message}`)
          }
        }
      }

      const retryLimit = 2
      const routeMatrixData = await executeWithRetry(retryLimit) as RouteMatrixResponse
      const { multipleCost } = routeMatrixData

      return this.formatRouteMatrixResponse(coordinates, multipleCost)
    } catch (error) {
      handleCommonErrorSpan(span, error, '取得距離矩陣發生錯誤')

      throw Category.ExternalServerError.ExternalServiceError
    } finally {
      span.end()
    }
  }

  /**
   * 格式化路線成本回應
   * @param multipleCost 多個路線成本
   * @returns odMap (key: `fromGeoHash|toGeoHash`, value: `[time (分), distance (公尺)]`)
   * @description
   * 由於呼叫外部API回來的time和distance會有小數點 => 因此需要無條件進位到整數
   */
  private formatRouteMatrixResponse (rawCoordinates: Coordinate[], multipleCost: RouteMatrixMultipleCost) {
    const odMap = new Map<string, [time: number, distance: number]>() // key: 'fromGeoHash|toGeoHash', value: [time, distance]

    for (let i = 0; i < rawCoordinates.length; i++) {
      const fromGeoHash = encode(rawCoordinates[i].lat, rawCoordinates[i].lng)

      for (let j = 0; j < rawCoordinates.length; j++) {
        const toGeoHash = encode(rawCoordinates[j].lat, rawCoordinates[j].lng)

        const distance = Math.ceil(multipleCost.distance[i][j])
        const time = Math.ceil(multipleCost.time[i][j] / 60) // 秒轉分

        // 如果distance 和 time為0，表示為同一點 => 不加入到 odMap
        if (distance === 0 && time === 0) continue
        // 如果`fromGeoHash|toGeoHash`已存在，表示有重複的路線 => 不加入到 odMap
        if (odMap.has(`${fromGeoHash}|${toGeoHash}`)) continue

        odMap.set(`${fromGeoHash}|${toGeoHash}`, [time, distance])
      }
    }

    return odMap
  }
}
