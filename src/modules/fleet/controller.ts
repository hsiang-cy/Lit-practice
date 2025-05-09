/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:14:11
 * @Description:
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'

import * as Dto from './dto'

import {
  FleetService
} from './service'

import {
  AccessTokenGuard
} from '$guard'

import {
  BaseQuery
} from '$types'

@Controller('fleet')
export class FleetController {
  constructor (private readonly service: FleetService) { }

  @Dto.SearchFleet.CombineSwaggerDecorators()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Post('/search')
  async searchFleet (@Query() query: BaseQuery, @Body() body: Dto.SearchFleet.Body) {
    return await this.service.searchFleet(query, body)
  }

  @Dto.GetFleet.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get()
  async getFleet (@Query() query: Dto.GetFleet.Query) {
    return await this.service.getFleet(query)
  }

  @Dto.CreateFleet.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Post()
  async createFleet (@Query() query: BaseQuery, @Body() body: Dto.CreateFleet.Body) {
    return await this.service.createFleet(query, body)
  }

  @Dto.UpdateFleet.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put()
  async updateFleet (@Query() query: BaseQuery, @Body() body: Dto.UpdateFleet.Body) {
    return await this.service.updateFleet(query, body)
  }

  @Dto.DeleteFleet.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Delete()
  async deleteFleet (@Query() query: Dto.DeleteFleet.Query) {
    return await this.service.deleteFleet(query)
  }

  @Dto.UpdateFleetStatus.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put('/status')
  async updateFleetStatus (@Query() query: BaseQuery, @Body() body: Dto.UpdateFleetStatus.Body) {
    return await this.service.updateFleetStatus(query, body)
  }
}
