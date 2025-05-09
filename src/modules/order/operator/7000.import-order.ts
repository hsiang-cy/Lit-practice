/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-17 13:04:47
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  ArrivalMode,
  DestinationTimeWindowMode,
  ServiceTimeMode,
  DataStatus,
  OrderGroupState,
  DestinationType,
  TimeWindow,
  customerType
} from '@zuellig-pharma-2/database'

import {
  Customer,
  Prisma
} from '@zuellig-pharma-2/database/client'

import _ from 'lodash'

import moment from 'moment-timezone'

import {
  encode
} from 'ngeohash'

import {
  parse
} from 'node-xlsx'

import {
  Category
} from '$errors'

import {
  ImportOrder
} from '$modules/order/dto'

import {
  PrismaService,
  SnowflakeService,
  RouteService,
  ZUHelper
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery
} from '$types'

import {
  isErrorObject
} from '$utility'

import '@fastify/multipart'
import { dir } from 'console'

/** 地址資訊 */
interface AddressInfo {
  address: string,
  geohash: string,
  formatAddress: string,
  lat: number,
  lng: number
}

/** 原始資料欄位對應 index */
interface RawExcelColumnIndex {
  /** 車次 */
  trainNumber: number,
  /** 客戶代碼 */
  customerCode: number,
  /** 客戶中文名稱 */
  customerName: number,
  /** 地址 */
  address: number,
  /** 路線 */
  route: number,
  /** OBD */
  obd: number,
  /** Invoice */
  invoice: number,
  /** PSN */
  psn: number,
  /** 倉別 */
  depot: number,
  /** 貨數 */
  capacity: number,
  /** 管 */
  typeControlled: number,
  /** 冰 */
  typeRefrigerated: number,
  /** 實 */
  typeExperimental: number,
  /** 樣 */
  typeSample: number,
  /** 現 */
  typeCash: number,
  /** 應收金額 */
  price: number
}

/** 原始資料 */
interface RawData {
  /** 原始列號 */
  rowNumber: number,
  /** 車次 */
  trainNumber: string,
  /** 客戶代碼 */
  customerCode: string,
  /** 客戶中文名稱 */
  customerName: string,
  /** 地址 */
  address: string,
  /** 路線 */
  route: string,
  /** OBD */
  obd: string,
  /** Invoice */
  invoice: string,
  /** PSN */
  psn: string,
  /** 倉別 */
  depot: string,
  /** 貨數 */
  capacity: string,
  /** 管 */
  typeControlled: string,
  /** 冰 */
  typeRefrigerated: string,
  /** 實 */
  typeExperimental: string,
  /** 樣 */
  typeSample: string,
  /** 現 */
  typeCash: string,
  /** 應收金額 */
  price: string
}

/** 轉換後的資料 */
interface TransformedData {
  /** 原始列號 */
  rowNumber: number,
  /** 客戶代碼_地址Geohash */
  customerCodeAndGeohash: string,
  /** 車次 */
  trainNumber: string,
  /** 客戶代碼 */
  customerCode: string,
  /** 客戶中文名稱 */
  customerName: string,
  /** 地址 */
  address: string,
  /** 格式化地址 */
  formatAddress: string,
  /** 緯度 */
  lat: number,
  /** 經度 */
  lng: number,
  /** Geohash */
  geohash: string,
  /** 路線 */
  route: string,
  /** OBD */
  obd: string,
  /** Invoice */
  invoice: string,
  /** PSN */
  psn: string,
  /** 倉別 */
  depot: string,
  /** 貨數 (INT64) */
  capacity: string,
  /** 是否為管制藥品 */
  typeControlled: boolean,
  /** 是否為冷藏品 */
  typeRefrigerated: boolean,
  /** 是否為實驗藥品 */
  typeExperimental: boolean,
  /** 是否為樣品 */
  typeSample: boolean,
  /** 是否收現金 */
  typeCash: boolean,
  /** 應收金額 */
  price: number
}

