/*
 * @Author:Kerwin
 * @Date:2024-04-10 10:54:11
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-12 19:03:18
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '013.003'
const errorName = 'Input File Error - Payload Too Large'

export enum ErrorCodes {
  PayloadTooLarge = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject('INPUT_FILE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const PayloadTooLarge = {
  /** 檔案大小超過限制 */
  PayloadTooLarge: (field: string) => errorParse(ErrorCodes.PayloadTooLarge, i18n.t('errors:013.003.PayloadTooLarge'), { field }),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:013.003.UnknownError'), error)
}

export default PayloadTooLarge
