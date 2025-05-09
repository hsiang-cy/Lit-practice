/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 14:58:40
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
  ApiTags,
  IntersectionType,
  PickType
} from '@nestjs/swagger'

import {
  Transform
} from 'class-transformer'

import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  DispatchRouteTask,
  WebOrderGroupDestination
} from '$entity'

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

class GetCalculateJobRoutePathQuery extends BaseQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:calculate-job.6003.calculateJobId'), maxLength: 32, example: '160793803800350720' })
    @Trim()
    @MaxLength(32)
    @IsString()
    @IsNotEmpty()
    calculateJobId: string

    @ApiPropertyOptional({ description: i18n.t('modules:calculate-job.6003.calculateJobId'), maxLength: 32, example: '160793803800350720' })
    @Trim()
    @MaxLength(32)
    @IsString()
    @IsNotEmpty()
    dispatchRouteId: string

    @ApiPropertyOptional({ description: i18n.t('modules:calculate-job.6003.counts'), minimum: 1, maximum: 100, example: 1 })
    @Max(100)
    @Min(1)
    @IsInt()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    counts: number
}

export class DestinationInGetCalculateJobRoutePath extends IntersectionType(PickType(DispatchRouteTask, ['seq', 'count', 'deliveryDemand', 'arrivalTime', 'serviceTime', 'transitTime', 'slackTime']), PickType(WebOrderGroupDestination, ['code', 'name'])) { }

export class PathInGetCalculateJobRoutePath {
  @ApiProperty({ description: i18n.t('modules:calculate-job.6003.routeNo') })
  routeNo: number

  @ApiProperty({ description: i18n.t('modules:calculate-job.6003.from'), type: () => DestinationInGetCalculateJobRoutePath })
  from: DestinationInGetCalculateJobRoutePath

  @ApiProperty({ description: i18n.t('modules:calculate-job.6003.to'), type: () => DestinationInGetCalculateJobRoutePath })
  to: DestinationInGetCalculateJobRoutePath

  @ApiProperty({ description: i18n.t('modules:calculate-job.6003.encodedRoute') })
  encodedRoute: string
}

class GetCalculateJobRoutePathData {
  @ApiProperty({ description: i18n.t('modules:calculate-job.6003.routePathList'), type: () => PathInGetCalculateJobRoutePath, isArray: true })
  routePathList: PathInGetCalculateJobRoutePath[]
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.calculateJobId,
  Category.InputEmpty.dispatchRouteId,
  Category.InputEmpty.counts,
  Category.InputInvalid.isString.calculateJobId,
  Category.InputInvalid.isString.dispatchRouteId,
  Category.InputInvalid.maxLength.calculateJobId,
  Category.InputInvalid.maxLength.dispatchRouteId,
  Category.InputInvalid.isNumber.counts,
  Category.InputInvalid.isInt.counts,
  Category.InputInvalid.min.counts,
  Category.InputInvalid.max.counts,
  Category.DataNotExist.calculateJob,
  Category.DataNotExist.dispatchRoute,
  Category.DataNotExist.dispatchRouteTask,
  Category.CalculateJob.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('CalculateJob'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:calculate-job.6003.apiDescription'), operationId: 'GetCalculateJobRoutePath' }),
    SwaggerDecorators.SuccessApiResponse(GetCalculateJobRoutePathData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  GetCalculateJobRoutePathQuery as Query,
  GetCalculateJobRoutePathData as Data,
  CombineSwaggerDecorators
}
