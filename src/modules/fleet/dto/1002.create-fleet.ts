/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 16:45:40
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
  ApiTags
} from '@nestjs/swagger'

import {
  Area
} from '@zuellig-pharma-2/database'

import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsNumber,
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

class CreateFleetBody {
  @ApiProperty({
    description: handleEnumDescription(i18n.t('modules:fleet.1002.area')),
    enum: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE])
  @IsNotEmpty()
  area: Area

  @ApiProperty({ description: i18n.t('modules:fleet.1002.name'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: i18n.t('modules:fleet.1002.startAddress'), maxLength: 256 })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsNotEmpty()
  startAddress: string

  @ApiPropertyOptional({ description: i18n.t('modules:fleet.1002.endAddress'), maxLength: 256 })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsOptional()
  endAddress?: string

  @ApiProperty({ description: i18n.t('modules:fleet.1002.priority'), minimum: 1, maximum: 10 })
  @Max(10)
  @Min(1)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  priority: number

  @ApiPropertyOptional({ description: i18n.t('modules:fleet.1002.comment'), maxLength: 256 })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsOptional()
  comment?: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.area,
  Category.InputEmpty.name,
  Category.InputEmpty.startAddress,
  Category.InputEmpty.priority,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.isString.startAddress,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.maxLength.startAddress,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isNumber.priority,
  Category.InputInvalid.isInt.priority,
  Category.InputInvalid.max.priority,
  Category.InputInvalid.min.priority,
  Category.DataDuplicate.name,
  Category.Fleet.ParseAddressFailed(),
  Category.Fleet.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Fleet'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:fleet.1002.apiDescription'), operationId: 'CreateFleet' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  CreateFleetBody as Body,
  CombineSwaggerDecorators
}
