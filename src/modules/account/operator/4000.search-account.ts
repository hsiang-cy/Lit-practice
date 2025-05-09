/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 16:35:08
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
  SearchAccount
} from '$modules/account/dto'

import {
  PrismaHelper,
  PrismaService
} from '$shared-service'

import {
  AccountType,
  APIInfo,
  BaseOperator,
  BaseQuery,
  BaseSearchResult
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 取得登錄者清單 */
@Injectable()
@APIInfo('SEARCH_ACCOUNT', 'Account')
export class Operator extends BaseOperator<BaseSearchResult<SearchAccount.Data>, BaseQuery, SearchAccount.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchAccount.Body }) {
    const data = await this.validateDto(SearchAccount.Body, req.body)

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}
      const count = await this.prisma.account.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: this.prismaHelper.processSearchCondition(searchQuery.area === Area.WHOLE ? undefined : searchQuery.area ),
          status: this.prismaHelper.processSearchCondition(searchQuery.status) ?? DataStatus.ACTIVE,
          type: this.prismaHelper.processSearchCondition(searchQuery.type) ?? undefined,
          AND: [
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.name, 'name') },
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.account, 'account') }
          ]
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.account.findMany({
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
          account: true,
          type: true,
          updateTime: true
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        account: d.account,
        type: d.type as AccountType,
        area: d.area as Area,
        name: d.name,
        comment: d.comment ?? '',
        status: d.status,
        updateTime: d.updateTime
      })satisfies SearchAccount.Data)

      return {
        count,
        data
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Account.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
