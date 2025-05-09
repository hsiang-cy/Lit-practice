/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:57:54
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 15:03:38
 * @Description:
 */

import {
  ApiPropertyOptional
} from '@nestjs/swagger'

import {
  i18n
} from '$shared-service/i18n'

export type Attribute = 'module' | 'payload' | 'errors' | 'data'

export class BaseQuery {
  /** 是否啟用除錯模式 (目前未支援) */
  @ApiPropertyOptional({
    description: i18n.t('types:base.base-query.debug'),
    enum: [true, false],
    default: false
  })
  debug: boolean | 'true' | 'false'

  /** 是否僅檢查參數是否符合需求，或是驗證格式是否正確 */
  @ApiPropertyOptional({
    description: i18n.t('types:base.base-query.examine'),
    enum: [true, false],
    default: false
  })
  examine: boolean | 'true' | 'false'

  /** 回傳的資料屬性 (參數可以是module, payload, errors, data) */
  @ApiPropertyOptional({
    description: i18n.t('types:base.base-query.attributes'),
    default: 'module, errors, data',
    type: String
  })
  attributes: Attribute[]

  /** 若有設定，則不使用 keep alive，改用 post back的方式取得回應 (目前未支援) */
  @ApiPropertyOptional({
    description: i18n.t('types:base.base-query.callback'),
    default: null
  })
  callback: string | null
}
