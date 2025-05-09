/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:10:26
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
  AccountService
} from './service'

import { AccessTokenGuard } from '$guard'

import {
  BaseQuery
} from '$types'

@Controller('account')
export class AccountController {
  constructor (private readonly service: AccountService) { }

  @Dto.SearchAccount.CombineSwaggerDecorators()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Post('/search')
  async searchAccount (@Query() query: BaseQuery, @Body() body: Dto.SearchAccount.Body) {
    return await this.service.searchAccount(query, body)
  }

  @Dto.GetAccount.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAccount (@Query() query: Dto.GetAccount.Query) {
    return await this.service.getAccount(query)
  }

  @Dto.CreateAccount.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Post()
  async createAccount (@Query() query: BaseQuery, @Body() body: Dto.CreateAccount.Body) {
    return await this.service.createAccount(query, body)
  }

  @Dto.UpdateAccount.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put()
  async updateAccount (@Query() query: BaseQuery, @Body() body: Dto.UpdateAccount.Body) {
    return await this.service.updateAccount(query, body)
  }

  @Dto.DeleteAccount.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Delete()
  async deleteAccount (@Query() query: Dto.DeleteAccount.Query) {
    return await this.service.deleteAccount(query)
  }

  @Dto.UpdateAccountStatus.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put('/status')
  async updateAccountStatus (@Query() query: BaseQuery, @Body() body: Dto.UpdateAccountStatus.Body) {
    return await this.service.updateAccountStatus(query, body)
  }

  @Dto.ChangePassword.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Put('/changePassword')
  async changePassword (@Query() query: BaseQuery, @Body() body: Dto.ChangePassword.Body) {
    return await this.service.changePassword(query, body)
  }
}
