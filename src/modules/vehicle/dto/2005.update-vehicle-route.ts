/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 11:11:41
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
  ApiTags
} from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsString,
  IsArray,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import {
  SuccessWithIdResponse
} from '$types'

class UpdateVehicleRouteBody {
  @ApiProperty({ description: i18n.t('modules:vehicle.2005.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiPropertyOptional({ description: i18n.t('modules:vehicle.2005.routeIds') })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsArray()
  routeIds: string[]
}

const errorMessages: ErrorObject[] = [

  Category.InputEmpty.id,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.isString.routeIds,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.routeIds,
  Category.InputInvalid.isArray.routeIds,
  Category.InputInvalid.matches.routeIds,
  Category.DataNotExist.vehicle,
  Category.Vehicle.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:vehicle.2005.apiDescription'), operationId: 'UpdateVehicleRoute' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  UpdateVehicleRouteBody as Body,
  CombineSwaggerDecorators
}
