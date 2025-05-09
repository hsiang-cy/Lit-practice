/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 17:17:28
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import { Area, DataStatus, VehicleTimeWindow, VehicleType } from '@zuellig-pharma-2/database'
import {
  Category
} from '$errors'

import {
  GetRoute
} from '$modules/route/dto'

import {
  PrismaHelper,
  PrismaService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 取得單一路線資訊 */
@Injectable()
@APIInfo('GET_ROUTE', 'Route')
export class Operator extends BaseOperator<GetRoute.Data, GetRoute.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { query: GetRoute.Query }) {
    const data = await this.validateDto(GetRoute.Query, req.query)

    // 確認route是否存在
    const routeCount = await this.prisma.webRoute.count({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (routeCount === 0) throw Category.DataNotExist.route

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const route = await this.prisma.webRoute.findFirst({
        where: {
          id: query.id,
          status: {
            not: DataStatus.DELETED
          }
        },
        select: {
          id: true,
          area: true,
          name: true,
          comment: true,
          status: true,
          vehicles: {
            where: {
              status: {
                not: DataStatus.DELETED
              }
            },
            select: {
              id: true,
              vehicle: {
                select: {
                  id: true,
                  code: true,
                  driverName: true,
                  timeWindow: true,
                  maxCapacity: true,
                  regularWorkTime: true,
                  maxDrivingDistance: true,
                  maxDrivingTime: true,
                  tonnage: true,
                  size: true,
                  area: true,
                  volume: true,
                  type: true,
                  status: true
                }
              }
            }
          }
        }
      })

      if (TypeCheck.isNull(route)) return null
      const data = {
        id: route.id,
        area: route.area as Area,
        name: route.name,
        comment: route.comment ?? '',
        status: route.status,
        vehicles: route.vehicles.map(member => ({
          id: member.vehicle.id,
          area: member.vehicle.area as Area,
          tonnage: member.vehicle.tonnage ?? '',
          size: member.vehicle.size ?? '',
          volume: member.vehicle.volume ?? '',
          code: member.vehicle.code,
          type: member.vehicle.type as VehicleType,
          driverName: member.vehicle.driverName,
          timeWindow: member.vehicle.timeWindow as VehicleTimeWindow ?? {},
          maxCapacity: member.vehicle.maxCapacity ?? '-1',
          regularWorkTime: member.vehicle.regularWorkTime ?? -1,
          maxDrivingDistance: member.vehicle.maxDrivingDistance ?? -1,
          maxDrivingTime: member.vehicle.maxDrivingTime ?? -1,
          status: member.vehicle.status
        }))
      } satisfies GetRoute.Data

      return data
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
