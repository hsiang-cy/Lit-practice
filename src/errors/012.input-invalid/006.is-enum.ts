/*
 * @Author:Kerwin
 * @Date:2024-11-19 17:35:40
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 15:35:54
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.006'
const errorName = 'Input Invalid - is enum'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  status = 1,
  type = 2,
  state = 3,
  currency = 4,
  paymentMethod = 5,
  order = 6,
  paymentState = 7,
  area = 8,
  platform = 9,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.006.defaultMessage'))

export const isEnum = {
  ...generateInputInvalidError
}

export default isEnum
