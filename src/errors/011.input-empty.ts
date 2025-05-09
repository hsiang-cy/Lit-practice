/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:01:12
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 15:45:15
 * @Description:
 */

import {
  GenerateErrorObjectWithTemplate,
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '011.001'
const errorName = 'Input Empty'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('INPUT_EMPTY', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  applicationId = 1,
  code = 2,
  name = 3,
  startAddress = 4,
  endAddress = 5,
  priority = 6,
  id = 7,
  status = 8,
  fleetId = 9,
  vehicleIds = 10,
  driverName = 11,
  startTime = 12,
  endTime = 13,
  maxCapacity = 14,
  type = 15,
  forceUse = 16,
  forceStart = 17,
  maxDrivingDistance = 18,
  regularWorkTime = 19,
  maxDrivingTime = 20,
  calculateJobId = 21,
  dispatchRouteId = 22,
  orderGroupId = 23,
  key = 24,
  fleetMemberIds = 25,
  planStartDate = 26,
  subscriptionPlanCycleId = 27,
  subscriptionId = 28,
  state = 29,
  currency = 30,
  paymentMethod = 31,
  amount = 32,
  paymentTime = 33,
  TWD = 34,
  isVisible = 35,
  subscriptionPlanId = 36,
  duration = 37,
  price = 38,
  calculateLimit = 39,
  vehicleLimit = 40,
  destinationLimit = 41,
  monthlyDestinationLimit = 42,
  destinationPrice = 43,
  overDestinationPrice = 44,
  area = 45,
  tonnage = 46,
  size = 47,
  volume = 48,
  password = 49,
  account = 50,
  deviceId = 51,
  platform = 52,
  token = 53,
  accountId = 54,
  orderId = 55,
  counts = 56,
  monday = 57,
  tuesday = 58,
  wednesday = 59,
  thursday = 60,
  friday = 61,
  saturday = 62,
  sunday = 63,
  customerId = 64,
  specialTW = 65,
  UnknownError = 999
}

const generateInputEmptyError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:011.001.defaultMessage'))

export const InputEmpty = {
  ...generateInputEmptyError
}

export default InputEmpty
