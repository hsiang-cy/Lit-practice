/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:02:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 15:44:27
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '012.001'
const errorName = 'Input Invalid - is string'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_INVALID', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  routeIds = 1,
  code = 2,
  name = 3,
  startAddress = 4,
  endAddress = 5,
  id = 6,
  fleetId = 7,
  vehicleIds = 8,
  driverName = 9,
  comment = 10,
  location = 11,
  phone = 12,
  executeVehicles = 13,
  fileName = 14,
  orderGroupId = 15,
  calculateJobId = 16,
  dispatchRouteId = 17,
  key = 18,
  fleetMemberIds = 19,
  subscriptionPlanCycleId = 20,
  subscriptionId = 21,
  organizationId = 22,
  organizationName = 23,
  applicationName = 24,
  subscriptionPlanId = 25,
  description = 26,
  area = 27,
  tonnage = 28,
  size = 29,
  volume = 30,
  account = 31,
  password = 32,
  deviceId = 33,
  platform = 34,
  userAgent = 35,
  ip = 36,
  token = 37,
  accountId = 38,
  orderId = 39,
  depot = 40,
  route = 41,
  address = 42,
  monday = 43,
  tuesday = 44,
  wednesday = 45,
  thursday = 46,
  friday = 47,
  saturday = 48,
  sunday = 49,
  UnknownError = 999
}

const generateInputInvalidError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:012.001.defaultMessage'))

export const isString = {
  ...generateInputInvalidError
}

export default isString
