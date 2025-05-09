/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 17:03:20
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
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import { WebRoute, WebVehicle } from '$entity'
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

class GetRouteQuery extends BaseQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:route.3001.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  id: string
}

class VehicleInGetRoute extends PickType(WebVehicle, ['id', 'code', 'area', 'tonnage', 'size', 'volume', 'driverName', 'timeWindow', 'maxCapacity', 'regularWorkTime', 'maxDrivingDistance', 'maxDrivingTime', 'type', 'status']) {
}

class GetRouteData extends PickType(WebRoute, ['id', 'area', 'name', 'status', 'comment']) {
  @ApiProperty({ description: i18n.t('modules:route.3001.vehicles'), type: () => VehicleInGetRoute, isArray: true })
  vehicles: VehicleInGetRoute[]
}

const errorMessages: ErrorObject[] = [
  Category.Route.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Route'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:route.3001.apiDescription'), operationId: 'GetRoute' }),
    SwaggerDecorators.SuccessApiResponse(GetRouteData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  GetRouteQuery as Query,
  GetRouteData as Data,
  CombineSwaggerDecorators
}
