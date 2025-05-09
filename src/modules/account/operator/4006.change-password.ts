/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 14:04:51
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
  ChangePassword
} from '$modules/account/dto'

import {
  PrismaHelper,
  PrismaService,
  ZUHelper,
  Encryption
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

/** 變更密碼 */
@Injectable()
@APIInfo('CHANGE_PASSWORD', 'Account')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, ChangePassword.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly zuHelper: ZUHelper,
    private readonly encrypt: Encryption
  ) {
    super()
  }

  async verify (req: { body: ChangePassword.Body }) {
    const data = await this.validateDto(ChangePassword.Body, req.body)

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof ChangePassword.Body)[] = ['password']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) throw Category.DataNotModified.UnknownError

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

    const password = this.encrypt.encryption(data.password)

    return {
      ...data,
      password,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data
      // 密碼需要在進行加密過, 暫時先不處理這一段
      await this.prisma.account.update({
        where: {
          id: data.id
        },
        data: {
          password: data.password,
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
        throw Category.Account.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
