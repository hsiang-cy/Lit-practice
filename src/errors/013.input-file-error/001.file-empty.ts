/*
 * @Author:Kerwin
 * @Date:2024-04-10 10:50:56
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-12 19:03:04
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '013.001'
const errorName = 'Input File Error - File Empty'

export enum ErrorCodes {
  FileEmpty = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject('INPUT_FILE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const FileEmpty = {
  /** 檔案為空 */
  FileEmpty: (field: string) => errorParse(ErrorCodes.FileEmpty, i18n.t('errors:013.001.FileEmpty'), { field }),
  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:013.001.UnknownError'), error)
}

export default FileEmpty
