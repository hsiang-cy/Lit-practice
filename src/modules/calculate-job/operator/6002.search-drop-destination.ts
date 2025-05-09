/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:36:47
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Location,
  TimeWindow
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  SearchDropDestination
} from '$modules/calculate-job/dto'

import {
  PrismaHelper,
  PrismaService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery,
  BaseSearchResult,
  CalculateJobDestinationInfo
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 查詢無法分派的目的地 */
@Injectable()
@APIInfo('SEARCH_DROP_DESTINATION', 'CalculateJob')
export class Operator extends BaseOperator<BaseSearchResult<SearchDropDestination.Data>, BaseQuery, SearchDropDestination.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchDropDestination.Body }) {
    const data = await this.validateDto(SearchDropDestination.Body, req.body)

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const count = await this.prisma.dispatchDropDestination.count({
        where: {
          calculateJobId: searchQuery.calculateJobId
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.dispatchDropDestination.findMany({
        where: {
          calculateJobId: searchQuery.calculateJobId
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ id: 'asc' }], { id: 'id' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          reason: true,
          calculateJobDestination: {
            select: {
              refId: true,
              code: true,
              deliveryDemand: true,
              location: true,
              timeWindow: true,
              info: true
            }
          }
        }
      })

      const data = rawData.map(d => {
        const destination = d.calculateJobDestination
        const info = destination.info as unknown as CalculateJobDestinationInfo
        const location = destination.location as unknown as Location

        return {
          id: d.id,
          reason: d.reason,
          code: destination.code ?? '',
          name: info.name,
          address: location.source ?? '',
          formatAddress: location.formatted ?? '',
          timeWindow: destination.timeWindow as unknown as TimeWindow[],
          deliveryDemand: destination.deliveryDemand ?? '0',
          route: info.route,
          depot: info.depot,
          typeControlled: info.typeControlled,
          typeRefrigerated: info.typeRefrigerated,
          typeExperimental: info.typeExperimental,
          typeSample: info.typeSample,
          typeCash: info.typeCash,
          price: info.price
        } satisfies SearchDropDestination.Data
      })

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
