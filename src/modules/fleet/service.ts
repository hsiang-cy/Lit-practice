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
export class FleetService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '100' }
  get name (): string { return 'FLEET' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly searchFleetOperator: Operator.SearchFleet,
    private readonly getFleetOperator: Operator.GetFleet,
    private readonly createFleetOperator: Operator.CreateFleet,
    private readonly updateFleetOperator: Operator.UpdateFleet,
    private readonly deleteFleetOperator: Operator.DeleteFleet,
    private readonly updateFleetStatusOperator: Operator.UpdateFleetStatus
  ) {
    super()
  }

  async searchFleet (query: BaseQuery, body: Dto.SearchFleet.Body) {
    const res = await this.searchFleetOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async getFleet (query: Dto.GetFleet.Query) {
    const res = await this.getFleetOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async createFleet (query: BaseQuery, body: Dto.CreateFleet.Body) {
    const res = await this.createFleetOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async updateFleet (query: BaseQuery, body: Dto.UpdateFleet.Body) {
    const res = await this.updateFleetOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async deleteFleet (query: Dto.DeleteFleet.Query) {
    const res = await this.deleteFleetOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async updateFleetStatus (query: BaseQuery, body: Dto.UpdateFleetStatus.Body) {
    const res = await this.updateFleetStatusOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default FleetService
