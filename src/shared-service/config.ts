/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:58:45
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 13:59:16
 * @Description:
 */

import 'dotenv/config'

import {
  Injectable
} from '@nestjs/common'

import {
  TypeCheck
} from '@saico/type-check-js'

interface ExternalAPIOption {
  /** API 路由 */
  baseUrl: string
  /** 請求逾時時間 */
  timeout: number
}

interface RouteServiceOption extends ExternalAPIOption {
  /** Route API key */
  appId: string
  /** Route API token */
  appToken: string
}

interface SnowFlakeOption {
  /** 服務實例 ID */
  instanceId: number
  /** 自定義起始時間 */
  customEpoch: number
}

interface ServerAppOption {
  /** 服務名稱 */
  name: string
  /** 服務協定 ex: http, https */
  protocol: string
  /** 服務主機 */
  host: string
  /** 服務埠號 */
  port: number
  /** 服務網址 */
  site: string
  /** SSL 金鑰 */
  key: string
  /** SSL 憑證 */
  cert: string
}

interface TimeOutOption {
  /** 回應超時時間 */
  response: number
  /** 終止連線時間 */
  terminate: number
}

interface SwaggerOption {
  /** 是否啟用 Swagger */
  enable: boolean
  /** Swagger 子路徑 */
  subpath: string
}

interface ServerLimitOption {
  /** 請求體大小限制 */
  body: number
}

interface LoggerOption {
  /** 是否啟用 Signoz */
  useSignoz: boolean
  /** 敏感資訊 (不會被紀錄到 log 內) */
  sensitiveRequestInfo: string[]
}

interface S3Option {
  /** S3 bucker名稱 */
  bucket: string
  /** S3 存儲桶區域 */
  region: string
  /** S3 keyId */
  accessKeyId: string
  /** S3 密鑰 */
  secretAccessKey: string
}

interface ServiceOption {
  logger: LoggerOption
  externalAPI: {
    // sso: ExternalAPIOption
    placement: ExternalAPIOption
    route: RouteServiceOption
    algorithm: ExternalAPIOption
  }
  s3: S3Option
}

interface DatabaseOption {
  /** 連線 URL */
  connectUrl: string
  /** 是否啟用 database log */
  logging: boolean
}

interface ServerOption {
  /** 掛載路徑 */
  mountPath: string
  /** 是否在 Proxy 後 */
  behindProxy: boolean
  /** 限制設定 */
  limit: ServerLimitOption
  /** 服務設定 */
  app: ServerAppOption
  /** 時間設定 */
  timeout: TimeOutOption
  /** Swagger 設定 */
  swagger: SwaggerOption
}

interface RedisOption {
  /** Redis 伺服器地址 */
  host: string
  /** Redis 伺服器端口 */
  port: number
  /** Redis 伺服器密碼 */
  password: string
  /** Redis 伺服器資料庫 */
  db: number
}

interface EncryptionOption {
  bcryptSalt: number
  secret: string
  iv: string
  aes: 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm',
  jwtTime: number
}

export interface AppConfigOption {
  /** 是否啟用 debug */
  debug: boolean
  /** 系統代碼 */
  systemCode: string
  /** 環境 */
  env: string
  /** 預設不回傳的payload */
  unReturnPayload: string[]
  snowFlake: SnowFlakeOption
  services: ServiceOption
  database: { db1: DatabaseOption }
  server: ServerOption
  redis: {
    broadcast: RedisOption
    algorithm: RedisOption
    queue: RedisOption
  }
  /** password 加密資訊 */
  encryption: EncryptionOption
}

@Injectable()
export class Config {
  public env = 'development'
  public appConfig: AppConfigOption

  constructor() {
    this.setEnv()
    this.parse()
  }

  public dumpDebug(): void {
    console.dir(this.appConfig, { depth: null })
  }

  private setEnv(): void {
    const _nodeEnv = (process.env.NODE_ENV as string ?? '').trim()

    if (TypeCheck.isEmpty(_nodeEnv, { trim: true })) this.env = 'development'
    else this.env = _nodeEnv.toLocaleLowerCase()
  }

