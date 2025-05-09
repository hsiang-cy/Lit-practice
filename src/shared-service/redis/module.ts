/*
 * @Author:Kerwin
 * @Date:2024-09-11 15:03:57
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 14:56:13
 * @Description:
 */

import {
  Module,
  OnModuleInit
} from '@nestjs/common'

import {
  Redis
} from 'ioredis'

import { RedisSubService } from './redis-sub-service'

import {
  config as configInstance
} from '$shared-service/config'

import {
  logger
} from '$shared-service/pino-logger'

import {
  RedisName
} from '$types'

@Module({
  providers: [
    RedisSubService,
    {
      provide: RedisName.REDIS_SUBSCRIBER,
      useFactory: () => {
        return new Redis({
          host: configInstance.appConfig.redis.broadcast.host,
          port: configInstance.appConfig.redis.broadcast.port,
          password: configInstance.appConfig.redis.broadcast.password,
          db: configInstance.appConfig.redis.broadcast.db
        })
      }
    },
    {
      provide: RedisName.REDIS_PUBLISHER,
      useFactory: () => {
        return new Redis({
          host: configInstance.appConfig.redis.broadcast.host,
          port: configInstance.appConfig.redis.broadcast.port,
          password: configInstance.appConfig.redis.broadcast.password,
          db: configInstance.appConfig.redis.broadcast.db
        })
      }
    },
    {
      provide: RedisName.REDIS_ALGORITHM,
      useFactory: () => {
        return new Redis({
          host: configInstance.appConfig.redis.algorithm.host,
          port: configInstance.appConfig.redis.algorithm.port,
          password: configInstance.appConfig.redis.algorithm.password,
          db: configInstance.appConfig.redis.algorithm.db
        })
      }
    },
  ],
  exports: [
    RedisSubService,
    RedisName.REDIS_ALGORITHM,
    RedisName.REDIS_PUBLISHER,
    RedisName.REDIS_SUBSCRIBER
  ]
})
export class RedisModule implements OnModuleInit {
  onModuleInit() {
    logger.debug('RedisModule has been initialized')
  }
}
