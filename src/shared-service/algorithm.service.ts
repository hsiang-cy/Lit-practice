import {
  HttpService
} from '@nestjs/axios'

import {
  Inject,
  Injectable
} from '@nestjs/common'

import {
  SpanKind
} from '@opentelemetry/api'

import TypeCheck from '@saico/type-check-js'

import {
  AxiosError
} from 'axios'

import {
  Redis
} from 'ioredis'

import {
  catchError,
  firstValueFrom
} from 'rxjs'

import {
  config as configInstance
} from './config'

import {
  tracer
} from './trace'

import {
  Category
} from '$errors'

import {
  SaicoApiSuccessData,
  RedisName,
  SaicoApiErrorData
} from '$types'

import {
  handleCommonErrorSpan
} from '$utility'

@Injectable()
export class AlgorithmService {
  private readonly algorithm = configInstance.appConfig.services.externalAPI.algorithm

  constructor (
    @Inject(RedisName.REDIS_ALGORITHM) private readonly redisClient: Redis,
    private readonly httpService: HttpService
  ) { }

  /**
   * 呼叫演算法服務
   * @param calculateJobId 計算任務識別碼
   * @param s3Path s3路徑(不要有最後的斜線)
   * @returns 演算法任務識別碼
   */
  async FetchAlgorithmToStart (
    calculateJobId: string,
    s3Path: string
  ) {
    const span = tracer.startSpan('AlgorithmService.FetchAlgorithmToStart', { kind: SpanKind.CLIENT })

    try {
      const apiUrl = `${this.algorithm.baseUrl}/zp_algorithm`
      const body = {
        taskId: calculateJobId,
        s3Dir: s3Path
      }

      const { data } = await firstValueFrom(
        this.httpService.post<SaicoApiSuccessData<{ taskId: string }>>(
          apiUrl,
          body,
          { timeout: this.algorithm.timeout }
        ).pipe(
          catchError((error: AxiosError<SaicoApiErrorData>) => {
            // 如果是預期的錯誤，會放在errors裡面的第一個
            if (TypeCheck.isNotEmpty(error.response?.data?.errors)) {
              throw error.response.data.errors[0]
            }

            throw error
          })
        )
      )

      if (TypeCheck.isEmpty(data.data)) throw new Error('No data returned')

      return data.data.taskId
    } catch (error) {
      handleCommonErrorSpan(span, error, '呼叫演算法服務發生錯誤')

      throw Category.ExternalServerError.ExternalServiceError
    } finally {
      span.end()
    }
  }

  /**
   * 從 Redis 取得演算法狀態
   * @param calculateJobId 計算任務識別碼
   * @returns 演算法狀態
   */
  async getAlgorithmStatus (calculateJobId: string) {
    const key = `${calculateJobId}:status`

    return await this.redisClient.get(key)
  }

  /**
   * 從 Redis 取得演算法錯誤
   * @param calculateJobId 計算任務識別碼
   * @returns 演算法錯誤
   */
  async getAlgorithmError (calculateJobId: string) {
    const key = `${calculateJobId}:error`

    return await this.redisClient.get(key)
  }

  /**
   * 移除所有關聯演算法資料
   * @param calculateJobId 計算任務識別碼
   */
  async removeAlgorithmResult (calculateJobId: string) {
    // 找出所有 calculateJobId 開頭的 key
    const keys = await this.redisClient.keys(`${calculateJobId}:*`)

    if (keys.length > 0) {
      await this.redisClient.unlink(keys)
    }
  }
}
