/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:54:19
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 15:49:27
 * @Description:
 */

import {
  GenerateErrorObject,
  BaseErrorType
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '800.001'
const errorName = 'Auth module Error'

export enum ErrorCodes {
  AuthenticationFailed = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject<BaseErrorType>('AUTH_MODULE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const Auth = {
  AuthenticationFailed: (field?: string) => errorParse(ErrorCodes.AuthenticationFailed, i18n.t('errors:800.001.AuthenticationFailed'), field),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:100.001.UnknownError'), error)
}

export default Auth
