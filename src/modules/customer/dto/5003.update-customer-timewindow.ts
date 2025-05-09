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
  ApiTags
} from '@nestjs/swagger'

import {
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

class UpdateCustomerTimewindowBody {
  @ApiProperty({ description: i18n.t('modules:customer.5003.customerId'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  customerId: string

  @ApiPropertyOptional({ description: '星期一營業時間', example: i18n.t('modules:customer.5003.workDayTimeWindow') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  monday: string;

  @ApiPropertyOptional({ description: '星期二營業時間', example: i18n.t('modules:customer.5003.workDayTimeWindow') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  tuesday: string;

  @ApiPropertyOptional({ description: '星期三營業時間', example: i18n.t('modules:customer.5003.workDayTimeWindow') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  wednesday: string;

  @ApiPropertyOptional({ description: '星期四營業時間', example: i18n.t('modules:customer.5003.workDayTimeWindow') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  thursday: string;

  @ApiPropertyOptional({ description: '星期五營業時間', example: i18n.t('modules:customer.5003.workDayTimeWindow') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  friday: string;

  @ApiPropertyOptional({ description: '星期六營業時間', example: i18n.t('modules:customer.5003.holidayTimeWindow') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  saturday: string;

  @ApiPropertyOptional({ description: '星期日營業時間', example: i18n.t('modules:customer.5003.holidayTimeWindow') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  sunday: string;
}

class UpdateCustomerTimewindowData { }

const errorMessages: ErrorObject[] = [
  Category.Customer.DataNotExist(''),
  Category.Customer.timeWindowError(),
  Category.InputEmpty.customerId,
  Category.InputInvalid.maxLength.customerId,
  Category.InputEmpty.monday,
  Category.InputEmpty.tuesday,
  Category.InputEmpty.wednesday,
  Category.InputEmpty.thursday,
  Category.InputEmpty.friday,
  Category.InputEmpty.saturday,
  Category.InputEmpty.sunday,
  Category.InputInvalid.isString.accountId,
  Category.InputInvalid.isString.monday,
  Category.InputInvalid.isString.tuesday,
  Category.InputInvalid.isString.wednesday,
  Category.InputInvalid.isString.thursday,
  Category.InputInvalid.isString.friday,
  Category.InputInvalid.isString.saturday,
  Category.InputInvalid.isString.sunday,
  Category.Customer.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Customer'),
    ApiOperation({ description: i18n.t('modules:customer.5003.apiDescription'), operationId: 'UpdateCustomerTimewindow' }),
    SwaggerDecorators.SuccessApiResponse(UpdateCustomerTimewindowData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN),
  )
}

export {
  UpdateCustomerTimewindowBody as Body,
  UpdateCustomerTimewindowData as Data,
  CombineSwaggerDecorators
}
