/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:31:30
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-10 10:14:41
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

import {
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  IsEnum,
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
  SuccessWithIdResponse
} from '$types'

import {
  handleEnumDescription
} from '$utility'

class UpdateFleetStatusBody {
  @ApiProperty({ description: i18n.t('modules:fleet.1005.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty({
    description: handleEnumDescription(i18n.t('modules:fleet.1005.status')),
    enum: [DataStatus.ACTIVE, DataStatus.INACTIVE],
    example: DataStatus.ACTIVE
  })
  @IsEnum([DataStatus.ACTIVE, DataStatus.INACTIVE])
  @IsNotEmpty()
  status: DataStatus.ACTIVE | DataStatus.INACTIVE
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputEmpty.status,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.isEnum.status,
  Category.DataNotExist.fleet,
  Category.Fleet.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Fleet'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:fleet.1005.apiDescription'), operationId: 'UpdateFleetStatus' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  UpdateFleetStatusBody as Body,
  CombineSwaggerDecorators
}
