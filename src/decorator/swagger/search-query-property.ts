/*
 * @Author:Kerwin
 * @Date:2023-09-28 13:42:32
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 14:11:54
 * @Description:
 */

import {
  ApiPropertyOptions,
  ApiPropertyOptional
} from '@nestjs/swagger'

/**
 * 將 ApiPropertyOptional 裝飾器進行包裝，代表參數可以接受 類型 與 類型陣列 (Search API專用)
 * @param options.enumOrType - 類型 (string, number) 或是 枚舉
 * @param options.xxx - 其他 ApiPropertyOptional 原本的 options
 * @returns 裝飾器
 */
export const SearchQueryProperty = (
  options: {
    enumOrType: Record<string, any> | 'string' | 'number'
  } & Omit<ApiPropertyOptions, 'enum' | 'isArray'>
) => {
  const { enumOrType, ...propertyOptions } = options

  if (enumOrType === 'string' || enumOrType === 'number') {
    return ApiPropertyOptional({
      ...propertyOptions,
      oneOf: [
        { type: enumOrType },
        { type: 'array', items: { type: enumOrType } }
      ]
    })
  }

  return ApiPropertyOptional({
    ...propertyOptions,
    isArray: true,
    enum: enumOrType
  })
}
