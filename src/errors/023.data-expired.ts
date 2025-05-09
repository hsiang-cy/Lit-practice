/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:43:52
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-10 11:44:12
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '023.001'
const errorName = 'Data Expired'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('DATA_EXPIRED', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  UnknownError = 999
}

const generateDataDuplicateError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:023.001.defaultMessage'))

export const DataExpired = {
  ...generateDataDuplicateError
}

export default DataExpired
