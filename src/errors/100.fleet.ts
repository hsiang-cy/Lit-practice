/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:54:19
 * @LastEditors:Kerwin
 * @LastEditTime:2024-09-12 11:32:09
 * @Description:
 */

import {
  GenerateErrorObject,
  BaseErrorType
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '100.001'
const errorName = 'Fleet module Error'

export enum ErrorCodes {
  ParseAddressFailed = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject<BaseErrorType>('FLEET_MODULE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const Fleet = {
  /** 地址解析失敗 */
  ParseAddressFailed: (field?: string) => errorParse(ErrorCodes.ParseAddressFailed, i18n.t('errors:100.001.ParseAddressFailed'), field),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:100.001.UnknownError'), error)
}

export default Fleet
