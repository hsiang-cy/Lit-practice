/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:02:50
 * @LastEditors: kerwin.hou kerwin.hou@gosaico.com
 * @LastEditTime: 2024-09-16 01:13:18
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '001.002'
const errorName = 'Route Error - API Version Error'

export enum ErrorCodes {
  APIVersionNotExist = 1,
  APIVersionDeprecated = 2,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string) =>
  GenerateErrorObject('ROUTE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message)

export const APIVersionError = {
  /** 您指定的 API 版本不存在，請確認可使用的 API 版本。 */
  APIVersionNotExist: errorParse(ErrorCodes.APIVersionNotExist, i18n.t('errors:001.002.APIVersionNotExist')),
  /** 您指定的 API 版本已棄用，請改用其他較新的 API 版本。 */
  APIVersionDeprecated: errorParse(ErrorCodes.APIVersionDeprecated, i18n.t('errors:001.002.APIVersionDeprecated')),
  /** 未知錯誤 */
  UnknownError: errorParse(ErrorCodes.UnknownError, i18n.t('errors:001.002.UnknownError'))
}

export default APIVersionError
