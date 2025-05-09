/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 15:16:36
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiOperation,
  ApiPropertyOptional,
  ApiTags,
  PickType
} from '@nestjs/swagger'

import {
  IsString,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import { Account } from '$entity'
import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseQuery
} from '$types'

class GetAccountQuery extends BaseQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:account.4001.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  id: string
}

class GetAccountData extends PickType(Account, ['id', 'area', 'type', 'account', 'name', 'status', 'comment', 'updateTime']) { }

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
    ApiOperation({ description: i18n.t('modules:account.4001.apiDescription'), operationId: 'GetAccount' }),
    SwaggerDecorators.SuccessApiResponse(GetAccountData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  GetAccountQuery as Query,
  GetAccountData as Data,
  CombineSwaggerDecorators
}
