/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-10 12:08:31
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

import '@fastify/multipart'

import {
  IsNotEmpty,
  IsOptional
} from 'class-validator'

import {
  File
} from '$types'

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

class CreateVehicleWithExcelBody {

  @ApiProperty({ description: i18n.t('modules:vehicle.2008.file'), type: 'string', format: 'binary' })
  file: File
}

class CreateVehicleWithExcelData { }

const errorMessages: ErrorObject[] = [
  Category.InputFileError.FileEmpty.FileEmpty('file'),
  Category.InputFileError.PayloadTooLarge.PayloadTooLarge('file'),
  Category.InputFileError.UnsupportedMediaType.UnsupportedMediaType('file'),
  Category.InputFileError.InvalidField.NotAllowedField('file'),
  Category.Vehicle.Temporary(), // TODO 暫時這樣, 錯誤訊息之後在慢慢寫
  Category.Vehicle.UnknownError(),


]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Vehicle'),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiOperation({ description: i18n.t('modules:vehicle.2008.apiDescription'), operationId: 'CreateVehicleWithExcel' }),
    SwaggerDecorators.SuccessApiResponse(CreateVehicleWithExcelData, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN),
  )
}

export {
  CreateVehicleWithExcelBody as Body,
  CreateVehicleWithExcelData as Data,
  CombineSwaggerDecorators
}
