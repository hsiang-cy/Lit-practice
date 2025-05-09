/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:37:05
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Area
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  SearchCalculateJob
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

/** 查詢計算任務列表 */
@Injectable()
@APIInfo('SEARCH_CALCULATE_JOB', 'CalculateJob')
export class Operator extends BaseOperator<BaseSearchResult<SearchCalculateJob.Data>, BaseQuery, SearchCalculateJob.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchCalculateJob.Body }) {
    const data = await this.validateDto(SearchCalculateJob.Body, req.body)

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const count = await this.prisma.calculateJob.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          orderGroupId: this.prismaHelper.processSearchCondition(searchQuery.orderGroupId),
          planStartDate: this.prismaHelper.processTimeInterval(searchQuery.planStartDateStart, searchQuery.planStartDateEnd),
          state: this.prismaHelper.processSearchCondition(searchQuery.state),
          orderGroup: {
            area: searchQuery.area === Area.WHOLE ? undefined : searchQuery.area
          }
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.calculateJob.findMany({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          orderGroupId: this.prismaHelper.processSearchCondition(searchQuery.orderGroupId),
          planStartDate: this.prismaHelper.processTimeInterval(searchQuery.planStartDateStart, searchQuery.planStartDateEnd),
          state: this.prismaHelper.processSearchCondition(searchQuery.state),
          orderGroup: {
            area: searchQuery.area === Area.WHOLE ? undefined : searchQuery.area
          }
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ id: 'desc' }], { id: 'id', orderGroupId: 'orderGroupId', state: 'state', createTime: 'createTime' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          createTime: true,
          orderGroupId: true,
          planStartDate: true,
          count: true,
          comment: true,
          rawComment: true,
          state: true,
          creator: true
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        createTime: d.createTime,
        orderGroupId: d.orderGroupId ?? '',
        planStartDate: d.planStartDate.toISOString(),
        count: d.count,
        comment: d.comment ?? '',
        rawComment: d.rawComment ?? '',
        state: d.state,
        creator: d.creator
      }) satisfies SearchCalculateJob.Data)

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
