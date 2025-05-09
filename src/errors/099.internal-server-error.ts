/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:01:28
 * @LastEditors: kerwin.hou kerwin.hou@gosaico.com
 * @LastEditTime: 2024-09-16 01:16:41
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '099.001'
const errorName = 'Internal Server Error'

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject('INTERNAL_SERVER_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export enum ErrorCodes {
  InternalConnectionError = 1,
  InternalServiceError = 2,
  UnknownError = 999
}

export const InternalServerError = {
  /** 內部服務無法連線 */
  InternalConnectionError: errorParse(ErrorCodes.InternalConnectionError, i18n.t('errors:099.001.InternalConnectionError')),
  /** 內部服務發生錯誤 */
  InternalServiceError: errorParse(ErrorCodes.InternalServiceError, i18n.t('errors:099.001.InternalServiceError')),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:099.001.UnknownError'), error)
}

export default InternalServerError
