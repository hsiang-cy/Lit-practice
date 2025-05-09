/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:31:30
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 15:00:09
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
  ApiTags
} from '@nestjs/swagger'

import {
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  IsEnum,
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

import { handleEnumDescription } from '$utility'

class UpdateAccountStatusBody {
  @ApiProperty({ description: i18n.t('modules:account.4005.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty({
    description: handleEnumDescription(i18n.t('modules:account.4005.status')),
    enum: [DataStatus.ACTIVE, DataStatus.INACTIVE],
    example: DataStatus.ACTIVE
  })
  @IsEnum([DataStatus.ACTIVE, DataStatus.INACTIVE])
  @IsNotEmpty()
  status: DataStatus
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputEmpty.status,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.isEnum.status,
  Category.DataNotExist.account,
  Category.Account.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Account'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:account.4005.apiDescription'), operationId: 'UpdateAccountStatus' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  UpdateAccountStatusBody as Body,
  CombineSwaggerDecorators
}
