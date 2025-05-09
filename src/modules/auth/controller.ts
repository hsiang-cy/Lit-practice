/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:15:54
 * @Description:
 */
import * as fs from 'fs';
import * as path from 'path';

import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards
} from '@nestjs/common'

import * as Dto from './dto'

import {
  AuthService
} from './service'

import { AccessTokenGuard } from '$guard'
import {
  BaseQuery
} from '$types'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Dto.SingIn.CombineSwaggerDecorators()
  @Post('/sign-in')
  async singIn(@Query() query: BaseQuery, @Body() body: Dto.SingIn.Body) {
    return await this.service.singIn(query, body)
  }

  @Dto.SingOut.CombineSwaggerDecorators()
  @UseGuards(AccessTokenGuard)
  @Post('/sing-out')
  async singOut(@Query() query: BaseQuery, @Body() body: Dto.SingOut.Body) {
    return await this.service.singOut(query, body)
  }

  @Get('/version')
  async version(@Query() query: BaseQuery, @Body() body: any) {
    try {
      const filePath = path.resolve(__dirname, '../../package.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const version = JSON.parse(fileContent).version;

      return {
        success: true,
        version,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
