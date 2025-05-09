/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:35:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-10 10:19:47
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import { DataStatus } from '@zuellig-pharma-2/database'
import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  UpdateVehicleStatus
} from '$modules/vehicle/dto'

import {
  PrismaHelper,
  PrismaService,
  ZUHelper
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery,
  SuccessWithIdResponse
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 編輯車輛狀態 */
@Injectable()
@APIInfo('UPDATE_VEHICLE_STATUS', 'Vehicle')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, UpdateVehicleStatus.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { body: UpdateVehicleStatus.Body }) {
    const data = await this.validateDto(UpdateVehicleStatus.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 檢查車輛是否存在
    const vehicle = await this.prisma.webVehicle.findFirst({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (TypeCheck.isNull(vehicle)) throw Category.DataNotExist.vehicle

    return {
      ...data,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data

      await this.prisma.webVehicle.update({
        where: {
          id: data.id
        },
        data: {
          status: data.status,
          updater: currentAccount.id
        },
        select: { id: true }
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
