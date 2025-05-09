/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 16:34:07
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
  Area,
  AccountType,
  DataStatus
} from '@zuellig-pharma-2/database'
import {
  Type
} from 'class-transformer'

import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
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
  BaseSort,
  BaseSearch,
  CommonStatus
} from '$types'
import { handleEnumDescription } from '$utility'

class SearchAccountSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'area', 'account', 'name', 'updateTime'], default: 'updateTime' })
  readonly name: 'id' | 'area' | 'account' | 'name' | 'updateTime'
}

class SearchAccountQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:account.4000.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  id?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:account.4000.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE], { each: true })
  @IsOptional()
  area?: Area

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:account.4000.area')),
    enumOrType: [AccountType.GENERAL, AccountType.MANAGER],
    example: AccountType.GENERAL
  })
  @IsEnum([AccountType.GENERAL, AccountType.MANAGER], { each: true })
  @IsOptional()
  type?: AccountType

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:account.4000.account'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(64, { each: true })
  @IsString({ each: true })
  @IsOptional()
  account?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:account.4000.name'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  name?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:account.4000.status')),
    enumOrType: [DataStatus.ACTIVE, DataStatus.INACTIVE],
    example: DataStatus.ACTIVE
  })
  @IsEnum([DataStatus.ACTIVE, DataStatus.INACTIVE], { each: true })
  @IsOptional()
  status?: CommonStatus | CommonStatus[]
}

class SearchAccountBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchAccountQuery })
@ValidateNested()
@Type(() => SearchAccountQuery)
query?: SearchAccountQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchAccountSort, isArray: true })
sort?: SearchAccountSort[]
}

class SearchAccountData extends PickType(Account, ['id', 'area', 'type', 'account', 'name', 'status', 'comment', 'updateTime']) { }

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.id,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.isString.account,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.maxLength.account,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isEnum.status,
  Category.InputInvalid.isEnum.type,
  Category.Account.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Account'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:account.4000.apiDescription'), operationId: 'SearchAccount' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchAccountData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchAccountBody as Body,
  SearchAccountData as Data,
  CombineSwaggerDecorators
}
