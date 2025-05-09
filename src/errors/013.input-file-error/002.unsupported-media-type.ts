/*
 * @Author:Kerwin
 * @Date:2024-04-10 10:53:15
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-12 19:03:09
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '013.002'
const errorName = 'Input File Error - Unsupported Media Type'

export enum ErrorCodes {
  UnsupportedMediaType = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject('INPUT_FILE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const UnsupportedMediaType = {
  /** 不支援的檔案類型 */
  UnsupportedMediaType: (field: string) => errorParse(ErrorCodes.UnsupportedMediaType, i18n.t('errors:013.002.UnsupportedMediaType'), { field }),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:013.002.UnknownError'), error)
}

export default UnsupportedMediaType
