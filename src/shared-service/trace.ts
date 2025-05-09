/*
 * @Author:Kerwin
 * @Date:2024-07-08 13:46:47
 * @LastEditors:Kerwin
 * @LastEditTime:2024-11-07 10:29:34
 * @Description:
 */

import 'dotenv/config'

import {
  ClientRequest,
  IncomingMessage
} from 'http'

import {
  Span,
  trace
} from '@opentelemetry/api'

import {
  OTLPTraceExporter
} from '@opentelemetry/exporter-trace-otlp-grpc'

import {
  Instrumentation,
  InstrumentationConfig
} from '@opentelemetry/instrumentation'

import {
  HttpInstrumentation
} from '@opentelemetry/instrumentation-http'

import {
  Resource
} from '@opentelemetry/resources'

import {
  NodeSDK
} from '@opentelemetry/sdk-node'

import {
  PrismaInstrumentation
} from '@prisma/instrumentation'

import TypeCheck from '@saico/type-check-js'

import {
  generateRandomString
} from '$utility'

export const serviceName = process.env.SEMRESATTRS_SERVICE_NAME || 'service-name'
export const serviceInstanceId = generateRandomString()

// 確認有使用signoz才會啟用
if (process.env.USE_SIGNOZ === 'true') {
  const traceExporter = new OTLPTraceExporter({
    url: process.env.OTEL_TRACE_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317'
  })

  const instrumentations: (Instrumentation<InstrumentationConfig> | Instrumentation<InstrumentationConfig>[])[] = [
    new HttpInstrumentation({
      ignoreIncomingRequestHook: (request: IncomingMessage) => {
        // 要忽略哪些路由
        const ignorePaths = [/^\/health/]

        return ignorePaths.some(pattern => pattern.test(request.url ?? ''))
      },
      requestHook: (span: Span, request: ClientRequest | IncomingMessage) => {
        const method = request.method ?? ''
        let routePath = ''

        const parseUrlWithoutQuery = (url: string) => {
          const indexofQuery = url.indexOf('?')

          if (indexofQuery === -1) return url
          else return url.substring(0, indexofQuery)
        }

        // 判斷是ClientRequest還是IncomingMessage，從而取得url
        if (request instanceof IncomingMessage) {
          routePath = parseUrlWithoutQuery(request.url ?? '')
        } else {
          routePath = parseUrlWithoutQuery(request.path ?? '')
        }

        // 兩者都有值 => 代表是http 請求，更新span名稱
        if (TypeCheck.isNotEmpty(method) && TypeCheck.isNotEmpty(routePath)) {
          span.updateName(`${method} ${routePath}`)
        }
      }
    })
  ]
  if (process.env.ENABLE_PRISMA_TRACE === 'true') {
    instrumentations.push(new PrismaInstrumentation())
  }

  const sdk = new NodeSDK({
    resource: new Resource({
      'service.name': serviceName,
      'service.instance.id': serviceInstanceId
    }),
    traceExporter,
    instrumentations
  })

  // Start the SDK
  sdk.start()
}

/**
 * trace instance，用於建立span
 * @example1 - 一般要追蹤的地方使用 (各種service的method)
 * ```
 * import { SpanKind } from '@opentelemetry/api'
 * import { tracer } from '$shared-service/trace'
 * import { handleCommonErrorSpan } from '$utility'
 *
 * const span = tracer.startSpan('span-name', { kind: SpanKind.CLIENT })
 *
 * try {
 *  // do something
 * } catch (error) {
 *  handleCommonErrorSpan(span, error, 'error-message')
 * } finally {
 *  span.end()
 * }
 * ```
 * @example2 - 在background job的最外層使用
 * ```
 * import { context, SpanKind, trace } from '@opentelemetry/api'
 * import { tracer } from '$shared-service/trace'
 * import { handleCommonErrorSpan } from '$utility'
 *
 * const span = tracer.startSpan('background-job-name', { kind: SpanKind.CONSUMER })
 *
 * try {
 *  await context.with(trace.setSpan(context.active(), span), async () => {
 *   // do something
 *  })
 * } catch (error) {
 *   handleCommonErrorSpan(span, error, 'error-message')
 * } finally {
 *   span.end()
 * }
 * ```
 */
const tracer = trace.getTracer('nestjs-application-tracer')

export {
  tracer
}
