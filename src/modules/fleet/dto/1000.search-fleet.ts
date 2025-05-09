/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 15:24:26
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiProperty,
  ApiOperation,
  ApiPropertyOptional,
  ApiBearerAuth,
  PickType,
  ApiTags
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

import {
  WebFleet
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
  BaseSearch,
  CommonStatus
} from '$types'

import {
  handleEnumDescription
} from '$utility'

class SearchFleetSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'code', 'priority', 'updateTime'], default: 'updateTime' })
  readonly name: 'id' | 'code' | 'priority' | 'updateTime'
}

class SearchFleetQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:fleet.1000.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  id?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:fleet.1000.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE], { each: true })
  @IsOptional()
  area?: Area

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:fleet.1000.code'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  code?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:fleet.1000.name'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  name?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:fleet.1000.status')),
    enumOrType: [DataStatus.ACTIVE, DataStatus.INACTIVE],
    example: DataStatus.ACTIVE
  })
  @IsEnum([DataStatus.ACTIVE, DataStatus.INACTIVE], { each: true })
  @IsOptional()
  status?: CommonStatus | CommonStatus[]
}

class SearchFleetBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchFleetQuery })
@ValidateNested()
@Type(() => SearchFleetQuery)
query?: SearchFleetQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchFleetSort, isArray: true })
sort?: SearchFleetSort[]
}

class SearchFleetData extends PickType(WebFleet, ['id', 'area', 'code', 'name', 'startLocation','endLocation', 'priority', 'status', 'comment']) {
  @ApiProperty({ description: i18n.t('modules:fleet.1000.vehicleCounts') })
  vehicleCounts: number
}

const errorMessages: ErrorObject[] = [
  Category.InputInvalid.isString.id,
  Category.InputInvalid.isString.code,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.code,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isEnum.status,
  Category.Fleet.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Fleet'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:fleet.1000.apiDescription'), operationId: 'SearchFleet' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchFleetData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchFleetBody as Body,
  SearchFleetData as Data,
  CombineSwaggerDecorators
}
