/*
 * @Author:Kerwin
 * @Date:2024-05-03 15:35:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 15:16:24
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
  DeleteAccount
} from '$modules/account/dto'

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

/** 刪除登錄者 */
@Injectable()
@APIInfo('DELETE_ACCOUNT', 'Account')
export class Operator extends BaseOperator<SuccessWithIdResponse, DeleteAccount.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { query: DeleteAccount.Query }) {
    const data = await this.validateDto(DeleteAccount.Query, req.query)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 確認 account 是否存在
    const accountCount = await this.prisma.account.count({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (accountCount === 0) throw Category.DataNotExist.account

    return {
      ...data,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data
      // 刪除 account 主表資料
      await this.prisma.$transaction(async trx => {
        await trx.account.update({
          where: {
            id: data.id
          },
          data: {
            status: DataStatus.DELETED,
            updater: currentAccount.id
          },
          select: { id: true }
        })
        // 刪除 accountToken 關聯車隊資料
        await trx.accessToken.updateMany({
          where: {
            accountId: data.id,
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
        throw Category.Account.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
