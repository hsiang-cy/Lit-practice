/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 17:12:38
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
  Type
} from 'class-transformer'

import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  WebOrderGroupDestination
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

class SearchOrderGroupDestinationSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'code', 'depot', 'route'], default: 'id' })
  readonly name: 'id' | 'code' | 'depot' | 'route'
}

export class SearchOrderGroupDestinationQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:order.7002.orderGroupId'), example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  orderGroupId?: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:order.7002.depot'), enumOrType: 'string', example: '811' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  depot?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:order.7002.route'), enumOrType: 'string', example: '811' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  route?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:order.7002.findErrorOrder'), enumOrType: 'string', example: false })
  @IsBoolean({ each: true })
  @IsOptional()
  findErrorOrder?: boolean
}

class SearchOrderGroupDestinationBody extends BaseSearch {
  @ApiPropertyOptional({ description: '查詢條件', type: () => SearchOrderGroupDestinationQuery })
  @ValidateNested()
  @Type(() => SearchOrderGroupDestinationQuery)
  query?: SearchOrderGroupDestinationQuery

  @ApiPropertyOptional({ description: '排序條件', type: () => SearchOrderGroupDestinationSort, isArray: true })
  sort?: SearchOrderGroupDestinationSort[]
}

// class SearchOrderGroupDestinationData extends PickType(WebOrderGroupDestination, ['id', 'code', 'name', 'address', 'formatAddress', 'route', 'depot', 'deliveryDemand', 'typeControlled', 'typeRefrigerated', 'typeExperimental', 'typeSample', 'typeCash', 'price', 'isError', 'error']) { }
class SearchOrderGroupDestinationData { }

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.orderGroupId,
  Category.InputInvalid.isString.depot,
  Category.InputInvalid.isString.route,
  Category.InputInvalid.maxLength.orderGroupId,
  Category.InputInvalid.maxLength.depot,
  Category.InputInvalid.maxLength.route,
  Category.Order.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Order'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:order.7002.apiDescription'), operationId: 'SearchOrderGroupDestination' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchOrderGroupDestinationData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchOrderGroupDestinationBody as Body,
  SearchOrderGroupDestinationData as Data,
  CombineSwaggerDecorators
}
