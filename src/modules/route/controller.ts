/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:14:35
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
  UseGuards,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'

import * as Dto from './dto'

import {
  RouteService
} from './service'

import { AccessTokenGuard } from '$guard'

import { FileFastifyInterceptor } from '$interceptor'
import { CustomFileValidator } from '$shared-service'
import {
  BaseQuery,
  File
} from '$types'


@Controller('route')
export class RouteController {
  constructor(
    private readonly service: RouteService,
    private readonly fileValidator: CustomFileValidator,
  ) { }

  @Dto.SearchRoute.CombineSwaggerDecorators()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Post('/search')
  async searchRoute(@Query() query: BaseQuery, @Body() body: Dto.SearchRoute.Body) {
    return await this.service.searchRoute(query, body)
  }

  @Dto.GetRoute.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get()
  async getRoute(@Query() query: Dto.GetRoute.Query) {
    return await this.service.getRoute(query)
  }

  @Dto.CreateRoute.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Post()
  async createRoute(@Query() query: BaseQuery, @Body() body: Dto.CreateRoute.Body) {
    return await this.service.createRoute(query, body)
  }

  @Dto.UpdateRoute.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put()
  async updateRoute(@Query() query: BaseQuery, @Body() body: Dto.UpdateRoute.Body) {
    return await this.service.updateRoute(query, body)
  }

  @Dto.DeleteRoute.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Delete()
  async deleteRoute(@Query() query: Dto.DeleteRoute.Query) {
    return await this.service.deleteRoute(query)
  }

  @Dto.UpdateRouteStatus.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put('/status')
  async updateRouteStatus(@Query() query: BaseQuery, @Body() body: Dto.UpdateRouteStatus.Body) {
    return await this.service.updateRouteStatus(query, body)
  }

  @Dto.CreateRouteWithExcel.CombineSwaggerDecorators()
  @UseInterceptors(new FileFastifyInterceptor('file'))
  @UseGuards(AccessTokenGuard)
  @Post('/upload/excel')
  async createRouteWithExcel(
    @Query() query: BaseQuery,
    @Body() body: Dto.CreateRouteWithExcel.Body,
    @UploadedFile() file: File
  ) {
    this.fileValidator.validateFile('file', {
      file, // 傳入檔案
      fileRequired: true, // 檔案是否必傳
      maxFileSize: 20 * 1024 * 1024,  // 20MB
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // 檔案類型(mime type) => 可填入 string 或 RegExp
    })

    // 將檔案放到 body 中
    body.file = file

    return await this.service.createRouteWithExcel(query, body)
  }
}
