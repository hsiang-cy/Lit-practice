/*
 * @Author:Kerwin
 * @Date:2024-04-21 17:01:52
 * @LastEditors:Kerwin
 * @LastEditTime:2025-01-14 11:26:34
 * @Description:
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'

import FastifyMulter from 'fastify-multer'

import {
  Observable,
  from,
  switchMap
} from 'rxjs'

import {
  InvalidFieldException
} from '$exception'

@Injectable()
export class FileFastifyInterceptor implements NestInterceptor {
  private upload: any

  constructor (fieldName: string) {
    this.upload = FastifyMulter().single(fieldName)
  }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    return from(new Promise((resolve, reject) => {
      this.upload(request, response, (err: any) => {
        if (err) {
          if (err.name === 'MulterError') {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
              reject(new InvalidFieldException(err.field))
            }
          }
          reject(err)
        } else {
          resolve(request.file)
        }
      })
    })).pipe(
      switchMap(() => next.handle())
    )
  }
}
