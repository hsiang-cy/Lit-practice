/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 17:15:39
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
export class OrderService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '700' }
  get name (): string { return 'ORDER' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly importOrderOperator: Operator.ImportOrder,
    private readonly searchOrderOperator: Operator.SearchOrder,
    private readonly searchOrderGroupDestinationOperator: Operator.SearchOrderGroupDestination,
    private readonly startCalculateOperator: Operator.StartCalculate
  ) {
    super()
  }

  async importOrder (query: BaseQuery, body: Dto.ImportOrder.Body) {
    const res = await this.importOrderOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async searchOrder (query: BaseQuery, body: Dto.SearchOrder.Body) {
    const res = await this.searchOrderOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async searchOrderGroupDestination (query: BaseQuery, body: Dto.SearchOrderGroupDestination.Body) {
    const res = await this.searchOrderGroupDestinationOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async startCalculate (query: BaseQuery, body: Dto.StartCalculate.Body) {
    const res = await this.startCalculateOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default OrderService