  private parse(): void {
    this.appConfig = {
      env: this.env,
      debug: this.parseDebug(),
      systemCode: this.parseSystemCode(),
      unReturnPayload: this.parseUnReturnPayload(),
      snowFlake: this.parseSnowFlake(),
      services: this.parseServices(),
      database: this.parseDatabase(),
      redis: this.parseRedis(),
      server: this.parseServer(),
      encryption: this.parseEncryption()
    }
  }

  private parseDebug() {
    return process.env.DEBUG === 'true'
  }

  private parseSystemCode() {
    const code = process.env.SYSTEM_CODE?.toString().trim() ?? ''

    if (code.length === 0) throw new Error('env: [SYSTEM_CODE] not set')

    return code
  }

  private parseUnReturnPayload() {
    const payload = process.env.UN_RETURN_PAYLOAD

    if (TypeCheck.isEmpty(payload)) return ['password', 'token', 'accessToken', 'refreshToken', 'ip', 'userAgent', 'user']
    else return payload.split(',').map(d => d.trim())
  }

  private parseSnowFlake() {
    const sf: SnowFlakeOption = {
      instanceId: 1701,
      customEpoch: new Date(2022, 1, 1, 0, 0, 0, 0).getTime()
    }

    const _instanceId = process.env.SNOWFLAKE_INSTANCE_ID
    const _customEpoch = process.env.SNOWFLAKE_CUSTOM_EPOCH

    if (TypeCheck.isNotNullOrUndefined(_instanceId)) {
      const id = Number(_instanceId)
      if (!isNaN(id) && id >= 0 && id < 4096) sf.instanceId = id
    }

    if (TypeCheck.isNotNullOrUndefined(_customEpoch)) {
      const epoch = Number(_customEpoch)
      if (!isNaN(epoch) && epoch >= 0) sf.customEpoch = epoch
    }

    return sf
  }
  // private parseSsoService() {
  //   const e: ExternalAPIOption = {
  //     baseUrl: '',
  //     timeout: 30000
  //   }

  //   const ssoBaseUrl = process.env.SERVICE_EXTERNAL_API_SSO_BASE_URL
  //   const ssoTimeout = Number(process.env.SERVICE_EXTERNAL_API_SSO_TIMEOUT)

  //   if (TypeCheck.isEmpty(ssoBaseUrl, { trim: true })) throw new Error('env: [SERVICE_EXTERNAL_API_SSO_BASE_URL] not set')
  //   else e.baseUrl = ssoBaseUrl.trim()
  //   if (!isNaN(ssoTimeout) && ssoTimeout > 0) e.timeout = ssoTimeout

  //   return e
  // }
  private parseAlgorithmService() {
    const e: ExternalAPIOption = {
      baseUrl: '',
      timeout: 30000
    }

    const algorithmBaseUrl = process.env.SERVICE_EXTERNAL_API_ALGORITHM_BASE_URL
    const algorithmTimeout = Number(process.env.SERVICE_EXTERNAL_API_ALGORITHM_TIMEOUT)

    if (TypeCheck.isEmpty(algorithmBaseUrl, { trim: true })) throw new Error('env: [SERVICE_EXTERNAL_API_ALGORITHM_BASE_URL] not set')
    else e.baseUrl = algorithmBaseUrl.trim()
    if (!isNaN(algorithmTimeout) && algorithmTimeout > 0) e.timeout = algorithmTimeout

    return e
  }
  private parseS3() {
    const s: S3Option = {
      bucket: '',
      region: '',
      accessKeyId: '',
      secretAccessKey: ''
    }

    const bucket = process.env.SERVICE_S3_BUCKET
    const region = process.env.SERVICE_S3_REGION
    const accessKeyId = process.env.SERVICE_S3_ACCESS_KEY_ID
    const secretAccessKey = process.env.SERVICE_S3_SECRET_ACCESS_KEY

    if (TypeCheck.isEmpty(bucket, { trim: true })) throw new Error('env: [SERVICE_S3_BUCKET] not set')
    else s.bucket = bucket.trim()
    if (TypeCheck.isEmpty(region, { trim: true })) throw new Error('env: [SERVICE_S3_REGION] not set')
    else s.region = region.trim()
    if (TypeCheck.isEmpty(accessKeyId, { trim: true })) throw new Error('env: [SERVICE_S3_ACCESS_KEY_ID] not set')
    else s.accessKeyId = accessKeyId.trim()
    if (TypeCheck.isEmpty(secretAccessKey, { trim: true })) throw new Error('env: [SERVICE_S3_SECRET_ACCESS_KEY] not set')
    else s.secretAccessKey = secretAccessKey.trim()

    return s
  }
  private parseServices() {
    const s: ServiceOption = {
      logger: this.parseLogger(),
      externalAPI: {
        // sso: this.parseSsoService(),
        placement: this.parsePlacementService(),
        route: this.parseRouteService(),
        algorithm: this.parseAlgorithmService()
      },
      s3: this.parseS3()
    }

    return s
  }

