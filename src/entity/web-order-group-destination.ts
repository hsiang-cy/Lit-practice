/*
 * @Author:Kerwin
 * @Date:2024-09-19 15:04:55
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:44:45
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  ArrivalMode,
  DestinationTimeWindowMode,
  DestinationType,
  ServiceTimeMode,
  TimeWindow
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

class TimeWindowClass {
  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.start') })
  readonly start: number

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.end') })
  readonly end: number
}

export class WebOrderGroupDestination extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.orderGroupId') })
  readonly orderGroupId: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.originalRow') })
  readonly originalRow: number

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.code') })
  readonly code: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.name') })
  readonly name: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webOrderGroupDestination.type')) })
  readonly type: DestinationType

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.pickupDemand') })
  readonly pickupDemand: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.deliveryDemand') })
  readonly deliveryDemand: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.executeVehicles') })
  readonly executeVehicles: string[]

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webOrderGroupDestination.serviceTimeMode')) })
  readonly serviceTimeMode: ServiceTimeMode

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.serviceTime') })
  readonly serviceTime: number

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webOrderGroupDestination.arrivalMode')) })
  readonly arrivalMode: ArrivalMode

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.priority') })
  readonly priority: number

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webOrderGroupDestination.timeWindowMode')) })
  readonly timeWindowMode: DestinationTimeWindowMode

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.timeWindow'), type: () => TimeWindowClass, isArray: true })
  readonly timeWindow: TimeWindow[]

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.isError') })
  readonly isError: boolean

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.error') })
  readonly error: Record<string, any[]>

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.trainNumber') })
  readonly trainNumber: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.depot') })
  readonly depot: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.route') })
  readonly route: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.typeControlled') })
  readonly typeControlled: boolean

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.typeRefrigerated') })
  readonly typeRefrigerated: boolean

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.typeExperimental') })
  readonly typeExperimental: boolean

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.typeSample') })
  readonly typeSample: boolean

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.typeCash') })
  readonly typeCash: boolean

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.canArrange') })
  readonly canArrange: string[]

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.obd') })
  readonly obd: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.invoice') })
  readonly invoice: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.psn') })
  readonly psn: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.price') })
  readonly price: number

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.address') })
  readonly address: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.formatAddress') })
  readonly formatAddress: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.lat') })
  readonly lat: number

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.lng') })
  readonly lng: number

  @ApiProperty({ description: i18n.t('entity:webOrderGroupDestination.geohash') })
  readonly geohash: string
}
