/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 11:12:06
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

import { Area } from '@zuellig-pharma-2/database'
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min
} from 'class-validator'

import {
  Int64Min,
  IsInt64,
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

class UpdateVehicleBody {
  @ApiProperty({ description: i18n.t('modules:vehicle.2003.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string

  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:vehicle.2003.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @Trim()
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE])
  @IsOptional()
  area?: Area

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.code'), maxLength: 32 })
  @Trim()
  @Matches(/^[a-zA-Z0-9-]+$/)
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.driverName'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  driverName?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.tonnage'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  tonnage?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.size'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  size?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.volume'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  volume?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.maxCapacity') })
  @Int64Min('0')
  @IsInt64()
  @IsNotEmpty()
  @IsOptional()
  maxCapacity?: string

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.startTime'), minimum: 0, maximum: 1440 })
  @Max(1440)
  @Min(0)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  startTime?: number

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.regularWorkTime'), minimum: -1, maximum: 1440 })
  @Max(1440)
  @Min(-1)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  regularWorkTime?: number

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.forceUse') })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  forceUse?: boolean

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.forceStart') })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  forceStart?: boolean

  @ApiProperty({ description: i18n.t('modules:vehicle.2003.fleetsId'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fleetId?: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputInvalid.isString.id,
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
  Category.DataNotModified.vehicle,
  Category.DataNotExist.vehicle,
  Category.DataNotExist.fleetMember,
  Category.Vehicle.EndTimeEarlierThanStartTime(),
  Category.DataDuplicate.code,
  Category.Vehicle.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:vehicle.2003.apiDescription'), operationId: 'UpdateVehicle' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  UpdateVehicleBody as Body,
  CombineSwaggerDecorators
}
