/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:58:18
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 16:02:00
 * @Description:
 */

import type {
  BaseErrorType
} from '$errors'

import {
  ApiProperty
} from '@nestjs/swagger'

import TypeCheck from '@saico/type-check-js'

import {
  i18n
} from '$shared-service/i18n'

export class ModuleInfo {
  @ApiProperty({ description: i18n.t('types:base.service-response.module-code') })
  code: string

  @ApiProperty({ description: i18n.t('types:base.service-response.module-name') })
  name: string

  @ApiProperty({ description: i18n.t('types:base.service-response.module-version') })
  version: string
}
/**
 * 錯誤代碼 提供給 swagger 讀取使用
 */
export class Error {
  @ApiProperty({ description: i18n.t('types:base.service-response.error-code') })
  code: string

  @ApiProperty({ description: i18n.t('types:base.service-response.error-type') })
  type: BaseErrorType

  @ApiProperty({ description: i18n.t('types:base.service-response.error-name') })
  name: string

  @ApiProperty({ description: i18n.t('types:base.service-response.error-message') })
  message?: string

  @ApiProperty({ description: i18n.t('types:base.service-response.error-extraInfo') })
  extraInfo?: Record<string, any>
}

export class ServiceResponse<T> {
  @ApiProperty({ description: i18n.t('types:base.service-response.module'), type: () => ModuleInfo })
  public module: ModuleInfo

  @ApiProperty({ description: i18n.t('types:base.service-response.payload') })
  public payload?: Record<string, any>

  public data?: T | null

  @ApiProperty({ description: i18n.t('types:base.service-response.errors'), type: () => Error, isArray: true })
  public errors?: Error[]

  setModule (module: {
    code: string,
    name: string
  }) {
    this.module = {
      code: module.code,
      name: module.name,
      version: process.env?.npm_package_version ?? ''
    }

    return this
  }

  setPayload (payload?: Record<string, any>) {
    this.payload = payload ?? {}

    return this
  }

  setData (data?: T | null) {
    this.data = data

    return this
  }

  addError (error: Error[]) {
    this.errors = TypeCheck.isEmpty(error) ? undefined : error

    return this
  }
}

export default ServiceResponse
