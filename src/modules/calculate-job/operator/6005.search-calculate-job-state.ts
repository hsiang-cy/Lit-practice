/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:37:21
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Category
} from '$errors'

import {
  SearchCalculateJobState
} from '$modules/calculate-job/dto'

import {
  PrismaHelper,
  PrismaService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery,
  BaseSearchResult
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 查詢計算任務狀態列表 */
@Injectable()
@APIInfo('SEARCH_CALCULATE_JOB_STATE', 'CalculateJob')
export class Operator extends BaseOperator<BaseSearchResult<SearchCalculateJobState.Data>, BaseQuery, SearchCalculateJobState.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchCalculateJobState.Body }) {
    const data = await this.validateDto(SearchCalculateJobState.Body, req.body)

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const count = await this.prisma.calculateJob.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id)
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.calculateJob.findMany({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id)
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ id: 'asc' }], { id: 'id', state: 'state' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          state: true
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        state: d.state
      }) satisfies SearchCalculateJobState.Data)

      return {
        count,
        data
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.CalculateJob.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
