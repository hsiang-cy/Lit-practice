/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-10 09:49:23
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  File
} from '$types'

import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
  ApiConsumes,
  ApiBearerAuth
} from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsOptional
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

class CreateRouteWithExcelBody {
  @ApiProperty({ description: i18n.t('modules:vehicle.2008.file'), type: 'string', format: 'binary' })
  file: File
}

class CreateRouteWithExcelData { }

const errorMessages: ErrorObject[] = [
  Category.InputFileError.FileEmpty.FileEmpty('file'),
  Category.InputFileError.PayloadTooLarge.PayloadTooLarge('file'),
  Category.InputFileError.UnsupportedMediaType.UnsupportedMediaType('file'),
  Category.InputFileError.InvalidField.NotAllowedField('file'),
  Category.Route.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Route'),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiOperation({ description: i18n.t('modules:route.3008.apiDescription'), operationId: 'CreateRouteWithExcel' }),
    SwaggerDecorators.SuccessApiResponse(CreateRouteWithExcelData, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN),
  )
}

export {
  CreateRouteWithExcelBody as Body,
  CreateRouteWithExcelData as Data,
  CombineSwaggerDecorators
}
