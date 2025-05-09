/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:55:09
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-02-07 14:23:57
 * @Description:
 */

import './shared-service/trace'

import {
  NestFactory
} from '@nestjs/core'

import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'

import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger'

import {
  StopLightElementsModule
} from '@saico/nestjs-stoplight-elements'

import {
  TypeCheck
} from '@saico/type-check-js'

import fs from 'fs-extra'

import moment from 'moment-timezone'

import {
  Snowflake
} from 'nodejs-snowflake'

import {
  AppModule
} from './app.module'

import {
  FileErrorExceptionFilter,
  ForbiddenExceptionFilter,
  UnauthorizedExceptionFilter
} from '$exception-filter'

import {
  ParseQueryAttributesPipe
} from '$pipe'

import {
  Config,
  config as configInstance,
  logger
} from '$shared-service'

import {
  contentParser
} from 'fastify-multer'

class AppServer {
  private readonly config: Config
  private adapter: FastifyAdapter
  private app: NestFastifyApplication

  private readonly snowFlake: Snowflake

  constructor (config: Config) {
    this.config = config

    this.snowFlake = new Snowflake({
      instance_id: this.config.appConfig.snowFlake.instanceId,
      custom_epoch: this.config.appConfig.snowFlake.customEpoch
    })
  }

  async start (): Promise<any> {
    if (TypeCheck.isNullOrUndefined(this.app)) await this.createApp()

    const _app = this.config.appConfig.server.app

    return await this.app.listen(_app.port, _app.host)
  }

  private async createApp (): Promise<NestFastifyApplication> {
    const _server = this.config.appConfig.server

    if (TypeCheck.isNullOrUndefined(this.adapter)) {
      this.createFastifyAdapter()
    }

    this.app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      this.adapter,
      { logger: this.config.appConfig.debug === true ? undefined : false }
    )

    await this.app.register(contentParser)
    this.app.enableCors()
    this.useGlobalFilters()
    this.useGlobalPipes()

    if (_server.swagger.enable) {
      this.createSwaggerModule()

      logger.debug(`Mount Swagger: /${_server.swagger.subpath}`)
    }

    return this.app
  }

  private createFastifyAdapter (): FastifyAdapter {
    const _appConfig = this.config.appConfig

    const https = (() => {
      if (_appConfig.server.app.protocol === 'https') {
        if (TypeCheck.isNotEmpty(_appConfig.server.app.key) && TypeCheck.isNotEmpty(_appConfig.server.app.cert)) {
          return {
            key: fs.readFileSync(_appConfig.server.app.key),
            cert: fs.readFileSync(_appConfig.server.app.cert)
          }
        }
      }

      return undefined
    })()

    this.adapter = new FastifyAdapter({
      logger: _appConfig.debug,
      trustProxy: _appConfig.server.behindProxy,
      connectionTimeout: _appConfig.server.timeout.response,
      bodyLimit: _appConfig.server.limit.body,
      genReqId: () => this.snowFlake.getUniqueID().toString(),
      https
    })

    return this.adapter
  }

  /** 全域使用的exception filter */
  private useGlobalFilters (): void {
    this.app.useGlobalFilters(new FileErrorExceptionFilter())
    this.app.useGlobalFilters(new UnauthorizedExceptionFilter())
    this.app.useGlobalFilters(new ForbiddenExceptionFilter())
  }

  /** 全域使用的pipe */
  private useGlobalPipes (): void {
    this.app.useGlobalPipes(new ParseQueryAttributesPipe())
  }

  private createSwaggerModule (): void {
    if (TypeCheck.isNullOrUndefined(this.app)) throw new Error('App not instance')

    const _appConfig = this.config.appConfig

    // swagger 設定
    const documentConfig = new DocumentBuilder()
      .setTitle(this.config.appConfig.server.app.name)
      .setVersion(process.env?.npm_package_version ?? '')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(this.app, documentConfig)

    // 設定stoplight elements ui
    StopLightElementsModule.setup(_appConfig.server.swagger.subpath, this.app, document, {
      hideSchemas: true,
      hideInternal: true
    })
  }
}

export async function runServer (): Promise<any> {
  // 設定moment時區
  moment.tz.setDefault('Asia/Taipei')

  const server = new AppServer(configInstance)

  return await server.start().then(() => {
    const _appConfig = configInstance.appConfig
    const site = _appConfig.server.app.site
    const url = site.startsWith('http') ? site : `${_appConfig.server.app.protocol}://${site}:${_appConfig.server.app.port}/`

    logger.info(`Server is running on: ${url}`)

    if (_appConfig.server?.swagger.enable) {
      logger.info(`Swagger is running on: ${url}${_appConfig.server.swagger.subpath}`)
    }
  })
}

runServer()
  .catch(error => {
    console.error(error)
    process.exit(-1)
  })
