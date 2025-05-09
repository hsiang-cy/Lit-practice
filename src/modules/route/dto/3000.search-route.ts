/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 16:49:19
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
  DataStatus,
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
  SwaggerDecorators,
  Trim
} from '$decorator'

import { WebRoute } from '$entity'
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

import {
  handleEnumDescription
} from '$utility'

class SearchRouteSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'area', 'name', 'updateTime'], default: 'updateTime' })
  readonly name: 'id' | 'area' | 'name' | 'updateTime'
}

class SearchRouteQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:route.3000.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  id?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:route.3000.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE], { each: true })
  @IsOptional()
  area?: Area

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:route.3000.name'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  name?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:route.3000.status')),
    enumOrType: [DataStatus.ACTIVE, DataStatus.INACTIVE],
    example: DataStatus.ACTIVE
  })
  @IsEnum([DataStatus.ACTIVE, DataStatus.INACTIVE], { each: true })
  @IsOptional()
  status?: CommonStatus | CommonStatus[]
}

class SearchRouteBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchRouteQuery })
@ValidateNested()
@Type(() => SearchRouteQuery)
query?: SearchRouteQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchRouteSort, isArray: true })
sort?: SearchRouteSort[]
}

class SearchRouteData extends PickType(WebRoute, ['id', 'area', 'name', 'status', 'comment', 'updateTime']) {
  @ApiProperty({ description: i18n.t('modules:route.3000.vehicleCounts') })
  vehicleCounts: number
}

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.id,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isEnum.status,
  Category.Route.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Route'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:route.3000.apiDescription'), operationId: 'SearchRoute' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchRouteData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchRouteBody as Body,
  SearchRouteData as Data,
  CombineSwaggerDecorators
}
