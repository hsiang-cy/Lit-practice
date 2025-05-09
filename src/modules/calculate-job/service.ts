/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 14:42:26
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
export class CalculateJobService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '600' }
  get name (): string { return 'CALCULATE_JOB' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly getCalculateJobRouteOperator: Operator.GetCalculateJobRoute,
    private readonly getCalculateJobRouteTaskOperator: Operator.GetCalculateJobRouteTask,
    private readonly searchDropDestinationOperator: Operator.SearchDropDestination,
    private readonly getCalculateJobRoutePathOperator: Operator.GetCalculateJobRoutePath,
    private readonly searchCalculateJobOperator: Operator.SearchCalculateJob,
    private readonly searchCalculateJobStateOperator: Operator.SearchCalculateJobState
  ) {
    super()
  }

  async getCalculateJobRoute (query: Dto.GetCalculateJobRoute.Query) {
    const res = await this.getCalculateJobRouteOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async getCalculateJobRouteTask (query: Dto.GetCalculateJobRouteTask.Query) {
    const res = await this.getCalculateJobRouteTaskOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async searchDropDestination (query: BaseQuery, body: Dto.SearchDropDestination.Body) {
    const res = await this.searchDropDestinationOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async getCalculateJobRoutePath (query: Dto.GetCalculateJobRoutePath.Query) {
    const res = await this.getCalculateJobRoutePathOperator.processResponse({ query }, this.getModuleInfo())
    return res
  }

  async searchCalculateJob (query: BaseQuery, body: Dto.SearchCalculateJob.Body) {
    const res = await this.searchCalculateJobOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async searchCalculateJobState (query: BaseQuery, body: Dto.SearchCalculateJobState.Body) {
    const res = await this.searchCalculateJobStateOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default CalculateJobService
