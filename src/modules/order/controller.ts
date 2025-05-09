/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-02 13:19:11
 * @Description:
 */

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'

import * as Dto from './dto'

import {
  OrderService
} from './service'

import {
  AccessTokenGuard
} from '$guard'

import {
  FileFastifyInterceptor
} from '$interceptor'

import {
  CustomFileValidator
} from '$shared-service'

import {
  BaseQuery,
  File
} from '$types'

export interface SseMessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  success?: boolean;
}

@Controller('order')
export class OrderController {
  constructor(
    private readonly fileValidator: CustomFileValidator,
    private readonly service: OrderService
  ) { }

  @Dto.ImportOrder.CombineSwaggerDecorators()
  @UseInterceptors(new FileFastifyInterceptor('file'))
  @UseGuards(AccessTokenGuard)
  @Post('/upload/excel')
  async importOrder(
    @Query() query: BaseQuery,
    @Body() body: Dto.ImportOrder.Body,
    @UploadedFile() file: File
  ) {
    // 驗證檔案 (要傳入檔案名稱)
    this.fileValidator.validateFile('file', {
      file, // 傳入檔案
      fileRequired: true, // 檔案是否必傳
      maxFileSize: 20 * 1024 * 1024,  // 20MB
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // 檔案類型(mime type) => 可填入 string 或 RegExp
    })

    // 將檔案放到 body 中
    body.file = file

    return await this.service.importOrder(query, body)
  }

  @Dto.SearchOrder.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/search')
  async searchOrder(@Query() query: BaseQuery, @Body() body: Dto.SearchOrder.Body) {
    return await this.service.searchOrder(query, body)
  }

  @Dto.SearchOrderGroupDestination.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/destination/search')
  async searchOrderGroupDestination(@Query() query: BaseQuery, @Body() body: Dto.SearchOrderGroupDestination.Body) {
    return await this.service.searchOrderGroupDestination(query, body)
  }

  @Dto.StartCalculate.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Post('/calculate')
  async startCaculate(@Query() query: BaseQuery, @Body() body: Dto.StartCalculate.Body) {
    return await this.service.startCalculate(query, body)
  }
}
