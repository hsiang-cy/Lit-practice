/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-09 14:26:39
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiBearerAuth,
  ApiTags,
  PickType
} from '@nestjs/swagger'

import {
  DataStatus,
  Area,
  VehicleType
} from '@zuellig-pharma-2/database'

import {
  Type
} from 'class-transformer'

import {
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
  IsEnum
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  VehicleFleets,
  VehicleRoutes,
  WebVehicle
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

class SearchVehicleSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id', 'area', 'code', 'type', 'status', 'updateTime'], default: 'updateTime' })
  readonly name: 'id' | 'area' | 'code' | 'type' | 'status' | 'updateTime'
}

class SearchVehicleQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:vehicle.2000.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  id?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:vehicle.2000.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE], { each: true })
  @IsOptional()
  area?: Area

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:vehicle.2000.code'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  code?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:vehicle.2000.driverName'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  driverName?: string | string[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:vehicle.2000.type')),
    enumOrType: VehicleType,
    example: VehicleType.TRUCK
  })
  @IsEnum(VehicleType, { each: true })
  @IsOptional()
  type?: VehicleType | VehicleType[]

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:vehicle.2000.status')),
    enumOrType: [DataStatus.ACTIVE, DataStatus.INACTIVE],
    example: DataStatus.ACTIVE
  })
  @IsEnum([DataStatus.ACTIVE, DataStatus.INACTIVE], { each: true })
  @IsOptional()
  status?: CommonStatus | CommonStatus[]
}

class SearchVehicleBody extends BaseSearch {
@ApiPropertyOptional({ description: '查詢條件', type: () => SearchVehicleQuery })
@ValidateNested()
@Type(() => SearchVehicleQuery)
query?: SearchVehicleQuery

@ApiPropertyOptional({ description: '排序條件', type: () => SearchVehicleSort, isArray: true })
sort?: SearchVehicleSort[]
}

class SearchVehicleData extends PickType(WebVehicle, ['id', 'area', 'code', 'driverName', 'tonnage', 'volume', 'size', 'timeWindow', 'maxCapacity', 'type', 'forceUse', 'forceStart', 'maxDrivingDistance', 'regularWorkTime', 'maxDrivingTime', 'status']) {
  @ApiProperty({ description: i18n.t('modules:vehicle.2000.fleets') })
  fleets: VehicleFleets[]

  @ApiProperty({ description: i18n.t('modules:vehicle.2000.routes') })
  routes: VehicleRoutes[]
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.applicationId,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.isString.code,
  Category.InputInvalid.isString.driverName,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.code,
  Category.InputInvalid.maxLength.driverName,
  Category.InputInvalid.isEnum.type,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isEnum.status,
  Category.Vehicle.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:vehicle.2000.apiDescription'), operationId: 'SearchVehicle' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchVehicleData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  SearchVehicleBody as Body,
  SearchVehicleData as Data,
  CombineSwaggerDecorators
}
