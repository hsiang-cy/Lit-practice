/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:54:19
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-15 15:46:33
 * @Description:
 */

import {
  GenerateErrorObject,
  BaseErrorType
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '200.001'
const errorName = 'Vehicle module Error'

export enum ErrorCodes {
  EndTimeEarlierThanStartTime = 1,
  UploadVehicleExcelEmpty = 2,
  UploadVehicleExceedLimit = 3,
  UploadVehicleExcelMissingColumn = 4,
  VehicleCodeEmpty = 5,
  VehicleCodeLengthError = 6,
  VehicleCodeFormatError = 7,
  VehicleCodeDuplicate = 8,
  VehicleDriverNameEmpty = 9,
  VehicleDriverNameLengthError = 10,
  VehicleStartTimeEmpty = 11,
  VehicleStartTimeFormatError = 12,
  VehicleEndTimeEmpty = 13,
  VehicleEndTimeFormatError = 14,
  VehicleMaxCapacityEmpty = 15,
  VehicleMaxCapacityInvalidInt64 = 16,
  VehicleMaxCapacityMin = 17,
  VehicleTypeEmpty = 18,
  VehicleTypeInvalid = 19,
  VehicleForceStartEmpty = 20,
  VehicleForceStartInvalid = 21,
  VehicleForceUseEmpty = 22,
  VehicleForceUseInvalid = 23,
  VehicleMaxDrivingDistanceIsNumber = 24,
  VehicleMaxDrivingDistanceMin = 25,
  VehicleMaxDrivingDistanceMax = 26,
  VehicleRegularWorkTimeIsNumber = 27,
  VehicleRegularWorkTimeMin = 28,
  VehicleRegularWorkTimeMax = 29,
  VehicleMaxDrivingTimeIsNumber = 30,
  VehicleMaxDrivingTimeMin = 31,
  VehicleMaxDrivingTimeMax = 32,
  VehicleStatusEmpty = 33,
  VehicleStatusInvalid = 34,
  VehicleAreaEmpty = 35,
  VehicleAreaEnum = 36,
  Temporary = 55,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject<BaseErrorType>('VEHICLE_MODULE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const Vehicle = {
  /** 結束時間不能早於開始時間 */
  EndTimeEarlierThanStartTime: (row?: number[]) => errorParse(ErrorCodes.EndTimeEarlierThanStartTime, i18n.t('errors:200.001.EndTimeEarlierThanStartTime'), { row }),
  /** 結束時間計算失敗 */
  EndTimeCalculate: (row?: number[]) => errorParse(ErrorCodes.EndTimeEarlierThanStartTime, i18n.t('errors:200.001.EndTimeCalculate'), { row }),
  /** 上傳車輛 (excel) 工作表為空 */
  UploadVehicleExcelEmpty: errorParse(ErrorCodes.UploadVehicleExcelEmpty, i18n.t('errors:200.001.UploadVehicleExcelEmpty')),
  /** 上傳車輛 (excel) 數量超過限制 */
  UploadVehicleExceedLimit: errorParse(ErrorCodes.UploadVehicleExceedLimit, i18n.t('errors:200.001.UploadVehicleExceedLimit')),
  /** 上傳車輛 (excel) 檔案標題列缺少必要欄位 */
  UploadVehicleExcelMissingColumn: errorParse(ErrorCodes.UploadVehicleExcelMissingColumn, i18n.t('errors:200.001.UploadVehicleExcelMissingColumn')),
  /** 隸屬地區號碼 為空 */
  VehicleAreaEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleAreaEmpty, i18n.t('errors:200.001.VehicleAreaEmpty'), { row }),
  /** 隸屬地區號碼 參數錯誤 */
  VehicleAreaEnum: (row?: number[]) => errorParse(ErrorCodes.VehicleAreaEnum, i18n.t('errors:200.001.VehicleAreaEnum'), { row }),
  /** 車牌號碼 為空 */
  VehicleCodeEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleCodeEmpty, i18n.t('errors:200.001.VehicleCodeEmpty'), { row }),
  /** 車牌號碼 長度錯誤 */
  VehicleCodeLengthError: (row?: number[]) => errorParse(ErrorCodes.VehicleCodeLengthError, i18n.t('errors:200.001.VehicleCodeLengthError'), { row }),
  /** 車牌號碼 格式錯誤 */
  VehicleCodeFormatError: (row?: number[]) => errorParse(ErrorCodes.VehicleCodeFormatError, i18n.t('errors:200.001.VehicleCodeFormatError'), { row }),
  /** 車牌號碼 在表格內重複 */
  VehicleCodeDuplicate: (row?: number[]) => errorParse(ErrorCodes.VehicleCodeDuplicate, i18n.t('errors:200.001.VehicleCodeDuplicate'), { row }),
  /** 駕駛 為空 */
  VehicleDriverNameEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleDriverNameEmpty, i18n.t('errors:200.001.VehicleDriverNameEmpty'), { row }),
  /** 駕駛 長度錯誤 */
  VehicleDriverNameLengthError: (row?: number[]) => errorParse(ErrorCodes.VehicleDriverNameLengthError, i18n.t('errors:200.001.VehicleDriverNameLengthError'), { row }),
  /** 工作時間-起 為空 */
  VehicleStartTimeEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleStartTimeEmpty, i18n.t('errors:200.001.VehicleStartTimeEmpty'), { row }),
  /** 工作時間-起 格式錯誤 */
  VehicleStartTimeFormatError: (row?: number[]) => errorParse(ErrorCodes.VehicleStartTimeFormatError, i18n.t('errors:200.001.VehicleStartTimeFormatError'), { row }),
  /** 工作時間-迄 為空 */
  VehicleEndTimeEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleEndTimeEmpty, i18n.t('errors:200.001.VehicleEndTimeEmpty'), { row }),
  /** 工作時間-迄 格式錯誤 */
  VehicleEndTimeFormatError: (row?: number[]) => errorParse(ErrorCodes.VehicleEndTimeFormatError, i18n.t('errors:200.001.VehicleEndTimeFormatError'), { row }),
  /** 承載量 為空 */
  VehicleMaxCapacityEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxCapacityEmpty, i18n.t('errors:200.001.VehicleMaxCapacityEmpty'), { row }),
  /** 承載量 為非法 INT64 數字 */
  VehicleMaxCapacityInvalidInt64: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxCapacityInvalidInt64, i18n.t('errors:200.001.VehicleMaxCapacityInvalidInt64'), { row }),
  /** 承載量 小於最小限制 */
  VehicleMaxCapacityMin: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxCapacityMin, i18n.t('errors:200.001.VehicleMaxCapacityMin'), { row }),
  /** 類型 為空 */
  VehicleTypeEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleTypeEmpty, i18n.t('errors:200.001.VehicleTypeEmpty'), { row }),
  /** 類型 傳入非法字元 */
  VehicleTypeInvalid: (row?: number[]) => errorParse(ErrorCodes.VehicleTypeInvalid, i18n.t('errors:200.001.VehicleTypeInvalid'), { row }),
  /** 強制出發時間 為空 */
  VehicleForceStartEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleForceStartEmpty, i18n.t('errors:200.001.VehicleForceStartEmpty'), { row }),
  /** 強制出發時間 傳入非法字元 */
  VehicleForceStartInvalid: (row?: number[]) => errorParse(ErrorCodes.VehicleForceStartInvalid, i18n.t('errors:200.001.VehicleForceStartInvalid'), { row }),
  /** 強制出勤 為空 */
  VehicleForceUseEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleForceUseEmpty, i18n.t('errors:200.001.VehicleForceUseEmpty'), { row }),
  /** 強制出勤 傳入非法字元 */
  VehicleForceUseInvalid: (row?: number[]) => errorParse(ErrorCodes.VehicleForceUseInvalid, i18n.t('errors:200.001.VehicleForceUseInvalid'), { row }),
  /** 限制總行駛距離上限(公尺) 為非法數字 */
  VehicleMaxDrivingDistanceIsNumber: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxDrivingDistanceIsNumber, i18n.t('errors:200.001.VehicleMaxDrivingDistanceIsNumber'), { row }),
  /** 限制總行駛距離上限(公尺) 小於最小限制 */
  VehicleMaxDrivingDistanceMin: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxDrivingDistanceMin, i18n.t('errors:200.001.VehicleMaxDrivingDistanceMin'), { row }),
  /** 限制總行駛距離上限(公尺) 大於最大限制 */
  VehicleMaxDrivingDistanceMax: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxDrivingDistanceMax, i18n.t('errors:200.001.VehicleMaxDrivingDistanceMax'), { row }),
  /** 限制總工時上限(分鐘) 為非法數字 */
  VehicleRegularWorkTimeIsNumber: (row?: number[]) => errorParse(ErrorCodes.VehicleRegularWorkTimeIsNumber, i18n.t('errors:200.001.VehicleRegularWorkTimeIsNumber'), { row }),
  /** 限制總工時上限(分鐘) 小於最小限制 */
  VehicleRegularWorkTimeMin: (row?: number[]) => errorParse(ErrorCodes.VehicleRegularWorkTimeMin, i18n.t('errors:200.001.VehicleRegularWorkTimeMin'), { row }),
  /** 限制總工時上限(分鐘) 大於最大限制 */
  VehicleRegularWorkTimeMax: (row?: number[]) => errorParse(ErrorCodes.VehicleRegularWorkTimeMax, i18n.t('errors:200.001.VehicleRegularWorkTimeMax'), { row }),
  /** 限制總行駛時間上限(分鐘) 為非法數字 */
  VehicleMaxDrivingTimeIsNumber: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxDrivingTimeIsNumber, i18n.t('errors:200.001.VehicleMaxDrivingTimeIsNumber'), { row }),
  /** 限制總行駛時間上限(分鐘) 小於最小限制 */
  VehicleMaxDrivingTimeMin: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxDrivingTimeMin, i18n.t('errors:200.001.VehicleMaxDrivingTimeMin'), { row }),
  /** 限制總行駛時間上限(分鐘) 大於最大限制 */
  VehicleMaxDrivingTimeMax: (row?: number[]) => errorParse(ErrorCodes.VehicleMaxDrivingTimeMax, i18n.t('errors:200.001.VehicleMaxDrivingTimeMax'), { row }),
  /** 啟用狀態 為空 */
  VehicleStatusEmpty: (row?: number[]) => errorParse(ErrorCodes.VehicleStatusEmpty, i18n.t('errors:200.001.VehicleStatusEmpty'), { row }),
  /** 啟用狀態 傳入非法字元 */
  VehicleStatusInvalid: (row?: number[]) => errorParse(ErrorCodes.VehicleStatusInvalid, i18n.t('errors:200.001.VehicleStatusInvalid'), { row }),

  Temporary: (field?: string) => errorParse(ErrorCodes.Temporary, "db錯誤", field),

  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:200.001.UnknownError'), error)
}

export default Vehicle
