/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:54:44
 * @LastEditors:Kerwin
 * @LastEditTime:2023-09-28 11:54:46
 * @Description:
 */

import {
  Controller,
  Get
} from '@nestjs/common'

import {
  ApiExcludeController
} from '@nestjs/swagger'

import {
  AppService
} from './app.service'

@Controller()
@ApiExcludeController()
export class AppController {
  constructor (private readonly appService: AppService) { }

  @Get()
  getSystemCode (): string {
    return this.appService.getSystemCode()
  }
}

export default AppController
