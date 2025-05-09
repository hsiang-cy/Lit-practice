/*
 * @Author:Kerwin
 * @Date:2024-10-10 01:32:51
 * @LastEditors: kerwin.hou kerwin.hou@gosaico.com
 * @LastEditTime: 2024-10-11 11:02:04
 * @Description:
 */

import {
  Span
} from '@opentelemetry/api'

import TypeCheck from '@saico/type-check-js'

import {
  isErrorObject,
  isErrorObjectArray
} from './is-error-object'

import {
  logger
} from '$shared-service/pino-logger'

/**
 * 設定錯誤的Span
 * @param span Span
 * @param error 錯誤物件
 * @param errorMessage 錯誤訊息
 * @description
 * 1. 如果錯誤物件有stack，代表是Error物件，就記錄錯誤stack
 * 2. 設定Span的狀態為錯誤
 * 3. 記錄錯誤
 * 4. print錯誤到console
 */
function setErrorSpan (
  span: Span,
  error: any,
  errorMessage: string
) {
  span.setAttribute('error.stack', error?.stack)
  span.setStatus({ code: 2, message: errorMessage })
  span.recordException(error)

  logger.error(error)
}

/**
 * 處理一般錯誤的Span
 * @param span span
 * @param error 錯誤物件
 * @param errorMessage 錯誤訊息
 * @description
 * 如果不是Error物件，代表是未知的錯誤，要記錄錯誤
 */
export function handleCommonErrorSpan (
  span: Span,
  error: any,
  errorMessage: string
) {
  if (!isErrorObject(error)) setErrorSpan(span, error, errorMessage)
}

/**
 * 處理Operator錯誤的Span
 * @param span Span
 * @param error 錯誤物件
 * @param errorMessage 錯誤訊息
 * @description
 * 1. 如果錯誤物件是自定義的Error物件，且錯誤代碼是999，就記錄錯誤stack => 因為代表是未知的錯誤，需要被處理
 * 2. 如果錯誤物件是自定義的Error物件陣列，且其中有錯誤代碼是999，就記錄錯誤stack => 因為代表是未知的錯誤，需要被處理
 * 3. 如果錯誤物件不是自定義的Error物件，代表是未知的錯誤，也需要被處理
 */
export function handleOperatorErrorSpan (
  span: Span,
  error: any,
  errorMessage: string
) {
  if (isErrorObject(error)) {
    if (error.code.endsWith('999')) setErrorSpan(span, error, errorMessage)
  } else if (isErrorObjectArray(error)) {
    const unknownError = error.find(e => e.code.endsWith('999'))
    if (TypeCheck.isNotUndefined(unknownError)) setErrorSpan(span, unknownError, errorMessage)
  } else {
    setErrorSpan(span, error, errorMessage)
  }
}
