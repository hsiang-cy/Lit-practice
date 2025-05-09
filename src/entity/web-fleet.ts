/*
 * @Author:Kerwin
 * @Date:2024-09-12 15:00:23
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:54:50
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  Location,
  Area
} from '@zuellig-pharma-2/database'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseEntity,
  LocationClass
} from '$types'

import {
  handleEnumDescription
} from '$utility'

export class WebFleet extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:webFleet.id') })
  readonly id: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webVehicle.area')) })
  readonly area: Area

  @ApiProperty({ description: i18n.t('entity:webFleet.code') })
  readonly code: string

  @ApiProperty({ description: i18n.t('entity:webFleet.name') })
  readonly name: string

  @ApiProperty({ description: i18n.t('entity:webFleet.startLocation'), type: () => LocationClass })
  readonly startLocation: Location

  @ApiProperty({ description: i18n.t('entity:webFleet.endLocation'), type: () => LocationClass })
  readonly endLocation: Location

  @ApiProperty({ description: i18n.t('entity:webFleet.priority') })
  readonly priority: number

  @ApiProperty({ description: i18n.t('entity:webFleet.comment') })
  readonly comment: string
}
