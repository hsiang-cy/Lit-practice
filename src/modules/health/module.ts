/*
 * @Author:Kerwin
 * @Date:2024-04-08 16:07:44
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-08 16:07:44
 * @Description:
 */

import {
  Module
} from '@nestjs/common'

import {
  TerminusModule
} from '@nestjs/terminus'

import {
  HealthController
} from './controller'

@Module({
  imports: [
    TerminusModule
  ],
  controllers: [
    HealthController
  ]
})
export class HealthModule { }

export default HealthModule
