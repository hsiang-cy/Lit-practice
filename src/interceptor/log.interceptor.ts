/*
 * @Author:Kerwin
 * @Date:2024-05-24 11:10:26
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-12 16:38:45
 * @Description:
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  Observable
} from 'rxjs'

import {
  tap,
  catchError
} from 'rxjs/operators'

import {
  Config,
  PinoLogger
} from '$shared-service'

import {
  isErrorObject
} from '$utility'

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor (
    private readonly appConfig: Config,
    private readonly logger: PinoLogger
  ) { }

  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const { method, url, headers, body, query } = request

    // 紀錄請求資訊
    this.logger.logRequest({ method, url, headers, body, query })

    return next.handle().pipe(
      tap((data) => {
        const { statusCode } = response

        // 紀錄回應資訊
        this.logger.logResponse(statusCode, { method, url }, data)
      }),
      catchError((error) => {
        const { status } = error

        // 紀錄錯誤資訊
        this.logger.logResponse(status, { method, url }, error.response)

        // 若為500以上的錯誤，且為production環境，則將每個錯誤訊息的extraInfo都變為空物件(詳細原因不需要傳給使用者)
        if (status >= 500 && this.appConfig.env === 'production' && TypeCheck.isNotEmpty(error.response?.errors)) {
          error.response.errors = error.response.errors.map((error: unknown) => {
            if (isErrorObject(error)) {
              error.extraInfo = {}
            }

            return error
          })
        }

        throw error
      })
    )
  }
}
