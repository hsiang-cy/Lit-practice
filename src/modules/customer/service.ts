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
export class CustomerService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '500' }
  get name (): string { return 'CUSTOMER' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly searchCustomerOperator: Operator.SearchCustomer,
    private readonly getCustomerOperator: Operator.GetCustomer,
    private readonly updateCustomerInfoOperator: Operator.UpdateCustomerInfo,
    private readonly updateCustomerTimewindowOperator: Operator.UpdateCustomerTimewindow,
    private readonly updateCustomerSpecialtimewindowOperator: Operator.UpdateCustomerSpecialtimewindow
  ) {
    super()
  }

  async searchCustomer (query: BaseQuery, body: Dto.SearchCustomer.Body) {
    const res = await this.searchCustomerOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async getCustomer (query: Dto.GetCustomer.Query) {
    const res = await this.getCustomerOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async updateCustomerInfo (query: BaseQuery, body: Dto.UpdateCustomerInfo.Body) {
    const res = await this.updateCustomerInfoOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async updateCustomerTimewindow (query: BaseQuery, body: Dto.UpdateCustomerTimewindow.Body) {
    const res = await this.updateCustomerTimewindowOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async updateCustomerSpecialtimewindow (query: BaseQuery, body: Dto.UpdateCustomerSpecialtimewindow.Body) {
    const res = await this.updateCustomerSpecialtimewindowOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default CustomerService
