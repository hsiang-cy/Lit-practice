import {
  Readable
} from 'stream'

import * as zlib from 'zlib'

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3'

import {
  Injectable
} from '@nestjs/common'

import {
  SpanKind
} from '@opentelemetry/api'

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
  handleCommonErrorSpan
} from '$utility'

const s3Config = configInstance.appConfig.services.s3

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client

  constructor () {
    this.s3Client = new S3Client({
      region: s3Config.region,
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey
      }
    })
  }

  /**
   * 上傳檔案
   * @param key 檔案名稱
   * @param file 檔案Buffer
   * @param contentType 檔案類型
   * @param bucket bucket名稱 (預設為設定檔中的bucket)
   * @description
   * 會先將檔案壓縮成gzip格式再上傳
   */
  async uploadFile (
    key: string,
    file: Buffer | Uint8Array,
    contentType: string,
    bucket?: string
  ) {
    const span = tracer.startSpan('S3Service.uploadFile', { kind: SpanKind.CLIENT })

    try {
      const compressedFile = zlib.gzipSync(file)

      const command = new PutObjectCommand({
        Bucket: bucket ?? s3Config.bucket,
        Key: key,
        Body: compressedFile,
        ContentType: contentType,
        ContentEncoding: 'gzip'
      })

      await this.s3Client.send(command)
    } catch (error) {
      handleCommonErrorSpan(span, error, '上傳檔案到S3發生錯誤')

      throw Category.ExternalServerError.ExternalServiceError
    } finally {
      span.end()
    }
  }

  /**
   * 下載檔案
   * @param key 檔案名稱
   * @param options.bucket bucket名稱 (預設為設定檔中的bucket)
   * @param options.decompress 是否解壓縮 (預設為false)
   * @returns 檔案Buffer
   */
  async downloadFile (
    key: string,
    options?: {
      bucket?: string
      decompress?: boolean
    }
  ) {
    const span = tracer.startSpan('S3Service.downloadFile', { kind: SpanKind.CLIENT })

    try {
      const command = new GetObjectCommand({
        Bucket: options?.bucket ?? s3Config.bucket,
        Key: key
      })

      const data = await this.s3Client.send(command)
      const fileStream = data.Body as Readable

      const chunks: Buffer[] = []
      for await (const chunk of fileStream) {
        chunks.push(chunk as Buffer)
      }
      const fileBuffer = Buffer.concat(chunks)

      const decompress = options?.decompress ?? false
      if (decompress) {
        return zlib.gunzipSync(fileBuffer)
      }

      return fileBuffer
    } catch (error) {
      handleCommonErrorSpan(span, error, '從S3下載檔案發生錯誤')

      throw Category.ExternalServerError.ExternalServiceError
    } finally {
      span.end()
    }
  }

  /**
   * 檢查檔案是否存在
   * @param key 檔案名稱 (路徑)
   * @param bucket bucket名稱 (預設為設定檔中的bucket)
   * @returns 檔案是否存在
   * @description
   * 1. 使用HeadObjectCommand檢查檔案是否存在
   * 2. 若檔案不存在會拋出NoSuchKey錯誤
   * 3. 若沒有拋出錯誤代表檔案存在 (回傳true)
   */
  async checkFileExist (
    key: string,
    bucket?: string
  ) {
    const span = tracer.startSpan('S3Service.checkFileExist', { kind: SpanKind.CLIENT })

    try {
      const command = new HeadObjectCommand({
        Bucket: bucket ?? s3Config.bucket,
        Key: key
      })

      await this.s3Client.send(command)

      return true
    } catch (error) {
      // https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadObject.html#API_HeadObject_Errors
      if (error.name === 'NoSuchKey' || error.$metadata.httpStatusCode === 404) return false

      // 代表是其他錯誤，要記錄錯誤
      handleCommonErrorSpan(span, error, '從S3檢查檔案是否存在發生錯誤')

      throw Category.ExternalServerError.ExternalServiceError
    } finally {
      span.end()
    }
  }
}