  private parsePlacementService() {
    const e: ExternalAPIOption = {
      baseUrl: '',
      timeout: 30000
    }

    const placementBaseUrl = process.env.SERVICE_EXTERNAL_API_PLACEMENT_BASE_URL
    const placementTimeout = Number(process.env.SERVICE_EXTERNAL_API_PLACEMENT_TIMEOUT)

    if (TypeCheck.isEmpty(placementBaseUrl, { trim: true })) throw new Error('env: [SERVICE_EXTERNAL_API_PLACEMENT_BASE_URL] not set')
    else e.baseUrl = placementBaseUrl.trim()
    if (!isNaN(placementTimeout) && placementTimeout > 0) e.timeout = placementTimeout

    return e
  }

  private parseRouteService() {
    const e: RouteServiceOption = {
      baseUrl: '',
      timeout: 30000,
      appId: '',
      appToken: ''
    }

    const routeBaseUrl = process.env.SERVICE_EXTERNAL_API_ROUTE_BASE_URL
    const routeTimeout = Number(process.env.SERVICE_EXTERNAL_API_ROUTE_TIMEOUT)
    const routeAppid = process.env.SERVICE_EXTERNAL_API_ROUTE_APP_ID
    const routeAppToken = process.env.SERVICE_EXTERNAL_API_ROUTE_APP_TOKEN

    if (TypeCheck.isEmpty(routeBaseUrl, { trim: true })) throw new Error('env: [SERVICE_EXTERNAL_API_ROUTE_BASE_URL] not set')
    else e.baseUrl = routeBaseUrl.trim()
    if (TypeCheck.isEmpty(routeAppid, { trim: true })) throw new Error('env: [SERVICE_EXTERNAL_API_ROUTE_APP_ID] not set')
    else e.appId = routeAppid.trim()
    if (TypeCheck.isEmpty(routeAppToken, { trim: true })) throw new Error('env: [SERVICE_EXTERNAL_API_ROUTE_APP_TOKEN] not set')
    else e.appToken = routeAppToken.trim()
    if (!isNaN(routeTimeout) && routeTimeout > 0) e.timeout = routeTimeout

    return e
  }

  private parseLogger() {
    const l: LoggerOption = {
      useSignoz: process.env.SERVICE_LOGGER_USE_SIGNOZ === 'true',
      sensitiveRequestInfo: ['password', 'token', 'accessToken', 'refreshToken']
    }
    const sensitiveRequestInfo = process.env.SERVICE_LOGGER_SENSITIVE_REQUEST_INFO?.split(',')
    if (TypeCheck.isNotEmpty(sensitiveRequestInfo)) l.sensitiveRequestInfo = sensitiveRequestInfo

    return l
  }

  private parseDatabase() {
    const d: { db1: DatabaseOption } = {
      db1: {
        connectUrl: 'postgresql://127.0.0.1:5432/public?schema=public&connection_limit=10',
        logging: false
      }
    }

    const db1ConnectUrl = process.env.DATABASE_DB1_URL ?? ''
    const db1Logging = process.env.DATABASE_DB1_LOGGING === 'true'

    if (TypeCheck.isEmpty(db1ConnectUrl, { trim: true })) throw new Error('env: [DATABASE_DB1_URL] not set')
    else d.db1.connectUrl = db1ConnectUrl.trim()
    d.db1.logging = db1Logging

    return d
  }

