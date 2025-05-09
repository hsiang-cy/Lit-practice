/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-09 15:02:41
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiPropertyOptional,
  ApiProperty,
  ApiBearerAuth,
  ApiTags,
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

class GetFleetQuery extends BaseQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:fleet.1001.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string
}

class VehicleInGetFleet extends PickType(WebVehicle, ['id', 'code', 'area', 'tonnage', 'size', 'volume', 'driverName', 'timeWindow', 'maxCapacity', 'regularWorkTime', 'maxDrivingDistance', 'maxDrivingTime', 'type', 'status']) {
  @ApiProperty({ description: i18n.t('modules:fleet.1001.memberId') })
  memberId: string
}

class GetFleetData extends PickType(WebFleet, ['id', 'area', 'code', 'name', 'startLocation', 'endLocation', 'priority', 'status']) {
  @ApiProperty({ description: i18n.t('modules:fleet.1001.members'), type: () => VehicleInGetFleet, isArray: true })
  members: VehicleInGetFleet[]
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.DataNotExist.fleet,
  Category.Fleet.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Fleet'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:fleet.1001.apiDescription'), operationId: 'GetFleet' }),
    SwaggerDecorators.SuccessApiResponse(GetFleetData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  GetFleetQuery as Query,
  GetFleetData as Data,
  CombineSwaggerDecorators
}
