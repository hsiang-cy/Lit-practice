/*
 * @Author:Kerwin
 * @Date:2024-04-09 17:49:54
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-09 17:59:11
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.031'
const errorName = 'Input Invalid - array max size'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.031.defaultMessage'))

export const arrayMaxSize = {
  ...generateInputInvalidError
}

export default arrayMaxSize
