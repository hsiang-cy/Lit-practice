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

import PromisePool from '@supercharge/promise-pool'

import {
  CalculateJobState,
  DataStatus,
  DestinationType,
  DispatchRouteTaskEvent
} from '@zuellig-pharma-2/database'

import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Job
} from 'bullmq'

import _ from 'lodash'

import {
  air20
} from '$proto/compiled'

import {
  AlgorithmService,
  PrismaHelper,
  PrismaService,
  S3Service,
  SnowflakeService,
  tracer
} from '$shared-service'

import {
  QueueName
} from '$types'

import {
  handleCommonErrorSpan,
  updateJobProgress
} from '$utility'

interface JobData {
  /** 計算任務識別碼 */
  calculateJobId: string
  /** span父層元素 */
  spanContext: SpanContext
}

type CleanNullables<T> = {
  [P in keyof T]-?: T[P] extends object
    ? CleanNullables<T[P]>
    : NonNullable<T[P]>
};

const concurrency = Number(process.env.DATA_POSTPROCESSING_CONCURRENCY) || 1

@Processor(QueueName.DATA_POSTPROCESSING, { concurrency, maxStalledCount: 3 })
export class DataPostprocessingProcessor extends WorkerHost {
  constructor (
    private readonly algorithm: AlgorithmService,
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly s3: S3Service,
    private readonly snowflake: SnowflakeService
  ) {
    super()
  }

  async process (job: Job<JobData>) {
    const span = tracer.startSpan('DataPostProcessingProcessor.process', { kind: SpanKind.CONSUMER })

    const { calculateJobId } = job.data
    const TOTAL_STEP = 3

    try {
      // 為了在fail時能夠取得spanContext，所以將spanContext存入job.data
      job.data.spanContext = span.spanContext()

      await context.with(trace.setSpan(context.active(), span), async () => {
        // 開始後處理，更新狀態
        await this.changeCalculateJobState(calculateJobId, CalculateJobState.DATA_POSTPROCESSING)
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 1, message: '資料後處理開始' })

        // 取得演算法回傳結果
        const outputJson = await this.getOutputJson(calculateJobId)
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 2, message: '取得資料成功' })

        // 將演算法回傳結果新增至資料庫，並更新狀態
        await this.handleSuccessOutput(outputJson)
        await this.changeCalculateJobState(calculateJobId, CalculateJobState.JOB_FINISHED)

