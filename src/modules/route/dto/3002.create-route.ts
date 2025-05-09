/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 16:54:55
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
  ApiPropertyOptional,
  ApiTags
} from '@nestjs/swagger'

import { Area } from '@zuellig-pharma-2/database'
import {
  IsEnum,
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
  SuccessWithIdResponse
} from '$types'

import {
  handleEnumDescription
} from '$utility'

class CreateRouteBody {
  @SwaggerDecorators.SearchQueryProperty({
    description: handleEnumDescription(i18n.t('modules:route.3002.area')),
    enumOrType: [Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE],
    example: Area.CENTRAL
  })
  @Trim()
  @IsEnum([Area.CENTRAL, Area.NORTH, Area.SOUTHERN, Area.WHOLE])
  area: Area

  @ApiProperty({ description: i18n.t('modules:route.3002.name'), maxLength: 32 })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: i18n.t('modules:route.3002.comment'), maxLength: 1024 })
  @Trim()
  @MaxLength(1024)
  @IsString()
  @IsOptional()
  comment: string
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.name,
  Category.InputInvalid.isString.name,
  Category.InputInvalid.maxLength.name,
  Category.InputInvalid.maxLength.comment,
  Category.InputInvalid.isEnum.area,
  Category.DataDuplicate.name,
  Category.Route.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('Route'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:route.3002.apiDescription'), operationId: 'CreateRoute' }),
    SwaggerDecorators.SuccessApiResponse(SuccessWithIdResponse, { statusCode: HttpStatus.CREATED }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  CreateRouteBody as Body,
  CombineSwaggerDecorators
}
