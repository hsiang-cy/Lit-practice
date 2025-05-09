/*
 * @Author:Kerwin
 * @Date:2024-04-01 11:24:35
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-08 13:47:46
 * @Description:
 */

import {
  Injectable,
  OnModuleInit
} from '@nestjs/common'

import {
  Prisma,
  PrismaClient
} from '@zuellig-pharma-2/database/client'

import {
  config as configInstance
} from './config'

import {
  logger
} from './pino-logger'

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'> implements OnModuleInit {
  constructor () {
    super({
      datasourceUrl: configInstance.appConfig.database.db1.connectUrl,
      log: configInstance.appConfig.database.db1.logging
        ? [
          {
            emit: 'event',
            level: 'query'
          },
          'info',
          'warn',
          'error'
        ]
        : undefined
    })
  }

  async onModuleInit () {
    if (configInstance.appConfig.database.db1.logging) {
      this.$on('query', (e) => {
        logger.info('Query: ' + e.query)
        logger.info('Params: ' + e.params)
        logger.info('Duration: ' + e.duration + 'ms')
      })
    }

    try {
      await this.$connect()
    } catch (e) {
      logger.error('Database connection failed')
      throw e
    }
  }
}
