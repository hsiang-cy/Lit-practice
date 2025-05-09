/*
 * @Author:Kerwin
 * @Date:2024-04-21 17:01:52
 * @LastEditors:Kerwin
 * @LastEditTime:2025-01-14 11:27:09
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
  ExceededFileLimitException,
  InvalidFieldException
} from '$exception'

interface Field {
  name: string
  maxCount: number
}

@Injectable()
export class FileFieldsFastifyInterceptor implements NestInterceptor {
  private upload: any

  constructor (
    private fields: Field[]
  ) {
    this.upload = FastifyMulter().fields(fields)
  }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const allowedFields = this.fields.map((field: Field) => field.name)

    return from(new Promise((resolve, reject) => {
      this.upload(request, response, (err: any) => {
        if (err) {
          // 確認是 Multer 的錯誤，其他直接拋出
          if (err.name === 'MulterError') {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
              // 是否傳入非定義欄位
              if (err.field && !allowedFields.includes(err.field)) {
                reject(new InvalidFieldException(err.field))
              } else {
                // 如果不是上面的情況，則是超過欄位上限
                reject(new ExceededFileLimitException(err.field))
              }
            }
          }

          reject(err)
        } else {
          resolve(request.files)
        }
      })
    })).pipe(
      switchMap(() => next.handle())
    )
  }
}
