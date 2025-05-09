/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:10:42
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
  CreateAccount
} from '$modules/account/dto'

import {
  PrismaHelper,
  PrismaService,
  SnowflakeService,
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

/** 新增登錄者 */
@Injectable()
@APIInfo('CREATE_ACCOUNT', 'Account')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, CreateAccount.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper,
    private readonly encrypt: Encryption
  ) {
    super()
  }

  async verify (req: { body: CreateAccount.Body }) {
    const data = await this.validateDto(CreateAccount.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 確認帳號是否重複
    const accountCount = await this.prisma.account.count({
      where: {
        account: data.account,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (accountCount > 0) throw Category.DataDuplicate.account

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

      // 如果code是重複在被刪除的車隊中，則更新該筆資料
      const newFleet = await this.prisma.account.upsert({
        where: {
          account: data.account,
          status: DataStatus.DELETED
        },
        update: {
          id: this.snowFlake.snowflakeId(),
          area: data.area,
          type: data.type,
          account: data.account,
          password: data.password,
          comment: data.comment,
          name: data.name,
          createTime: new Date(),
          updateTime: new Date(),
          status: DataStatus.ACTIVE
        },
        create: {
          id: this.snowFlake.snowflakeId(),
          area: data.area,
          type: data.type,
          account: data.account,
          password: data.password,
          comment: data.comment,
          name: data.name,
          creator: currentAccount.id,
          updater: currentAccount.id,
          status: DataStatus.ACTIVE
        },
        select: { id: true }
      })

      return {
        success: true,
        id: newFleet.id
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
