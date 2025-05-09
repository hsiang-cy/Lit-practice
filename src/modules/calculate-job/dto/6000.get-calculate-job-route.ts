/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-03-28 17:29:38
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
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator'

import {
  SwaggerDecorators,
  Trim
} from '$decorator'

import {
  DispatchRoute,
  WebVehicle
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

class GetCalculateJobRouteQuery extends BaseQuery {
  @ApiPropertyOptional({ description: i18n.t('modules:calculate-job.6000.calculateJobId'), maxLength: 32, example: '160793803800350720' })
  @Trim()
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  calculateJobId: string
}

export class RouteInfoInGetCalculateJobRoute extends IntersectionType(PickType(DispatchRoute, ['workTime', 'taskCount', 'deliveryDemand', 'distance', 'drivingTime', 'slackTime', 'serviceTime'])) {
  @ApiProperty({ description: i18n.t('modules:calculate-job.6000.counts') })
  readonly counts: number
}

export class SingleRouteInfoInGetCalculateJobRoute extends IntersectionType(RouteInfoInGetCalculateJobRoute, PickType(DispatchRoute, ['id', 'actualStartTime', 'actualEndTime']), PickType(WebVehicle, ['code', 'area', 'driverName', 'type', 'tonnage', 'size', 'volume', 'maxCapacity', 'regularWorkTime'])) {
  @ApiProperty({ description: i18n.t('modules:calculate-job.6000.fleetName') })
  fleetName: string

  @ApiProperty({ description: i18n.t('modules:calculate-job.6000.vehicleRoute') })
  vehicleRoute: string[]
}

class GetCalculateJobRouteData {
  @ApiProperty({ description: i18n.t('modules:calculate-job.6000.totalRoute'), type: () => RouteInfoInGetCalculateJobRoute })
  totalRoute: RouteInfoInGetCalculateJobRoute

  @ApiProperty({ description: i18n.t('modules:calculate-job.6000.averageRoute'), type: () => RouteInfoInGetCalculateJobRoute })
  averageRoute: RouteInfoInGetCalculateJobRoute

  @ApiProperty({ description: i18n.t('modules:calculate-job.6000.averageVehicle'), type: () => RouteInfoInGetCalculateJobRoute })
  averageVehicle: RouteInfoInGetCalculateJobRoute

  @ApiProperty({ description: i18n.t('modules:calculate-job.6000.routes'), type: () => SingleRouteInfoInGetCalculateJobRoute, isArray: true })
  routes: SingleRouteInfoInGetCalculateJobRoute[]
}

const errorMessages: ErrorObject[] = [
  Category.InputEmpty.calculateJobId,
  Category.InputInvalid.isString.calculateJobId,
  Category.InputInvalid.maxLength.calculateJobId,
  Category.DataNotExist.calculateJob,
  Category.DataNotExist.dispatchRoute,
  Category.CalculateJob.CalculateJobNotFinished,
  Category.CalculateJob.UnknownError()
]

const CombineSwaggerDecorators = () => {
  return applyDecorators(
    ApiTags('CalculateJob'),
    ApiBearerAuth(),
    ApiOperation({ description: i18n.t('modules:calculate-job.6000.apiDescription'), operationId: 'GetCalculateJobRoute' }),
    SwaggerDecorators.SuccessApiResponse(GetCalculateJobRouteData),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.BAD_REQUEST, { errorMessages }),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.UNAUTHORIZED),
    SwaggerDecorators.ErrorApiResponse(HttpStatus.FORBIDDEN)
  )
}

export {
  GetCalculateJobRouteQuery as Query,
  GetCalculateJobRouteData as Data,
  CombineSwaggerDecorators
}
