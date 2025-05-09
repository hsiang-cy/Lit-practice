/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 14:42:19
 * @Description:
 */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'

import * as Dto from './dto'

import {
  CalculateJobService
} from './service'

import {
  AccessTokenGuard
} from '$guard'

import {
  BaseQuery
} from '$types'

@Controller('calculate-job')
export class CalculateJobController {
  constructor (private readonly service: CalculateJobService) { }

  @Dto.GetCalculateJobRoute.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get('/route')
  async getCalculateJobRoute (@Query() query: Dto.GetCalculateJobRoute.Query) {
    return await this.service.getCalculateJobRoute(query)
  }

  @Dto.GetCalculateJobRouteTask.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get('/route/task')
  async getCalculateJobRouteTask (@Query() query: Dto.GetCalculateJobRouteTask.Query) {
    return await this.service.getCalculateJobRouteTask(query)
  }

  @Dto.SearchDropDestination.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/drop-destination')
  async searchDropDestination (@Query() query: BaseQuery, @Body() body: Dto.SearchDropDestination.Body) {
    return await this.service.searchDropDestination(query, body)
  }

  @Dto.GetCalculateJobRoutePath.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get('/route/path')
  async getCalculateJobRoutePath (@Query() query: Dto.GetCalculateJobRoutePath.Query) {
    return await this.service.getCalculateJobRoutePath(query)
  }

  @Dto.SearchCalculateJob.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/search')
  async searchCalculateJob (@Query() query: BaseQuery, @Body() body: Dto.SearchCalculateJob.Body) {
    return await this.service.searchCalculateJob(query, body)
  }

  @Dto.SearchCalculateJobState.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/state/search')
  async searchCalculateJobState (@Query() query: BaseQuery, @Body() body: Dto.SearchCalculateJobState.Body) {
    return await this.service.searchCalculateJobState(query, body)
  }
}
