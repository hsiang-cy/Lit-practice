/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:59:45
 * @LastEditors:Kerwin
 * @LastEditTime:2024-01-03 17:13:19
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
  ForbiddenException
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

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  async catch (
    exception: ForbiddenException,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<FastifyReply>()
    const req = ctx.getRequest<FastifyRequest>()
    const status = exception.getStatus()

    // 取得error物件，如果不是自定義的錯誤物件，則回傳PermissionDenied
    const errorObject = exception.getResponse()
    const error = isErrorObject(errorObject) ? errorObject : Category.AuthorizationError.PermissionDenied

    const errorResponse = await (new BaseErrorOperator(
      req.query,
      req.body,
      [error]
    ).processResponse())

    await res.status(status).send(errorResponse)
  }
}
