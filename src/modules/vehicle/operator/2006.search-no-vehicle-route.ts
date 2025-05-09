/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-10 16:45:41
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
  SearchNoVehicleRoute
} from '$modules/vehicle/dto'

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

/** 取得非該車輛的負責路線 */
@Injectable()
@APIInfo('SEARCH_NO_VEHICLE_ROUTE', 'Vehicle')
export class Operator extends BaseOperator<BaseSearchResult<SearchNoVehicleRoute.Data>, BaseQuery, SearchNoVehicleRoute.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchNoVehicleRoute.Body }) {
    const data = await this.validateDto(SearchNoVehicleRoute.Body, req.body)

    // 確認 vehicle 是否存在
    const vehicle = await this.prisma.webVehicle.findFirst({
      where: {
        id: data.query.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (vehicle == null) throw Category.DataNotExist.vehicle

    return {
      ...data,
      area: vehicle.area
    }
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const count = await this.prisma.webRoute.count({
        where: {
          area: this.prismaHelper.processSearchCondition(query.area),
          status: DataStatus.ACTIVE,
          vehicles: {
            none: {
              id: searchQuery.id
            }
          }
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.webRoute.findMany({
        where: {
          area: this.prismaHelper.processSearchCondition(query.area),
          status: DataStatus.ACTIVE,
          vehicles: {
            none: {
              id: searchQuery.id
            }
          }
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ updateTime: 'desc' }], { id: 'id', status: 'status', updateTime: 'updateTime' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          area: true,
          name: true,
          comment: true,
          status: true
        }
      })
      const data = rawData.map(d => ({ ...d, comment: (d.comment ?? '') }) satisfies SearchNoVehicleRoute.Data)

      return {
        count,
        data
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Vehicle.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
