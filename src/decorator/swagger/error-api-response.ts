/*
 * @Author:Kerwin
 * @Date:2023-09-28 13:42:17
 * @LastEditors:Kerwin
 * @LastEditTime:2024-09-09 10:28:38
 * @Description:
 */

import {
  type Type,
  applyDecorators,
  HttpStatus
} from '@nestjs/common'

import {
  ApiResponse,
  PickType,
  getSchemaPath,
  ApiExtraModels
} from '@nestjs/swagger'

import TypeCheck from '@saico/type-check-js'

import {
  Category,
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

import {
  ServiceResponse
} from '$types'

import {
  createApiErrorDescription
} from '$utility/swagger-document'

class DefaultErrorType extends PickType(ServiceResponse, ['module', 'payload', 'errors']) { }
class UnauthorizedForbiddenTypeClass extends PickType(ServiceResponse, ['payload', 'errors']) { }

/**
 * 取得預設錯誤訊息 (根據 HTTP 狀態碼)
 * @param statusCode - HTTP 狀態碼
 * @returns 錯誤訊息的陣列
 * @description
 * 目前只有 UNAUTHORIZED(401) 和 FORBIDDEN(403) 有預設錯誤訊息
 */
function getDefaultErrorMessages (statusCode: HttpStatus): ErrorObject[] {
  switch (statusCode) {
    case HttpStatus.UNAUTHORIZED:
      return [
        ...Object.values(Category.AuthenticationError)
      ]
    case HttpStatus.FORBIDDEN:
      return [
        ...Object.values(Category.AuthorizationError)
      ]
    default:
      return []
  }
}

/**
 * 處理錯誤訊息
 * @param statusCode - HTTP 狀態碼
 * @param errorMessages - 錯誤訊息的陣列 (optional)
 * @returns 錯誤訊息的陣列
 */
function handleErrorMessage (
  statusCode: HttpStatus,
  errorMessages?: ErrorObject[]
) {
  const defaultErrorMessages = getDefaultErrorMessages(statusCode)

  const message = TypeCheck.isNotEmpty(errorMessages) ? [...new Set([...defaultErrorMessages, ...errorMessages])] : defaultErrorMessages

  return message
}

/**
 * 處理錯誤描述
 * @param errorMessages - 錯誤訊息的陣列 (optional)
 * @returns 錯誤描述
 */
function handleDescription (errorMessages?: ErrorObject[]) {
  return TypeCheck.isNotEmpty(errorMessages) ? createApiErrorDescription(errorMessages) : ''
}

/**
 * 創建自訂錯誤類型的 API 回應
 * @param statusCode - HTTP 狀態碼
 * @param errorType - 錯誤資訊的類型
 * @param errorMessages - 錯誤訊息(錯誤物件的陣列) (optional)
 * @param description - API 錯誤描述 (optional)
 * @returns 裝飾器
 */
function createApiResponseWithCustomErrorType (
  statusCode: HttpStatus,
  errorType: Type<unknown>,
  errorMessages?: ErrorObject[],
  description?: string
) {
  const processErrorMessages = handleErrorMessage(statusCode, errorMessages)

  return applyDecorators(
    ApiExtraModels(DefaultErrorType, errorType), // 用來避免不同 API 產生相同的 Schema
    ApiResponse({
      description: `${description ?? ''}` + handleDescription(processErrorMessages),
      status: statusCode,
      schema: {
        allOf: [
          { $ref: getSchemaPath(DefaultErrorType) },
          {
            properties: {
              errors: {
                type: 'array',
                items: { $ref: getSchemaPath(errorType) }
              }
            }
          }
        ]
      }
    })
  )
}

/**
 * 創建未授權或禁止的錯誤回應
 * @param statusCode - HTTP 狀態碼
 * @param errorMessages - 錯誤訊息(錯誤物件的陣列) (optional)
 * @param description - API 錯誤描述 (optional)
 * @returns 裝飾器
 */
function createUnauthorizedForbiddenErrorType (
  statusCode: HttpStatus,
  errorMessages?: ErrorObject[],
  description?: string
) {
  const processErrorMessages = handleErrorMessage(statusCode, errorMessages)

  return ApiResponse({
    description: `${description ?? ''}` + handleDescription(processErrorMessages),
    status: statusCode,
    type: () => UnauthorizedForbiddenTypeClass
  })
}

/**
 * 創建錯誤回應的Swagger裝飾器
 * @param statusCode - HTTP 狀態碼
 * @param options.errorType - 錯誤資訊的類型 (optional)
 * @param options.errorMessages - 錯誤訊息(錯誤物件的陣列) (optional)
 * @param options.description - API 錯誤描述 (optional)
 * @returns 裝飾器
 * @description
 * 1. errorType 只有在 statusCode 不是 UNAUTHORIZED(401) 或 FORBIDDEN(403) 時才能使用
 */
export const ErrorApiResponse = <
  TErrorSchema extends Type<unknown>,
  TStatus extends HttpStatus
> (
  statusCode: TStatus,
  options?: {
    errorType?: TStatus extends HttpStatus.UNAUTHORIZED | HttpStatus.FORBIDDEN ? never : TErrorSchema,
    errorMessages?: ErrorObject[],
    description?: string
  }
) => {
  const { errorType, errorMessages, description } = options || {}
  const defaultDescription = description ?? i18n.t('decorator:swagger.error-api-response.defaultDescription')

  // 如果有自訂錯誤類型，則使用自訂錯誤類型的 API 回應
  if (errorType) return createApiResponseWithCustomErrorType(statusCode, errorType, errorMessages, defaultDescription)

  // 如果是 UNAUTHORIZED(401) 或 FORBIDDEN(403)，則使用未授權或禁止的錯誤回應
  if ([HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN].includes(statusCode)) return createUnauthorizedForbiddenErrorType(statusCode, errorMessages, defaultDescription)

  return ApiResponse({
    description: `${defaultDescription}` + handleDescription(errorMessages),
    status: statusCode,
    type: () => DefaultErrorType
  })
}
