/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:35:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 15:37:45
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
  DeleteFleet
} from '$modules/fleet/dto'

import {
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

/** 刪除車隊資料 */
@Injectable()
@APIInfo('DELETE_FLEET', 'Fleet')
export class Operator extends BaseOperator<SuccessWithIdResponse, DeleteFleet.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { query: DeleteFleet.Query }) {
    const data = await this.validateDto(DeleteFleet.Query, req.query)
    const currentAccount = this.zuHelper.getCurrentAccount()

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
        await trx.webFleet.update({
          where: {
            id: data.id
          },
          data: {
            status: DataStatus.DELETED,
            updater: currentAccount.id
          },
          select: { id: true }
        })

        // 刪除 webFleet 關聯車隊資料
        await trx.webFleetMember.deleteMany({
          where: {
            fleetId: data.id,
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
        throw Category.Fleet.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
