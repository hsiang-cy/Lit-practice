/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 15:32:46
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
  ApiTags
} from '@nestjs/swagger'

import { Area } from '@zuellig-pharma-2/database'

import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  IsString,
  Max,
  Min,
  IsInt,
  IsNumber,
  IsBoolean
} from 'class-validator'

import {
  IsInt64,
  Int64Min,
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

import {
  handleEnumDescription
} from '$utility'

class CreateVehicleBody {
  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:vehicle.2002.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @Trim()
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE])
  area: Area

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.code'), maxLength: 32 })
  @Trim()
  @Matches(/^[a-zA-Z0-9-]+$/)
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  code: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.driverName'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  driverName: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.tonnage'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  tonnage?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.size'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  size?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.volume'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  volume?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.maxCapacity') })
  @Int64Min('0')
  @IsInt64()
  @IsNotEmpty()
  maxCapacity: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.startTime'), minimum: 0, maximum: 1440 })
  @Max(1440)
  @Min(0)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  startTime: number

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.regularWorkTime'), minimum: -1, maximum: 1440 })
  @Max(1440)
  @Min(-1)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  regularWorkTime: number

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.forceUse') })
  @IsBoolean()
  @IsNotEmpty()
  forceUse: boolean

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.forceStart') })
  @IsBoolean()
  @IsNotEmpty()
  forceStart: boolean

  @ApiProperty({ description: i18n.t('modules:vehicle.2002.fleetsId'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  fleetId: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.code,
  Category.InputEmpty.driverName,
  Category.InputEmpty.startTime,
  Category.InputEmpty.maxCapacity,
  Category.InputEmpty.type,
  Category.InputEmpty.forceUse,
  Category.InputEmpty.forceStart,
  Category.InputEmpty.maxDrivingDistance,
  Category.InputEmpty.regularWorkTime,
  Category.InputEmpty.maxDrivingTime,
  Category.InputEmpty.fleetId,
  Category.InputInvalid.isString.code,
  Category.InputInvalid.isString.driverName,
  Category.InputInvalid.isString.size,
  Category.InputInvalid.isString.tonnage,
  Category.InputInvalid.isString.volume,
  Category.InputInvalid.isString.fleetId,
  Category.InputInvalid.maxLength.code,
  Category.InputInvalid.maxLength.driverName,
  Category.InputInvalid.maxLength.size,
  Category.InputInvalid.maxLength.tonnage,
  Category.InputInvalid.maxLength.volume,
  Category.InputInvalid.maxLength.fleetId,
  Category.InputInvalid.matches.code,
  Category.InputInvalid.isNumber.startTime,
  Category.InputInvalid.isNumber.maxCapacity,
  Category.InputInvalid.isNumber.maxDrivingDistance,
  Category.InputInvalid.isNumber.regularWorkTime,
  Category.InputInvalid.isNumber.maxDrivingTime,
  Category.InputInvalid.isInt.startTime,
  Category.InputInvalid.isInt.maxDrivingDistance,
  Category.InputInvalid.isInt.regularWorkTime,
  Category.InputInvalid.isInt.maxDrivingTime,
  Category.InputInvalid.min.startTime,
  Category.InputInvalid.min.maxCapacity,
  Category.InputInvalid.min.maxDrivingDistance,
  Category.InputInvalid.min.regularWorkTime,
  Category.InputInvalid.min.maxDrivingTime,
  Category.InputInvalid.max.startTime,
  Category.InputInvalid.max.maxDrivingDistance,
  Category.InputInvalid.max.regularWorkTime,
  Category.InputInvalid.max.maxDrivingTime,
  Category.InputInvalid.isBoolean.forceUse,
  Category.InputInvalid.isBoolean.forceStart,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isEnum.type,
  Category.DataNotExist.fleet,
  // Category.Vehicle.EndTimeEarlierThanStartTime(),
  Category.Vehicle.EndTimeCalculate(),
  Category.DataDuplicate.code,
  Category.Vehicle.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:vehicle.2002.apiDescription'), operationId: 'CreateVehicle' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  CreateVehicleBody as Body,
  CombineSwaggerDecorators
}
