/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:15:07
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
  VehicleService
} from './service'

import { AccessTokenGuard } from '$guard'

import { FileFastifyInterceptor } from '$interceptor'
import { CustomFileValidator } from '$shared-service'
import {
  BaseQuery,
  File
} from '$types'



@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly service: VehicleService,
    private readonly fileValidator: CustomFileValidator,
  ) { }

  @Dto.SearchVehicle.CombineSwaggerDecorators()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Post('/search')
  async searchVehicle(@Query() query: BaseQuery, @Body() body: Dto.SearchVehicle.Body) {
    return await this.service.searchVehicle(query, body)
  }

  @Dto.GetVehicle.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get()
  async getVehicle(@Query() query: Dto.GetVehicle.Query) {
    return await this.service.getVehicle(query)
  }

  @Dto.CreateVehicle.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Post()
  async createVehicle(@Query() query: BaseQuery, @Body() body: Dto.CreateVehicle.Body) {
    return await this.service.createVehicle(query, body)
  }

  @Dto.UpdateVehicle.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put()
  async updateVehicle(@Query() query: BaseQuery, @Body() body: Dto.UpdateVehicle.Body) {
    return await this.service.updateVehicle(query, body)
  }

  @Dto.DeleteVehicle.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Delete()
  async deleteVehicle(@Query() query: Dto.DeleteVehicle.Query) {
    return await this.service.deleteVehicle(query)
  }

  @Dto.UpdateVehicleRoute.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put('/routes')
  async updateVehicleRoute(@Query() query: BaseQuery, @Body() body: Dto.UpdateVehicleRoute.Body) {
    return await this.service.updateVehicleRoute(query, body)
  }

  @Dto.SearchNoVehicleRoute.CombineSwaggerDecorators()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Post('/routes')
  async searchNoVehicleRoute(@Query() query: BaseQuery, @Body() body: Dto.SearchNoVehicleRoute.Body) {
    return await this.service.searchNoVehicleRoute(query, body)
  }

  @Dto.UpdateVehicleStatus.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put('/status')
  async updateVehicleStatus(@Query() query: BaseQuery, @Body() body: Dto.UpdateVehicleStatus.Body) {
    return await this.service.updateVehicleStatus(query, body)
  }

  @Dto.CreateVehicleWithExcel.CombineSwaggerDecorators()
  @UseInterceptors(new FileFastifyInterceptor('file'))
  @UseGuards(AccessTokenGuard)
  @Post('/upload/excel')
  async createVehicleWithExcel(
    @Query() query: BaseQuery,
    @Body() body: Dto.CreateVehicleWithExcel.Body,
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

    return await this.service.createVehicleWithExcel(query, body)
  }
}
