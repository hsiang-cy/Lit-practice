/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:35:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 17:04:17
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
  UpdateRouteStatus
} from '$modules/route/dto'

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

/** 編輯路線資料狀態 */
@Injectable()
@APIInfo('UPDATE_ROUTE_STATUS', 'Route')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, UpdateRouteStatus.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { body: UpdateRouteStatus.Body }) {
    const data = await this.validateDto(UpdateRouteStatus.Body, req.body)
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

      await this.prisma.webRoute.update({
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
        throw Category.Route.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
