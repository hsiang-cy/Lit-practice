/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 15:43:35
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'

import {
  Platform
} from '@zuellig-pharma-2/database'

import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators
} from '$decorator'

import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import { handleEnumDescription } from '$utility'

class SingInBody {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8000.account'), enumOrType: 'string', maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  account: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8000.password'), enumOrType: 'string', maxLength: 32 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  password: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8000.deviceId'), enumOrType: 'string', maxLength: 256 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  deviceId: string

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:auth.8000.platform')),
    enumOrType: [Platform.WEB, Platform.IOS, Platform.API, Platform.ANDROID],
    example: Platform.WEB
  })
  @IsEnum([Platform.WEB, Platform.IOS, Platform.API, Platform.ANDROID], { each: true })
  @IsNotEmpty()
  platform: Platform

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8000.userAgent'), enumOrType: 'string' })
  @IsString()
  @IsOptional()
  userAgent?: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8000.ip'), enumOrType: 'string' })
  @IsString({ each: true })
  @IsOptional()
  ip?: string[]
}

class SingInData {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8000.accountId'), enumOrType: 'string' })
  accountId: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8000.token'), enumOrType: 'string' })
  token: string
}

const errorMessages: ErrorObject[] = [

  Category.InputEmpty.account,
  Category.InputEmpty.password,
  Category.InputEmpty.deviceId,
  Category.InputEmpty.platform,
  Category.InputInvalid.isString.account,
  Category.InputInvalid.isString.password,
  Category.InputInvalid.isString.deviceId,
  Category.InputInvalid.isString.platform,
  Category.InputInvalid.isString.userAgent,
  Category.InputInvalid.isString.ip,
  Category.InputInvalid.maxLength.account,
  Category.InputInvalid.maxLength.password,
  Category.InputInvalid.maxLength.deviceId,
  Category.InputInvalid.isEnum.platform,

  Category.DataNotExist.account,
  Category.Auth.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ description: i18n.t('modules:auth.8000.apiDescription'), operationId: 'SingIn' }),
    SwaggerDecorators.SuccessApiResponse(SingInData, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages })
  )
}

export {
  SingInBody as Body,
  SingInData as Data,
  CombineSwaggerDecorators
}
