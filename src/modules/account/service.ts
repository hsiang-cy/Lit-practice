/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2024-05-24 17:57:30
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import * as Dto from './dto'

import * as Operator from './operator'

import {
  Config
} from '$shared-service'

import {
  BaseModule,
  BaseQuery
} from '$types'

@Injectable()
export class AccountService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '400' }
  get name (): string { return 'ACCOUNT' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly searchAccountOperator: Operator.SearchAccount,
    private readonly getAccountOperator: Operator.GetAccount,
    private readonly createAccountOperator: Operator.CreateAccount,
    private readonly updateAccountOperator: Operator.UpdateAccount,
    private readonly deleteAccountOperator: Operator.DeleteAccount,
    private readonly updateAccountStatusOperator: Operator.UpdateAccountStatus,
    private readonly changePasswordOperator: Operator.ChangePassword
  ) {
    super()
  }

  async searchAccount (query: BaseQuery, body: Dto.SearchAccount.Body) {
    const res = await this.searchAccountOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async getAccount (query: Dto.GetAccount.Query) {
    const res = await this.getAccountOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async createAccount (query: BaseQuery, body: Dto.CreateAccount.Body) {
    const res = await this.createAccountOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async updateAccount (query: BaseQuery, body: Dto.UpdateAccount.Body) {
    const res = await this.updateAccountOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async deleteAccount (query: Dto.DeleteAccount.Query) {
    const res = await this.deleteAccountOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async updateAccountStatus (query: BaseQuery, body: Dto.UpdateAccountStatus.Body) {
    const res = await this.updateAccountStatusOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async changePassword (query: BaseQuery, body: Dto.ChangePassword.Body) {
    const res = await this.changePasswordOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default AccountService
