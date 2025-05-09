/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-09 15:20:46
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiProperty,
  ApiBearerAuth,
  ApiTags
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
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseQuery,
  SuccessWithIdResponse
} from '$types'

class DeleteVehicleQuery extends BaseQuery {
  @ApiProperty({ description: i18n.t('modules:vehicle.2004.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.DataNotExist.vehicle,
  Category.Vehicle.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:vehicle.2004.apiDescription'), operationId: 'DeleteVehicle' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  DeleteVehicleQuery as Query,
  CombineSwaggerDecorators
}
