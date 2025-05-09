/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:35:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-10 10:19:34
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  UpdateFleetStatus
} from '$modules/fleet/dto'

import {
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

/** 編輯車隊狀態 */
@Injectable()
@APIInfo('UPDATE_FLEET_STATUS', 'Fleet')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, UpdateFleetStatus.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { body: UpdateFleetStatus.Body }) {
    const data = await this.validateDto(UpdateFleetStatus.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 檢查車隊是否存在
    const fleetCount = await this.prisma.webFleet.count({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (fleetCount === 0) throw Category.DataNotExist.fleet

    return {
      ...data,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data

      await this.prisma.webFleet.update({
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
        throw Category.Fleet.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
