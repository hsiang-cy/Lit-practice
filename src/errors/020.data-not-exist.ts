/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:19:55
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-20 17:09:45
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '020.001'
const errorName = 'Data Not Exist'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('DATA_NOT_EXIST', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

export enum ErrorCodes {
  fleet = 1,
  vehicle = 2,
  orderGroup = 3,
  orderGroupDestination = 4,
  calculateJob = 5,
  dispatchRoute = 6,
  subscription = 7,
  fleetMember = 8,
  subscriptionPlanCycle = 9,
  application = 10,
  subscriptionPayment = 11,
  subscriptionPlan = 12,
  routeIds = 13,
  route = 14,
  account = 15,
  accountToken = 16,
  customer = 17,
  dispatchRouteTask = 18,
  UnknownError = 999
}

const generateDataNotExistError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:020.001.defaultMessage'))

export const DataNotExist = {
  ...generateDataNotExistError
}

export default DataNotExist
