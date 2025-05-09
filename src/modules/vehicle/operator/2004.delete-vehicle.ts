/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:35:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-09 15:25:02
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  DeleteVehicle
} from '$modules/vehicle/dto'

import {
  PrismaHelper,
  PrismaService,
  ZUHelper
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  SuccessWithIdResponse
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 刪除車輛 */
@Injectable()
@APIInfo('DELETE_VEHICLE', 'Vehicle')
export class Operator extends BaseOperator<SuccessWithIdResponse, DeleteVehicle.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,

    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { query: DeleteVehicle.Query }) {
    const data = await this.validateDto(DeleteVehicle.Query, req.query)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 確認vehicle是否存在
    const vehicleCount = await this.prisma.webVehicle.count({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (vehicleCount === 0) throw Category.DataNotExist.vehicle

    return {
      ...data,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data
      // 刪除 webFleet 主表資料
      await this.prisma.$transaction(async trx => {
        await trx.webVehicle.update({
          where: {
            id: data.id
          },
          data: {
            status: DataStatus.DELETED,
            updater: currentAccount.id
          },
          select: { id: true }
        })
        // 刪除 webFleetMember 關聯車隊資料
        await trx.webFleetMember.updateMany({
          where: {
            vehicleId: data.id,
            status: DataStatus.ACTIVE
          },
          data: {
            status: DataStatus.DELETED,
            updater: currentAccount.id
          }
        })
        // 刪除 webVehicleRoute 關聯路線資料
        await trx.webVehicleRoute.deleteMany({
          where: {
            vehicleId: data.id
          }
        })
      })

      return {
        success: true,
        id: data.id
      } satisfies SuccessWithIdResponse
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
