/*
 * @Author:Kerwin
 * @Date:2024-11-07 10:48:16
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-15 11:29:44
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.022'
const errorName = 'Input Invalid - max'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  priority = 1,
  startTime = 2,
  endTime = 3,
  maxDrivingDistance = 4,
  regularWorkTime = 5,
  maxDrivingTime = 6,
  serviceTime = 7,
  start = 8,
  end = 9,
  amount = 10,
  TWD = 11,
  vehicleLimit = 12,
  destinationLimit = 13,
  monthlyDestinationLimit = 14,
  limit = 15,
  offset = 16,
  duration = 17,
  counts = 18,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.022.defaultMessage'))

export const max = {
  ...generateInputInvalidError
}

export default max
