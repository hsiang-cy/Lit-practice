/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:56:33
 * @LastEditors:Kerwin
 * @LastEditTime:2023-09-28 11:56:36
 * @Description:
 */

import type {
  BaseErrorType,
  ErrorObject
} from '$errors'

/**
 * 判斷給定的值是否是 ErrorObject 的實例
 * @param error - 要檢查的值
 * @returns boolean
 */
export function isErrorObject<TType extends string = BaseErrorType> (error: any): error is ErrorObject<TType> {
  return typeof error === 'object' && ('code' in error && 'type' in error && 'name' in error)
}

/**
 * 判斷給定的值是否是 ErrorObject 的陣列
 * @param error - 要檢查的值
 * @returns boolean
 */
export function isErrorObjectArray<TType extends string = BaseErrorType> (error: any): error is ErrorObject<TType>[] {
  return Array.isArray(error) && error.every(isErrorObject)
}
