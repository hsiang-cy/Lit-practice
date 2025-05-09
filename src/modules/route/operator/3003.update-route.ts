/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 17:14:12
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
  UpdateRoute
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

/** 編輯路線資訊 */
@Injectable()
@APIInfo('UPDATE_ROUTE', 'Route')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, UpdateRoute.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { body: UpdateRoute.Body }) {
    const data = await this.validateDto(UpdateRoute.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof UpdateRoute.Body)[] = ['area', 'name', 'comment']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) throw Category.DataNotModified.UnknownError

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

    // 如果有傳入name，是否有重複 (不包含自己)
    if (TypeCheck.isNotEmpty(data.name)) {
      const nameCount = await this.prisma.webRoute.count({
        where: {
          id: {
            not: data.id
          },
          name: {
            equals: data.name,
            mode: 'insensitive'
          },
          status: {
            not: DataStatus.DELETED
          }
        }
      })
      if (nameCount > 0) throw Category.DataDuplicate.name
    }

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
          area: this.prismaHelper.processOptionalInput(data.area, true),
          name: this.prismaHelper.processOptionalInput(data.name, true),
          comment: this.prismaHelper.processOptionalInput(data.comment),
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
