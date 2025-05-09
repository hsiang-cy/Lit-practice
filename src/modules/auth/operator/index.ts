/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 14:52:51
 * @Description:
 */

import {
  Module
} from '@nestjs/common'

import {
  JwtModule
} from '@nestjs/jwt'

import SingIn from './8000.sing-in'
import SingOut from './8001.sing-out'
import {
  config as configInstance
} from '$shared-service'

const operators = [
  SingIn,
  SingOut
]

export {
  SingIn,
  SingOut
}

@Module({
  imports: [
    JwtModule.register({
      secret: configInstance.appConfig.encryption.secret,
      signOptions: { expiresIn: `${configInstance.appConfig.encryption.jwtTime}s` }
    })
  ],
  providers: [
    // -- operator
    ...operators
  ],
  exports: [
    ...operators
  ]
})
export class OperatorModule { }
