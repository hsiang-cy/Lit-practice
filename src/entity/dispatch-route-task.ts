/*
 * @Author:Kerwin
 * @Date:2024-09-25 11:32:04
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:41:40
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  DispatchRouteTaskEvent,
  DispatchRouteTaskType
} from '@zuellig-pharma-2/database'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseEntity
} from '$types'

import {
  handleEnumDescription
} from '$utility'

export class DispatchRouteTask extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.calculateJobId') })
  readonly calculateJobId: string

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.dispatchRouteId') })
  readonly dispatchRouteId: string

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.calculateVehicleId') })
  readonly calculateVehicleId: string

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.calculateJobDestinationId') })
  readonly calculateJobDestinationId: string

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.count') })
  readonly count: number

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.seq') })
  readonly seq: number

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:dispatchRouteTask.event')) })
  readonly event: DispatchRouteTaskEvent

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:dispatchRouteTask.type')) })
  readonly type: DispatchRouteTaskType

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.transitDistance') })
  readonly transitDistance: number

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.transitTime') })
  readonly transitTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.arrivalTime') })
  readonly arrivalTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.arrivalCapacity') })
  readonly arrivalCapacity: string

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.serviceTime') })
  readonly serviceTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.slackTime') })
  readonly slackTime: number

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.pickupDemand') })
  readonly pickupDemand: string

  @ApiProperty({ description: i18n.t('entity:dispatchRouteTask.deliveryDemand') })
  readonly deliveryDemand: string
}
