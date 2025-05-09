/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:01:06
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 15:00:12
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '010.001'
const errorName = 'Bad Request'

export enum ErrorCodes {
  EmptyQuery = 1,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string) =>
  GenerateErrorObject('BAD_REQUEST', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message)

export const BadRequest = {
  /** Empty Query */
  EmptyQuery: errorParse(ErrorCodes.EmptyQuery, i18n.t('errors:010.001.EmptyQuery')),
  /** 未知錯誤 */
  UnknownError: errorParse(ErrorCodes.UnknownError, i18n.t('errors:010.001.UnknownError'))
}

export default BadRequest
