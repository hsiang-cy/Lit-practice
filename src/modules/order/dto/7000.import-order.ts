/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-16 15:57:40
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
  ApiTags,
  ApiConsumes,
  ApiBearerAuth
} from '@nestjs/swagger'

import {
  Area
} from '@zuellig-pharma-2/database'

import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators,
  CustomIsDateString
} from '$decorator'

import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import {
  File
} from '$types'

import {
  handleEnumDescription
} from '$utility'

class ImportOrderBody {
  @ApiProperty({ description: i18n.t('modules:order.7000.startTime'), example: new Date().toISOString() })
  @CustomIsDateString()
  @IsNotEmpty()
  startTime: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('modules:order.7000.area')), enum: Area })
  @IsEnum(Area)
  @IsNotEmpty()
  area: Area

  @ApiPropertyOptional({ description: handleEnumDescription(i18n.t('modules:order.7000.comment')), maxLength: 1024 })
  @MaxLength(1024)
  @IsString()
  @IsOptional()
  comment?: string

  @ApiProperty({ description: i18n.t('modules:order.7000.file'), type: 'string', format: 'binary' })
  file: File
}

class ImportOrderData {
  @ApiProperty({ description: i18n.t('modules:order.7000.success'), example: true })
  success: boolean

  @ApiProperty({ description: i18n.t('modules:order.7000.id') })
  id: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.startTime,
  Category.InputEmpty.area,
  Category.InputInvalid.isDateString.startTime,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isString.comment,
  Category.InputInvalid.maxLength.comment,
  Category.Order.FormatError,
  Category.Order.StartTimeEarlierThanToday,
  Category.Order.ImportOrderError(),
  Category.Order.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Order'),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiOperation({ description: i18n.t('modules:order.7000.apiDescription'), operationId: 'ImportOrder' }),
    SwaggerDecorators.SuccessApiResponse(ImportOrderData, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  ImportOrderBody as Body,
  ImportOrderData as Data,
  CombineSwaggerDecorators
}
