/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:59:48
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  DataStatus,
  Location,
  Area
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  SearchFleet
} from '$modules/fleet/dto'

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

/** 取得車隊管理清單 */
@Injectable()
@APIInfo('SEARCH_FLEET', 'Fleet')
export class Operator extends BaseOperator<BaseSearchResult<SearchFleet.Data>, BaseQuery, SearchFleet.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify(req: { body: SearchFleet.Body }) {
    const data = await this.validateDto(SearchFleet.Body, req.body)

    return {
      ...data
    }
  }

  async operator(query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const count = await this.prisma.webFleet.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: this.prismaHelper.processSearchCondition(searchQuery.area === Area.WHOLE ? undefined : searchQuery.area),
          code: this.prismaHelper.processSearchCondition(searchQuery.code, true),
          status: this.prismaHelper.processSearchCondition(searchQuery.status) ?? DataStatus.ACTIVE,
          AND: [
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.name, 'name') }
          ]
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.webFleet.findMany({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          code: this.prismaHelper.processSearchCondition(searchQuery.code, true),
          area: this.prismaHelper.processSearchCondition(searchQuery.area === Area.WHOLE ? undefined : searchQuery.area),
          status: this.prismaHelper.processSearchCondition(searchQuery.status) ?? DataStatus.ACTIVE,
          AND: [
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.name, 'name') }
          ]
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ updateTime: 'desc' }], { id: 'id', code: 'code', priority: 'priority', updateTime: 'updateTime' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          code: true,
          name: true,
          priority: true,
          startLocation: true,
          endLocation: true,
          area: true,
          status: true,
          comment: true,
          members: {
            where: {
              status: { not: DataStatus.DELETED }
            },
            select: { id: true }
          }
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        code: d.code,
        name: d.name,
        area: d.area as Area,
        startLocation: d.startLocation as Location ?? {},
        endLocation: d.endLocation as Location ?? {},
        priority: d.priority,
        status: d.status,
        vehicleCounts: d.members.length,
        members: d.members.map(m => m.id),
        comment: d.comment || ''
      }))// TODO satisfies SearchFleet.Data

      return {
        count,
        data
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Fleet.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
