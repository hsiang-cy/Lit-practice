/*
 * @Author:Kerwin
 * @Date:2024-09-11 16:57:25
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 14:54:39
 * @Description:
 */

import {
  Injectable,
  Inject
} from '@nestjs/common'

import {
  AlgorithmService
} from '$shared-service/algorithm.service'

import {
  QueueService
} from '$shared-service/queue.service'

import TypeCheck from '@saico/type-check-js'

import {
  Redis
} from 'ioredis'

import {
  logger
} from '$shared-service/pino-logger'

import {
  RedisName,
  RedisSubscriberChannel
} from '$types'

type Callback = (message: string) => void

@Injectable()
export class RedisSubService {
  private subscribers = new Map<string, Set<Callback>>()

  constructor(
    @Inject(RedisName.REDIS_SUBSCRIBER) private readonly redisClient: Redis,
    private readonly algorithmService: AlgorithmService,
    private readonly queueService: QueueService,
  ) {
    const channels = [
      RedisSubscriberChannel.ORDER_GROUP_PARSE,
      RedisSubscriberChannel.CALCULATE_JOB_STATE,
      RedisSubscriberChannel.ALGO_STATUS,
      RedisSubscriberChannel.ALGO_ERROR
    ]

    this.subscribeToChannels(channels).catch((err) => { logger.error(err) })
  }

  /**
   * 註冊訂閱者
   * @param channel 頻道名稱
   * @param callback 訂閱者 callback
   * @description
   * 1. 利用頻道名稱與應用程式識別碼建立訂閱者 key
   * 2. 取得該訂閱者 key 的訂閱者集合，若不存在則建立新的訂閱者集合
   * 3. 將 callback 加入訂閱者集合
   */
  registerSubscriber(
    channel: string,
    callback: Callback
  ) {
    const subscribersKey = this.getSubscribersKey(channel)
    const notifySubscribers = this.subscribers.get(subscribersKey)

    if (TypeCheck.isUndefined(notifySubscribers)) {
      this.subscribers.set(subscribersKey, new Set())
    }

    this.subscribers.get(subscribersKey)?.add(callback)
  }

  /**
   * 取消訂閱者
   * @param channel 頻道名稱
   * @param callback 訂閱者 callback
   * @description
   * 1. 利用頻道名稱與應用程式識別碼建立訂閱者 key
   * 2. 取得該訂閱者 key 的訂閱者集合
   * 3. 將 callback 從訂閱者集合中移除
   * 4. 若訂閱者集合為空，則移除該訂閱者 key
   */
  unregisterSubscriber(
    channel: string,
    callback: Callback
  ) {
    const subscribersKey = this.getSubscribersKey(channel)
    const notifySubscribers = this.subscribers.get(subscribersKey)

    if (TypeCheck.isNotUndefined(notifySubscribers)) {
      notifySubscribers.delete(callback)

      if (notifySubscribers.size === 0) {
        this.subscribers.delete(subscribersKey)
      }
    }
  }

  /**
   * 訂閱 Redis 頻道
   * @param channels 頻道陣列
   * @description
   * 1. 訂閱 Redis 頻道
   * 2. 當接收到訊息時，根據頻道名稱處理訊息
   */
  private async subscribeToChannels(channels: string[]) {
    await this.redisClient.subscribe(...channels, (err, count) => {
      if (TypeCheck.isNotEmpty(err)) {
        throw new Error(`Failed to subscribe to channels: ${channels.join(', ')}`)
      } else {
        logger.info(`Subscribed to ${count} channels: ${channels.join(', ')}`)
      }
    })

    this.redisClient.on('message', async (channel, message) => {
      try {
        if (channel === RedisSubscriberChannel.ORDER_GROUP_PARSE) await this.handleOrderGroupParseChannelMessage(channel, message)
        else if (channel === RedisSubscriberChannel.CALCULATE_JOB_STATE) await this.handleCalculateJobStateChannelMessage(channel, message)

        else if (channel === RedisSubscriberChannel.ALGO_ERROR) await this.handleAlgorithmErrorChannelMessage(message)
        else if (channel === RedisSubscriberChannel.ALGO_STATUS) await this.handleAlgorithmStatusChannelMessage(message)

      } catch (error) {
        logger.error(error)
      }
    })
  }

