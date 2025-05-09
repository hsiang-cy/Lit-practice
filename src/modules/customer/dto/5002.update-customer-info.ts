/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-18 14:35:44
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
  ApiBearerAuth
} from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsArray,
  IsObject,
  IsEnum,
  IsBoolean
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
  DataStatus,
  Area
} from '@zuellig-pharma-2/database'

class UpdateCustomerInfoBody {
  @ApiProperty({ description: i18n.t('modules:customer.5002.customerId'), maxLength: 32, example: 'ID' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiPropertyOptional({ description: '客戶名稱', maxLength: 256, example: '林新醫院' })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsOptional()
  name?: string

  @ApiPropertyOptional({ description: '區域', enum: Area, example: Area.NORTH })
  @IsEnum(Area)
  @IsOptional()
  area?: Area

  @ApiPropertyOptional({ description: '客戶地址', maxLength: 256, example: '台北市中正區中山南路7號' })
  @Trim()
  @MaxLength(256)
  @IsString()
  @IsOptional()
  address?: string

  @ApiPropertyOptional({ description: '電話', maxLength: 32, example: '02-010030448' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsOptional()
  phone?: string

  @ApiPropertyOptional({ description: '是否能停中型車', example: false })
  @IsOptional()
  @IsBoolean()
  middleCar?: boolean

  @ApiPropertyOptional({ description: '是否能停大型車', example: false })
  @IsOptional()
  @IsBoolean()
  bigCar?: boolean

  @ApiPropertyOptional({ description: '地點類型', example: 'DS' })
  @IsOptional()
  @MaxLength(5)
  @IsString()
  type?: string

  @ApiPropertyOptional({ description: '路線', example: 'VT999' })
  @IsOptional()
  @MaxLength(30)
  @IsString()
  route?: string
}

class UpdateCustomerInfoData {
  @ApiProperty({
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: '客戶ID',
    example: 'ccc222d5d5'
  })
  id: string;

  @ApiProperty({
    description: '變更詳情',
    example: '名稱: 榮總 -> 和平醫院,區域: WHOLE -> NORTH,地址: 116台灣台北市文山區新光路二段30號 -> 406台灣台中市北屯區,電話: +886-2-1234-5678 -> 0800666777',
    required: false
  })
  message?: string;
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.id,
  Category.InputInvalid.isString.id,
  Category.InputInvalid.maxLength.id,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.isEnum.area,
  Category.InputInvalid.isString.address,
  Category.InputInvalid.maxLength.address,
  Category.InputInvalid.isString.phone,
  Category.InputInvalid.maxLength.phone,

  // 資料驗證錯誤
  Category.DataNotExist.customer,
  Category.DataNotModified.UnknownError,
  Category.DataDuplicate.name,

  // 系統相關錯誤
  Category.Fleet.ParseAddressFailed(),
  Category.Customer.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Customer'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:customer.5002.apiDescription'), operationId: 'UpdateCustomerInfo' }),
    SwaggerDecorators.SuccessApiResponse(UpdateCustomerInfoData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN),
  )
}

export {
  UpdateCustomerInfoBody as Body,
  UpdateCustomerInfoData as Data,
  CombineSwaggerDecorators
}
