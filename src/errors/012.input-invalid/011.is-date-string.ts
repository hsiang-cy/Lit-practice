/*
 * @Author:Kerwin
 * @Date:2024-04-09 17:49:54
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 16:43:12
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.011'
const errorName = 'Input Invalid - is date string'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  startTime = 1,
  startTimeStart = 2,
  startTimeEnd = 3,
  planStartDateStart = 4,
  planStartDateEnd = 5,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.011.defaultMessage'))

export const isDateString = {
  ...generateInputInvalidError
}

export default isDateString
