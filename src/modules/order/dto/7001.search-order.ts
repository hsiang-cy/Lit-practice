/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 17:10:25
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
  Area
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
  CustomIsDateString,
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  WebOrderGroup
} from '$entity'

import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseSort,
  BaseSearch
} from '$types'

import {
  handleEnumDescription
} from '$utility'

class SearchOrderSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'area', 'createTime', 'startTime', 'state'], default: 'id' })
  readonly name: 'id' | 'area' | 'createTime' | 'startTime' | 'state'
}

class SearchOrderQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:order.7001.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  id?: string | string[]

  @ApiPropertyOptional({
    description: handleEnumDescription(i18n.t('modules:order.7001.area')),
    enum: Area,
    example: Area.WHOLE
  })
  @IsEnum(Area)
  @IsOptional()
  area?: Area

  @ApiPropertyOptional({ description: i18n.t('modules:order.7001.startTimeStart'), example: new Date().toISOString() })
  @CustomIsDateString()
  @IsOptional()
  startTimeStart?: string

  @ApiPropertyOptional({ description: i18n.t('modules:order.7001.startTimeEnd'), example: new Date().toISOString() })
  @CustomIsDateString()
  @IsOptional()
  startTimeEnd?: string
}

class SearchOrderBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchOrderQuery })
@ValidateNested()
@Type(() => SearchOrderQuery)
query?: SearchOrderQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchOrderSort, isArray: true })
sort?: SearchOrderSort[]
}

class SearchOrderData extends PickType(WebOrderGroup, ['id', 'area', 'createTime', 'startTime', 'comment', 'state', 'creator', 'lastCalculateTime']) { }

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isDateString.startTimeStart,
  Category.InputInvalid.isDateString.startTimeEnd,
  Category.Order.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Order'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:order.7001.apiDescription'), operationId: 'SearchOrder' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchOrderData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchOrderBody as Body,
  SearchOrderData as Data,
  CombineSwaggerDecorators
}
