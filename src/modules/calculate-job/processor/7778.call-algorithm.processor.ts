/*
 * @Author:Sean Chen
 * @Date:2025-03-13 15:15:48
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-25 13:52:54
 * @Description:
 */
import 'dotenv/config'

import {
  OnWorkerEvent,
  Processor,
  WorkerHost
} from '@nestjs/bullmq'

import {
  context,
  SpanContext,
  SpanKind,
  trace
} from '@opentelemetry/api'

import TypeCheck from '@saico/type-check-js'

import {
  CalculateJobState,
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  Job
} from 'bullmq'

import {
  AlgorithmService,
  PrismaHelper,
  PrismaService,
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
  calculateJobId: string,
  /** s3路徑 */
  s3Path: string
  /** 計算所需時間 (包含bufferTime) (秒) */
  time: number
  /** 實際傳入演算法目的地數量 */
  count: number
  /** span父層元素 */
  spanContext: SpanContext
}

// 定義並設定 concurrency
const concurrency = Number(process.env.CALL_ALGORITHM_CONCURRENCY) || 1

@Processor(QueueName.CALL_ALGORITHM, { concurrency, maxStalledCount: 3 })
export class CallAlgorithmProcessor extends WorkerHost {
  constructor (
    private readonly algorithm: AlgorithmService,
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowflake: SnowflakeService
  ) {
    super()
  }

  async process (job: Job<JobData>) {
    const span = tracer.startSpan('CallAlgorithmProcessor.process', { kind: SpanKind.CONSUMER })

    const { s3Path, calculateJobId, time, count } = job.data
    const TOTAL_STEP = 2

    try {
      // 為了在fail時能夠取得spanContext，所以將spanContext存入job.data
      job.data.spanContext = span.spanContext()

      await context.with(trace.setSpan(context.active(), span), async () => {
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 1, message: '呼叫演算法中' })
        const taskId = await this.algorithm.FetchAlgorithmToStart(calculateJobId, s3Path)

        if (taskId === calculateJobId) {
          await this.updateCalculateJob(calculateJobId, time || 0, count || 0)
        } else {
          throw new Error('Algorithm taskId does not match calculateJobId')
        }

        // 呼叫演算法成功，更新狀態
        await this.changeCalculateJobState(calculateJobId, CalculateJobState.ALGORITHM_CALCULATING)

        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 2, message: '呼叫演算法成功' })
      })
    } finally {
      span.end()
    }
  }

  @OnWorkerEvent('failed')
  async onFailed (job: Job<JobData>, error: unknown) {
    const { spanContext } = job.data
    const calculateJobId = job.data.calculateJobId

    const parentSpanContext = trace.getSpanContext(trace.setSpan(context.active(), trace.wrapSpanContext(spanContext))) as SpanContext
    const ctx = trace.setSpanContext(context.active(), parentSpanContext)
    const span = tracer.startSpan('CallAlgorithmProcessor.onFailed', { kind: SpanKind.INTERNAL }, ctx)

    // 呼叫演算法失敗，更新狀態
    await this.changeCalculateJobState(calculateJobId, CalculateJobState.CALL_ALGORITHM_FAILED, error)

    handleCommonErrorSpan(span, error, '呼叫演算法發生錯誤')
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
   * 更新計算任務
   * @param calculateJobId 計算任務識別碼
   * @param time 計算所需時間 (包含bufferTime) (秒)
   * @param count 實際傳入演算法目的地數量
   */
  private async updateCalculateJob (
    calculateJobId: string,
    time: number,
    count: number
  ) {
    await this.prisma.calculateJob.update({
      where: { id: calculateJobId },
      data: {
        startCalculateTime: new Date(),
        calculationTime: Math.round(time / 60),
        count,
        updater: calculateJobId
      },
      select: { id: true }
    })
  }
}
