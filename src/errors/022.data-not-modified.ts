/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:41:30
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 15:40:53
 * @Description:
 */

import {
  GenerateErrorObject,
  GenerateErrorObjectWithTemplate
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '022.001'
const errorName = 'Data Not Modified'

export const errorParse = (code: ErrorCodes, message: string, field: string) =>
  GenerateErrorObject('DATA_NOT_MODIFIED', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, { field })

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
  UnknownError = 999
}

const generateDataDuplicateError = GenerateErrorObjectWithTemplate(ErrorCodes, errorParse, i18n.t('errors:022.001.defaultMessage'))

export const DataNotModified = {
  ...generateDataDuplicateError
}

export default DataNotModified
