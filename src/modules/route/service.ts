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
export class RouteService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '300' }
  get name (): string { return 'ROUTE' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly searchRouteOperator: Operator.SearchRoute,
    private readonly getRouteOperator: Operator.GetRoute,
    private readonly createRouteOperator: Operator.CreateRoute,
    private readonly updateRouteOperator: Operator.UpdateRoute,
    private readonly deleteRouteOperator: Operator.DeleteRoute,
    private readonly updateRouteStatusOperator: Operator.UpdateRouteStatus,
    private readonly createRouteWithExcelOperator: Operator.CreateRouteWithExcel
  ) {
    super()
  }

  async searchRoute (query: BaseQuery, body: Dto.SearchRoute.Body) {
    const res = await this.searchRouteOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async getRoute (query: Dto.GetRoute.Query) {
    const res = await this.getRouteOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async createRoute (query: BaseQuery, body: Dto.CreateRoute.Body) {
    const res = await this.createRouteOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async updateRoute (query: BaseQuery, body: Dto.UpdateRoute.Body) {
    const res = await this.updateRouteOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async deleteRoute (query: Dto.DeleteRoute.Query) {
    const res = await this.deleteRouteOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async updateRouteStatus (query: BaseQuery, body: Dto.UpdateRouteStatus.Body) {
    const res = await this.updateRouteStatusOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async createRouteWithExcel (query: BaseQuery, body: Dto.CreateRouteWithExcel.Body) {
    const res = await this.createRouteWithExcelOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default RouteService
