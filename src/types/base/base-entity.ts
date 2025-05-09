/*
 * @Author:Kerwin
 * @Date:2024-04-12 19:18:31
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 16:05:08
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  i18n
} from '$shared-service/i18n'

import {
  handleEnumDescription
} from '$utility/swagger-document'

export class BaseEntity {
  @ApiProperty({ description: i18n.t('types:base.base-entity.id'), example: '12345678' })
  readonly id: string

  @ApiProperty({ description: i18n.t('types:base.base-entity.creator'), example: 'system' })
  readonly creator: string

  @ApiProperty({ description: i18n.t('types:base.base-entity.updater'), example: 'system' })
  readonly updater: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('types:base.base-entity.status')) })
  readonly status: DataStatus

  @ApiProperty({ description: i18n.t('types:base.base-entity.createTime'), example: new Date('2023-01-01') })
  readonly createTime: Date

  @ApiProperty({ description: i18n.t('types:base.base-entity.updateTime'), example: new Date('2023-01-01') })
  readonly updateTime: Date

  @ApiProperty({ description: i18n.t('types:base.base-entity.schemaVersion'), example: 1 })
  readonly schemaVersion: number
}

export default BaseEntity
