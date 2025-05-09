/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:28:42
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-17 17:05:37
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '021.001'
const errorName = 'Data Duplicate'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('DATA_DUPLICATE', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  code = 1,
  name = 2,
  account = 3,
  UnknownError = 999
}

const generateDataDuplicateError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:021.001.defaultMessage'))

export const DataDuplicate = {
  ...generateDataDuplicateError
}

export default DataDuplicate