/** 匯入訂單資訊，從前端接收.xlsx */
@Injectable()
@APIInfo('IMPORT_ORDER', 'Order')
export class Operator extends BaseOperator<ImportOrder.Data, BaseQuery, ImportOrder.Body> {
  // 原始資料欄位對應 key
  private readonly headerKeyMap: Record<string, string> = {
    '車次:': 'trainNumber',
    客戶代碼: 'customerCode',
    客戶中文名稱: 'customerName',
    地址: 'address',
    路線: 'route',
    OBD: 'obd',
    Invoice: 'invoice',
    PSN: 'psn',
    倉別: 'depot',
    貨數: 'capacity',
    管: 'typeControlled',
    冰: 'typeRefrigerated',
    實: 'typeExperimental',
    樣: 'typeSample',
    現: 'typeCash',
    應收金額: 'price'
  }

  private readonly header = Object.keys(this.headerKeyMap)
  private readonly footer = ['單據數', '出貨總件數', '應收金額']

  constructor(
    private readonly prisma: PrismaService,
    private readonly routeService: RouteService,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify(req: { body: ImportOrder.Body }) {
    const data = await this.validateDto(ImportOrder.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 不可計算日期早於今日
    if (moment(data.startTime).isBefore(moment().startOf('day'))) throw Category.Order.StartTimeEarlierThanToday

    // 原始 excel 二維陣列 => 取出原始資料
    const excel = parse(data.file.buffer)
    const rawExcelData: string[][] = excel[0].data

    // 檢查 Excel 格式
    const TC = await this.checkTitle(rawExcelData[1])
    if (!TC) throw Category.Order.FormatError

    const rawData = this.getRawData(rawExcelData)

    // 先取得地址資訊 和 客戶主檔
    const addressMap = await this.getAddressInfoMap(rawData) // 原始地址, 地址資訊
    const customerMap = await this.getCustomerMap(rawData, addressMap) // 客戶代碼_地址Geohash, 客戶資訊

    // TODO totalCode, totalGeohash 可以在優化, 例如把資料庫操作合併到上面的操作, 只查詢一次
    // 獲取所有的客戶代碼
    const totalCode = new Set<string>()
    const code = await this.prisma.customer.findMany({
      select: {
        code: true
      },
      distinct: ['code']
    })
    code.forEach(c => totalCode.add(c.code))


    // 獲取所有資料庫中的 geohash
    const geohash = await this.prisma.customer.findMany({
      select: {
        geohash: true
      },
      distinct: ['geohash']
    })
    const totalGeohash = new Set<string>()
    geohash.forEach(g => totalGeohash.add(g.geohash))

    // 轉換資料並確認是否有錯誤
    const { transformedData, rawDataError, directlyDrop } = this.transformAndVerifyData(rawData, addressMap, customerMap, totalGeohash, totalCode)

    if (rawDataError.size > 0) {
      throw Category.Order.ImportOrderError(Object.fromEntries(rawDataError))
    }

    // 合併資料
    const mergedOrderData = await this.mergeOrderData(transformedData)

    return {
      mergedOrderData,
      customerMap,
      startTime: data.startTime,
      area: data.area,
      comment: data.comment,
      currentAccount,
      directlyDrop
    }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { mergedOrderData, startTime, area, comment, currentAccount, customerMap, directlyDrop } = data

      // 根據 startTime 判斷是禮拜幾
      const startTimeMoment = moment(startTime)
      const weekDay = startTimeMoment.weekday() // 1 => 星期一, 5 => 星期五, 0 => 星期日, 所以要對w0額外處理, 使其變成w7

      // 轉換成要存進資料庫的格式
      const newOrderGroup: Prisma.WebOrderGroupCreateInput = {
        id: this.snowFlake.snowflakeId(),
        startTime: startTimeMoment.toISOString(),
        area,
        comment,
        state: OrderGroupState.PARSED,
        creator: currentAccount.id,
        updater: currentAccount.id,
        status: DataStatus.ACTIVE
      }

      // 根據合併後的資料轉換成要存進資料庫的格式
      const newOrderGroupDestinations = Array.from(mergedOrderData.values()).map(merged => {
        // 可以到這邊代表一定存在
        const customer = customerMap.get(merged.customerCodeAndGeohash) as Pick<Customer, 'code' | 'geohash' | 'type' | 'route' | 'canArrange' | 'timeWindow'>

        let serviceTime = customer.type === 'HP' ? 10 : 3 // 醫院的起始服務時間為10分鐘，其他的為3分鐘
        if (merged.typeRefrigerated) serviceTime += 2 // 有冷藏品 + 2分鐘
        if (merged.typeCash) serviceTime += 3 // 有收現金 + 3分鐘

        // 根據禮拜幾取得時窗
        const customerTimeWindow = customer.timeWindow ?? {} as Record<string, TimeWindow[]>
        let timeWindowKey
        if (weekDay === 0) {
          timeWindowKey = `w7` as keyof typeof customerTimeWindow
        } else {
          timeWindowKey = `w${weekDay}` as keyof typeof customerTimeWindow
        }
        // 原本是 w${weekDay + 1}, 後移除 +1 
        const timeWindow = customerTimeWindow[timeWindowKey] ?? []

        return {
          id: this.snowFlake.snowflakeId(),
          orderGroupId: newOrderGroup.id,
          originalRow: merged.rowNumber,
          code: merged.customerCode,
          name: merged.customerName,
          type: DestinationType.NORMAL,
          deliveryDemand: String(merged.capacity),
          serviceTimeMode: ServiceTimeMode.NORMAL,
          serviceTime,
          arrivalMode: ArrivalMode.ARRIVAL_IN_TW,
          priority: merged.typeRefrigerated || merged.typeControlled ? 1 : 2, // 如果有 冷藏品 或 管制藥品 則優先
          timeWindowMode: customer.type === customerType.GP ? DestinationTimeWindowMode.BEFORENOON : DestinationTimeWindowMode.EQUAL_PRIORITY, // 診所在中午前送到
          timeWindow,
          trainNumber: merged.trainNumber,
          depot: merged.depot,
          route: customer.route, // 使用客戶主檔的路線
          typeControlled: merged.typeControlled,
          typeRefrigerated: merged.typeRefrigerated,
          typeExperimental: merged.typeExperimental,
          typeSample: merged.typeSample,
          typeCash: merged.typeCash,
          canArrange: customer.canArrange ?? [],
          obd: merged.obd,
          invoice: merged.invoice,
          psn: merged.psn,
          price: merged.price,
          address: merged.address,
          formatAddress: merged.formatAddress,
          lat: merged.lat,
          lng: merged.lng,
          geohash: merged.geohash,
          creator: currentAccount.id,
          updater: currentAccount.id,
          status: DataStatus.ACTIVE
        } satisfies Prisma.WebOrderGroupDestinationUncheckedCreateInput
      })
      const chunkDestinations = _.chunk(newOrderGroupDestinations, 500)

      // 處理 directlyDrop 中的訂單 - 這些是客戶代碼+地址組合不匹配的訂單
      const errorOrderGroupDestinations = directlyDrop.map(dropped => {
        const errorInfo = {
          reason: `客戶(${dropped.customerCode})+地址(${dropped.geohash})」的組合不存在於主檔`
        };

        return {
          id: this.snowFlake.snowflakeId(),
          orderGroupId: newOrderGroup.id,
          originalRow: dropped.rowNumber,
          code: dropped.customerCode,
          name: dropped.customerName,
          type: DestinationType.NORMAL,
          // deliveryDemand: dropped.capacity,
          serviceTimeMode: ServiceTimeMode.NORMAL,
          serviceTime: 0, // 隨便給個服務時間
          arrivalMode: ArrivalMode.ARRIVAL_IN_TW,
          priority: 10, // 較低優先度
          timeWindowMode: DestinationTimeWindowMode.EQUAL_PRIORITY,
          // timeWindow: , // 空時間窗
          trainNumber: dropped.trainNumber,
          depot: dropped.depot,
          route: dropped.route,
          typeControlled: dropped.typeControlled,
          typeRefrigerated: dropped.typeRefrigerated,
          typeExperimental: dropped.typeExperimental,
          typeSample: dropped.typeSample,
          typeCash: dropped.typeCash,
          // canArrange: [],
          obd: dropped.obd,
          invoice: dropped.invoice,
          psn: dropped.psn,
          price: dropped.price,
          address: dropped.address,
          formatAddress: dropped.formatAddress,
          lat: dropped.lat,
          lng: dropped.lng,
          geohash: dropped.geohash,
          creator: currentAccount.id,
          updater: currentAccount.id,
          status: DataStatus.INACTIVE, // -10
          isError: true,
          error: errorInfo as unknown as Prisma.JsonObject
        } satisfies Prisma.WebOrderGroupDestinationUncheckedCreateInput
      });

      await this.prisma.$transaction(async trx => {
        await trx.webOrderGroup.create({
          data: newOrderGroup,
          select: { id: true }
        })

        await Promise.all(chunkDestinations.map(chunk => {
          return trx.webOrderGroupDestination.createMany({
            data: chunk
          })
        }))

        await trx.webOrderGroupDestination.createMany({
          data: errorOrderGroupDestinations
        })
      })

      return {
        success: true,
        id: newOrderGroup.id
      } satisfies ImportOrder.Data
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Order.UnknownError(errorMessage)
      }
    }
  }

