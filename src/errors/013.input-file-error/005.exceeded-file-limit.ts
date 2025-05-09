/*
 * @Author:Kerwin
 * @Date:2025-01-14 11:30:59
 * @LastEditors:Kerwin
 * @LastEditTime:2025-01-14 11:31:00
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '013.005'
const errorName = 'Input File Error - File Count Limit Exceeded'

export enum ErrorCodes {
  FileCountLimitExceeded = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject('INPUT_FILE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const ExceededFileLimit = {
  /** 超過欄位檔案上限 */
  FileCountLimitExceeded: (field: string) => errorParse(ErrorCodes.FileCountLimitExceeded, i18n.t('errors:013.005.FileCountLimitExceeded'), { field }),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:013.005.UnknownError'), error)
}

export default ExceededFileLimit
