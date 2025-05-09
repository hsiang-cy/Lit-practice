/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 14:26:42
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiProperty,
  ApiBearerAuth,
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

import {
  BaseQuery,
  SuccessWithIdResponse
} from '$types'

class DeleteAccountQuery extends BaseQuery {
  @ApiProperty({ description: i18n.t('modules:account.4004.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.DataNotExist.account,
  Category.Account.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Account'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:account.4004.apiDescription'), operationId: 'DeleteAccount' }),
    SwaggerDecorators.SuccessApiResponse( SuccessWithIdResponse ),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  DeleteAccountQuery as Query,
  CombineSwaggerDecorators
}
