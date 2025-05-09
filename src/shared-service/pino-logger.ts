/*
 * @Author:Kerwin
 * @Date:2024-07-08 13:47:09
 * @LastEditors: kerwin.hou kerwin.hou@gosaico.com
 * @LastEditTime: 2024-10-14 01:47:13
 * @Description:
 */

import {
  HttpStatus,
  Injectable
} from '@nestjs/common'

import {
  trace,
  context
} from '@opentelemetry/api'

import TypeCheck from '@saico/type-check-js'

import {
  pino,
  Logger
} from 'pino'

import {
  config as configInstance
} from './config'

import {
  serviceName,
  serviceInstanceId
} from './trace'

import {
  ServiceResponse
} from '$types'

interface RequestLog {
  method: string
  url: string
  headers: any
  body: any
  query: any
}

const getCurrentTraceInfo = () => {
  // 只有在使用signoz的時候才會需要在log中加入trace_id, span_id, trace_flags
  if (process.env.USE_SIGNOZ === 'true') {
    const span = trace.getSpan(context.active())

    if (TypeCheck.isNotUndefined(span)) {
      const spanContext = span.spanContext()

      return {
        trace_id: spanContext.traceId,
        span_id: spanContext.spanId,
        trace_flags: spanContext.traceFlags,
        service_name: serviceName,
        service_instance_id: serviceInstanceId
      }
    }
  }

  return {}
}

export const logger = pino({
  level: configInstance.appConfig.debug ? 'debug' : 'info',
  mixin () {
    return getCurrentTraceInfo()
  },
  transport: configInstance.appConfig.debug
    ? {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true
          }
        }
      ]
    }
    : undefined
})

@Injectable()
export class PinoLogger {
  readonly logger: Logger

  // 設定哪些路由不需要紀錄request
  private readonly ignoreRouteToRequest: Record<string, string> = {
    '/health': 'GET'
  }

  // 設定哪些路由不需要紀錄response
  private readonly ignoreRouteToResponse: Record<string, string> = {
    '/health': 'GET'
  }

  constructor () {
    this.logger = logger
  }

  /**
   * 紀錄request資訊
   * @param messageId 唯一訊息識別碼
   * @param req request資訊
   * @description
   * 1. 如果是ignore的路由，不紀錄request
   * 2. 如果是敏感信息，會將其設定為undefined
   * 3. 紀錄request資訊
   */
  logRequest (
    req: RequestLog
  ) {
    const {
      method,
      url,
      headers,
      body,
      query
    } = req ?? {}

    // 取得沒有query的url
    const urlRemoveQuery = url.split('?')[0]

    // 如果是ignore的路由，不紀錄request
    if (this.ignoreRouteToRequest[urlRemoveQuery] === method) {
      return
    }

    // 如果是敏感信息，需要將其設定為undefined => query, body都需要處理
    const needToRemove = configInstance.appConfig.services.logger.sensitiveRequestInfo
    const copyBody = JSON.parse(JSON.stringify(body ?? {})) // 避免直接修改原本的body
    const copyQuery = JSON.parse(JSON.stringify(query ?? {})) // 避免直接修改原本的query
    if (TypeCheck.isNotEmpty(copyBody)) {
      needToRemove.forEach((key) => {
        if (copyBody[key]) {
          copyBody[key] = undefined
        }
      })
    }
    if (TypeCheck.isNotEmpty(copyQuery)) {
      needToRemove.forEach((key) => {
        if (copyQuery[key]) {
          copyQuery[key] = undefined
        }
      })
    }

    this.logger.info({
      method,
      url: urlRemoveQuery,
      headers,
      query: copyQuery,
      body: copyBody,
      type: 'request'
    })
  }

  /**
   * 紀錄response資訊
   * @param messageId 唯一訊息識別碼
   * @param status 狀態碼
   * @param req request資訊
   * @param res response資訊
   * @description
   * 1. 如果是ignore的路由，不紀錄response
   * 2. 紀錄response資訊 (2XX 3XX使用info, 4XX使用warn, 5XX使用error)
   */
  logResponse (
    status: HttpStatus,
    req: Pick<RequestLog, 'method' | 'url'>,
    res: ServiceResponse<unknown>
  ) {
    const {
      module,
      payload,
      data,
      errors
    } = res ?? {}

    // 取得沒有query的url
    const method = req.method
    const urlRemoveQuery = req.url.split('?')[0]

    // 如果是ignore的路由，不紀錄response => 5XX的一定要紀錄
    if (this.ignoreRouteToResponse[urlRemoveQuery] === method && status < 500) {
      return
    }

    // 如果是2XX 3XX的狀態碼，使用info
    // 如果是4XX的狀態碼，使用warn
    // 如果是5XX的狀態碼，使用error
    if (status >= 200 && status < 400) {
      this.logger.info({
        module,
        payload,
        data,
        type: 'response'
      })
    } else if (status >= 400 && status < 500) {
      this.logger.warn({
        module,
        payload,
        data,
        errors,
        type: 'response'
      })
    } else {
      this.logger.error({
        module,
        payload,
        data,
        errors,
        type: 'response'
      })
    }
  }
}
