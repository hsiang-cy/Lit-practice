/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:54:19
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-16 15:56:43
 * @Description:
 */

import {
  GenerateErrorObject,
  BaseErrorType
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '700.001'
const errorName = 'Order module Error'

export enum ErrorCodes {
  StartTimeEarlierThanToday = 1,
  ImportOrderError = 2,
  NotVehicleCanRunThisRoute = 3,
  FormatError = 4,
  tlErr = 5,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject<BaseErrorType>('ORDER_MODULE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const Order = {
  /** 計算日期不可早於今日 */
  StartTimeEarlierThanToday: errorParse(ErrorCodes.StartTimeEarlierThanToday, i18n.t('errors:700.001.StartTimeEarlierThanToday')),

  /** 解析訂單發生錯誤 */
  ImportOrderError: (error?: any) => errorParse(ErrorCodes.ImportOrderError, i18n.t('errors:700.001.ImportOrderError'), error),

  /** 沒有車輛能夠跑該路線 */
  NotVehicleCanRunThisRoute: (route?: string[]) => errorParse(ErrorCodes.NotVehicleCanRunThisRoute, i18n.t('errors:700.001.NotVehicleCanRunThisRoute'), route),

  /** 格式錯誤 */
  FormatError: errorParse(ErrorCodes.FormatError, i18n.t('errors:700.001.FormatError')),

  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:700.001.UnknownError'), error),
  tlErr: (field?: string) => errorParse(ErrorCodes.tlErr, "tlErr", field),

}

export default Order
