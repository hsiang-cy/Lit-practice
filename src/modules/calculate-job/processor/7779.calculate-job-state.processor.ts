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
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  Job
} from 'bullmq'

import {
  AlgorithmService,
  PrismaHelper,
  PrismaService,
  QueueService,
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
  /** 演算法狀態 */
  status: string
  /** span父層元素 */
  spanContext: SpanContext
}

const concurrency = Number(process.env.CALCULATE_JOB_STATE_CONCURRENCY) || 1

@Processor(QueueName.CALCULATE_JOB_STATE, { concurrency })
export class CalculateJobStateProcessor extends WorkerHost {
  constructor (
    private readonly algorithm: AlgorithmService,
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly queueService: QueueService,
    private readonly s3: S3Service,
    private readonly snowflake: SnowflakeService
  ) {
    super()
  }

  async process (job: Job<JobData>) {
    const span = tracer.startSpan('CalculateJobStateProcessor.process', { kind: SpanKind.CONSUMER })

    const { calculateJobId, status } = job.data
    const TOTAL_STEP = 2

    try {
      // 為了在fail時能夠取得spanContext，所以將spanContext存入job.data
      job.data.spanContext = span.spanContext()

      await context.with(trace.setSpan(context.active(), span), async () => {
        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 1, message: '處理計算任務狀態中' })

        if (status === '100') {
          await this.addDataPostProcessingQueue(calculateJobId)
        } else if (status === 'timeout') {
          // 先判斷s3是否有檔案，有檔案的話，視為演算法計算完成
          const key = `backend/calculate-job/${calculateJobId}/output`
          const isExist = await this.s3.checkFileExist(key)

          if (isExist) {
            await this.addDataPostProcessingQueue(calculateJobId)
          } else {
            // 更新狀態為超時
            await this.changeCalculateJobState(calculateJobId, CalculateJobState.TIMEOUT, { message: '計算任務超時' })
            await this.algorithm.removeAlgorithmResult(calculateJobId)
          }
        }

        await updateJobProgress(job, { totalStep: TOTAL_STEP, currentStep: 2, message: '處理計算任務狀態成功' })
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
    const span = tracer.startSpan('CalculateJobStateProcessor.onFailed', { kind: SpanKind.INTERNAL }, ctx)

    // 更新出現狀況，視為後處理失敗
    await this.changeCalculateJobState(calculateJobId, CalculateJobState.DATA_POSTPROCESSING_FAILED, error)

    handleCommonErrorSpan(span, error, '處理計算任務狀態發生錯誤')
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
   * 新增資料後處理佇列
   * @param calculateJobId 計算任務識別碼
   */
  private async addDataPostProcessingQueue (
    calculateJobId: string
  ) {
    // 演算法計算完成，更新狀態
    await this.changeCalculateJobState(calculateJobId, CalculateJobState.ALGORITHM_FINISHED)

    // 新增後處理佇列
    const jobId = `id-${calculateJobId}`
    await this.queueService.addDataPostProcessing({ calculateJobId }, { jobId })
  }
}
