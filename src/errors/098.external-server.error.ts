/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:01:20
 * @LastEditors: kerwin.hou kerwin.hou@gosaico.com
 * @LastEditTime: 2024-09-16 01:16:36
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '098.001'
const errorName = 'External Server Error'

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject('EXTERNAL_SERVER_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export enum ErrorCodes {
  ExternalConnectionError = 1,
  ExternalServiceError = 2,
  UnknownError = 999
}

export const ExternalServerError = {
  /** 外部服務無法連線 */
  ExternalConnectionError: errorParse(ErrorCodes.ExternalConnectionError, i18n.t('errors:098.001.ExternalConnectionError')),
  /** 外部服務發生錯誤 */
  ExternalServiceError: errorParse(ErrorCodes.ExternalServiceError, i18n.t('errors:098.001.ExternalServiceError')),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:098.001.UnknownError'), error)
}

export default ExternalServerError
