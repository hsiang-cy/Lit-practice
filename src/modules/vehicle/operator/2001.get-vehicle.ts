/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 17:16:55
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  Area,
  Location,
  DataStatus,
  VehicleTimeWindow,
  VehicleType
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  GetVehicle
} from '$modules/vehicle/dto'

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

/** 取得單筆車輛資訊 */
@Injectable()
@APIInfo('GET_VEHICLE', 'Vehicle')
export class Operator extends BaseOperator<GetVehicle.Data, GetVehicle.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { query: GetVehicle.Query }) {
    const data = await this.validateDto(GetVehicle.Query, req.query)

    // 確認 vehicle 是否存在
    const vehicleCount = await this.prisma.webVehicle.count({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (vehicleCount === 0) throw Category.DataNotExist.vehicle

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const vehicle = await this.prisma.webVehicle.findFirst({
        where: {
          id: query.id,
          status: {
            not: DataStatus.DELETED // 排除已刪除的資料
          }
        },
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
                  name: true,
                  area: true,
                  code: true,
                  startLocation: true,
                  priority: true,
                  status: true
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
                  name: true,
                  area: true,
                  status: true
                }
              }
            }
          }
        }
      })

      if (TypeCheck.isNull(vehicle)) return null

      const data = {
        id: vehicle.id,
        area: vehicle.area as Area,
        code: vehicle.code,
        driverName: vehicle.driverName,
        timeWindow: vehicle.timeWindow as VehicleTimeWindow ?? {},
        maxCapacity: vehicle.maxCapacity ?? '-1',
        type: vehicle.type as VehicleType,
        forceUse: vehicle.forceUse,
        forceStart: vehicle.forceStart,
        maxDrivingDistance: vehicle.maxDrivingDistance ?? -1,
        regularWorkTime: vehicle.regularWorkTime ?? -1,
        maxDrivingTime: vehicle.maxDrivingTime ?? -1,
        status: vehicle.status,
        tonnage: vehicle.tonnage ?? '',
        size: vehicle.size ?? '',
        volume: vehicle.volume ?? '',
        fleets: vehicle.members.map(m => {
          return {
            ...m.fleet,
            fleetId: m.fleet.id,
            area: m.fleet.area as Area,
            startLocation: m.fleet.startLocation as Location
          }
        }),
        routes: vehicle.routes.map(r => {
          return {
            ...r.route,
            routeId: r.route.id
          }
        })
      } satisfies GetVehicle.Data

      return data
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
