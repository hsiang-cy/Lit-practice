/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:02:44
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 14:58:45
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '001.001'
const errorName = 'Route Error - API Not Found'

export enum ErrorCodes {
  APINotFound = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string) =>
  GenerateErrorObject('ROUTE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message)

export const APINotFound = {
  /** 您指定的 API 服務不存在，請確認可使用的 API 服務。 */
  APINotFound: errorParse(ErrorCodes.APINotFound, i18n.t('errors:001.001.APINotFound')),
  /** 未知錯誤 */
  UnknownError: errorParse(ErrorCodes.UnknownError, i18n.t('errors:001.001.UnknownError'))
}

export default APINotFound
