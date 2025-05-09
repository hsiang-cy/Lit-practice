/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:36:25
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
  CalculateJob
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

class SearchCalculateJobStateSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'state'], default: 'id' })
  readonly name: 'id' | 'state'
}

class SearchCalculateJobStateQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:calculate-job.6005.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  id?: string | string[]
}

class SearchCalculateJobStateBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchCalculateJobStateQuery })
@ValidateNested()
@Type(() => SearchCalculateJobStateQuery)
query?: SearchCalculateJobStateQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchCalculateJobStateSort, isArray: true })
sort?: SearchCalculateJobStateSort[]
}

class SearchCalculateJobStateData extends PickType(CalculateJob, ['id', 'state']) { }

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.CalculateJob.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('CalculateJob'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:calculate-job.6005.apiDescription'), operationId: 'SearchCalculateJobState' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchCalculateJobStateData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchCalculateJobStateBody as Body,
  SearchCalculateJobStateData as Data,
  CombineSwaggerDecorators
}
