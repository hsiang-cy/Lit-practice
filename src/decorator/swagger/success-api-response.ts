/*
 * @Author:Kerwin
 * @Date:2023-09-28 13:42:39
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 14:43:16
 * @Description:
 */

import {
  type Type,
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiResponse,
  ApiExtraModels,
  getSchemaPath,
  OmitType
} from '@nestjs/swagger'

import {
  i18n
} from '$shared-service/i18n'

import {
  ServiceResponse
} from '$types'

class DefaultSuccessType extends OmitType(ServiceResponse, ['errors']) { }

/**
 * 將 ApiExtraModels 與 ApiResponse 進行包裝，代表方法回傳成功的 API 回應
 * @param dataSchema - 成功回應的schema
 * @param statusCode - HTTP 狀態碼 (預設為 200)
 * @returns 裝飾器
 */
export const SuccessApiResponse = <TDataSchema extends Type<unknown>> (
  dataSchema: TDataSchema,
  options?: {
    statusCode?: HttpStatus,
    description?: string
  }
) => {
  const statusCode = options?.statusCode ?? HttpStatus.OK
  const description = options?.description ?? i18n.t('decorator:swagger.success-api-response.defaultDescription')

  return applyDecorators(
    ApiExtraModels(DefaultSuccessType, dataSchema), // 用來避免不同 API 產生相同的 Schema
    ApiResponse({
      status: statusCode,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(DefaultSuccessType) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataSchema)
              }
            }
          }
        ]
      }
    })
  )
}