  /**
   * 從原始 excel 二維陣列取出原始資料 (排除 header 與 footer)
   * @param rawExcelData 二維陣列
   * @description
   * 1. 利用 header 找出可以開始存入 rawData 的位置
   * 2. 利用 footer 找出結束位置 => 下一行開始不能存入，要再尋找下一個 header
   * 3. 直接排除路線為 NTP000 或 NDT000 的資料
   */
  private getRawData(rawExcelData: string[][]) {
    const rawData: RawData[] = []

    let canSave = false // 是否可以儲存
    let indexMap: RawExcelColumnIndex | undefined // 欄位對應索引 => 因為每個區塊的欄位可能位置不同 (ex: 地址位於 index 3)

    for (let i = 0; i < rawExcelData.length; i++) {
      const raw = rawExcelData[i]

      // 利用 header 一定要出現的欄位來找出 header 的位置 => 下一行就可以開始存入 rawData
      if (this.header.every(key => raw.includes(key))) {
        canSave = true

        indexMap = this.header.reduce<Partial<RawExcelColumnIndex>>((acc, cur) => {
          const key = this.headerKeyMap[cur] as keyof RawExcelColumnIndex
          acc[key] = raw.indexOf(cur)
          return acc
        }, {} as Partial<RawExcelColumnIndex>) as RawExcelColumnIndex

        continue
      }

      // 利用 footer 一定要出現的欄位來找出 footer 的位置 => 下一行開始不能存入，要再尋找下一個 header
      if (this.footer.every(key => raw.includes(key))) {
        canSave = false
        continue
      }

      if (canSave && indexMap) {
        // 直接排除路線為 NTP000 或 NDT000 的資料
        if (raw[indexMap.route] === 'NTP000' || raw[indexMap.route] === 'NDT000') continue
        const headNumLength = (parseInt(raw[indexMap.address]?.trim())).toString().length


        rawData.push({
          rowNumber: i + 1,
          trainNumber: raw[indexMap.trainNumber],
          customerCode: raw[indexMap.customerCode],
          customerName: raw[indexMap.customerName],
          address: this.#rmleadNum(raw[indexMap.address]?.trim()),
          route: raw[indexMap.route],
          obd: raw[indexMap.obd],
          invoice: raw[indexMap.invoice],
          psn: raw[indexMap.psn],
          depot: raw[indexMap.depot],
          capacity: raw[indexMap.capacity],
          typeControlled: raw[indexMap.typeControlled],
          typeRefrigerated: raw[indexMap.typeRefrigerated],
          typeExperimental: raw[indexMap.typeExperimental],
          typeSample: raw[indexMap.typeSample],
          typeCash: raw[indexMap.typeCash],
          price: raw[indexMap.price]
        })
      }
    }
    return rawData
  }
  #rmleadNum(address: string): string {
    const headNum = parseInt(address)
    if (isNaN(headNum)) return address
    return address.substring(headNum.toString().length)
  }

  /**
   * 根據原始資料的地址取得地址資訊
   * @param rawData 原始資料
   * @description
   * 1. 先利用 Set 取得不重複的地址
   * 2. 查詢資料庫中是否存在 => 批量查詢
   * 3. 如果沒有在資料庫中，則再次解析地址
   * 4. 回傳地址資訊
   */
  private async getAddressInfoMap(rawData: RawData[]) {
    const addressSet = new Set<string>()

    for (let i = 0; i < rawData.length; i++) {
      addressSet.add(rawData[i].address)
    }

    const addressMap: Map<string, AddressInfo> = new Map() // 原始地址, 地址資訊

    const addressArray = Array.from(addressSet).filter(add => TypeCheck.isNotEmpty(add)) // 排除空值
    const addressChunks = _.chunk(addressArray, 500)
    const addressResults = await Promise.all(
      addressChunks.map(chunk =>
        this.prisma.address.findMany({
          where: { address: { in: chunk } },
          select: { address: true, geohash: true, formatAddress: true, lat: true, lng: true }
        }))
    )
    addressResults.flat().forEach(d => addressMap.set(d.address, { ...d }))

    // 確認哪些地址沒有在資料庫中
    const addressNotInDB = addressArray.filter(i => !addressMap.has(i))
    const newAddress = await this.parseNewAddressAndSaveInDB(addressNotInDB)
    newAddress.forEach(d => addressMap.set(d.address, { ...d }))

    return addressMap
  }

  /**
   * 解析新增的地址，並存入資料庫
   * @param addressList 新增的地址
   * @description
   * 1. 呼叫 routeService 解析地址
   * 2. 將解析後的地址資訊存入資料庫 => 每次新增 500 筆
   */
  private async parseNewAddressAndSaveInDB(addressList: string[]) {
    const address = await this.routeService.parseAddress(addressList)

    const newAddressData = Array.from(address.values()).map(d => ({
      id: this.snowFlake.snowflakeId(),
      address: d.source,
      formatAddress: d.formatted,
      lat: d.location.lat,
      lng: d.location.lng,
      geohash: encode(d.location.lat, d.location.lng)
    }) satisfies Prisma.AddressCreateInput)

    const chunkAddress = _.chunk(newAddressData, 500)
    await Promise.all(chunkAddress.map(chunk => {
      return this.prisma.address.createMany({
        data: chunk
      })
    }))

    return newAddressData.map(d => ({
      address: d.address,
      geohash: d.geohash,
      formatAddress: d.formatAddress,
      lat: d.lat,
      lng: d.lng
    }))
  }

  /**
   * 根據原始資料取得客戶主檔
   * @param rawOrderData 原始資料
   * @param addressMap 地址資訊
   * @description
   * 1. 利用 Set 取得不重複的客戶代碼_地址Geohash
   * 2. 查詢資料庫中是否存在 => 批量查詢
   * 3. 轉換成 Map => 客戶代碼_地址Geohash, 客戶資料
   */
  private async getCustomerMap(rawOrderData: RawData[], addressMap: Map<string, AddressInfo>) {
    const customerAndGeohashSet = new Set<string>()

    for (const order of rawOrderData) {
      const address = order.address
      const geohash = addressMap.get(address)?.geohash

      if (TypeCheck.isNotEmpty(address) && TypeCheck.isNotEmpty(geohash)) {
        customerAndGeohashSet.add(this.generateCustomerAndGeohashKey(order.customerCode, geohash))
      }
    }

    // 查詢客戶代碼_地址Geohash 是否存在
    const customerAndGeohashArray = Array.from(customerAndGeohashSet).map(set => set.split('_')) // [['客戶代碼', '地址Geohash']]
    const customerAndGeohashChunks = _.chunk(customerAndGeohashArray, 500)
    const customerAndGeohashResults = await Promise.all(
      customerAndGeohashChunks.map(chunk =>
        this.prisma.customer.findMany({
          where: {
            OR: chunk.map(([code, geohash]) => ({
              code,
              geohash
            }))
          },
          select: {
            code: true,
            geohash: true,
            type: true,
            route: true,
            canArrange: true,
            timeWindow: true
          }
        }))
    )

    const customerMap = new Map<string, Pick<Customer, 'code' | 'geohash' | 'type' | 'route' | 'canArrange' | 'timeWindow'>>() // 客戶代碼_地址Geohash, 客戶資料
    customerAndGeohashResults.flat().forEach(d => {
      const key = this.generateCustomerAndGeohashKey(d.code, d.geohash)

      if (customerAndGeohashSet.has(key)) {
        customerMap.set(key, d)
      }
    })

    return customerMap
  }

  /**
   * 轉換資料並確認是否有錯誤
   * @param rawData 原始資料
   * @param addressMap 地址資訊
   * @param customerMap 客戶資訊
   * @description
   * 1. 開始轉換資料，並確認是否有錯誤
   * 2. 如果有任何錯誤，該筆結果不會加入資料
   * 3. 回傳轉換後的資料
   */
  private transformAndVerifyData(
    rawData: RawData[],
    addressMap: Map<string, AddressInfo>,
    customerMap: Map<string, Pick<Customer, 'code' | 'geohash' | 'type' | 'route' | 'canArrange' | 'timeWindow'>>,
    totalGeohash: Set<string>,
    totalCode: Set<string>
  ) {
    const transformedData: TransformedData[] = []
    const rawDataError = new Map<number, string[]>() // 原始資料的行數, 錯誤訊息陣列

    const directlyDrop: TransformedData[] = []

    for (const rawOrder of rawData) {
      const errorMessage: string[] = []

      // 檢查不可為空的欄位
      if (TypeCheck.isEmpty(rawOrder.trainNumber)) errorMessage.push('車次為空')
      if (TypeCheck.isEmpty(rawOrder.customerCode)) errorMessage.push('客戶代碼為空')
      if (TypeCheck.isEmpty(rawOrder.customerName)) errorMessage.push('客戶中文名稱為空')
      if (TypeCheck.isEmpty(rawOrder.address)) errorMessage.push('地址為空')
      if (TypeCheck.isEmpty(rawOrder.route)) errorMessage.push('路線為空')
      if (TypeCheck.isEmpty(rawOrder.obd)) errorMessage.push('OBD為空')
      if (TypeCheck.isEmpty(rawOrder.invoice)) errorMessage.push('Invoice為空')
      // if (TypeCheck.isEmpty(rawOrder.psn)) errorMessage.push('PSN為空')
      // if (TypeCheck.isEmpty(rawOrder.depot)) errorMessage.push('倉別為空')

      // 檢查貨數是否為空 => 不為空則檢查是否為數字 (可能會是Int64)
      if (TypeCheck.isEmpty(rawOrder.capacity)) {
        errorMessage.push('貨數不可為空')
      } else {
        try {
          const capacity = BigInt(rawOrder.capacity)

          if (capacity <= BigInt(0)) {
            errorMessage.push('貨數必須大於0')
          }
        } catch (err) {
          errorMessage.push('貨數必須為數字')
        }
      }

      // 如果有傳入應收金額，則檢查應收金額是否為數字
      if (TypeCheck.isNotEmpty(rawOrder.price) && isNaN(Number(rawOrder.price))) {
        errorMessage.push('應收金額必須為數字')
      }

      if (!(rawOrder.typeSample === 'Y')) { // 如果是樣品，則不檢查客戶代碼和地址
        if (!(totalCode.has(rawOrder.customerCode))) errorMessage.push(`${rawOrder.customerName} 的客戶代碼(${rawOrder.customerCode})不存在於主檔, 且不是樣品`)
        // 檢查資料庫中是否有該地址的 geohash
        const ggeo = addressMap.get(rawOrder.address)?.geohash ?? 'not found'
        const llat = addressMap.get(rawOrder.address)?.lat ?? 'not found'
        const llng = addressMap.get(rawOrder.address)?.lng ?? 'not found'
        if (!(totalGeohash.has(ggeo))) errorMessage.push(`地址「${rawOrder.address ?? '空地址'}」不存在於主檔(${ggeo}, ${llat}, ${llng}), 且不是樣品`)
      }

      // 如果有任何錯誤，該筆結果不會加入資料
      if (errorMessage.length > 0) {
        rawDataError.set(rawOrder.rowNumber, errorMessage)
        continue
      }

      // 檢查是否存在於客戶主檔
      const addressInfo = addressMap.get(rawOrder.address)
      const customerCodeAndGeohash = this.generateCustomerAndGeohashKey(rawOrder.customerCode, addressInfo?.geohash ?? 'not found')
      if (!customerMap.has(customerCodeAndGeohash)) {

        // 如果是樣品，——> 使用默認的客戶資訊
        if (rawOrder.typeSample === 'Y') {
          const defaultCustomerInfo = {
            code: rawOrder.customerCode,
            geohash: addressInfo?.geohash ?? '',
            type: 'GP', // 假定為診所
            route: rawOrder.route, // 使用Excel中的路線
            canArrange: [],
            timeWindow: {   //  假定為診所營業時間
              w1: [{ start: 540, end: 720 }, { start: 870, end: 1050 }, { start: 1080, end: 1260 }],
              w2: [{ start: 540, end: 720 }, { start: 870, end: 1050 }, { start: 1080, end: 1260 }],
              w3: [{ start: 540, end: 720 }, { start: 870, end: 1050 }, { start: 1080, end: 1260 }],
              w4: [{ start: 540, end: 720 }, { start: 870, end: 1050 }, { start: 1080, end: 1260 }],
              w5: [{ start: 540, end: 720 }, { start: 870, end: 1050 }, { start: 1080, end: 1260 }],
              w6: [{ start: 540, end: 720 }, { start: 870, end: 1050 }, { start: 1080, end: 1260 }],
              w7: [{ start: 540, end: 720 }, { start: 870, end: 1050 }, { start: 1080, end: 1260 }]
            }
          }
          customerMap.set(customerCodeAndGeohash, defaultCustomerInfo)
        } else {
          directlyDrop.push({
            rowNumber: rawOrder.rowNumber,
            customerCodeAndGeohash,
            trainNumber: rawOrder.trainNumber,
            customerCode: rawOrder.customerCode,
            customerName: rawOrder.customerName,
            address: rawOrder.address,
            formatAddress: addressInfo?.formatAddress ?? '',
            lat: addressInfo?.lat ?? 0,
            lng: addressInfo?.lng ?? 0,
            geohash: 'null',
            route: rawOrder.route,
            obd: rawOrder.obd,
            invoice: rawOrder.invoice,
            psn: TypeCheck.isEmpty(rawOrder.psn) ? 'null' : rawOrder.psn,
            depot: TypeCheck.isEmpty(rawOrder.depot) ? 'null' : rawOrder.depot,
            capacity: rawOrder.capacity,
            typeControlled: TypeCheck.isNotEmpty(rawOrder.typeControlled),
            typeRefrigerated: TypeCheck.isNotEmpty(rawOrder.typeRefrigerated),
            typeExperimental: TypeCheck.isNotEmpty(rawOrder.typeExperimental),
            typeSample: TypeCheck.isNotEmpty(rawOrder.typeSample),
            typeCash: TypeCheck.isNotEmpty(rawOrder.typeCash),
            price: Number(rawOrder.price) || 0
          })
          continue
        }
      }

      transformedData.push({
        rowNumber: rawOrder.rowNumber,
        customerCodeAndGeohash,
        trainNumber: rawOrder.trainNumber,
        customerCode: rawOrder.customerCode,
        customerName: rawOrder.customerName,
        address: rawOrder.address,
        formatAddress: addressInfo?.formatAddress ?? '',
        lat: addressInfo?.lat ?? 0,
        lng: addressInfo?.lng ?? 0,
        geohash: addressInfo?.geohash ?? '',
        route: rawOrder.route,
        obd: rawOrder.obd,
        invoice: rawOrder.invoice,
        psn: TypeCheck.isEmpty(rawOrder.psn) ? 'null' : rawOrder.psn,
        depot: TypeCheck.isEmpty(rawOrder.depot) ? 'null' : rawOrder.depot,
        capacity: rawOrder.capacity,
        typeControlled: TypeCheck.isNotEmpty(rawOrder.typeControlled),
        typeRefrigerated: TypeCheck.isNotEmpty(rawOrder.typeRefrigerated),
        typeExperimental: TypeCheck.isNotEmpty(rawOrder.typeExperimental),
        typeSample: TypeCheck.isNotEmpty(rawOrder.typeSample),
        typeCash: TypeCheck.isNotEmpty(rawOrder.typeCash),
        price: Number(rawOrder.price) || 0
      })
    }

    return {
      transformedData,
      rawDataError,
      directlyDrop
    }
  }

  /**
   * 根據轉換後的資料合併
   * @param transformedData 轉換後的資料
   * @description
   * 除了 貨數 應收金額 管 冰 實 樣 現 外，其餘的欄位皆使用第一筆資料
   */
  private async mergeOrderData(transformedData: TransformedData[]) {
    const mergedOrderData: Map<string, TransformedData> = new Map() // 客戶代碼_地址Geohash, 轉換後的資料

    for (const parsedOrder of transformedData) {
      const merged = mergedOrderData.get(parsedOrder.customerCodeAndGeohash)

      if (merged) {
        // 合併貨數
        merged.capacity = (BigInt(merged.capacity) + BigInt(parsedOrder.capacity)).toString()

        // 合併應收金額
        merged.price = merged.price + parsedOrder.price

        // 合併 管 冰 實 樣 現 => 每一項都是只要一個是 true 就是 true
        merged.typeControlled = merged.typeControlled || parsedOrder.typeControlled
        merged.typeRefrigerated = merged.typeRefrigerated || parsedOrder.typeRefrigerated
        merged.typeExperimental = merged.typeExperimental || parsedOrder.typeExperimental
        merged.typeSample = merged.typeSample || parsedOrder.typeSample
        merged.typeCash = merged.typeCash || parsedOrder.typeCash

        mergedOrderData.set(merged.customerCodeAndGeohash, merged)
      } else {
        mergedOrderData.set(parsedOrder.customerCodeAndGeohash, parsedOrder)
      }
    }

    return mergedOrderData
  }

  /**
   * 產生客戶代碼_地址Geohash的鍵值
   */
  private generateCustomerAndGeohashKey(customerCode: string, geohash: string) {
    return `${customerCode}_${geohash}`
  }

  private async checkTitle(titleRaw: string[]) {
    const title = [
      '車次:', '客戶代碼',
      '客戶中文名稱', '地址',
      '路線', 'OBD',
      'Invoice', 'PSN',
      '倉別', '貨數',
      '管', '冰',
      '實', '樣',
      '現', '應收金額'
    ]
    return (JSON.stringify(title) === JSON.stringify(titleRaw))
  }
}

export default Operator
