import 'dotenv/config'

import {
  OnWorkerEvent,
  Processor,
  WorkerHost
} from '@nestjs/bullmq'

import {
  SpanContext,
  SpanKind,
  context,
  trace
} from '@opentelemetry/api'

import TypeCheck from '@saico/type-check-js'

import {
  CalculateJobState,
  Coordinate,
  DataStatus,
  Location,
  TimeWindow,
  VehicleTimeWindow,
  VehicleType
} from '@zuellig-pharma-2/database'

import {
  CalculateJobDestination,
  CalculateJobVehicle
} from '@zuellig-pharma-2/database/client'

import {
  Job
} from 'bullmq'

import Long from 'long'

import {
  encode
} from 'ngeohash'

import {
  air20
} from '$proto/compiled.js'

import {
  PrismaHelper,
  PrismaService,
  QueueService,
  RouteService,
  S3Service,
  SnowflakeService,
  SystemSettingService,
  tracer
} from '$shared-service'

import {
  QueueName
} from '$types'

import {
  generateCalculateTimeLimit,
  handleCommonErrorSpan,
  updateJobProgress
} from '$utility'

interface JobData {
  /** 計算任務識別碼 */
  jobId: string,
  /** span父層元素 */
  spanContext: SpanContext
}

const concurrency = Number(process.env.DATA_PREPROCESSING_CONCURRENCY) || 1

