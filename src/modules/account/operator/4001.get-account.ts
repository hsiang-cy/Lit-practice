/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 16:51:14
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  AccountType,
  Area,
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  GetAccount
} from '$modules/account/dto'

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

/** 取得單一登錄者資訊 */
@Injectable()
@APIInfo('GET_ACCOUNT', 'Account')
export class Operator extends BaseOperator<GetAccount.Data, GetAccount.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { query: GetAccount.Query }) {
    const data = await this.validateDto(GetAccount.Query, req.query)

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

    return data
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const account = await this.prisma.account.findFirst({
        where: {
          id: query.id,
          status: {
            not: DataStatus.DELETED
          }
        },
        select: {
          id: true,
          name: true,
          comment: true,
          area: true,
          status: true,
          account: true,
          type: true,
          updateTime: true
        }
      })

      if (TypeCheck.isNull(account)) return null
      const data = {
        id: account.id,
        account: account.account,
        type: account.type as AccountType,
        area: account.area as Area,
        name: account.name,
        comment: account.comment ?? '',
        status: account.status,
        updateTime: account.updateTime
      } satisfies GetAccount.Data

      return data
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
