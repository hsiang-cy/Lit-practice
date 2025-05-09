/*
 * @Author:Sean Chen
 * @Date:2025-03-06 13:50:40
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-03-14 15:35:45
 * @Description:
 */
import {
  InjectQueue
} from '@nestjs/bullmq'

import {
  Injectable
} from '@nestjs/common'

import {
  JobsOptions,
  Queue
} from 'bullmq'

import {
  QueueName
} from '$types'

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QueueName.CALCULATE_JOB_STATE) private readonly calculateJobStateQueue: Queue,
    @InjectQueue(QueueName.DATA_PREPROCESSING) private readonly calculateJobDataPreprocessingQueue: Queue,
    @InjectQueue(QueueName.PARSE_ORDER_GROUP_CONTENT) private readonly parseOrderGroupQueue: Queue,
    @InjectQueue(QueueName.SCHEDULE_UPDATE_SUBSCRIPTION_STATE) private readonly scheduleUpdateSubscriptionStateQueue: Queue,
    @InjectQueue(QueueName.ALGORITHM_ERROR) private readonly algorithmErrorQueue: Queue,
    @InjectQueue(QueueName.CALL_ALGORITHM) private readonly callAlgorithmQueue: Queue,
    @InjectQueue(QueueName.DATA_POSTPROCESSING) private readonly dataPostProcessing: Queue

  ) { }

  /**
   * 添加任務到訂單群組佇列
   * @param data 任務資料
   * @param jobOptions 任務選項
   */
  async addParseOrderGroupContent(
    data: Record<string, any>,
    jobOptions?: JobsOptions
  ) {
    await this.parseOrderGroupQueue.add('PARSE_ORDER_GROUP_CONTENT', data, jobOptions)
  }

  /**
     * 添加呼叫演算法的佇列
     * @param data 任務資料
     * @param JobsOptions 任務選項
     */
  async addCallAlgorithm(
    data: any,
    JobsOptions?: JobsOptions
  ) {
    await this.callAlgorithmQueue.add('CALL_ALGORITHM', data, JobsOptions)
  }

  /**
   * 添加"計算任務資料前處理"佇列
   * @param data 任務資料
   * @param jobOptions 任務選項
   */
  async addCalculateJobDataPreprocessing(
    data: Record<string, any>,
    jobOptions?: JobsOptions
  ) {
    await this.calculateJobDataPreprocessingQueue.add('DATA_PREPROCESSING', data, jobOptions)
  }

  /**
   * 添加"計算任務狀態"佇列
   * @param data 任務資料
   * @param jobOptions 任務選項
   */
  async addCalculateJobState(
    data: Record<string, any>,
    jobOptions?: JobsOptions
  ) {
    await this.calculateJobStateQueue.add('CALCULATE_JOB_STATE', data, jobOptions)
  }

  async addScheduleUpdateSubscriptionState(
    data: Record<string, any>,
    jobOptions?: JobsOptions
  ) {
    await this.scheduleUpdateSubscriptionStateQueue.add('SCHEDULE_UPDATE_SUBSCRIPTION_STATE', data, jobOptions)
  }

  async getDataPreprocessingQueueStats() {
    return {
      waiting: await this.calculateJobDataPreprocessingQueue.getWaitingCount(),
      active: await this.calculateJobDataPreprocessingQueue.getActiveCount(),
      delayed: await this.calculateJobDataPreprocessingQueue.getDelayedCount(),
      completed: await this.calculateJobDataPreprocessingQueue.getCompletedCount(),
      failed: await this.calculateJobDataPreprocessingQueue.getFailedCount()
    };
  }
  /**
  * 添加資料後處理的佇列
  * @param data 任務資料
  * @param JobsOptions 任務選項
  */
  async addDataPostProcessing(
    data: any,
    JobsOptions?: JobsOptions
  ) {
    await this.dataPostProcessing.add('DATA_POSTPROCESSING', data, JobsOptions)
  }

  async addAlgorithmError(
    data: any,
    JobsOptions?: JobsOptions
  ) {
    await this.algorithmErrorQueue.add('ALGORITHM_ERROR', data, JobsOptions)
  }
}
