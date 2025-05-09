/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:02:01
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:51:13
 * @Description:
 */

export type BaseErrorType =
  'CUSTOMER_MODULE_ERROR' |
  'CALCULATE_JOB_MODULE_ERROR' |
  'ORDER_MODULE_ERROR' |
  'ROUTE_ERROR' |
  'FLEET_MODULE_ERROR' |
  'ROUTE_MODULE_ERROR' |
  'ACCOUNT_MODULE_ERROR' |
  'CUSTOMER_MODULE_ERROR' |
  'CALCULATE_MODULE_ERROR' |
  'ORDER_MODULE_ERROR' |
  'AUTH_MODULE_ERROR' |
  'VEHICLE_MODULE_ERROR' |
  'AUTHENTICATION_ERROR' |
  'AUTHORIZATION_ERROR' |
  'BAD_REQUEST' |
  'INPUT_EMPTY' |
  'INPUT_INVALID' |
  'INPUT_FILE_ERROR' |
  'DATA_NOT_EXIST' |
  'DATA_DUPLICATE' |
  'DATA_NOT_MODIFIED' |
  'DATA_EXPIRED' |
  'EXTERNAL_SERVER_ERROR' |
  'INTERNAL_SERVER_ERROR'

export interface ErrorObject<
  TType extends string = BaseErrorType
> {
  /** 錯誤代碼 */
  code: string
  /** 錯誤類型 */
  type: TType
  /** 錯誤名稱 */
  name: string
  /** 錯誤訊息 */
  message?: string
  /** 額外資訊 */
  extraInfo?: Record<string, any>
}
