/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-18 11:19:54
 * @Description:
 */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'

import {
  AccessTokenGuard
} from '$guard'

import * as Dto from './dto'

import {
  CustomerService
} from './service'

import {
  BaseQuery
} from '$types'

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) { }

  @Dto.SearchCustomer.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/search')
  async searchCustomer(@Query() query: BaseQuery, @Body() body: Dto.SearchCustomer.Body) {
    return await this.service.searchCustomer(query, body)
  }

  @Dto.GetCustomer.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get('')
  async getCustomer(@Query() query: Dto.GetCustomer.Query) {
    return await this.service.getCustomer(query)
  }

  @Dto.UpdateCustomerInfo.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put('/')
  async updateCustomerInfo (@Query() query: BaseQuery, @Body() body: Dto.UpdateCustomerInfo.Body) {
    return await this.service.updateCustomerInfo(query, body)
  }

  @Dto.UpdateCustomerTimewindow.CombineSwaggerDecorators()
  @Put('/update-timewindow')
  async updateCustomerTimewindow (@Query() query: BaseQuery, @Body() body: Dto.UpdateCustomerTimewindow.Body) {
    return await this.service.updateCustomerTimewindow(query, body)
  }

  @Dto.UpdateCustomerSpecialtimewindow.CombineSwaggerDecorators()
  @Put('/costomer/specialtimewindow')
  async updateCustomerSpecialtimewindow (@Query() query: BaseQuery, @Body() body: Dto.UpdateCustomerSpecialtimewindow.Body) {
    return await this.service.updateCustomerSpecialtimewindow(query, body)
  }
}
