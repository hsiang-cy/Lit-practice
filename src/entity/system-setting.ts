/*
 * @Author:Kerwin
 * @Date:2024-09-27 16:45:34
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:42:14
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  ValueType
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

export class SystemSetting extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:systemSetting.key') })
  readonly key: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:systemSetting.type')) })
  readonly type: ValueType

  @ApiProperty({ description: i18n.t('entity:systemSetting.value') })
  readonly value: string
}
