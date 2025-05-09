/*
 * @Author:Kerwin
 * @Date:2024-09-19 10:36:45
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:44:22
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  Area,
  OrderGroupState
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

export class WebOrderGroup extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:webOrderGroup.startTime') })
  readonly startTime: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webOrderGroup.area')) })
  readonly area: Area

  @ApiProperty({ description: i18n.t('entity:webOrderGroup.comment') })
  readonly comment: string

  @ApiProperty({ description: i18n.t('entity:webOrderGroup.lastCalculateTime') })
  readonly lastCalculateTime: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:webOrderGroup.state')) })
  readonly state: OrderGroupState
}
