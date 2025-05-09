/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:00:06
 * @LastEditors:Kerwin
 * @LastEditTime:2023-09-28 12:00:08
 * @Description:
 */

import type {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException
} from '@nestjs/common'

import {
  Category
} from '$errors'

import {
  BaseErrorOperator
} from '$types'

import {
  isErrorObject
} from '$utility'

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  async catch (
    exception: UnauthorizedException,
    host: ArgumentsHost
  ): Promise<void> {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<FastifyReply>()
    const req = ctx.getRequest<FastifyRequest>()
    const status = exception.getStatus()

    // 取得error物件，如果不是自定義的錯誤物件，則回傳AuthenticationFailed
    const errorObject = exception.getResponse()
    const error = isErrorObject(errorObject) ? errorObject : Category.AuthenticationError.AuthenticationFailed

    const errorResponse = await (new BaseErrorOperator(
      req.query,
      req.body,
      [error]
    ).processResponse())

    await res.status(status).send(errorResponse)
  }
}
