/*
 * @Author:Kerwin
 * @Date:2024-04-09 17:49:54
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-24 11:43:24
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.027'
const errorName = 'Input Invalid - array not empty'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  vehicleIds = 1,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.027.defaultMessage'))

export const arrayNotEmpty = {
  ...generateInputInvalidError
}

export default arrayNotEmpty
