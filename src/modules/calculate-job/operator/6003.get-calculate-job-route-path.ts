/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 14:54:09
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  CalculateJobState,
  DispatchRouteTaskEvent,
  VehicleType
} from '@zuellig-pharma-2/database'

import {
  CalculateJobDestination,
  CalculateJobVehicle
} from '@zuellig-pharma-2/database/client'

import {
  encode
} from 'ngeohash'

import {
  Category
} from '$errors'

import {
  GetCalculateJobRoutePath
} from '$modules/calculate-job/dto'

import {
  PrismaService,
  RouteMapTripInfo,
  RouteService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  CalculateJobDestinationInfo,
  Coordinate,
  Location
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 取得計算任務路線導航資訊 */
@Injectable()
@APIInfo('GET_CALCULATE_JOB_ROUTE_PATH', 'CalculateJob')
export class Operator extends BaseOperator<GetCalculateJobRoutePath.Data, GetCalculateJobRoutePath.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly routeService: RouteService
  ) {
    super()
  }

  async verify (req: { query: GetCalculateJobRoutePath.Query }) {
    const data = await this.validateDto(GetCalculateJobRoutePath.Query, req.query)

    // 確認計算任務是否存在
    const calculateJob = await this.prisma.calculateJob.findFirst({
      where: { id: data.calculateJobId },
      select: { state: true }
    })
    if (TypeCheck.isNull(calculateJob)) throw Category.DataNotExist.calculateJob

    // 確認計算任務是否計算完成
    if (calculateJob.state !== CalculateJobState.JOB_FINISHED) throw Category.CalculateJob.CalculateJobNotFinished

    // 確認dispatchRoute是否存在
    const dispatchRoute = await this.prisma.dispatchRoute.findFirst({
      where: {
        id: data.dispatchRouteId
      },
      select: {
        calculateJobVehicle: {
          select: { type: true }
        }
      }
    })
    if (TypeCheck.isNull(dispatchRoute)) throw Category.DataNotExist.dispatchRoute

    const calculateJobRouteTask = await this.prisma.dispatchRouteTask.findMany({
      where: {
        dispatchRouteId: data.dispatchRouteId,
        count: data.counts
      },
      orderBy: [
        { count: 'asc' },
        { seq: 'asc' }
      ],
      select: {
        id: true,
        count: true,
        seq: true,
        event: true,
        type: true,
        transitDistance: true,
        transitTime: true,
        arrivalTime: true,
        arrivalCapacity: true,
        serviceTime: true,
        slackTime: true,
        pickupDemand: true,
        deliveryDemand: true,
        calculateJobDestination: {
          select: {
            code: true,
            type: true,
            info: true,
            location: true
          }
        },
        calculateJobVehicle: {
          select: {
            startLocation: true,
            endLocation: true
          }
        }
      }
    })
    if (calculateJobRouteTask.length === 0) throw Category.DataNotExist.dispatchRouteTask

    return {
      ...data,
      calculateJobRouteTask,
      vehicleType: dispatchRoute.calculateJobVehicle.type as VehicleType
    }
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { calculateJobRouteTask, counts, dispatchRouteId, vehicleType } = query

      // 後面躺數都要加上 回倉點 (上一趟的最後一個點)
      if (counts !== 1) {
        const firstTask = await this.prisma.dispatchRouteTask.findFirst({
          where: {
            dispatchRouteId,
            count: counts - 1
          },
          orderBy: [
            { seq: 'desc' }
          ],
          select: {
            count: true,
            seq: true,
            event: true,
            type: true,
            transitDistance: true,
            transitTime: true,
            arrivalTime: true,
            arrivalCapacity: true,
            serviceTime: true,
            slackTime: true,
            pickupDemand: true,
            deliveryDemand: true,
            calculateJobDestination: {
              select: {
                code: true,
                type: true,
                info: true,
                location: true
              }
            },
            calculateJobVehicle: {
              select: {
                startLocation: true,
                endLocation: true
              }
            }
          }
        }) as typeof calculateJobRouteTask[number]

        if (TypeCheck.isNotNull(firstTask)) calculateJobRouteTask.unshift(firstTask)
      }

      // 先將原始資料轉換成待處理的格式，並存入Map => key: id_geohash, value: destination
      let seq = 1
      const destinationMap: Map<string, GetCalculateJobRoutePath.DestinationInGetCalculateJobRoutePath> = new Map()
      for (const task of calculateJobRouteTask) {
        const event = task.event as DispatchRouteTaskEvent
        const type = task.type
        const code = this.generateCodeByEventAndType(event, type, task.calculateJobDestination)
        const name = this.generateNameByEventAndType(event, type, task.calculateJobDestination)
        const coordinate = this.generateCoordinateByEvent(event, task.calculateJobDestination, task.calculateJobVehicle)
        const geohash = encode(coordinate.lat, coordinate.lng)

        const destination = {
          count: counts,
          seq,
          deliveryDemand: task.deliveryDemand ?? '0',
          arrivalTime: task.arrivalTime,
          serviceTime: task.serviceTime,
          slackTime: task.slackTime,
          transitTime: task.transitTime,
          code,
          name
        }

        destinationMap.set(`${task.id}_${geohash}`, destination)
        seq++
      }

      // 呼叫外部API取得路線資訊
      const coordinateList = calculateJobRouteTask.map(task => {
        const event = task.event as DispatchRouteTaskEvent
        return {
          id: task.id,
          coordinate: this.generateCoordinateByEvent(event, task.calculateJobDestination, task.calculateJobVehicle)
        }
      })
      const routePathInfo = await this.getRouteMapInfo(coordinateList, vehicleType)

      // 將路線資訊轉換成待回傳的格式
      const routePathList: GetCalculateJobRoutePath.PathInGetCalculateJobRoutePath[] = []
      for (const [i, pathInfo] of routePathInfo.entries()) {
        const fromCode = pathInfo.fromCode
        const toCode = pathInfo.toCode

        const from = destinationMap.get(fromCode)
        const to = destinationMap.get(toCode)

        routePathList.push({
          routeNo: i + 1,
          from: from as GetCalculateJobRoutePath.DestinationInGetCalculateJobRoutePath,
          to: to as GetCalculateJobRoutePath.DestinationInGetCalculateJobRoutePath,
          encodedRoute: pathInfo.encodedRoute
        })
      }

      return {
        routePathList
      } satisfies GetCalculateJobRoutePath.Data
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.CalculateJob.UnknownError(errorMessage)
      }
    }
  }

  /**
   * 根據任務事件產生代碼
   * @param event 任務事件
   * @param type 目的地類型
   * @param destination 目的地資訊
   * @description
   * 1. 如果是 Destination 且 type 不是 Reload，則回傳 destination.code
   * 2. 如果是 Reload，則回傳 Reload
   * 3. 其他是 車輛起訖點，則回傳 event
   */
  private generateCodeByEventAndType (
    event: DispatchRouteTaskEvent,
    type: number,
    destination: Pick<CalculateJobDestination, 'code'> | null
  ) {
    if (event === DispatchRouteTaskEvent.DESTINATION && type !== 2) {
      return destination?.code ?? ''
    }

    if (type === 2) {
      return 'Reload'
    }

    return event
  }

  /**
   * 根據任務事件產生名稱
   * @param event 任務事件
   * @param type 目的地類型
   * @param destination 目的地資訊
   * @description
   * 1. 如果是 Destination 且 type 不是 Reload，則回傳 destination.info.name
   * 2. 如果是 Reload，則回傳 倉庫
   * 3. 其他是 車輛起訖點，則回傳 event
   */
  private generateNameByEventAndType (
    event: DispatchRouteTaskEvent,
    type: number,
    destination: Pick<CalculateJobDestination, 'info'> | null
  ) {
    const info = destination?.info as unknown as CalculateJobDestinationInfo

    if (event === DispatchRouteTaskEvent.DESTINATION && type !== 2) {
      return info?.name ?? ''
    }

    if (type === 2) {
      return '倉庫'
    }

    return event
  }

  /**
   * 根據任務事件產生坐標
   * @param event 任務事件
   * @param destination 目的地資訊
   * @param vehicle 車輛資訊
   * @description
   * 1. 如果是 Destination，則回傳 destination.location.coordinate (因為 Reload 也是 Destination)
   * 2. 其他是 車輛起訖點，則回傳 vehicle.startLocation.coordinate
   */
  private generateCoordinateByEvent (
    event: DispatchRouteTaskEvent,
    destination: Pick<CalculateJobDestination, 'location'> | null,
    vehicle: Pick<CalculateJobVehicle, 'startLocation'> | null
  ) {
    if (event === DispatchRouteTaskEvent.DESTINATION) {
      const location = destination?.location as unknown as Location
      return location.coordinate as unknown as Coordinate
    }

    const location = vehicle?.startLocation as unknown as Location
    return location.coordinate as unknown as Coordinate
  }

  /**
   * 取得路線資訊
   * @param coordinateList 經緯度列表 (包含id)
   * @param vehicleType 車輛類型
   * @description
   * 1. 依據經緯度列表，轉換成待傳入的格式 (會使用前一個點和後一個點的經緯度)
   * 2. 呼叫外部API取得路線資訊
   * 3. 整理路線資訊，並回傳
   */
  private async getRouteMapInfo (
    coordinateList: {
      id: string,
      coordinate: Coordinate
    }[],
    vehicleType: VehicleType
  ) {
    const coordinateMap = new Map<string, RouteMapTripInfo>() // key: fromGeoHash|toGeoHash, value: RouteMapTripInfo
    const routeMapList: { fromCode: string, toCode: string, encodedRoute: string }[] = []

    for (let i = 0; i < coordinateList.length; i++) {
      if (i === 0) continue // 第一個點沒有前一個點，所以不會有路線

      const fromCoordinate = coordinateList[i - 1]
      const toCoordinate = coordinateList[i]

      const fromGeoHash = encode(fromCoordinate.coordinate.lat, fromCoordinate.coordinate.lng)
      const toGeoHash = encode(toCoordinate.coordinate.lat, toCoordinate.coordinate.lng)
      routeMapList.push({
        fromCode: `${fromCoordinate.id}_${fromGeoHash}`,
        toCode: `${toCoordinate.id}_${toGeoHash}`,
        encodedRoute: '' // 預設為空字串
      })

      if (fromGeoHash === toGeoHash) continue // 同一個點不需要取得路線
      const id = `${fromGeoHash}|${toGeoHash}`

      if (!coordinateMap.has(id)) {
        const tripInfo = {
          id,
          from: fromCoordinate.coordinate,
          to: toCoordinate.coordinate,
          approaches: true
        } satisfies RouteMapTripInfo

        coordinateMap.set(id, tripInfo)
      }
    }

    // 呼叫外部API取得路線資訊
    const routePath = await this.routeService.getRoutePath([...coordinateMap.values()], vehicleType)

    // 整理路線資訊
    for (const route of routeMapList) {
      const fromGeoHash = route.fromCode.split('_')[1]
      const toGeoHash = route.toCode.split('_')[1]

      if (fromGeoHash !== toGeoHash) {
        route.encodedRoute = routePath.get(`${fromGeoHash}|${toGeoHash}`)?.paths.encodedRoute ?? ''
      }
    }

    return routeMapList
  }
}

export default Operator
