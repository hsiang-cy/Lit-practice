/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:54:52
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 16:41:31
 * @Description:
 */

import {
  BullModule
} from '@nestjs/bullmq'

import {
  Module,
  OnModuleInit
} from '@nestjs/common'

import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClsModule } from 'nestjs-cls'
import AppController from './app.controller'
import AppService from './app.service'

import { LogInterceptor } from '$interceptor'
import AccountModule from '$modules/account/module'
import AuthModule from '$modules/auth/module'
import CalculateJobModule from '$modules/calculate-job/module'
import CustomerModule from '$modules/customer/module'
import FleetModule from '$modules/fleet/module'
import HealthModule from '$modules/health/module'
import OrderModule from '$modules/order/module'
import RouteModule from '$modules/route/module'
import VehicleModule from '$modules/vehicle/module'

import {
  SharedServiceModule,
  config as configInstance,
  logger
} from '$shared-service'

@Module({
  imports: [
    CustomerModule,
    CalculateJobModule,
    OrderModule,
    AuthModule,
    AccountModule,
    RouteModule,
    VehicleModule,
    FleetModule,
    HealthModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      }
    }),
    BullModule.forRoot({
      connection: {
        host: configInstance.appConfig.redis.queue.host,
        port: configInstance.appConfig.redis.queue.port,
        password: configInstance.appConfig.redis.queue.password,
        db: configInstance.appConfig.redis.queue.db
      },
      defaultJobOptions: {
        removeOnComplete: 5, // 避免過多完成的job堆積
        removeOnFail: 5 // 避免過多失敗的job堆積
      },
      streams: {
        events: { maxLen: 1000 } // 避免過多stream事件
      }
    }),
    SharedServiceModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor
    }
  ]
})
export class AppModule implements OnModuleInit {
  onModuleInit (): void {
    logger.debug('AppModule has been initialized.')
  }
}
