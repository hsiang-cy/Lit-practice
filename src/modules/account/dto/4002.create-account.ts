/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 14:58:05
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

import { AccountType, Area } from '@zuellig-pharma-2/database'
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
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

class CreateAccountBody {
  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:account.4002.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @Trim()
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE])
  area: Area

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:account.4002.area')),
    enumOrType: [AccountType.GENERAL, AccountType.MANAGER],
    example: AccountType.GENERAL
  })
  @IsEnum([AccountType.GENERAL, AccountType.MANAGER], { each: true })
  @IsNotEmpty()
  type: AccountType

  @ApiProperty({ description: i18n.t('modules:account.4002.name'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: i18n.t('modules:account.4002.account'), maxLength: 64 })
  @Trim()
  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  account: string

  @ApiProperty({ description: i18n.t('modules:account.4002.password'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: i18n.t('modules:account.4002.comment'), maxLength: 1024 })
  @Trim()
  @MaxLength(1024)
  @IsString()
  @IsOptional()
  comment?: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.name,
  Category.InputEmpty.account,
  Category.InputEmpty.password,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.isString.account,
  Category.InputInvalid.isString.password,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.maxLength.account,
  Category.InputInvalid.maxLength.password,
  Category.InputInvalid.maxLength.comment,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isEnum.type,
  Category.DataDuplicate.account,
  Category.Account.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Account'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:account.4002.apiDescription'), operationId: 'CreateAccount' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  CreateAccountBody as Body,
  CombineSwaggerDecorators
}
