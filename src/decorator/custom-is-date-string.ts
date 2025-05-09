/*
 * @Author:Kerwin
 * @Date:2024-09-19 11:21:39
 * @LastEditors:Kerwin
 * @LastEditTime:2024-10-08 13:47:21
 * @Description:
 */

import {
  registerDecorator,
  ValidationOptions
} from 'class-validator'

import moment from 'moment-timezone'

/**
 * 使用 moment 套件檢查是否為日期字串 => 因為 class-validator 的 IsDateString 在某些特定日期會判斷錯誤
 * @description
 * 1. 2024-04-31 => 4 月只有 30 天，但 IsDateString 會判斷為合法日期
 * 2. 2025-02-29 => 當年非閏年，但 IsDateString 會判斷為合法日期
 */
export function CustomIsDateString (validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate (value: any) {
          const isValidDate = moment(value, moment.ISO_8601, true).isValid()
          return isValidDate
        },
        defaultMessage () {
          return `${propertyName} must be a valid ISO 8601 date string`
        }
      }
    })
  }
}
