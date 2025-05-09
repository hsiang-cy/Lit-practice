/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 17:17:37
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'
import {
  Area,
  DataStatus,
  Location,
  VehicleTimeWindow,
  VehicleType
} from '@zuellig-pharma-2/database'
import {
  Category
} from '$errors'

import {
  GetFleet
} from '$modules/fleet/dto'

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

/** 取得單筆車隊資料 */
@Injectable()
@APIInfo('GET_FLEET', 'Fleet')
export class Operator extends BaseOperator<GetFleet.Data, GetFleet.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { query: GetFleet.Query }) {
    const data = await this.validateDto(GetFleet.Query, req.query)

    // 確認fleet是否存在
    const fleetCount = await this.prisma.webFleet.count({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (fleetCount === 0) throw Category.DataNotExist.fleet

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const fleet = await this.prisma.webFleet.findFirst({
        where: {
          id: query.id,
          status: {
            not: DataStatus.DELETED
          }
        },
        select: {
          id: true,
          area: true,
          code: true,
          name: true,
          startLocation: true,
          endLocation:true,
          priority: true,
          status: true,
          members: {
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
// console.log('end:');
// console.log(typeof(fleet?.endLocation));
// console.log(fleet?.endLocation);

      if (TypeCheck.isNull(fleet)) return null
      const data = {
        id: fleet.id,
        area: fleet.area as Area,
        code: fleet.code,
        name: fleet.name,
        startLocation: fleet.startLocation as Location ?? {},
        endLocation: fleet.endLocation as Location ?? {},
        priority: fleet.priority,
        status: fleet.status,
        members: fleet.members.map(member => ({
          id: member.vehicle.id,
          memberId: member.id,
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
      } satisfies GetFleet.Data

      return data
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