        // 刪除演算法回傳結果
        await this.algorithm.removeAlgorithmResult(calculateJobId)

        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 3, message: '資料處理成功' })
      })
    } finally {
      span.end()
    }
  }

  @OnWorkerEvent('failed')
  async onFailed (job: Job<JobData>, error: unknown) {
    const { calculateJobId, spanContext } = job.data

    const parentSpanContext = trace.getSpanContext(trace.setSpan(context.active(), trace.wrapSpanContext(spanContext))) as SpanContext
    const ctx = trace.setSpanContext(context.active(), parentSpanContext)
    const span = tracer.startSpan('DataPostProcessingProcessor.onFailed', { kind: SpanKind.INTERNAL }, ctx)

    // 後處理失敗，更新狀態
    await this.changeCalculateJobState(calculateJobId, CalculateJobState.DATA_POSTPROCESSING_FAILED, error)

    // 移除演算法回傳結果
    await this.algorithm.removeAlgorithmResult(calculateJobId)

    handleCommonErrorSpan(span, error, '處理計算任務後處理發生錯誤')
  }

  /**
   * 變更計算任務狀態
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
   * 取得演算法回傳結果，並轉換成 JSON 格式
   * @param calculateJobId 計算任務識別碼
   * @returns 演算法回傳結果 (JSON 格式)
   * @description
   * 1. 從 S3 下載演算法回傳結果
   * 2. 解碼成 AirOutput 格式
   * 3. 轉換成 JSON 格式
   */
  private async getOutputJson (
    calculateJobId: string
  ) {
    const key = `backend/calculate-job/${calculateJobId}/output`

    const buffer = await this.s3.downloadFile(key, { decompress: true })
    const decode = air20.output.AirOutput.decode(buffer)
    const json = air20.output.AirOutput.toObject(decode, { defaults: true, longs: String })

    return json as CleanNullables<air20.output.IAirOutput>
  }

  /**
   * 處理演算法成功回傳結果，並新增至資料庫
   * @param outputJson 演算法回傳結果
   * @description
   * 1. 由於演算法回傳結果陣列的部分可能會為空，所以需要指定預設值
   * 2. 新增未指派的車輛 => 每100筆新增一次
   * 3. 新增未分派的訂單 => 每100筆新增一次
   * 4. 新增派遣路線排程 => 每100筆新增一次
   * 5. 新增派遣路線任務 => 每100筆新增一次
   */
  private async handleSuccessOutput (
    outputJson: CleanNullables<air20.output.IAirOutput>
  ) {
    const calculateJobId = outputJson.jobId
    const idleVehicles = (outputJson.idleVehicles ?? []) as CleanNullables<air20.output.IIdleVehicle>[]
    const unDispatches = (outputJson.unDispatches ?? []) as CleanNullables<air20.output.IUnDispatch>[]
    const routes = (outputJson.routes ?? []) as CleanNullables<air20.output.IAirRoute>[]

    // 整理要存入資料庫的資料
    const newIdleVehicles: Prisma.DispatchIdleVehicleUncheckedCreateInput[] = idleVehicles.map(vehicle => ({
      id: this.snowflake.snowflakeId(),
      calculateJobId,
      calculateVehicleId: vehicle.id,
      reason: this.prismaHelper.processOptionalInput(vehicle.reason) ?? '',
      creator: calculateJobId,
      updater: calculateJobId,
      status: DataStatus.ACTIVE
    }))

    const newUnDispatches: Prisma.DispatchDropDestinationUncheckedCreateInput[] = unDispatches.map(dropDestination => ({
      id: this.snowflake.snowflakeId(),
      calculateJobId,
      calculateJobDestinationId: dropDestination.id,
      reason: this.prismaHelper.processOptionalInput(dropDestination.reason) ?? '',
      creator: calculateJobId,
      updater: calculateJobId,
      status: DataStatus.ACTIVE
    }))

    const newDispatchRoutes: Prisma.DispatchRouteUncheckedCreateInput[] = []
    const newTasks: Prisma.DispatchRouteTaskUncheckedCreateInput[] = []

    for (const route of routes) {
      const newDispatchRoute = {
        id: this.snowflake.snowflakeId(),
        calculateJobId,
        calculateJobVehicleId: route.id,
        actualStartTime: route.startTime,
        actualEndTime: route.endTime,
        pickupDemand: route.totalPickupDemand as unknown as string,
        deliveryDemand: route.totalDeliveryDemand as unknown as string,
        drivingTime: route.totalDrivingTime,
        slackTime: route.totalSlackTime,
        serviceTime: route.totalServiceTime,
        workTime: route.totalWorkTime,
        isOvertime: route.isOvertime,
        distance: route.totalDrivingDistance,
        taskCount: this.calculateTaskCount(route.tasks),
        creator: calculateJobId,
        updater: calculateJobId,
        status: DataStatus.ACTIVE
      } satisfies Prisma.DispatchRouteUncheckedCreateInput

      let count = 1 // 趟數
      let seq = 1 // 任務順序
      const tasks = (route.tasks ?? []) as CleanNullables<air20.output.IAirTask>[]
      for (const task of tasks) {
        const pickupDemand = task.demand.find(d => d.type === 'PICKUP')?.quantity ?? '0'
        const deliveryDemand = task.demand.find(d => d.type === 'DELIVERY')?.quantity ?? '0'

        const newTask = {
          id: this.snowflake.snowflakeId(),
          calculateJobId,
          dispatchRouteId: newDispatchRoute.id,
          calculateJobDestinationId: task.event === DispatchRouteTaskEvent.DESTINATION ? task.refId : null,
          calculateJobVehicleId: task.event === DispatchRouteTaskEvent.DESTINATION ? null : task.refId, // 如果不是目的地，refId會是車輛代碼
          count,
          seq,
          event: task.event,
          type: task.type,
          transitDistance: task.transitDistance,
          transitTime: task.transitTime,
          arrivalTime: task.arrivalTime,
          arrivalCapacity: task.arrivalCapacity as unknown as string,
          serviceTime: task.serviceTime,
          slackTime: task.slackTime,
          pickupDemand: pickupDemand as unknown as string,
          deliveryDemand: deliveryDemand as unknown as string,
          creator: calculateJobId,
          updater: calculateJobId,
          status: DataStatus.ACTIVE
        } satisfies Prisma.DispatchRouteTaskUncheckedCreateInput
        newTasks.push(newTask)

        // 判斷是否要趟數 + 1，且順序變回 1
        // TODO: 請未來加入到 DestinationType 的 enum 內
        if (task.event === DispatchRouteTaskEvent.DESTINATION && task.type === 2) {
          count++
          seq = 1
        } else {
          seq++
        }
      }
      newDispatchRoutes.push(newDispatchRoute)
    }

    // 批量存入資料庫
    const chunkIdleVehicles = _.chunk(newIdleVehicles, 100)
    const chunkUnDispatches = _.chunk(newUnDispatches, 100)
    const chunkDispatchRoutes = _.chunk(newDispatchRoutes, 100)
    const chunkTasks = _.chunk(newTasks, 100)

    // 存入資料庫
    await this.prisma.$transaction(async trx => {
      await trx.calculateJob.update({
        where: { id: calculateJobId },
        data: {
          apiVersion: outputJson.version,
          updater: calculateJobId
        },
        select: { id: true }
      })

      if (chunkIdleVehicles.length > 0) {
        await PromisePool
          .for(chunkIdleVehicles)
          .withConcurrency(5)
          .process(async idleVehicles => {
            await trx.dispatchIdleVehicle.createMany({
              data: idleVehicles
            })
          })
      }

      if (chunkUnDispatches.length > 0) {
        await PromisePool
          .for(chunkUnDispatches)
          .withConcurrency(5)
          .process(async unDispatches => {
            await trx.dispatchDropDestination.createMany({
              data: unDispatches
            })
          })
      }

      if (chunkDispatchRoutes.length > 0) {
        await PromisePool
          .for(chunkDispatchRoutes)
          .withConcurrency(5)
          .process(async dispatchRoutes => {
            await trx.dispatchRoute.createMany({
              data: dispatchRoutes
            })
          })
      }

      if (chunkTasks.length > 0) {
        await PromisePool
          .for(chunkTasks)
          .withConcurrency(5)
          .process(async tasks => {
            await trx.dispatchRouteTask.createMany({
              data: tasks
            })
          })
      }
    })
  }

  /**
   * 計算任務數量
   * @param tasks 派遣路線任務陣列
   * @description
   * 1. 只計算一般配送點 (會排除 車輛起始點 與 回倉點)
   * 2. 車輛起始點的 task.event 為 VEHICLE_START 或 VEHICLE_END
   * 3. 回倉點的 task.type 為 RELOAD
   *
   */
  private calculateTaskCount (tasks: air20.output.IAirTask[]) {
    return tasks.filter(task => task.event === DispatchRouteTaskEvent.DESTINATION && task.type === DestinationType.NORMAL).length
  }
}
