/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-18 10:34:12
 * @Description:
 */

import {
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiOperation,
  ApiPropertyOptional,
  ApiTags,
  ApiProperty,
  ApiBearerAuth
} from '@nestjs/swagger'

import {
  IsNotEmpty,
  IsOptional,
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
  BaseQuery
} from '$types'

class GetCustomerQuery extends BaseQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:customer.5001.customerId'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  customerId: string
}

class GetCustomerData {
  @ApiProperty({ description: '客戶 ID', example: '295211375517350912' })
  id: string;

  @ApiProperty({ description: '客戶名稱', example: '醫護同仁購' })
  name: string;

  @ApiProperty({ description: '客戶代碼', example: '30071280' })
  code: string;

  @ApiProperty({ description: '區域', example: 'SOUTHERN' })
  area: string;

  @ApiProperty({ description: '客戶類型', example: 'DS' })
  type: string;

  @ApiProperty({ description: '地址', example: '高雄市苓雅區四維三路６號３樓Ａ１' })
  address: string;

  @ApiProperty({ description: '格式化地址', example: '802台灣高雄市苓雅區四維三路6號3 a1' })
  formatAddress: string;

  @ApiProperty({ description: '緯度', example: 22.6199079 })
  lat: number;

  @ApiProperty({ description: '經度', example: 120.311166 })
  lng: number;

  @ApiProperty({ description: '路線', example: 'SD0000' })
  route: string;

  @ApiProperty({ description: '車隊', example: '' })
  fleet: string;

  @ApiProperty({ description: '特殊時間窗口', example: {} })
  specialTimeWindow: any;

  @ApiProperty({ description: '電話', example: '0988571813' })
  phone: string | null;

  @ApiProperty({ description: '位置代碼', example: '70091960' })
  locationCode: string;

  @ApiProperty({
    description: '營業時間窗口',
    example: {
      w1: ['9:00 ~ 12:00', '14:30 ~ 17:30', '18:00 ~ 21:00'],
      w2: ['9:00 ~ 12:00', '14:30 ~ 17:30', '18:00 ~ 21:00'],
      w3: ['9:00 ~ 12:00', '14:30 ~ 17:30', '18:00 ~ 21:00'],
      w4: ['9:00 ~ 12:00', '14:30 ~ 17:30', '18:00 ~ 21:00'],
      w5: ['9:00 ~ 12:00', '14:30 ~ 17:30', '18:00 ~ 21:00'],
      w6: ['休息'],
      w7: ['休息']
    }
  })
  timeWindow: {
    w1: string[];
    w2: string[];
    w3: string[];
    w4: string[];
    w5: string[];
    w6: string[];
    w7: string[];
  };
}

const errorMessages: ErrorObject[] = [
  Category.Customer.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Customer'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:customer.5001.apiDescription'), operationId: 'GetCustomer' }),
    SwaggerDecorators.SuccessApiResponse(GetCustomerData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN),
  )
}

export {
  GetCustomerQuery as Query,
  GetCustomerData as Data,
  CombineSwaggerDecorators
}
