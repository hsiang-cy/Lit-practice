// import {
//   CalculateJobState
// } from '@zuellig-pharma-2/database'

// import {
//   HttpService
// } from '@nestjs/axios'

// import {
//   Inject,
//   Injectable
// } from '@nestjs/common'

// import {
//   SpanKind
// } from '@opentelemetry/api'

// import TypeCheck from '@saico/type-check-js'

// import {
//   Redis
// } from 'ioredis'

// import {
//   firstValueFrom
// } from 'rxjs'

// import {
//   config as configInstance
// } from './config'

// import {
//   PrismaService
// } from './prisma-database'

// import {
//   tracer
// } from './trace'

// import {
//   Category
// } from '$errors'

// import {
//   RedisName,
//   SaicoAppInfo,
//   SaicoApplicationCode,
//   SaicoApiSuccessData
// } from '$types'

// import {
//   handleCommonErrorSpan
// } from '$utility'

// interface CalculateJobInfo {
//   id: string
//   applicationId: string
//   plannerId: string | null
//   state: CalculateJobState
//   otherInfo: {
//     successWebhookUrl?: string
//     failWebhookUrl?: string
//   }
// }
// @Injectable()
// export class SsoService {
//   private readonly apiBaseURL = configInstance.appConfig.services.externalAPI.sso.baseUrl
//   private readonly timeout = configInstance.appConfig.services.externalAPI.sso.timeout

//   constructor(
//     @Inject(RedisName.REDIS_SSO) private readonly ssoRedis: Redis,
//     private readonly httpService: HttpService,
//     private readonly prisma: PrismaService
//   ) { }

//   /**
//    * 從`Redis`取得`Saico`應用程式資訊
//    * @param code 應用程式代碼
//    */
//   async getSaicoAppFromRedis(code: string) {
//     const redisKey = this.getSaicoAppRedisKey(code)
//     let info = await this.ssoRedis.get(redisKey)

//     // 如果沒有資料，呼叫`API`取得資料
//     if (TypeCheck.isNull(info)) {
//       await this.fetchUpdateSaicoAppInfo(code)
//       info = await this.ssoRedis.get(redisKey)
//     }

//     // 如果還是沒有資料，代表有問題，拋出UnknownError
//     if (TypeCheck.isNull(info)) {
//       throw Category.InternalServerError.UnknownError('無法取得 Saico 應用程式資訊')
//     }

//     return JSON.parse(info) as SaicoAppInfo
//   }

//   /**
//    * 從`Redis`移除計算任務狀態
//    * @param calculateId 計算任務識別碼
//    * @description
//    * 目前沒有將redis在拆分，因此借用sso的redis
//    */
//   async removeCalculateStateFromRedis(calculateId: string) {
//     const redisKey = `calculate-job-state:${calculateId}`
//     await this.ssoRedis.unlink(redisKey)
//   }

//   /**
//      * 取得任務資訊
//      * @param calculateJobId 任務計算識別碼
//      * @param useRedis 是否使用 Redis
//      * @description
//      * 1. 目前沒有將 Redis 在拆分，因此借用 SSO 的 Redis
//      * 2. 先從 Redis 取得任務資訊，如果存在且使用 Redis，則直接回傳
//      * 3. 如果不存在或不使用 Redis，則從資料庫取得
//      */
//   async getCalculateJobInfo(
//     calculateJobId: string,
//     useRedis = true
//   ) {
//     const redisKey = `calculate-job-info:${calculateJobId}`
//     const calculateJobRedis = await this.ssoRedis.get(redisKey)

//     if (TypeCheck.isNotNull(calculateJobRedis) && useRedis) {
//       return JSON.parse(calculateJobRedis) as CalculateJobInfo
//     } else {
//       const calculateJob = await this.prisma.calculateJob.findFirst({
//         where: { id: calculateJobId },
//         select: {
//           id: true,
//           applicationId: true,
//           plannerId: true,
//           otherInfo: true,
//           state: true
//         } as any
//       })

//       // 設定5分鐘過期
//       await this.ssoRedis.set(redisKey, JSON.stringify(calculateJob), 'EX', 300)

//       return calculateJob as unknown as CalculateJobInfo
//     }
//   }

//   /**
//    * 呼叫`Sso server`更新`Saico`應用程式資訊
//    * @param code 應用程式代碼
//    */
//   private async fetchUpdateSaicoAppInfo(code: string) {
//     const span = tracer.startSpan('SsoService.fetchUpdateSaicoAppInfo', { kind: SpanKind.CLIENT })

//     try {
//       const apiUrl = `${this.apiBaseURL}/auth/application/info/api`

//       const body = { code }
//       const config = await this.generateSsoApiConfig(false)

//       await firstValueFrom(
//         this.httpService.put<SaicoApiSuccessData<{ success: boolean }>>(
//           apiUrl,
//           body,
//           config
//         )
//       )
//     } catch (error) {
//       handleCommonErrorSpan(span, error, '呼叫 SSO 更新 Saico 應用程式資訊發生錯誤')

//       throw Category.ExternalServerError.ExternalServiceError
//     } finally {
//       span.end()
//     }
//   }

//   /**
//    * 取得`Saico`應用程式`Redis Key`
//    * @param code 應用程式代碼
//    */
//   private getSaicoAppRedisKey(code: string) {
//     return `saico-app:${code}`
//   }

//   /**
//    * 產生`Sso API`設定
//    * @param withAuth 是否需要`Authorization`
//    */
//   private async generateSsoApiConfig(withAuth: boolean) {
//     let auth = {}

//     if (withAuth) {
//       const air = await this.getSaicoAppFromRedis(SaicoApplicationCode.SAICO_AIR)
//       auth = { Authorization: `${air.clientId}|${air.clientSecret}` }
//     }

//     return {
//       headers: { ...auth },
//       params: { attributes: 'data,errors' }, // 取得data和errors欄位
//       timeout: this.timeout
//     }
//   }
// }
