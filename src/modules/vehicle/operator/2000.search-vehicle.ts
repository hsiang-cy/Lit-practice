/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 17:17:12
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Area,
  DataStatus,
  VehicleTimeWindow,
  VehicleType
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  SearchVehicle
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

/** 取得車輛管理清單 */
@Injectable()
@APIInfo('SEARCH_VEHICLE', 'Vehicle')
export class Operator extends BaseOperator<BaseSearchResult<SearchVehicle.Data>, BaseQuery, SearchVehicle.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { body: SearchVehicle.Body }) {
    const data = await this.validateDto(SearchVehicle.Body, req.body)

    return {
      ...data
    }
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      const count = await this.prisma.webVehicle.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: this.prismaHelper.processSearchCondition(searchQuery.area === Area.WHOLE ? undefined : searchQuery.area ),
          code: this.prismaHelper.processSearchCondition(searchQuery.code, true),
          type: this.prismaHelper.processSearchCondition(searchQuery.type),
          status: this.prismaHelper.processSearchCondition(searchQuery.status) ?? DataStatus.ACTIVE,
          AND: [
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.driverName, 'driverName') }
          ]
        }
      })

      if (count === 0) return { count, data: [] }

      const rawData = await this.prisma.webVehicle.findMany({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.id),
          area: this.prismaHelper.processSearchCondition(searchQuery.area === Area.WHOLE ? undefined : searchQuery.area ),
          code: this.prismaHelper.processSearchCondition(searchQuery.code, true),
          type: this.prismaHelper.processSearchCondition(searchQuery.type),
          status: this.prismaHelper.processSearchCondition(searchQuery.status) ?? DataStatus.ACTIVE,
          AND: [
            { OR: this.prismaHelper.createFuzzySearchQuery(searchQuery.driverName, 'driverName') }
          ]
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ updateTime: 'desc' }], { id: 'id', code: 'code', type: 'type', status: 'status', updateTime: 'updateTime' }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          area: true,
          code: true,
          driverName: true,
          timeWindow: true,
          maxCapacity: true,
          type: true,
          forceUse: true,
          forceStart: true,
          maxDrivingDistance: true,
          regularWorkTime: true,
          maxDrivingTime: true,
          status: true,
          tonnage: true,
          size: true,
          volume: true,
          members: {
            where: {
              status: { not: DataStatus.DELETED }
            },
            select: {
              fleet: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          routes: {
            where: {
              status: { not: DataStatus.DELETED }
            },
            select: {
              route: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      })

      const data = rawData.map(d => ({
        id: d.id,
        area: d.area as Area,
        code: d.code,
        driverName: d.driverName,
        timeWindow: d.timeWindow as VehicleTimeWindow ?? {},
        maxCapacity: d.maxCapacity ?? '-1',
        type: d.type as VehicleType,
        forceUse: d.forceUse,
        forceStart: d.forceStart,
        maxDrivingDistance: d.maxDrivingDistance ?? -1,
        regularWorkTime: d.regularWorkTime ?? -1,
        maxDrivingTime: d.maxDrivingTime ?? -1,
        status: d.status,
        tonnage: d.tonnage ?? '',
        size: d.size ?? '',
        volume: d.volume ?? '',
        fleets: d.members.map(m => {
          return {
            id: m.fleet.id,
            name: m.fleet.name
          }
        }),
        routes: d.routes.map(r => {
          return {
            id: r.route.id,
            name: r.route.name
          }
        })
      }) satisfies SearchVehicle.Data)

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
