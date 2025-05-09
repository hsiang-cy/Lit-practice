/*
 * @Author:Kerwin
 * @Date:2024-04-19 16:17:12
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-19 16:17:13
 * @Description:
 */

import TypeCheck from '@saico/type-check-js'

import {
  Transform,
  TransformOptions
} from 'class-transformer'

export interface TrimOptions extends TransformOptions {
  trimArray?: boolean
}

/**
 * 將字串去除前後空白
 * @param options 選項 { trimArray: 是否處理陣列中的字串 }
 * @description
 * 1. 若 options.trimArray 為 true，則會處理陣列中的字串去除前後空白
 * 2. 若 value 為字串，則會去除前後空白
 * 3. 其餘則不做處理
 */
export function Trim (options: TrimOptions = {}): PropertyDecorator {
  return Transform(
    ({ value }) => {
      if (options.trimArray && TypeCheck.isArray(value)) {
        return value.map((val) => (typeof val === 'string' ? val?.trim() : val))
      }

      if (typeof value === 'string') {
        return value.trim()
      }

      return value
    },
    options
  )
}
