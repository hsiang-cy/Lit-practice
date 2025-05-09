/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 11:45:12
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
  SearchOrder
} from '$modules/order/dto'

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

/** 查詢訂單列表 */
@Injectable()
@APIInfo('SEARCH_ORDER', 'Order')
export class Operator extends BaseOperator<BaseSearchResult<SearchOrder.Data>, BaseQuery, SearchOrder.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchOrder.Body }) {
    const data = await this.validateDto(SearchOrder.Body, req.body)

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const count = await this.prisma.webOrderGroup.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: searchQuery.area === Area.WHOLE ? undefined : searchQuery.area,
          startTime: this.prismaHelper.processTimeInterval(searchQuery.startTimeStart, searchQuery.startTimeEnd)
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.webOrderGroup.findMany({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: searchQuery.area === Area.WHOLE ? undefined : searchQuery.area,
          startTime: this.prismaHelper.processTimeInterval(searchQuery.startTimeStart, searchQuery.startTimeEnd)
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ id: 'asc' }], { id: 'id', area: 'area', createTime: 'createTime', startTime: 'startTime', state: 'state' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          area: true,
          createTime: true,
          startTime: true,
          comment: true,
          state: true,
          creator: true,
          lastCalculateTime: true
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        area: d.area as Area,
        createTime: d.createTime,
        startTime: d.startTime.toISOString(),
        lastCalculateTime: d.lastCalculateTime?.toISOString() ?? '',
        comment: d.comment ?? '',
        state: d.state,
        creator: d.creator
      }) satisfies SearchOrder.Data)

      return {
        count,
        data
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Order.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
