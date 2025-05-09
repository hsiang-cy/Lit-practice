/*
 * @Author:Kerwin
 * @Date:2024-04-08 16:02:52
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-08 16:02:53
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
  HealthCheckService,
  HealthCheck
} from '@nestjs/terminus'

@ApiExcludeController()
@Controller('health')
export class HealthController {
  constructor (
    private health: HealthCheckService
  ) { }

  @Get()
  @HealthCheck()
  check () {
    return this.health.check([])
  }
}

export default HealthController
