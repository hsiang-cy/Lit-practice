/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 14:46:50
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  JwtService
} from '@nestjs/jwt'

import {
  DataStatus,
  AccessTokenStatus
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  SingIn
} from '$modules/auth/dto'

import {
  Encryption,
  PrismaHelper,
  PrismaService,
  SnowflakeService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery
} from '$types'

import {
  isErrorObject,
  expiredTime
} from '$utility'

/** 登入 */
@Injectable()
@APIInfo('SING_IN', 'Auth')
export class Operator extends BaseOperator<SingIn.Data, BaseQuery, SingIn.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly encrypt: Encryption,
    private readonly jwtService: JwtService
  ) {
    super()
  }

  async verify (req: { body: SingIn.Body }) {
    const data = await this.validateDto(SingIn.Body, req.body)

    // 確認 account 是否存在
    const account = await this.prisma.account.findFirst({
      where: {
        account: data.account,
        status:  DataStatus.ACTIVE
      }
    })

    if (account === null) throw Category.DataNotExist.account

    // 確認帳號密碼是否相等
    if (!this.encrypt.compare(data.password, account.password)) throw Category.Auth.AuthenticationFailed()

    return {
      account,
      deviceId: data.deviceId,
      platform: data.platform,
      ip: data.ip,
      userAgent: data.userAgent
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const {
        account,
        deviceId,
        platform,
        ip,
        userAgent
      } = data

      const tokenId = this.snowFlake.snowflakeId()

      // 存無法被知道是什麼id的tokenId
      const payload = {
        id: tokenId
      }

      const token = this.jwtService.sign(payload)

      await this.prisma.$transaction(async trx => {
        await trx.signInRecord.create({
          data: {
            id: this.snowFlake.snowflakeId(),
            status: DataStatus.ACTIVE,
            accountId: account.id,
            deviceId,
            platform,
            info: {
              ip: ip ?? [],
              userAgent: userAgent ?? ''
            },
            creator: account.id,
            updater: account.id
          }
        })
        await trx.accessToken.create({
          data: {
            id: this.snowFlake.snowflakeId(),
            status: AccessTokenStatus.SIGN_IN,
            accountId: account.id,
            deviceId,
            platform,
            token,
            expireTime: expiredTime(7 * 24 * 60 * 60 * 1000),
            creator: account.id,
            updater: account.id
          }
        })
      })
      return {
        accountId: account.id,
        token
      }
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
