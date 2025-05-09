/*
 * @Author:Sean Chen
 * @Date:2025-03-13 15:15:48
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-03-31 18:16:42
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
    calculateJobId: string
    /** 計算任務當前狀態 */
    currentState: CalculateJobState
    /** 錯誤資訊 */
    error: any
    /** span父層元素 */
    spanContext: SpanContext
}

const concurrency = Number(process.env.ALGORITHM_ERROR_CONCURRENCY) || 1

@Processor(QueueName.ALGORITHM_ERROR, { concurrency })
export class AlgorithmErrorProcessor extends WorkerHost {
    private readonly stateErrorMap = {
        [CalculateJobState.DATA_PREPROCESSING]: CalculateJobState.DATA_PREPROCESSING_FAILED,
        [CalculateJobState.WAIT_FOR_ALGORITHM]: CalculateJobState.CALL_ALGORITHM_FAILED,
        [CalculateJobState.ALGORITHM_CALCULATING]: CalculateJobState.ALGORITHM_FAILED,
        [CalculateJobState.ALGORITHM_FINISHED]: CalculateJobState.DATA_POSTPROCESSING_FAILED,
        [CalculateJobState.DATA_POSTPROCESSING]: CalculateJobState.DATA_POSTPROCESSING_FAILED
    }

    constructor(
        private readonly algorithm: AlgorithmService,
        private readonly prisma: PrismaService,
        private readonly prismaHelper: PrismaHelper,
        private readonly snowflake: SnowflakeService
    ) {
        super()
    }

    async process(job: Job<JobData>) {
        const span = tracer.startSpan('AlgorithmErrorProcessor.process', { kind: SpanKind.CONSUMER })

        const { calculateJobId, error, currentState } = job.data

        try {
            // 為了在fail時能夠取得spanContext，所以將spanContext存入job.data
            job.data.spanContext = span.spanContext()

            await context.with(trace.setSpan(context.active(), span), async () => {
                // 新增錯誤並且變更計算任務狀態
                await this.createCalculateJobError(calculateJobId, currentState, error)
                await updateJobProgress(job, { totalStep: 1, currentStep: 1, message: '處理演算法錯誤完成' })

                await this.algorithm.removeAlgorithmResult(calculateJobId)
            })
        } finally {
            span.end()
        }
    }

    @OnWorkerEvent('failed')
    async onFailed(job: Job<JobData>, error: unknown) {
        const { calculateJobId, spanContext } = job.data

        const parentSpanContext = trace.getSpanContext(trace.setSpan(context.active(), trace.wrapSpanContext(spanContext))) as SpanContext
        const ctx = trace.setSpanContext(context.active(), parentSpanContext)
        const span = tracer.startSpan('AlgorithmErrorProcessor.onFailed', { kind: SpanKind.INTERNAL }, ctx)

        // 呼叫演算法失敗，更新狀態
        await this.changeCalculateJobState(calculateJobId, CalculateJobState.UNKNOWN_ERROR, error)
        await this.algorithm.removeAlgorithmResult(calculateJobId)

        handleCommonErrorSpan(span, error, '處理演算法錯誤發生錯誤')
    }

    /**
     * 變更計算任務狀態
     * @param calculateJobId 計算任務識別碼
     * @param state 狀態
     * @param error 錯誤 (選填)
     */
    private async changeCalculateJobState(
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
     * 新增計算任務錯誤
     * @param calculateJobId 計算任務識別碼
     * @param currentState 當前狀態
     * @param error 錯誤
     * @description
     * 1. 新增計算任務錯誤
     * 2. 變更計算任務狀態 => 根據當前狀態決定要變更成哪個狀態
     */
    private async createCalculateJobError(
        calculateJobId: string,
        currentState: CalculateJobState,
        error: any
    ) {
        await this.prisma.$transaction(async trx => {
            await trx.calculateJobError.create({
                data: {
                    id: this.snowflake.snowflakeId(),
                    calculateJobId,
                    error: TypeCheck.isNotUndefined(error) ? error : '未取得錯誤訊息',
                    creator: calculateJobId,
                    updater: calculateJobId,
                    status: DataStatus.ACTIVE
                },
                select: { id: true }
            })

            const newState = this.stateErrorMap[currentState as keyof typeof this.stateErrorMap] ?? CalculateJobState.UNKNOWN_ERROR
            await trx.calculateJob.update({
                where: { id: calculateJobId },
                data: {
                    state: newState,
                    updater: calculateJobId
                },
                select: { id: true }
            })
        })
    }
}