  /**
   * 處理訂單群組解析頻道的訊息
   * @param channel 頻道名稱
   * @param message 訊息
   * @description
   * 1. 若頻道名稱不是訂單群組解析頻道，則不處理
   * 2. 解析訊息後，取得應用程式識別碼與訂單群組識別碼
   * 3. 根據應用程式識別碼取得訂閱者 key
   * 4. 取得該訂閱者 key 的訂閱者集合，並通知訂閱者
   */
  private handleOrderGroupParseChannelMessage(channel: string, message: string) {
    if (channel !== RedisSubscriberChannel.ORDER_GROUP_PARSE) return

    const parsedMessage = JSON.parse(message) as { orderGroupId: string }
    const orderGroupId = parsedMessage.orderGroupId ?? ''

    const subscribersKey = this.getSubscribersKey(channel)
    const notifySubscribers = this.subscribers.get(subscribersKey)

    if (TypeCheck.isNotUndefined(notifySubscribers)) {
      for (const subscriber of notifySubscribers) {
        subscriber(orderGroupId)
      }
    }
  }

  /**
   * 處理計算任務狀態頻道的訊息
   * @param channel 頻道名稱
   * @param message 訊息
   * @description
   * 1. 若頻道名稱不是計算任務狀態頻道，則不處理
   * 2. 解析訊息後，取得應用程式識別碼與計算任務識別碼
   * 3. 根據應用程式識別碼取得訂閱者 key
   * 4. 取得該訂閱者 key 的訂閱者集合，並通知訂閱者
   */
  private handleCalculateJobStateChannelMessage(channel: string, message: string) {
    if (channel !== RedisSubscriberChannel.CALCULATE_JOB_STATE) return

    const parsedMessage = JSON.parse(message) as { calculateJobId: string }
    const calculateJobId = parsedMessage.calculateJobId ?? ''

    const subscribersKey = this.getSubscribersKey(channel)
    const notifySubscribers = this.subscribers.get(subscribersKey)

    if (TypeCheck.isNotUndefined(notifySubscribers)) {
      for (const subscriber of notifySubscribers) {
        subscriber(calculateJobId)
      }
    }
  }

  /**
   * 處理演算法狀態頻道訊息
   * @param message 訊息 (任務計算識別碼)
   * @description
   * 1. 根據任務計算識別碼取得任務資訊，同時取得演算法狀態
   * 2. 如果任務資訊與演算法狀態皆存在，則新增任務狀態處理佇列
   */
  private async handleAlgorithmStatusChannelMessage(message: string) {
    const calculateJobId = message

    const status = await this.algorithmService.getAlgorithmStatus(calculateJobId)

    const jobId = `id-${calculateJobId}-${status}`

    await this.queueService.addCalculateJobState({
      calculateJobId: calculateJobId,
      status
    }, { jobId })

  }

  /**
 * 處理演算法錯誤頻道訊息
 * @param message 訊息 (任務計算識別碼)
 * @description
 * 1. 根據任務計算識別碼取得任務資訊(必須使用資料庫最新的當前狀態)，同時取得演算法錯誤
 * 2. 如果任務資訊存在，則新增演算法錯誤處理佇列
 * 3. 不論是否有取得錯誤訊息，都會新增演算法錯誤處理佇列
 */
  private async handleAlgorithmErrorChannelMessage(message: string) {
    const calculateJobId = message

    const error = await this.algorithmService.getAlgorithmError(calculateJobId)

    const jobId = `id-${calculateJobId}-error`

    await this.queueService.addAlgorithmError({
      calculateJobId: calculateJobId,
      currentState: -100,
      error
    }, { jobId })
  }

  /**
   * 取得訂閱者 key
   * @param channel 頻道名稱
   * @returns 訂閱者 key
   */
  private getSubscribersKey(
    channel: string
  ) {
    return `${channel}`
  }
}