  private parseServer() {
    const s: ServerOption = {
      mountPath: '/',
      behindProxy: false,
      limit: {
        body: 1024 * 1024 // 1MiB
      },
      app: {
        name: 'service',
        protocol: 'http',
        host: '0.0.0.0',
        port: 3000,
        site: 'http://127.0.0.1:3000/',
        key: '',
        cert: ''
      },
      timeout: {
        response: 300000,
        terminate: 5000
      },
      swagger: {
        enable: false,
        subpath: 'docs'
      }
    }

    const mountPath = process.env.SERVER_MOUNT_PATH
    const behindProxy = process.env.SERVER_BEHIND_PROXY
    const limitBody = process.env.SERVER_LIMIT_BODY
    const appName = process.env.SERVER_APP_NAME
    const protocol = process.env.SERVER_APP_PROTOCOL
    const host = process.env.SERVER_APP_HOST
    const port = Number(process.env.SERVER_APP_PORT)
    const site = process.env.SERVER_APP_SITE
    const key = process.env.SERVER_APP_KEY
    const cert = process.env.SERVER_APP_CERT
    const timeoutResponse = process.env.SERVER_TIMEOUT_RESPONSE
    const timeoutTerminate = process.env.SERVER_TIMEOUT_TERMINATE
    const swaggerEnable = process.env.SERVER_SWAGGER_ENABLE
    const swaggerSubpath = process.env.SERVER_SWAGGER_SUBPATH

    if (TypeCheck.isNotEmpty(mountPath, { trim: true })) s.mountPath = mountPath.trim()
    s.behindProxy = behindProxy === 'true'

    if (TypeCheck.isNotEmpty(limitBody)) {
      const body = Number(limitBody ?? 0)
      if (!isNaN(body) && body > 0) s.limit.body = body
    }

    if (TypeCheck.isNotEmpty(appName, { trim: true })) s.app.name = appName.trim()
    if (TypeCheck.isNotEmpty(protocol, { trim: true })) s.app.protocol = protocol.trim()
    if (TypeCheck.isNotEmpty(host, { trim: true })) s.app.host = host.trim()

    if (!isNaN(port) && port > 1000 && port < 65535) s.app.port = port

    if (TypeCheck.isNotEmpty(site, { trim: true })) s.app.site = site.trim()
    else s.app.site = `${s.app.protocol}://${s.app.host === '0.0.0.0' ? '127.0.0.1' : s.app.host}${[80, 443].includes(s.app.port) ? '' : `:${s.app.port}`}/`

    if (TypeCheck.isNotEmpty(key, { trim: true })) s.app.key = key.trim()
    if (TypeCheck.isNotEmpty(cert, { trim: true })) s.app.cert = cert.trim()

    const response = Number(timeoutResponse ?? -1)
    if (!isNaN(response) && response >= 0) s.timeout.response = response

    const terminate = Number(timeoutTerminate ?? -1)
    if (!isNaN(terminate) && terminate >= 0) s.timeout.terminate = terminate

    s.swagger.enable = swaggerEnable === 'true'
    if (TypeCheck.isNotEmpty(swaggerSubpath, { trim: true })) s.swagger.subpath = swaggerSubpath.trim()

    return s
  }

