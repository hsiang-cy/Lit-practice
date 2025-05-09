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
export class VehicleService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '200' }
  get name (): string { return 'VEHICLE' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly searchVehicleOperator: Operator.SearchVehicle,
    private readonly getVehicleOperator: Operator.GetVehicle,
    private readonly updateVehicleOperator: Operator.UpdateVehicle,
    private readonly deleteVehicleOperator: Operator.DeleteVehicle,
    private readonly updateVehicleRouteOperator: Operator.UpdateVehicleRoute,
    private readonly searchNoVehicleRouteOperator: Operator.SearchNoVehicleRoute,
    private readonly createVehicleOperator: Operator.CreateVehicle,
    private readonly updateVehicleStatusOperator: Operator.UpdateVehicleStatus,
    private readonly createVehicleWithExcelOperator: Operator.CreateVehicleWithExcel
  ) {
    super()
  }

  async searchVehicle (query: BaseQuery, body: Dto.SearchVehicle.Body) {
    const res = await this.searchVehicleOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async getVehicle (query: Dto.GetVehicle.Query) {
    const res = await this.getVehicleOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async updateVehicle (query: BaseQuery, body: Dto.UpdateVehicle.Body) {
    const res = await this.updateVehicleOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async deleteVehicle (query: Dto.DeleteVehicle.Query) {
    const res = await this.deleteVehicleOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async updateVehicleRoute (query: BaseQuery, body: Dto.UpdateVehicleRoute.Body) {
    const res = await this.updateVehicleRouteOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async searchNoVehicleRoute (query: BaseQuery, body: Dto.SearchNoVehicleRoute.Body) {
    const res = await this.searchNoVehicleRouteOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async createVehicle (query: BaseQuery, body: Dto.CreateVehicle.Body) {
    const res = await this.createVehicleOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async updateVehicleStatus (query: BaseQuery, body: Dto.UpdateVehicleStatus.Body) {
    const res = await this.updateVehicleStatusOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async createVehicleWithExcel (query: BaseQuery, body: Dto.CreateVehicleWithExcel.Body) {
    const res = await this.createVehicleWithExcelOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default VehicleService
