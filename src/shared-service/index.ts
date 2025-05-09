/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:58:52
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 13:58:17
 * @Description:
 */

import * as https from 'https'

import {
  HttpModule
} from '@nestjs/axios'

import {
  BullModule
} from '@nestjs/bullmq'

import {
  Global,
  Module,
  OnModuleInit
} from '@nestjs/common'

import { Config, config as configInstance } from './config'
import { Encryption } from './encryption'
import { PinoLogger, logger } from './pino-logger'
import { PrismaService } from './prisma-database'
import { PrismaHelper } from './prisma-helper'
import { QueueService } from './queue.service'
import { RedisModule } from './redis/index'
import { RouteService } from './route.service'
import { SnowflakeService } from './snowflake'
import { ZUHelper } from './zu-helper'
import { QueueName } from '$types'
import { CustomFileValidator } from './custom-file-validator'
import { SystemSettingService } from './system-setting.service'
import { S3Service } from './s3.service'
import { AlgorithmService } from './algorithm.service'

export * from './config'
export * from './custom-file-validator'
export * from './encryption'
export * from './i18n'
export * from './pino-logger'
export * from './prisma-database'
export * from './prisma-helper'
export * from './queue.service'
export * from './redis'
export * from './route.service'
export * from './snowflake'
export * from './trace'
export * from './zu-helper'
export * from './system-setting.service'
export * from './s3.service'
export * from './redis/index'
export * from './algorithm.service'

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        httpsAgent: new https.Agent({
          rejectUnauthorized: configInstance.env === 'production' // 避免在開發環境中因為自簽憑證而無法發送請求
        })
      })
    }),
    BullModule.registerQueue(
      { name: QueueName.PARSE_ORDER_GROUP_CONTENT },
      { name: QueueName.DATA_PREPROCESSING },
      { name: QueueName.CALCULATE_JOB_STATE },
      { name: QueueName.SCHEDULE_UPDATE_SUBSCRIPTION_STATE },
      { name: QueueName.CALL_ALGORITHM },
      { name: QueueName.DATA_POSTPROCESSING },
      { name: QueueName.ALGORITHM_ERROR },

    ),
    RedisModule
  ],
  providers: [
    CustomFileValidator,
    ZUHelper,
    Config,
    Encryption,
    PinoLogger,
    PrismaHelper,
    PrismaService,
    QueueService,
    RouteService,
    SnowflakeService,
    SystemSettingService,
    S3Service,
    AlgorithmService
  ],
  exports: [
    CustomFileValidator,
    RedisModule,
    Config,
    Encryption,
    PinoLogger,
    PrismaHelper,
    PrismaService,
    QueueService,
    RouteService,
    SnowflakeService,
    ZUHelper,
    SystemSettingService,
    S3Service,
    AlgorithmService
  ]
})
export class SharedServiceModule implements OnModuleInit {
  onModuleInit(): void {
    logger.debug('SharedServiceModule has been initialized.')
  }
}
