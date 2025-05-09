/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-09 15:02:30
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiPropertyOptional,
  ApiTags,
  ApiProperty,
  ApiBearerAuth,
  PickType
} from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  WebFleet,
  WebRoute,
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
  BaseQuery
} from '$types'

class GetVehicleQuery extends BaseQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:vehicle.2001.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string
}

class FleetInGetVehicle extends PickType(WebFleet, ['id', 'area', 'code', 'name', 'startLocation', 'priority', 'status']) {
  @ApiProperty({ description: i18n.t('modules:vehicle.2001.fleetsId') })
  fleetId: string
}

class RouteInGetVehicle extends PickType(WebRoute, ['id', 'area', 'name', 'status']) {
  @ApiProperty({ description: i18n.t('modules:vehicle.2001.routesId') })
  routeId: string
}

class GetVehicleData extends PickType(WebVehicle, ['id', 'area', 'code', 'driverName', 'tonnage', 'volume', 'size', 'timeWindow', 'maxCapacity', 'type', 'forceUse', 'forceStart', 'maxDrivingDistance', 'regularWorkTime', 'maxDrivingTime', 'status']) {
  @ApiProperty({ description: i18n.t('modules:vehicle.2001.fleets'), type: () => FleetInGetVehicle, isArray: true })
  fleets: FleetInGetVehicle[]

  @ApiProperty({ description: i18n.t('modules:vehicle.2001.routes'), type: () => RouteInGetVehicle, isArray: true })
  routes: RouteInGetVehicle[]
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputEmpty.applicationId,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.DataNotExist.vehicle,
  Category.Vehicle.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:vehicle.2001.apiDescription'), operationId: 'GetVehicle' }),
    SwaggerDecorators.SuccessApiResponse(GetVehicleData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  GetVehicleQuery as Query,
  GetVehicleData as Data,
  CombineSwaggerDecorators
}
