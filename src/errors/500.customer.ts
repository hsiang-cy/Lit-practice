/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:54:19
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-02 17:50:40
 * @Description:
 */

import {
  GenerateErrorObject,
  BaseErrorType
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '500.001'
const errorName = 'Customer module Error'

export enum ErrorCodes {
  timeWindowError = 1,
  DataNotExist = 2,
  FormatError = 3,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject<BaseErrorType>('CUSTOMER_MODULE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const Customer = {
  timeWindowError: (timeWindow?: any) => errorParse(ErrorCodes.timeWindowError, i18n.t('errors:500.001.timeWindowError', { timeWindow }), timeWindow),
  DataNotExist: (id: any) => errorParse(ErrorCodes.timeWindowError, i18n.t('errors:500.001.DataNotExist', { id }), id),
  FormatError: (message: string) => errorParse(ErrorCodes.FormatError, '格式錯誤', message),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:500.001.UnknownError'), error)
}

export default Customer
