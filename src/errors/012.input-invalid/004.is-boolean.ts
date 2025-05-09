/*
 * @Author:Kerwin
 * @Date:2024-04-09 17:49:54
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-15 11:30:58
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.004'
const errorName = 'Input Invalid - is boolean'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  forceUse = 1,
  forceStart = 2,
  isError = 3,
  isVisible = 4,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.004.defaultMessage'))

export const isBoolean = {
  ...generateInputInvalidError
}

export default isBoolean
