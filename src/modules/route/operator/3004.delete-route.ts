/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:35:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 17:04:08
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
  DeleteRoute
} from '$modules/route/dto'

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

/** 刪除路線 */
@Injectable()
@APIInfo('DELETE_ROUTE', 'Route')
export class Operator extends BaseOperator<SuccessWithIdResponse, DeleteRoute.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { query: DeleteRoute.Query }) {
    const data = await this.validateDto(DeleteRoute.Query, req.query)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 確認fleet是否存在
    const routeCount = await this.prisma.webRoute.count({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (routeCount === 0) throw Category.DataNotExist.route

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
        await trx.webRoute.update({
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
        await trx.webVehicleRoute.updateMany({
          where: {
            routeId: data.id,
            status: DataStatus.ACTIVE
          },
          data: {
            status: DataStatus.DELETED,
            updater: currentAccount.id
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
        throw Category.Route.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
