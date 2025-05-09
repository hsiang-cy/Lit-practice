/*
 * @Author:Kerwin
 * @Date:2025-01-14 11:30:37
 * @LastEditors:Kerwin
 * @LastEditTime:2025-01-14 11:30:38
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '013.004'
const errorName = 'Input File Error - Invalid Field'

export enum ErrorCodes {
  NotAllowedField = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject('INPUT_FILE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const InvalidField = {
  /** 未允許的欄位 */
  NotAllowedField: (field: string) => errorParse(ErrorCodes.NotAllowedField, i18n.t('errors:013.004.NotAllowedField'), { field }),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:013.004.UnknownError'), error)
}

export default InvalidField
