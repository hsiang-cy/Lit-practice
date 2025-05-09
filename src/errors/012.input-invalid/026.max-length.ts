/*
 * @Author:Kerwin
 * @Date:2024-04-09 17:49:54
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 15:45:02
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.026'
const errorName = 'Input Invalid - max length'

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
  code = 18,
  name = 19,
  id = 20,
  startAddress = 21,
  driverName = 22,
  size = 23,
  volume = 24,
  tonnage = 25,
  routeIds = 26,
  fleetId = 27,
  comment = 28,
  password = 29,
  account = 30,
  deviceId = 31,
  accountId = 32,
  orderId = 33,
  vehicleIds = 34,
  orderGroupId = 35,
  depot = 36,
  route = 37,
  calculateJobId = 38,
  dispatchRouteId = 39,
  address = 40,
  phone = 41,
  customerId = 42,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.026.defaultMessage'))

export const maxLength = {
  ...generateInputInvalidError
}

export default maxLength
