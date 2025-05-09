/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-10 16:42:21
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
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  WebRoute
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

class SearchNoVehicleRouteSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'area', 'status', 'updateTime'], default: 'updateTime' })
  readonly name: 'id' | 'area' | 'status' | 'updateTime'
}

class SearchNoVehicleRouteQuery {
  @ApiProperty({ description: i18n.t('modules:vehicle.2006.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string
}

class SearchNoVehicleRouteBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchNoVehicleRouteQuery })
@ValidateNested()
@Type(() => SearchNoVehicleRouteQuery)
query: SearchNoVehicleRouteQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchNoVehicleRouteSort, isArray: true })
sort?: SearchNoVehicleRouteSort[]
}

class SearchNoVehicleRouteData extends PickType(WebRoute, ['id', 'area', 'name', 'comment', 'status']) { }

const errorMessages: ErrorObject[] = [
  Category.Vehicle.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:vehicle.2006.apiDescription'), operationId: 'SearchNoVehicleRoute' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchNoVehicleRouteData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchNoVehicleRouteBody as Body,
  SearchNoVehicleRouteData as Data,
  CombineSwaggerDecorators
}
