/*
 * @Author:Kerwin
 * @Date:2024-11-07 10:47:36
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-15 11:30:44
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.002'
const errorName = 'Input Invalid - is number'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  priority = 1,
  startTime = 2,
  endTime = 3,
  maxCapacity = 4,
  maxDrivingDistance = 5,
  regularWorkTime = 6,
  maxDrivingTime = 7,
  deliveryDemand = 8,
  serviceTime = 9,
  start = 10,
  end = 11,
  amount = 12,
  TWD = 13,
  vehicleLimit = 14,
  destinationLimit = 15,
  monthlyDestinationLimit = 16,
  limit = 17,
  offset = 18,
  duration = 19,
  counts = 20,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.002.defaultMessage'))

export const isNumber = {
  ...generateInputInvalidError
}

export default isNumber
