/*
 * @Author:Kerwin
 * @Date:2024-09-13 16:18:01
 * @LastEditors:Kerwin
 * @LastEditTime:2024-09-13 16:18:02
 * @Description:
 */

import {
  registerDecorator,
  ValidationOptions
} from 'class-validator'

/**
 * 自定義裝飾器，用於檢查數字是否大於等於指定的最小值
 * @param minValue 指定的最小值
 * @param validationOptions 可選的驗證參數，用來定義錯誤訊息
 */
export function Int64Min (minValue: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'min',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate (value: any) {
          try {
            const num = BigInt(value)
            const INT64_MIN = BigInt(minValue)
            return num >= INT64_MIN
          } catch (e) {
            return false
          }
        },
        defaultMessage () {
          return `${propertyName} must be greater than or equal to ${minValue}`
        }
      }
    })
  }
}
