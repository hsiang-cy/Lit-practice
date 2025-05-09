/*
 * @Author:Kerwin
 * @Date:2024-09-12 15:04:19
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:23:34
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  AccountType
} from '@zuellig-pharma-2/database'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseEntity
} from '$types'

import { handleEnumDescription } from '$utility'

export class Account extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:Account.account') })
  readonly account: string

  @ApiProperty({ description: i18n.t('entity:Account.area') })
  readonly area: string

  @ApiProperty({ description: i18n.t('entity:Account.name') })
  readonly name: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:Account.type')) })
  readonly type: AccountType

  @ApiProperty({ description: i18n.t('entity:Account.comment') })
  readonly comment: string
}
