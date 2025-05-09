/*
 * @Author:Kerwin
 * @Date:2024-09-11 14:51:49
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:13:18
 * @Description:
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'

import {
  Reflector
} from '@nestjs/core'

import TypeCheck from '@saico/type-check-js'

import {
  AccessTokenStatus,
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  ClsService
} from 'nestjs-cls'

import { Category } from '$errors'
import {
  Config,
  PrismaService,
  tracer
} from '$shared-service'

import {
  CheckAuthErrorType,
  handleCommonErrorSpan
} from '$utility'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly cls: ClsService,
    private readonly config: Config,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext) {
    const span = tracer.startSpan('AccessTokenGuard')

    try {
      // 取得 token 資訊
      const accessToken = this.getAccessToken(context)

      // 根據 guardParams 來驗證權限
      const accountToken = await this.prisma.accessToken.findFirst({
        where: {
          token: accessToken,
          status: AccessTokenStatus.SIGN_IN
        }
      })
      if (TypeCheck.isNull(accountToken)) throw Category.Auth.AuthenticationFailed()

      const account = await this.prisma.account.findFirst({
        where: {
          id: accountToken.accountId,
          status: DataStatus.ACTIVE
        }
      })
      if (TypeCheck.isNull(account)) throw Category.AuthorizationError.AccountNotExist

      // 都通過驗證後，將 account 資訊存入 cls
      this.cls.set('account', account)
    } catch (error) {
      handleCommonErrorSpan(span, error, '驗證 Access Token 發生錯誤')

      // 驗證錯誤類型
      CheckAuthErrorType(error)

      throw new UnauthorizedException(error)
    } finally {
      span.end()
    }

    return true
  }

  /**
   * 從 request header 取得 access token
   * @param context ExecutionContext
   * @returns access token
   */
  private getAccessToken(context: ExecutionContext) {
    return context.switchToHttp().getRequest().headers.authorization?.split(' ')[1] ?? ''
  }
}
