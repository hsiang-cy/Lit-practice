/*
 * @Author:Kerwin
 * @Date:2024-09-24 16:57:12
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:41:47
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseEntity
} from '$types'

export class DispatchRoute extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:dispatchRoute.calculateJobId') })
  readonly calculateJobId: string

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.calculateJobVehicleId') })
  readonly calculateJobVehicleId: string

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.actualStartTime') })
  readonly actualStartTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.actualEndTime') })
  readonly actualEndTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.pickupDemand') })
  readonly pickupDemand: string

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.deliveryDemand') })
  readonly deliveryDemand: string

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.drivingTime') })
  readonly drivingTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.slackTime') })
  readonly slackTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.serviceTime') })
  readonly serviceTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.workTime') })
  readonly workTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.isOvertime') })
  readonly isOvertime: boolean

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.distance') })
  readonly distance: number

  @ApiProperty({ description: i18n.t('entity:dispatchRoute.taskCount') })
  readonly taskCount: number
}
