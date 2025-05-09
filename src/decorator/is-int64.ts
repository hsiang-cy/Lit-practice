/*
 * @Author:Kerwin
 * @Date:2024-09-13 16:11:57
 * @LastEditors:Kerwin
 * @LastEditTime:2024-09-13 16:19:53
 * @Description:
 */

import {
  registerDecorator,
  ValidationOptions
} from 'class-validator'

/**
 * 自定義裝飾器，用於檢查字串是否為合法的 int64 整數
 * @param validationOptions 可選的驗證參數，用來定義錯誤訊息
 */
export function IsInt64 (validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate (value: any) {
          try {
            const num = BigInt(value)
            const INT64_MIN = BigInt('-9223372036854775808')
            const INT64_MAX = BigInt('9223372036854775807')
            return num >= INT64_MIN && num <= INT64_MAX
          } catch (e) {
            return false
          }
        },
        defaultMessage () {
          return `${propertyName} must be a valid int64 number`
        }
      }
    })
  }
}
