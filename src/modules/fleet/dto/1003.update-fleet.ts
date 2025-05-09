/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 15:34:56
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
  Area
} from '@zuellig-pharma-2/database'

import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  IsEnum
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

import {
  handleEnumDescription
} from '$utility'

class UpdateFleetBody {
  @ApiProperty({ description: i18n.t('modules:fleet.1003.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiPropertyOptional({
    description: handleEnumDescription(i18n.t('modules:fleet.1003.area')),
    enum: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE])
  @IsOptional()
  area?: Area

  @ApiPropertyOptional({ description: i18n.t('modules:fleet.1003.name'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  name?: string

  @ApiPropertyOptional({ description: i18n.t('modules:fleet.1003.startAddress'), maxLength: 256 })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsOptional()
  startAddress?: string

  @ApiProperty({ description: i18n.t('modules:fleet.1003.endAddress'), maxLength: 256 })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsNotEmpty()
  endAddress: string

  @ApiPropertyOptional({ description: i18n.t('modules:fleet.1003.priority'), minimum: 1, maximum: 10 })
  @Max(10)
  @Min(1)
  @IsInt()
  @IsNumber()
  @IsOptional()
  priority?: number

  @ApiPropertyOptional({ description: i18n.t('modules:fleet.1002.comment'), maxLength: 256 })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsOptional()
  comment?: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputEmpty.endAddress,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.isString.startAddress,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.maxLength.startAddress,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isNumber.priority,
  Category.InputInvalid.isInt.priority,
  Category.InputInvalid.min.priority,
  Category.InputInvalid.max.priority,
  Category.DataNotModified.fleet,
  Category.DataNotExist.fleet,
  Category.Fleet.ParseAddressFailed(),
  Category.Fleet.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Fleet'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:fleet.1003.apiDescription'), operationId: 'UpdateFleet' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  UpdateFleetBody as Body,
  CombineSwaggerDecorators
}
