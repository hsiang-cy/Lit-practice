/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:36:21
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
  CalculateJobState
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

import {
  handleEnumDescription
} from '$utility'

class SearchCalculateJobSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'orderGroupId', 'createTime', 'state'], default: 'id' })
  readonly name: 'id' | 'orderGroupId' | 'createTime' | 'state'
}

class SearchCalculateJobQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:calculate-job.6004.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  id?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:calculate-job.6004.orderGroupId'), enumOrType: 'string', example: 'success' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  orderGroupId?: string | string[]

  @ApiPropertyOptional({ description: i18n.t('modules:calculate-job.6004.planStartDateStart'), example: new Date().toISOString() })
  @CustomIsDateString()
  @IsOptional()
  planStartDateStart?: string

  @ApiPropertyOptional({ description: i18n.t('modules:calculate-job.6004.planStartDateEnd'), example: new Date().toISOString() })
  @CustomIsDateString()
  @IsOptional()
  planStartDateEnd?: string

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:calculate-job.6004.state')),
    enumOrType: CalculateJobState,
    example: CalculateJobState.JOB_FINISHED
  })
  @IsEnum(CalculateJobState, { each: true })
  @IsOptional()
  state?: CalculateJobState | CalculateJobState[]

  @ApiPropertyOptional({
    description: handleEnumDescription(i18n.t('modules:calculate-job.6004.area')),
    enum: Area,
    example: Area.WHOLE
  })
  @IsEnum(Area)
  @IsOptional()
  area?: Area
}

class SearchCalculateJobBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchCalculateJobQuery })
@ValidateNested()
@Type(() => SearchCalculateJobQuery)
query?: SearchCalculateJobQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchCalculateJobSort, isArray: true })
sort?: SearchCalculateJobSort[]
}

class SearchCalculateJobData extends PickType(CalculateJob, ['id', 'createTime', 'orderGroupId', 'planStartDate', 'count', 'comment', 'rawComment', 'state', 'creator']) { }

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.id,
  Category.InputInvalid.isString.orderGroupId,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.orderGroupId,
  Category.InputInvalid.isDateString.planStartDateStart,
  Category.InputInvalid.isDateString.planStartDateEnd,
  Category.InputInvalid.isEnum.state,
  Category.InputInvalid.isEnum.area,
  Category.CalculateJob.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('CalculateJob'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:calculate-job.6004.apiDescription'), operationId: 'SearchCalculateJob' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchCalculateJobData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchCalculateJobBody as Body,
  SearchCalculateJobData as Data,
  CombineSwaggerDecorators
}
