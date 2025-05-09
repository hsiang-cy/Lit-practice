/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 14:48:56
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import { DataStatus, AccessTokenStatus } from '@zuellig-pharma-2/database'
import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  SingOut
} from '$modules/auth/dto'

import {
  PrismaHelper,
  PrismaService,
  SnowflakeService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery,
  SuccessWithoutIdResponse
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 登出 */
@Injectable()
@APIInfo('SING_OUT', 'Auth')
export class Operator extends BaseOperator<SuccessWithoutIdResponse, BaseQuery, SingOut.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService
  ) {
    super()
  }

  async verify (req: { body: SingOut.Body }) {
    const data = await this.validateDto(SingOut.Body, req.body)

    const account = await this.prisma.account.findFirst({
      where: {
        id: data.accountId,
        status: {
          not: DataStatus.DELETED
        }
      }
    })

    if (account === null) throw Category.DataNotExist.account

    const accountToken = await this.prisma.accessToken.findFirst({
      where: {
        accountId: data.accountId,
        token: data.token,
        status: AccessTokenStatus.SIGN_IN
      }
    })
    if (accountToken === null) throw Category.DataNotExist.accountToken

    return {
      account,
      accountToken,
      deviceId: data.deviceId,
      platform: data.platform,
      ip: data.ip,
      userAgent: data.userAgent,
      token: data.token
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const account = data.account
      const accountToken = data.accountToken

      await this.prisma.$transaction(async trx => {
        await trx.signOutRecord.create({
          data: {
            id: this.snowFlake.snowflakeId(),
            status: DataStatus.ACTIVE,
            accountId: account.id,
            deviceId: data.deviceId,
            platform: data.platform,
            info: {
              ip: data.ip ?? [],
              userAgent: data.userAgent ?? ''
            },
            creator: account.id,
            updater: account.id
          }
        })

        await trx.accessToken.update({
          where: {
            id: accountToken.id
          },
          data: {
            status: AccessTokenStatus.SIGN_OUT,
            creator: account.id,
            updater: account.id
          }
        })
      })

      return {
        success: true
      } satisfies SuccessWithoutIdResponse
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Auth.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
