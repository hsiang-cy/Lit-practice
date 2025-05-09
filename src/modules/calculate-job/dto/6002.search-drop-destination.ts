/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:36:13
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
  ApiTags,
  PickType
} from '@nestjs/swagger'

import {
  Type
} from 'class-transformer'

import {
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

class SearchDropDestinationSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id'], default: 'id' })
  readonly name: 'id'
}

class SearchDropDestinationQuery {
  @SwaggerDecorators.SearchQueryProperty({ enumOrType: 'string', example: '292355286954261504' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  calculateJobId?: string
}

class SearchDropDestinationBody extends BaseSearch {
  @ApiPropertyOptional({ description: '查詢條件', type: () => SearchDropDestinationQuery })
  @ValidateNested()
  @Type(() => SearchDropDestinationQuery)
  query?: SearchDropDestinationQuery

  @ApiPropertyOptional({ description: '排序條件', type: () => SearchDropDestinationSort, isArray: true })
  sort?: SearchDropDestinationSort[]
}

class SearchDropDestinationData extends PickType(WebOrderGroupDestination, ['id', 'code', 'name', 'address', 'formatAddress', 'timeWindow', 'deliveryDemand', 'route', 'depot', 'typeControlled', 'typeRefrigerated', 'typeExperimental', 'typeSample', 'typeCash', 'price']) {
  @ApiProperty({ description: i18n.t('modules:calculate-job.6002.reason') })
  reason: string
}

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.calculateJobId,
  Category.InputInvalid.maxLength.calculateJobId,
  Category.CalculateJob.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('CalculateJob'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:calculate-job.6002.apiDescription'), operationId: 'SearchDropDestination' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchDropDestinationData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchDropDestinationBody as Body,
  SearchDropDestinationData as Data,
  CombineSwaggerDecorators
}
