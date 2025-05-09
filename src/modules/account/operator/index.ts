/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-14 13:36:10
 * @Description:
 */

import {
  Module
} from '@nestjs/common'

import SearchAccount from './4000.search-account'
import GetAccount from './4001.get-account'
import CreateAccount from './4002.create-account'
import UpdateAccount from './4003.update-account'
import DeleteAccount from './4004.delete-account'
import UpdateAccountStatus from './4005.update-account-status'
import ChangePassword from './4006.change-password'

const operators = [
  SearchAccount,
  GetAccount,
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
  UpdateAccountStatus,
  ChangePassword
]

export {
  SearchAccount,
  GetAccount,
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
  UpdateAccountStatus,
  ChangePassword
}

@Module({
  providers: [
    // -- operator
    ...operators
  ],
  exports: [
    ...operators
  ]
})
export class OperatorModule { }
