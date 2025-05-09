/*
 * @Author:Kerwin
 * @Date:2024-04-21 17:01:52
 * @LastEditors:Kerwin
 * @LastEditTime:2025-01-14 11:28:13
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
  PayloadTooLargeException,
  UnsupportedMediaTypeException
} from '@nestjs/common'

import {
  Category
} from '$errors'

import {
  FileEmptyException,
  InvalidFieldException,
  ExceededFileLimitException
} from '$exception'

import {
  BaseErrorOperator
} from '$types'

@Catch(FileEmptyException, InvalidFieldException, ExceededFileLimitException, UnsupportedMediaTypeException, PayloadTooLargeException)
export class FileErrorExceptionFilter implements ExceptionFilter {
  async catch (exception: FileEmptyException | UnsupportedMediaTypeException | PayloadTooLargeException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<FastifyReply>()
    const req = ctx.getRequest<FastifyRequest>()
    const status = exception.getStatus()

    const fileName = exception.message // message會是檔案名稱
    const error = this.getError(exception, fileName)

    const errorResponse = await (new BaseErrorOperator(
      req.query,
      req.body,
      [error]
    ).processResponse())

    await res.status(status).send(errorResponse)
  }

  private getError (exception: any, fileName: string) {
    if (exception instanceof FileEmptyException) {
      return Category.InputFileError.FileEmpty.FileEmpty(fileName)
    } else if (exception instanceof InvalidFieldException) {
      return Category.InputFileError.InvalidField.NotAllowedField(fileName)
    } else if (exception instanceof ExceededFileLimitException) {
      return Category.InputFileError.ExceededFileLimit.FileCountLimitExceeded(fileName)
    } else if (exception instanceof PayloadTooLargeException) {
      return Category.InputFileError.PayloadTooLarge.PayloadTooLarge(fileName)
    } else if (exception instanceof UnsupportedMediaTypeException) {
      return Category.InputFileError.UnsupportedMediaType.UnsupportedMediaType(fileName)
    } else {
      return Category.InputFileError.FileEmpty.UnknownError('UnknownError')
    }
  }
}
