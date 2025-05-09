/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 17:13:03
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Category
} from '$errors'

import {
  SearchOrderGroupDestination
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
import { DataStatus } from '@zuellig-pharma-2/database'

/** 查詢訂單目的地列表 */
@Injectable()
@APIInfo('SEARCH_ORDER_GROUP_DESTINATION', 'Order')
export class Operator extends BaseOperator<BaseSearchResult<SearchOrderGroupDestination.Data>, BaseQuery, SearchOrderGroupDestination.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify(req: { body: SearchOrderGroupDestination.Body }) {
    const data = await this.validateDto(SearchOrderGroupDestination.Body, req.body)

    return data
  }

  async operator(query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const statusWTFind = searchQuery.findErrorOrder === true ? DataStatus.INACTIVE : DataStatus.ACTIVE

      const count = await this.prisma.webOrderGroupDestination.count({
        where: {
          orderGroupId: this.prismaHelper.processSearchCondition(searchQuery.orderGroupId) ?? '',
          depot: this.prismaHelper.processSearchCondition(searchQuery.depot),
          route: this.prismaHelper.processSearchCondition(searchQuery.route, true),
          status: statusWTFind
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.webOrderGroupDestination.findMany({
        where: {
          orderGroupId: this.prismaHelper.processSearchCondition(searchQuery.orderGroupId) ?? '',
          depot: this.prismaHelper.processSearchCondition(searchQuery.depot),
          route: this.prismaHelper.processSearchCondition(searchQuery.route, true),
          status: statusWTFind
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ id: 'asc' }], { id: 'id', code: 'code', depot: 'depot', route: 'route' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          code: true,
          name: true,
          address: true,
          formatAddress: true,
          route: true,
          depot: true,
          deliveryDemand: true,
          typeControlled: true,
          typeRefrigerated: true,
          typeExperimental: true,
          typeSample: true,
          typeCash: true,
          price: true,
          isError: true,
          error: true
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        code: d.code,
        name: d.name,
        address: d.address,
        formatAddress: d.formatAddress,
        route: d.route,
        depot: d.depot,
        deliveryDemand: d.deliveryDemand ?? '0',
        typeControlled: d.typeControlled,
        typeRefrigerated: d.typeRefrigerated,
        typeExperimental: d.typeExperimental,
        typeSample: d.typeSample,
        typeCash: d.typeCash,
        price: d.price,
        isError: searchQuery.findErrorOrder === true ? d.isError : undefined,
        error: searchQuery.findErrorOrder === true ? d.error : undefined,
      }))// satisfies SearchOrderGroupDestination.Data)

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
