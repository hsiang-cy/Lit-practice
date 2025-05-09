/*
 * @Author:Kerwin
 * @Date:2024-09-12 15:04:19
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:21:10
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

export class WebRoute extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:webRoute.area') })
  readonly area: string

  @ApiProperty({ description: i18n.t('entity:webRoute.name') })
  readonly name: string

  @ApiProperty({ description: i18n.t('entity:webRoute.comment') })
  readonly comment: string
}
