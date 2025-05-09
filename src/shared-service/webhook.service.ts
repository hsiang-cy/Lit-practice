/*
 * @Author:Sean Chen
 * @Date:2025-03-11 17:06:30
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-03-12 09:48:53
 * @Description:
 */
import {
  HttpService
} from '@nestjs/axios'

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  Job
} from 'bullmq'

import {
  catchError,
  firstValueFrom
} from 'rxjs'

// import {
//   SsoService
// } from './sso.service'

import {
  tracer
} from './trace'

import {
  handleCommonErrorSpan
} from '$utility'

@Injectable()
export class WebhookService {
  constructor (
    private readonly httpService: HttpService,
    // private readonly ssoService: SsoService
  ) { }

  /**
   * 發送 Webhook
   * @param webhookUrl Webhook URL
   * @param success 是否成功
   * @param plannerId 派遣計畫識別碼
   * @param calculateJobId 計算任務識別碼
   * @param message 訊息
   */
  async sendWebhook (
    webhookUrl: string,
    success: boolean,
    plannerId: string,
    calculateJobId: string,
    message: string
  ) {
    const span = tracer.startSpan('WebhookService.sendFailWebhook')

    try {
      await firstValueFrom(
        this.httpService.post(
          webhookUrl,
          {
            success,
            plannerId,
            calculateJobId,
            message
          }
        ).pipe(catchError(error => { throw error }))
      )
    } catch (error) {
      handleCommonErrorSpan(span, error, '發送 Webhook 發生錯誤')
    } finally {
      span.end()
    }
  }
}
