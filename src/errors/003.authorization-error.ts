/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:00:59
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-06 15:53:27
 * @Description:
 */

import {
  GenerateErrorObject
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '003.001'
const errorName = 'Authorization error'

export enum ErrorCodes {
  PermissionDenied = 1,
  AccountLocked = 2,
  AccountInactive = 3,
  AccountNotExist = 4,
  AccountStateNotAllow = 5,
  AccountNotBelongToOrganization = 6,
  AccountNotHaveApplicationPermission = 7,
  ApplicationNotExist = 8,
  ClientSecretInvalid = 9,
  ClientSecretExpired = 10,
  OrganizationStatusNotAllow = 11,
  ApplicationStatusNotAllow = 12,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string) =>
  GenerateErrorObject('AUTHORIZATION_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message)

export const AuthorizationError = {
  /** 權限不足 */
  PermissionDenied: errorParse(ErrorCodes.PermissionDenied, i18n.t('errors:003.001.PermissionDenied')),
  /** 帳號已鎖定 */
  AccountLocked: errorParse(ErrorCodes.AccountLocked, i18n.t('errors:003.001.AccountLocked')),
  /** 帳號停用 */
  AccountInactive: errorParse(ErrorCodes.AccountInactive, i18n.t('errors:003.001.AccountInactive')),
  /** 帳號不存在 */
  AccountNotExist: errorParse(ErrorCodes.AccountNotExist, i18n.t('errors:003.001.AccountNotExist')),
  /** 權限驗證失敗，未知的錯誤 */
  UnknownError: errorParse(ErrorCodes.UnknownError, i18n.t('errors:003.001.UnknownError'))
}

export default AuthorizationError
