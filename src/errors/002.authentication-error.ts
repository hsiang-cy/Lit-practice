/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:00:52
 * @LastEditors: kerwin.hou kerwin.hou@gosaico.com
 * @LastEditTime: 2024-09-01 17:00:08
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '002.001'
const errorName = 'Authentication error'

export enum ErrorCodes {
  AuthenticationFailed = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string) =>
  GenerateErrorObject('AUTHENTICATION_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message)

export const AuthenticationError = {
  /** 驗證失敗 */
  AuthenticationFailed: errorParse(ErrorCodes.AuthenticationFailed, i18n.t('errors:002.001.AuthenticationFailed')),
  /** 驗證失敗，未知的錯誤 */
  UnknownError: errorParse(ErrorCodes.UnknownError, i18n.t('errors:002.001.UnknownError'))
}

export default AuthenticationError
