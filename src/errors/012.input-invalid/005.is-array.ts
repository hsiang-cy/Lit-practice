/*
 * @Author:Kerwin
 * @Date:2024-11-19 17:35:08
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-15 11:41:11
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.005'
const errorName = 'Input Invalid - is array'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  sort = 1,
  routeIds = 2,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.005.defaultMessage'))

export const isArray = {
  ...generateInputInvalidError
}

export default isArray
