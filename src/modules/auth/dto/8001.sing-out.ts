/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 14:49:03
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

import { SuccessWithoutIdResponse } from '$types'

import { handleEnumDescription } from '$utility'

class SingOutBody {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8001.accountId'), enumOrType: 'string', maxLength: 32 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  accountId: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8001.deviceId'), enumOrType: 'string', maxLength: 256 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  deviceId: string

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:auth.8001.platform')),
    enumOrType: [Platform.WEB, Platform.IOS, Platform.API, Platform.ANDROID],
    example: Platform.WEB
  })
  @IsEnum([Platform.WEB, Platform.IOS, Platform.API, Platform.ANDROID], { each: true })
  @IsNotEmpty()
  platform: Platform

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8001.userAgent'), enumOrType: 'string' })
  @IsString()
  @IsOptional()
  userAgent?: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8001.ip'), enumOrType: 'string' })
  @IsString({ each: true })
  @IsOptional()
  ip?: string[]

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:auth.8001.token'), enumOrType: 'string' })
  @IsString()
  @IsNotEmpty()
  token: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.accountId,
  Category.InputEmpty.deviceId,
  Category.InputEmpty.platform,
  Category.InputEmpty.token,
  Category.InputInvalid.isString.accountId,
  Category.InputInvalid.isString.deviceId,
  Category.InputInvalid.isString.platform,
  Category.InputInvalid.isString.userAgent,
  Category.InputInvalid.isString.ip,
  Category.InputInvalid.isString.token,
  Category.InputInvalid.maxLength.accountId,
  Category.InputInvalid.maxLength.deviceId,
  Category.InputInvalid.isEnum.platform,
  Category.DataNotExist.account,
  Category.DataNotExist.accountToken,
  Category.Auth.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ description: i18n.t('modules:auth.8001.apiDescription'), operationId: 'SingOut' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithoutIdResponse, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SingOutBody as Body,
  CombineSwaggerDecorators
}
