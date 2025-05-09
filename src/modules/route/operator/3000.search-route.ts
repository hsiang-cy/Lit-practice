/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 16:51:45
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import { Area, DataStatus } from '@zuellig-pharma-2/database'
import {
  Category
} from '$errors'

import {
  SearchRoute
} from '$modules/route/dto'

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

/** 路線管理清單 */
@Injectable()
@APIInfo('SEARCH_ROUTE', 'Route')
export class Operator extends BaseOperator<BaseSearchResult<SearchRoute.Data>, BaseQuery, SearchRoute.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchRoute.Body }) {
    const data = await this.validateDto(SearchRoute.Body, req.body)

    return {
      ...data
    }
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}
      const count = await this.prisma.webRoute.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: this.prismaHelper.processSearchCondition(searchQuery.area === Area.WHOLE ? undefined : searchQuery.area ),
          status: this.prismaHelper.processSearchCondition(searchQuery.status) ?? DataStatus.ACTIVE,
          AND: [
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.name, 'name') }
          ]
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.webRoute.findMany({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: this.prismaHelper.processSearchCondition(searchQuery.area === Area.WHOLE ? undefined : searchQuery.area ),
          status: this.prismaHelper.processSearchCondition(searchQuery.status) ?? DataStatus.ACTIVE,
          AND: [
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.name, 'name') }
          ]
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ updateTime: 'desc' }], { id: 'id', area: 'area', name: 'name', updateTime: 'updateTime' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          name: true,
          comment: true,
          area: true,
          status: true,
          updateTime: true,
          vehicles: {
            where: {
              status: { not: DataStatus.DELETED }
            },
            select: { id: true }
          }
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        area: d.area as Area,
        name: d.name,
        comment: d.comment ?? '',
        status: d.status,
        updateTime: d.updateTime,
        vehicleCounts: d.vehicles.length
      })satisfies SearchRoute.Data)

      return {
        count,
        data
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Route.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
