/*
 * @Author:Kerwin
 * @Date:2024-04-10 11:54:19
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:34:42
 * @Description:
 */

import {
  GenerateErrorObject,
  BaseErrorType
} from '$errors/base'

import {
  i18n
} from '$shared-service/i18n'

const errorTypeCode = '600.001'
const errorName = 'CalculateJob module Error'

export enum ErrorCodes {
  typeError = 1,
  noInfo = 2,
  CalculateJobNotFinished = 3,
  UnknownError = 999
}

export const errorParse = (code: ErrorCodes, message: string, field?: any) =>
  GenerateErrorObject<BaseErrorType>('CALCULATE_JOB_MODULE_ERROR', `${errorTypeCode}.${String(code).padStart(3, '0')}`, errorName, message, field)

export const CalculateJob = {
  idTypeError: (id: any) => errorParse(ErrorCodes.typeError, i18n.t('errors:600.001.typeError', { id }), id),

  noInfo: (id: any) => errorParse(ErrorCodes.typeError, i18n.t('errors:600.001.noInfo', { id }), id),

  /** 計算任務未完成 */
  CalculateJobNotFinished: errorParse(ErrorCodes.CalculateJobNotFinished, i18n.t('errors:600.001.CalculateJobNotFinished')),

  /** 未知錯誤 */
  UnknownError: (error?: any) => errorParse(ErrorCodes.UnknownError, i18n.t('errors:600.001.UnknownError'), error)
}

export default CalculateJob
