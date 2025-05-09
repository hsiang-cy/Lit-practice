/*
 * @Author:Kerwin
 * @Date:2024-09-12 15:04:19
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-09 14:26:17
 * @Description:
 */

import {
  ApiProperty,
  ApiPropertyOptional
} from '@nestjs/swagger'

import {
  VehicleTimeWindow,
  VehicleType,
  Area
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

class VehicleTimeWindowClass {
  @ApiPropertyOptional({ description: i18n.t('entity:webVehicle.start') })
  readonly start: number

  @ApiPropertyOptional({ description: i18n.t('entity:webVehicle.end') })
  readonly end: number
}

export class VehicleFleets {
  @ApiPropertyOptional({ description: i18n.t('entity:webVehicle.fleetsId') })
  id: string

  @ApiPropertyOptional({ description: i18n.t('entity:webVehicle.fleetsName') })
  name: string
}
export class VehicleRoutes {
  @ApiPropertyOptional({ description: i18n.t('entity:webVehicle.routesId') })
  id: string

  @ApiPropertyOptional({ description: i18n.t('entity:webVehicle.routesName') })
  name: string
}

export class WebVehicle extends BaseEntity {
  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webVehicle.area')) })
  readonly area: Area

  @ApiProperty({ description: i18n.t('entity:webVehicle.tonnage') })
  readonly tonnage: string

  @ApiProperty({ description: i18n.t('entity:webVehicle.size') })
  readonly size: string

  @ApiProperty({ description: i18n.t('entity:webVehicle.volume') })
  readonly volume: string

  @ApiProperty({ description: i18n.t('entity:webVehicle.code') })
  readonly code: string

  @ApiProperty({ description: i18n.t('entity:webVehicle.driverName') })
  readonly driverName: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webVehicle.type')) })
  readonly type: VehicleType

  @ApiProperty({ description: i18n.t('entity:webVehicle.forceUse') })
  readonly forceUse: boolean

  @ApiProperty({ description: i18n.t('entity:webVehicle.forceStart') })
  readonly forceStart: boolean

  @ApiProperty({ description: i18n.t('entity:webVehicle.timeWindow'), type: () => VehicleTimeWindowClass })
  readonly timeWindow: VehicleTimeWindow

  @ApiProperty({ description: i18n.t('entity:webVehicle.minCapacity') })
  readonly minCapacity: string

  @ApiProperty({ description: i18n.t('entity:webVehicle.maxCapacity') })
  readonly maxCapacity: string

  @ApiProperty({ description: i18n.t('entity:webVehicle.minWorkTime') })
  readonly minWorkTime: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.regularWorkTime') })
  readonly regularWorkTime: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.maxWorkOverTime') })
  readonly maxWorkOverTime: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.considerOvertime') })
  readonly considerOvertime: boolean

  @ApiProperty({ description: i18n.t('entity:webVehicle.minDrivingTime') })
  readonly minDrivingTime: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.maxDrivingTime') })
  readonly maxDrivingTime: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.minDrivingDistance') })
  readonly minDrivingDistance: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.maxDrivingDistance') })
  readonly maxDrivingDistance: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.minDestinationCount') })
  readonly minDestinationCount: number

  @ApiProperty({ description: i18n.t('entity:webVehicle.maxDestinationCount') })
  readonly maxDestinationCount: number
}