  private parseRedis() {
    const r: {
      broadcast: RedisOption
      algorithm: RedisOption
      queue: RedisOption
    } = {
      broadcast: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 1
      },
      algorithm: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 2
      },
      queue: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 3
      }
    }

    const broadcastHost = process.env.REDIS_BROADCAST_HOST
    const broadcastPort = Number(process.env.REDIS_BROADCAST_PORT)
    const broadcastPassword = process.env.REDIS_BROADCAST_PASSWORD
    const broadcastDb = Number(process.env.REDIS_BROADCAST_DB)

    if (TypeCheck.isEmpty(broadcastHost, { trim: true })) throw new Error('env: [REDIS_BROADCAST_HOST] not set')
    else r.broadcast.host = broadcastHost.trim()
    if (!isNaN(broadcastPort) && broadcastPort > 0 && broadcastPort < 65535) r.broadcast.port = broadcastPort
    if (TypeCheck.isEmpty(broadcastPassword, { trim: true })) throw new Error('env: [REDIS_BROADCAST_PASSWORD] not set')
    else r.broadcast.password = broadcastPassword.trim()
    if (!isNaN(broadcastDb) && broadcastDb >= 0) r.broadcast.db = broadcastDb

    const queueHost = process.env.REDIS_QUEUE_HOST
    const queuePort = Number(process.env.REDIS_QUEUE_PORT)
    const queuePassword = process.env.REDIS_QUEUE_PASSWORD
    const queueDb = Number(process.env.REDIS_QUEUE_DB)

    if (TypeCheck.isEmpty(queueHost, { trim: true })) throw new Error('env: [REDIS_QUEUE_HOST] not set')
    else r.queue.host = queueHost.trim()
    if (!isNaN(queuePort) && queuePort > 0 && queuePort < 65535) r.queue.port = queuePort
    if (TypeCheck.isEmpty(queuePassword, { trim: true })) throw new Error('env: [REDIS_QUEUE_PASSWORD] not set')
    else r.queue.password = queuePassword.trim()
    if (!isNaN(queueDb) && queueDb >= 0) r.queue.db = queueDb

    const algorithmHost = process.env.REDIS_ALG_HOST
    const algorithmPort = Number(process.env.REDIS_ALG_PORT)
    const algorithmPassword = process.env.REDIS_ALG_PASSWORD
    const algorithmDb = Number(process.env.REDIS_ALG_DB)

    if (TypeCheck.isEmpty(algorithmHost, { trim: true })) throw new Error('env: [REDIS_ALG_HOST] not set')
    else r.algorithm.host = algorithmHost.trim()
    if (!isNaN(algorithmPort) && algorithmPort > 0 && algorithmPort < 65535) r.algorithm.port = algorithmPort
    if (TypeCheck.isEmpty(algorithmPassword, { trim: true })) throw new Error('env: [REDIS_ALG_PASSWORD] not set')
    else r.algorithm.password = algorithmPassword.trim()
    if (!isNaN(algorithmDb) && algorithmDb >= 0) r.algorithm.db = algorithmDb

    return r
  }

  private parseEncryption() {
    const e: EncryptionOption = {
      bcryptSalt: 11,
      secret: '',
      iv: '',
      aes: 'aes-256-gcm',
      jwtTime: 3600
    }

    const bcryptSalt = process.env.ENCRYPTION_BCRYPT_SALT ?? 11
    const secret = process.env.ENCRYPTION_SECRET ?? ''
    const iv = process.env.ENCRYPTION_IV ?? ''
    const jwtTime = process.env.jwt_time

    if (TypeCheck.isEmpty(bcryptSalt, { trim: true })) throw new Error('env: [ENCRYPTION_BCRYPT_SALT] not set')
    else {
      const tmpBcryptSalt = Number(bcryptSalt ?? 0)
      if (!isNaN(tmpBcryptSalt) && tmpBcryptSalt > 0) e.bcryptSalt = tmpBcryptSalt
      else throw new Error('env: [ENCRYPTION_BCRYPT_SALT] is not number')
    }

    if (TypeCheck.isEmpty(secret, { trim: true })) throw new Error('env: [ENCRYPTION_SECRET] not set')
    else if (secret.trim().length !== 32) throw new Error('Config: [ENCRYPTION_SECRET] length should be equals to 32')
    else e.secret = secret.trim()

    if (TypeCheck.isEmpty(iv, { trim: true })) throw new Error('env: [ENCRYPTION_IV] not set')
    else if (iv.trim().length !== 16) throw new Error('Config: [ENCRYPTION_IV] length should be equals to 16')
    else e.iv = iv.trim()

    if (TypeCheck.isEmpty(jwtTime, { trim: true })) {
      throw new Error('env: [jwt_time] not set')
    } else {
      const tmpJwtTime = Number(jwtTime)
      if (isNaN(tmpJwtTime) || tmpJwtTime <= 0) {
        throw new Error('env: [jwt_time] Error')
      }
      e.jwtTime = tmpJwtTime
    }

    return e
  }
}

export const config = new Config()
export default config