@Processor(QueueName.DATA_PREPROCESSING, { concurrency, maxStalledCount: 3 })
export class DataPreprocessingProcessor extends WorkerHost {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly queueService: QueueService,
    private readonly routeService: RouteService,
    private readonly snowflake: SnowflakeService,
    private readonly s3Service: S3Service,
    private readonly systemSettingService: SystemSettingService
  ) {
    super()
  }

  async process (job: Job<JobData>) {
    const span = tracer.startSpan('DataPreprocessingProcessor.process', { kind: SpanKind.CONSUMER })

    const calculateJobId = job.data.jobId
    const TOTAL_STEP = 5

    try {
      // 為了在fail時能夠取得spanContext，所以將spanContext存入job.data
      job.data.spanContext = span.spanContext()

      await context.with(trace.setSpan(context.active(), span), async () => {
        // 開始前處理，先更新狀態
        await this.changeCalculateJobState(calculateJobId, CalculateJobState.DATA_PREPROCESSING)
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 1, message: '資料前處理開始' })

        // 轉換計算任務資料
        const { vehicles, destinations, algoConfig, od } = await this.handleCalculateJob(calculateJobId)
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 2, message: '取得計算資料成功' })

        // 產生proto buffer
        const buffer = this.createProtoBuffer(calculateJobId, algoConfig, vehicles, destinations, od)
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 3, message: '產生proto buffer成功' })

        // 上傳至S3
        const key = `backend/calculate-job/${calculateJobId}`
        await this.s3Service.uploadFile(`${key}/input`, buffer, 'application/octet-stream')
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 4, message: '上傳至S3成功' })

        // 前處理完成，更新狀態
        await this.changeCalculateJobState(calculateJobId, CalculateJobState.WAIT_FOR_ALGORITHM)

        // 添加呼叫演算法的佇列
        const bufferTime = await this.systemSettingService.getAlgorithmCalculateBufferTime()
        const calculateTime = (algoConfig.timeLimit ?? 0) + bufferTime
        const count = destinations.length // 實際傳入演算法目的地數量
        const jobId = `id-${calculateJobId}`

        await this.queueService.addCallAlgorithm({
          calculateJobId,
          s3Path: key,
          time: calculateTime,
          count
        }, { jobId })

        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 5, message: '資料前處理完成' })
      })
    } finally {
      span.end()
    }
  }

  @OnWorkerEvent('failed')
  async onFailed (job: Job<JobData>, error: unknown) {
    const { spanContext } = job.data
    const calculateJobId = job.data.jobId

    const parentSpanContext = trace.getSpanContext(trace.setSpan(context.active(), trace.wrapSpanContext(spanContext))) as SpanContext
    const ctx = trace.setSpanContext(context.active(), parentSpanContext)
    const span = tracer.startSpan('DataPreprocessingProcessor.onFailed', { kind: SpanKind.INTERNAL }, ctx)

    // 前處理失敗，更新狀態
    await this.changeCalculateJobState(calculateJobId, CalculateJobState.DATA_PREPROCESSING_FAILED, error)

    handleCommonErrorSpan(span, error, '前處理計算任務發生錯誤')
  }

  /**
   * 變更計算任務狀態，將calculateJob表中的狀態改變，且在calculateJobError表中新增
   * @param calculateJobId 計算任務識別碼
   * @param state 狀態
   * @param error 錯誤 (選填)
   */
  private async changeCalculateJobState (
    calculateJobId: string,
    state: CalculateJobState,
    error?: any
  ) {
    await this.prisma.$transaction(async trx => {
      await trx.calculateJob.update({
        where: { id: calculateJobId },
        data: {
          state,
          updater: calculateJobId
        },
        select: { id: true }
      })

      if (TypeCheck.isNotUndefined(error)) {
        await trx.calculateJobError.create({
          data: {
            id: this.snowflake.snowflakeId(),
            calculateJobId,
            error: this.prismaHelper.processOptionalInput(error) ?? {},
            creator: calculateJobId,
            updater: calculateJobId,
            status: DataStatus.ACTIVE
          },
          select: { id: true }
        })
      }
    })
  }

  /**
   * 使用`calculateJobId`取得計算相關資料，並且轉換成計算任務所需的資料格式
   * @param calculateJobId 計算任務識別碼
   * @returns 計算任務所需的資料
   */
  private async handleCalculateJob (calculateJobId: string) {
    const calculateJobVehicles = await this.prisma.calculateJobVehicle.findMany({
      where: {
        calculateJobId
      },
      select: {
        id: true,
        code: true,
        type: true,
        startLocation: true,
        endLocation: true,
        timeWindow: true,
        forceUse: true,
        priority: true,
        forceStart: true,
        minCapacity: true,
        maxCapacity: true,
        minWorkTime: true,
        regularWorkTime: true,
        considerOvertime: true,
        maxWorkOverTime: true,
        minDrivingTime: true,
        maxDrivingTime: true,
        minDrivingDistance: true,
        maxDrivingDistance: true,
        minDestinationCount: true,
        maxDestinationCount: true
      }
    })

    const calculateJobDestinations = await this.prisma.calculateJobDestination.findMany({
      where: {
        calculateJobId
      },
      select: {
        id: true,
        type: true,
        location: true,
        pickupDemand: true,
        deliveryDemand: true,
        executeVehicles: true,
        serviceTimeMode: true,
        serviceTime: true,
        arrivalMode: true,
        priority: true,
        timeWindowMode: true,
        timeWindow: true
      }
    })

    const { vehicles, vehicleCoordinateList } = this.generateVehicle(calculateJobVehicles)
    const { destinations, destinationCoordinateList } = this.generateDestination(calculateJobDestinations)
    const algoConfig = await this.generateAlgoConfig(destinations.length)
    const od = await this.generateOd(vehicleCoordinateList, destinationCoordinateList)

    return { vehicles, destinations, algoConfig, od }
  }

  /**
   * 產生演算法所需的車輛資料
   * @param calculateJobVehicles 計算任務車輛資料
   * @returns 車輛資料 & 車輛座標清單
   */
  private generateVehicle (calculateJobVehicles: Omit<CalculateJobVehicle, 'creator' | 'updater' | 'status' | 'createTime' | 'updateTime' | 'schemaVersion' | 'applicationId' | 'calculateJobId' | 'refId' | 'info'>[]) {
    const vehicles: air20.input.IVehicle[] = []
    const vehicleCoordinateList: Coordinate[] = []

    for (const vehicle of calculateJobVehicles) {

      let endInDB = vehicle.endLocation
      if(
        endInDB===null ||
        JSON.stringify(endInDB) === 'null' ||
        endInDB === undefined ||
        JSON.stringify(endInDB) === 'undefined' ||
        JSON.stringify(endInDB) === '' ||
        JSON.stringify(endInDB) === '{}'
      ) endInDB = null

      const timeWindow = vehicle.timeWindow as VehicleTimeWindow
      const startCoordinate = (vehicle.startLocation as Location).coordinate as Coordinate
      const endCoordinate = endInDB ? (endInDB as Location).coordinate as Coordinate : null
      const startGeohash = encode(startCoordinate.lat, startCoordinate.lng)
      const endGeohash = endCoordinate === null ? [] : [encode(endCoordinate.lat, endCoordinate.lng)]

      const id = vehicle.id
      const type = vehicle.type
      const startTime = timeWindow.start ?? -1
      const endTime = timeWindow.end ?? -1
      const startLocation = [startGeohash] // TODO:2.0版本只有單一出發點
      const endLocation = endGeohash // TODO: 2.0版本只有單一結束點
      const forceUse = vehicle.forceUse
      const priority = vehicle.priority
      const forceStart = vehicle.forceStart
      const minCapacity = vehicle.minCapacity ?? '-1'
      const maxCapacity = vehicle.maxCapacity ?? '-1'
      const minWorkTime = vehicle.minWorkTime ?? -1
      const regularWorkTime = vehicle.regularWorkTime ?? -1
      const considerOvertime = vehicle.considerOvertime
      const maxWorkOvertime = vehicle.maxWorkOverTime ?? 0
      const minDrivingTime = vehicle.minDrivingTime ?? -1
      const maxDrivingTime = vehicle.maxDrivingTime ?? -1
      const minDrivingDistance = vehicle.minDrivingDistance ?? -1
      const maxDrivingDistance = vehicle.maxDrivingDistance ?? -1
      const minDestinationCount = vehicle.minDestinationCount ?? -1
      const maxDestinationCount = vehicle.maxDestinationCount ?? -1
      const startSetupTime = 0 // TODO: 2.0版本暫時不支援startSetupTime
      const endSetupTime = 0 // TODO: 2.0版本暫時不支援endSetupTime

      const vehicleInputData: air20.input.IVehicle = {
        id,
        type,
        startTime,
        endTime,
        startLocation,
        endLocation,
        forceUse,
        priority,
        forceStart,
        minCapacity: Long.fromString(minCapacity),
        maxCapacity: Long.fromString(maxCapacity),
        minWorkTime,
        regularWorkTime,
        considerOvertime,
        maxWorkOvertime,
        minDrivingTime,
        maxDrivingTime,
        minDrivingDistance,
        maxDrivingDistance,
        minDestinationCount,
        maxDestinationCount,
        startSetupTime,
        endSetupTime
      }

      vehicles.push(vehicleInputData)
      vehicleCoordinateList.push(startCoordinate)
      if(TypeCheck.isNotNull(endCoordinate))vehicleCoordinateList.push(endCoordinate)
    }

    return { vehicles, vehicleCoordinateList }
  }

  /**
   * 產生演算法所需的目的地資料
   * @param calculateJobDestinations 計算任務目的地資料
   * @returns 目的地資料 & 目的地座標清單
   */
  private generateDestination (
    calculateJobDestinations: Omit<CalculateJobDestination, 'creator' | 'updater' | 'status' | 'createTime' | 'updateTime' | 'schemaVersion' | 'applicationId' | 'calculateJobId' | 'refId' | 'info' | 'code'>[]
  ) {
    const destinations: air20.input.IDestination[] = []
    const destinationCoordinateList: Coordinate[] = []

    for (const destination of calculateJobDestinations) {
      const coordinate = (destination.location as Location).coordinate as Coordinate

      const id = destination.id
      const type = destination.type
      const location = encode(coordinate.lat, coordinate.lng)
      const demand: air20.input.IDemand[] = [
        { type: 'PICKUP', quantity: Long.fromString(destination.pickupDemand ?? '0'), info: {} },
        { type: 'DELIVERY', quantity: Long.fromString(destination.deliveryDemand ?? '0'), info: {} }
      ] // TODO: 2.0版本暫時不支援info
      const executeVehicles = destination.executeVehicles as string[] // 在存入前就已經是計算車輛識別碼，不需要進行轉換
      const serviceTimeMode = destination.serviceTimeMode
      const serviceTime = destination.serviceTime
      const serviceTimeDependOnVehicle = {} // TODO: 2.0版本暫時不支援serviceTimeDependOnVehicle
      const arrivalMode = destination.arrivalMode
      const priority = destination.priority
      const timeWindowsMode = destination.timeWindowMode
      const timeWindows = destination.timeWindow as unknown as TimeWindow[]

      const destinationInputData: air20.input.IDestination = {
        id,
        type,
        location,
        demand,
        executeVehicles,
        serviceTimeMode,
        serviceTime,
        serviceTimeDependOnVehicle,
        arrivalMode,
        priority,
        timeWindowsMode,
        timeWindows
      }

      destinations.push(destinationInputData)
      destinationCoordinateList.push(coordinate)
    }

    return { destinations, destinationCoordinateList }
  }

  /**
    * 產生演算法設定
    * @returns 演算法設定
    */
  private async generateAlgoConfig (
    destinationCount: number
  ) {
    const algoConfig: air20.input.IAlgoConfig = {
      outputFormat: await this.systemSettingService.getAlgorithmOutputFormat(),
      maxSlack: 150,//await this.systemSettingService.getAlgorithmMaxSlack(),
      timeLimit: await generateCalculateTimeLimit(this.systemSettingService, destinationCount),
      globalObjectiveMode: await this.systemSettingService.getAlgorithmGlobalObjectiveMode(),
      pickupDeliveryMode: 'ONLY_DELIVERY_WITH_RELOAD', // ZP 的模式固定是這種
      firstSolutionStrategy: await this.systemSettingService.getAlgorithmFirstSolutionStrategy(),
      improvedSolutionStrategy: await this.systemSettingService.getAlgorithmImprovedSolutionStrategy(),
      specificSolutionKeys: [] // TODO: 2.0版本暫時不支援specificSolutionKeys
    }

    return algoConfig
  }

  /**
   * 產生演算法所需的OD資料
   * @param vehicleCoordinateList 車輛座標清單
   * @param destinationCoordinateList 目的地座標清單
   * @returns OD資料
   * @description
   * 1. 透過`routeService`取得距離矩陣
   * 2. 將距離矩陣轉換成OD資料 (truck & motorcycle)
   */
  private async generateOd (
    vehicleCoordinateList: Coordinate[],
    destinationCoordinateList: Coordinate[]
  ) {
    const coordinates = [...vehicleCoordinateList, ...destinationCoordinateList]
    const truckOdMap = await this.routeService.getRouteMatrix(coordinates, VehicleType.TRUCK)
    const motorcycleOdMap = await this.routeService.getRouteMatrix(coordinates, VehicleType.MOTORCYCLE)

    const od: { [key: string]: air20.input.IOd } = {}

    for (const [key, value] of truckOdMap) {
      od[key] = {
        truck: value,
        motorcycle: motorcycleOdMap.get(key) as number[]
      }
    }

    return od
  }

  /**
   * 根據傳入的參數產生proto buffer
   * @param calculateId 計算任務識別碼
   * @param algoConfig 演算法設定
   * @param vehicles 車輛資料
   * @param destinations 目的地資料
   * @param od OD資料
   * @returns
   */
  private createProtoBuffer (
    calculateId: string,
    algoConfig: air20.input.IAlgoConfig,
    vehicles: air20.input.IVehicle[],
    destinations: air20.input.IDestination[],
    od: { [key: string]: air20.input.IOd }
  ) {
    const message = air20.input.AirInput.create({
      jobId: calculateId,
      algoConfig,
      vehicles,
      destinations,
      od
    })
    const buffer = air20.input.AirInput.encode(message).finish()

    return buffer
  }
}
