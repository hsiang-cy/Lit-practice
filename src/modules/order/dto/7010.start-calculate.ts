/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 17:13:44
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiBearerAuth,
  ApiPropertyOptional
} from '@nestjs/swagger'

import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators
} from '$decorator'

import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

class StartCalculateBody {
  @ApiProperty({ description: i18n.t('modules:order.7010.orderId'), maxLength: 32, example: '295235414268951552' })
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  orderId: string

  @ApiProperty({ description: i18n.t('modules:order.7010.vehicleIds'), example: ['285337297453169664', '285435606960290816'] })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  vehicleIds: string[]

  @ApiPropertyOptional({ description: i18n.t('modules:order.7010.comment'), maxLength: 1024 })
  @MaxLength(1024)
  @IsString()
  @IsOptional()
  comment?: string
}

class StartCalculateData {
  @ApiProperty({ description: i18n.t('modules:order.7010.success'), example: true })
  success: boolean

  @ApiProperty({ description: i18n.t('modules:order.7010.id') })
  id: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.orderId,
  Category.InputEmpty.vehicleIds,
  Category.InputInvalid.isString.orderId,
  Category.InputInvalid.isString.vehicleIds,
  Category.InputInvalid.isString.comment,
  Category.InputInvalid.maxLength.orderId,
  Category.InputInvalid.maxLength.vehicleIds,
  Category.InputInvalid.maxLength.comment,
  Category.InputInvalid.arrayNotEmpty.vehicleIds,
  Category.DataNotExist.vehicle,
  Category.DataNotExist.fleetMember,
  Category.DataNotExist.route,
  Category.DataNotExist.orderGroup,
  Category.DataNotExist.orderGroupDestination,
  Category.DataNotExist.customer,
  Category.Order.NotVehicleCanRunThisRoute(),
  Category.Order.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Order'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:order.7010.apiDescription'), operationId: 'StartCalculate' }),
    SwaggerDecorators.SuccessApiResponse(StartCalculateData, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  StartCalculateBody as Body,
  StartCalculateData as Data,
  CombineSwaggerDecorators
}
