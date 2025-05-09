/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-18 10:38:37
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
  Type
} from 'class-transformer'

import {
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
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
  BaseSort,
  BaseSearch
} from '$types'

class SearchCustomerSort extends BaseSort {
  @ApiPropertyOptional({ description: '欄位名稱', enum: ['id'], default: 'id' })
  readonly name: 'id'
}

class SearchCustomerQuery {
  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:customer.5000.id'), enumOrType: 'string', example: '160793803800350720' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  customerId?: string

  @SwaggerDecorators.SearchQueryProperty({ description: '區域', enumOrType: 'string', example: 'NORTH' })
  @Trim({ trimArray: true })
  @MaxLength(32, { each: true })
  @IsString({ each: true })
  @IsOptional()
  area?: string

  @SwaggerDecorators.SearchQueryProperty({ description: i18n.t('modules:customer.5000.customerName'), enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(40, { each: true })
  @IsString({ each: true })
  @IsOptional()
  customerName?: string

  @SwaggerDecorators.SearchQueryProperty({ description: '客戶代碼', enumOrType: 'string' })
  @Trim({ trimArray: true })
  @MaxLength(10, { each: true })
  @IsString({ each: true })
  @IsOptional()
  code?: string
}

class SearchCustomerBody extends BaseSearch {
  @ApiPropertyOptional({ description: '查詢條件', type: () => SearchCustomerQuery })
  @ValidateNested()
  @Type(() => SearchCustomerQuery)
  query?: SearchCustomerQuery

  @ApiPropertyOptional({ description: '排序條件', type: () => SearchCustomerSort, isArray: true })
  sort?: SearchCustomerSort[]
}

export class SearchCustomerData {
  @ApiProperty({ description: '客戶 ID', example: '295211375517350912' })
  customerId: string;

  @ApiProperty({ description: '客戶 ID', example: '333333' })
  code: string;

  // @ApiProperty({ description: '位置代碼', example: '70091950' })
  // locationCode: string;

  @ApiProperty({ description: '客戶名稱', example: '亞培員購－台北辦公室' })
  customerName: string;

  @ApiProperty({ description: 'area', example: 'NORTH' })
  area: string;

  @ApiProperty({ example: 'DS' })
  type: string

  @ApiProperty({ description: '原始地址', example: '台北101' })
  address: string

  @ApiProperty({ description: '格式化地址', example: 'Taipei 101, No. 7信義路五段信義區台北市台灣 110' })
  formatAddress: string

  @ApiProperty({ example: 'KA001' })
  route: string

  @ApiProperty({ example: '0978456123' })
  phone: string | null

  @ApiProperty({ example: false })
  middleCar: boolean

  @ApiProperty({ example: true })
  bigCar: boolean

  @ApiProperty()
  timeWindow: any

  @ApiProperty()
  specialTimeWindow: any

  @ApiProperty({ example: ["9:00 ~ 12:00", "14:30 ~ 17:30", "18:00 ~ 21:00"] })
  monday: string[];

  @ApiProperty({ example: ["0:00 ~ 0:00"] })
  tuesday: string[];

  @ApiProperty({ example: ["9:00 ~ 12:00", "14:30 ~ 17:30", "18:00 ~ 21:00"] })
  friday: string[]
}

const errorMessages: ErrorObject[] = [
  Category.Customer.UnknownError(),
  Category.Customer.timeWindowError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Customer'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:customer.5000.apiDescription'), operationId: 'SearchCustomer' }),
    SwaggerDecorators.SuccessSearchApiResponse(SearchCustomerData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN),
  )
}

export {
  SearchCustomerBody as Body,
  SearchCustomerData as Data,
  CombineSwaggerDecorators
}
