/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-08 17:09:34
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  AlgorithmType,
  ArrivalMode,
  CalculateJobState,
  CalculateJobType,
  DataStatus,
  DestinationTimeWindowMode,
  Location,
  ServiceTimeMode,
  TimeWindow,
  DestinationType
} from '@zuellig-pharma-2/database'

import {
  Customer,
  Prisma,
  WebFleet
} from '@zuellig-pharma-2/database/client'

import _ from 'lodash'

import {
  Category
} from '$errors'

import {
  StartCalculate
} from '$modules/order/dto'

import {
  PrismaHelper,
  PrismaService,
  QueueService,
  SnowflakeService,
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

/** 開始計算訂單 */
@Injectable()
@APIInfo('START_CALCULATE', 'Order')
export class Operator extends BaseOperator<StartCalculate.Data, BaseQuery, StartCalculate.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly queueService: QueueService,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify(req: { body: StartCalculate.Body }) {
    const data = await this.validateDto(StartCalculate.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 確認車輛是否存在，並且是啟用狀態
    const vehicles = await this.prisma.webVehicle.findMany({
      where: {
        id: { in: data.vehicleIds },
        status: DataStatus.ACTIVE
      },
      select: {
        id: true,
        code: true,
        driverName: true,
        type: true,
        forceUse: true,
        forceStart: true,
        timeWindow: true,
        minCapacity: true,
        maxCapacity: true,
        minWorkTime: true,
        regularWorkTime: true,
        maxWorkOverTime: true,
        considerOvertime: true,
        minDrivingTime: true,
        maxDrivingTime: true,
        minDrivingDistance: true,
        maxDrivingDistance: true,
        minDestinationCount: true,
        maxDestinationCount: true,
        tonnage: true,
        size: true,
        volume: true
      }
    })
    if (vehicles.length !== data.vehicleIds.length) throw Category.DataNotExist.vehicle

    // 取得車輛車隊
    const fleetMembers = await this.prisma.webFleetMember.findMany({
      where: {
        vehicleId: { in: data.vehicleIds },
        status: DataStatus.ACTIVE
      },
      select: {
        id: true,
        vehicleId: true,
        fleet: {
          select: {
            area: true,
            code: true,
            name: true,
            priority: true,
            startLocation: true,
            endLocation: true
          }
        }
      }
    })
    if (fleetMembers.length === 0) throw Category.DataNotExist.fleetMember

    // 取得車輛路線
    const vehicleRoutes = await this.prisma.webVehicleRoute.findMany({
      where: {
        vehicleId: { in: data.vehicleIds },
        status: DataStatus.ACTIVE
      },
      select: {
        vehicleId: true,
        route: {
          select: {
            name: true
          }
        }
      }
    })
    if (vehicleRoutes.length === 0) throw Category.DataNotExist.route

    // 確認訂單群組是否存在
    const orderGroup = await this.prisma.webOrderGroup.findFirst({
      where: {
        id: data.orderId,
        status: { not: DataStatus.DELETED }
      },
      select: {
        id: true,
        comment: true,
        startTime: true
      }
    })
    if (TypeCheck.isNull(orderGroup)) throw Category.DataNotExist.orderGroup

    // 取得訂單群組目的地
    const orderGroupDestinations = await this.prisma.webOrderGroupDestination.findMany({
      where: {
        orderGroupId: data.orderId,
        status: DataStatus.ACTIVE
      },
      select: {
        id: true,
        code: true,
        name: true,
        type: true,
        pickupDemand: true,
        deliveryDemand: true,
        serviceTimeMode: true,
        serviceTime: true,
        arrivalMode: true,
        priority: true,
        timeWindowMode: true,
        timeWindow: true,
        address: true,
        formatAddress: true,
        lat: true,
        lng: true,
        geohash: true,
        typeControlled: true,
        typeRefrigerated: true,
        typeExperimental: true,
        typeSample: true,
        typeCash: true,
        route: true,
        depot: true,
        price: true
      }
    })
    if (orderGroupDestinations.length === 0) throw Category.DataNotExist.orderGroupDestination

    // 取得客戶主檔資料
    const customerAndGeohashSet = new Set(orderGroupDestinations.map(order => this.generateCustomerAndGeohashKey(order.code, order.geohash)))
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
            name: true,
            route: true
          }
        }))
    )
    if (customerAndGeohashResults.length === 0) throw Category.DataNotExist.customer

    // 確認訂單群組目的地的路線，是否有對應車輛可以跑
    const uniqueOrderGroupRoute = [...new Set(orderGroupDestinations.map(d => d.route))]
    const uniqueVehicleRoute = new Set(vehicleRoutes.map(route => route.route.name))
    const notExistRoute = uniqueOrderGroupRoute.filter(route => !uniqueVehicleRoute.has(route))
    if (notExistRoute.length > 0) throw Category.Order.NotVehicleCanRunThisRoute(notExistRoute)

    return {
      orderGroup,
      orderGroupDestinations,
      customerAndGeohashResults,
      vehicles,
      fleetMembers,
      vehicleRoutes,
      currentAccount,
      comment: data.comment
    }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { orderGroup, orderGroupDestinations, customerAndGeohashResults, vehicles, fleetMembers, vehicleRoutes, currentAccount, comment } = data
      const calculateJobId = this.snowFlake.snowflakeId()

      const routeVehicleMap = new Map<string, string[]>() // 路線, 車輛識別碼
      const fleetMap = new Map<string, Pick<WebFleet, 'priority' | 'startLocation' | 'endLocation' | 'area' | 'code' | 'name'> & { memberId: string }>() // 車輛識別碼, 車隊資訊
      const customerMap = new Map<string, Pick<Customer, 'code' | 'geohash' | 'type' | 'name' | 'route'>>() // 客戶代碼_地址Geohash, 客戶資訊
      const vehicleIdAndCalculateVehicleIdMap = new Map<string, string>() // 車輛識別碼, 計算車輛識別碼
      const twoWayDepot: string[] = [] // TODO: 二配倉庫目前就以車輛的出發地為主，團隊未來請自行調整

      // 整理車隊資料 => 可以利用 vehicleId 取得車隊資訊
      for (const { id, vehicleId, fleet } of fleetMembers) {
        fleetMap.set(vehicleId, { ...fleet, memberId: id })
      }

      // 整理路線資料 => 可以利用 路線名稱 取得哪些車輛可以跑在該路線上
      for (const { vehicleId, route } of vehicleRoutes) {
        const routeMap = routeVehicleMap.get(route.name) ?? []

        routeVehicleMap.set(route.name, [...routeMap, vehicleId])
      }

      // 整理客戶主檔資料 => 可以利用 客戶代碼_地址Geohash 取得客戶資訊
      customerAndGeohashResults?.flat().forEach(d => {
        const key = this.generateCustomerAndGeohashKey(d.code, d.geohash)
        customerMap.set(key, d)
      })

      // 整理要新增的 計算車輛資料 & 計算目的地資料
      const newCalculateJobVehicles = vehicles.map(vehicle => {
        const fleet = fleetMap.get(vehicle.id) as Pick<WebFleet, 'priority' | 'startLocation' | 'endLocation' | 'area' | 'code' | 'name'> & { memberId: string }
        if (!twoWayDepot.includes(JSON.stringify(fleet.startLocation))) twoWayDepot.push(JSON.stringify(fleet.startLocation))

        const newCalculateVehicleId = this.snowFlake.snowflakeId()
        const vehicleRoute = vehicleRoutes.filter(route => route.vehicleId === vehicle.id).map(route => route.route.name)
        vehicleIdAndCalculateVehicleIdMap.set(vehicle.id, newCalculateVehicleId)

        return {
          id: newCalculateVehicleId,
          calculateJobId,
          refId: fleet.memberId,
          code: vehicle.code,
          type: vehicle.type,
          forceUse: vehicle.forceUse,
          priority: fleet.priority,
          forceStart: vehicle.forceStart,
          timeWindow: vehicle.timeWindow as Prisma.JsonObject,
          startLocation: fleet.startLocation as Prisma.JsonObject,
          endLocation: fleet.endLocation as Prisma.JsonObject,
          minCapacity: vehicle.minCapacity,
          maxCapacity: vehicle.maxCapacity,
          minWorkTime: vehicle.minWorkTime,
          regularWorkTime: vehicle.regularWorkTime,
          maxWorkOverTime: vehicle.maxWorkOverTime,
          considerOvertime: vehicle.considerOvertime,
          minDrivingTime: vehicle.minDrivingTime,
          maxDrivingTime: vehicle.maxDrivingTime,
          minDrivingDistance: vehicle.minDrivingDistance,
          maxDrivingDistance: vehicle.maxDrivingDistance,
          minDestinationCount: vehicle.minDestinationCount,
          maxDestinationCount: vehicle.maxDestinationCount,
          info: {
            area: fleet.area,
            fleetCode: fleet.code,
            fleetName: fleet.name,
            driverName: vehicle.driverName,
            tonnage: vehicle.tonnage ?? '',
            size: vehicle.size ?? '',
            volume: vehicle.volume ?? '',
            vehicleRoute
          },
          creator: currentAccount.id,
          updater: currentAccount.id,
          status: DataStatus.ACTIVE
        } satisfies Prisma.CalculateJobVehicleUncheckedCreateInput
      })

      const newCalculateJobDestinations: Prisma.CalculateJobDestinationUncheckedCreateInput[] = orderGroupDestinations.map(destination => {
        const customerCodeAndGeohashKey = this.generateCustomerAndGeohashKey(destination.code, destination.geohash)
        const location: Location = {
          source: destination.address,
          formatted: destination.formatAddress,
          coordinate: {
            lat: destination.lat,
            lng: destination.lng
          }
        }
        const customer = customerMap.get(customerCodeAndGeohashKey) as Customer
        const executeVehicles = (routeVehicleMap.get(destination.route) ?? []).map(vehicleId => vehicleIdAndCalculateVehicleIdMap.get(vehicleId) as string) // 由於目前不考慮頓數的限制，因此只須考慮該車輛是否在該路線上

        return {
          id: this.snowFlake.snowflakeId(),
          calculateJobId,
          refId: destination.id,
          code: destination.code,
          type: destination.type,
          location: location as Prisma.JsonObject,
          pickupDemand: destination.pickupDemand,
          deliveryDemand: destination.deliveryDemand,
          executeVehicles,
          serviceTimeMode: destination.serviceTimeMode,
          serviceTime: destination.serviceTime,
          arrivalMode: destination.arrivalMode,
          priority: destination.priority,
          timeWindowMode: destination.timeWindowMode,
          timeWindow: destination.timeWindow as Prisma.JsonObject,
          info: {
            customerType: customer?.type || (destination.typeSample ? 'GP' : 'sample'),
            name: customer?.name || destination.name,
            route: customer?.route || destination.route,
            depot: destination.depot,
            typeControlled: destination.typeControlled,
            typeRefrigerated: destination.typeRefrigerated,
            typeExperimental: destination.typeExperimental,
            typeSample: destination.typeSample,
            typeCash: destination.typeCash,
            price: destination.price ?? 0
          },
          creator: currentAccount.id,
          updater: currentAccount.id,
          status: DataStatus.ACTIVE
        } satisfies Prisma.CalculateJobDestinationUncheckedCreateInput
      })

      // TODO: 加入二配倉庫點，團隊未來請自行調整
      const newCalculateVehicleIds = newCalculateJobVehicles.map(vehicle => vehicle.id)
      for (const depotStartLocationString of twoWayDepot) {
        const depotStartLocation = JSON.parse(depotStartLocationString) as Location
        const timeWindow: TimeWindow = {    //倉庫暫定全天營業
          start: 0,
          end: 1440
        }

        newCalculateJobDestinations.push({
          id: this.snowFlake.snowflakeId(),
          calculateJobId,
          refId: 'reload',
          code: 'reload',
          type: DestinationType.RELOAD, // TODO:(sean ✅) 請未來加入到 DestinationType 的 enum 內
          location: depotStartLocation as Prisma.JsonObject,
          serviceTimeMode: ServiceTimeMode.NORMAL,
          serviceTime: 15, // TODO: 團隊未來請自行調整, 服務時間(補貨時間?)
          arrivalMode: ArrivalMode.ARRIVAL_IN_TW,
          priority: 2, // 2配倉庫，所以是2
          timeWindowMode: DestinationTimeWindowMode.EQUAL_PRIORITY,
          timeWindow: [timeWindow as unknown as Prisma.JsonObject], // TODO: 團隊未來請自行調整
          executeVehicles: newCalculateVehicleIds, // TODO: 目前預設全部車輛都可以二配，團隊未來請自行調整
          creator: currentAccount.id,
          updater: currentAccount.id,
          status: DataStatus.ACTIVE
        } satisfies Prisma.CalculateJobDestinationUncheckedCreateInput)
      }

      const chunkVehicles = _.chunk(newCalculateJobVehicles, 500)
      const chunkDestinations = _.chunk(newCalculateJobDestinations, 500)

      await this.prisma.$transaction(async trx => {
        await trx.webOrderGroup.update({
          where: { id: orderGroup.id },
          data: { lastCalculateTime: new Date() },
          select: { id: true }
        })

        await trx.calculateJob.create({
          data: {
            id: calculateJobId,
            orderGroupId: orderGroup.id,
            rawComment: orderGroup.comment,
            algorithmType: AlgorithmType.ROUTING,
            jobType: fleetMembers.length === 1 ? CalculateJobType.TSP_STATIC : CalculateJobType.VRP_STATIC,
            comment: this.prismaHelper.processOptionalInput(comment),
            planStartDate: orderGroup.startTime,
            planEndDate: orderGroup.startTime, // 目前只開放當天計算，所以傳入鄉同時間即可
            state: CalculateJobState.NEW,
            creator: currentAccount.id,
            updater: currentAccount.id,
            status: DataStatus.ACTIVE
          },
          select: { id: true }
        })

        await Promise.all(chunkDestinations.map(chunk => {
          return trx.calculateJobDestination.createMany({
            data: chunk
          })
        }))

        await Promise.all(chunkVehicles.map(chunk => {
          return trx.calculateJobVehicle.createMany({
            data: chunk
          })
        }))
      })

      // 建立佇列任務
      const jobData: { jobId: string } = { jobId: calculateJobId }
      /** id-${jobId} */
      const jobId = `id-${calculateJobId}`
      await this.queueService.addCalculateJobDataPreprocessing(jobData, { jobId })

      return {
        success: true,
        id: calculateJobId
      } satisfies StartCalculate.Data
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
   * 產生客戶代碼_地址Geohash的鍵值
   */
  private generateCustomerAndGeohashKey(customerCode: string, geohash: string) {
    return `${customerCode}_${geohash}`
  }
}

export default Operator
