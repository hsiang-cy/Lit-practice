/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 15:00:59
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags
} from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import { SuccessWithIdResponse } from '$types'

class ChangePasswordBody {
  @ApiProperty({ description: i18n.t('modules:account.4006.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty({ description: i18n.t('modules:account.4006.password'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  password: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputEmpty.password,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.password,
  Category.DataNotExist.account,
  Category.Account.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Account'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:account.4006.apiDescription'), operationId: 'ChangePassword' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  ChangePasswordBody as Body,
  CombineSwaggerDecorators
}
