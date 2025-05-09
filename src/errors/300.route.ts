/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:54:19
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:25:33
 * @Description:
 */

import {
  GenerateErrorObject,
  BaseErrorType
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '300.001'
const errorName = 'Route module Error'

export enum ErrorCodes {
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject<BaseErrorType>('ROUTE_MODULE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const Route = {
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:100.001.UnknownError'), error)
}

export default Route
