/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2024-09-09 10:51:43
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
} from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsObject
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

class UpdateCustomerSpecialtimewindowBody {
  @ApiProperty({ description: i18n.t('modules:customer.5004.id'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  customerId: string

  @ApiProperty({
    description: i18n.t('modules:customer.5004.specialTW'), example:
    {
      interval1: { startDay: 1, endDay: 10, workingTime: 60, comment: '備註' },
      interval2: { startDay: 11, endDay: 20, workingTime: 60, comment: '備註' },
      interval3: { startDay: 21, endDay: 30, workingTime: 60, comment: '備註' }
    }
  })
  @IsNotEmpty()
  specialTW: any
}

class UpdateCustomerSpecialtimewindowData {
  @ApiProperty({ example: 'ture' })
  success: boolean

  @ApiProperty({ example: '160793803800350720' })
  customerId: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.customerId,
  Category.InputInvalid.maxLength.customerId,
  Category.InputEmpty.specialTW,
  Category.Customer.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Customer'),
    ApiOperation({ description: i18n.t('modules:customer.5004.apiDescription'), operationId: 'UpdateCustomerSpecialtimewindow' }),
    SwaggerDecorators.SuccessApiResponse(UpdateCustomerSpecialtimewindowData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN),
  )
}

export {
  UpdateCustomerSpecialtimewindowBody as Body,
  UpdateCustomerSpecialtimewindowData as Data,
  CombineSwaggerDecorators
}
