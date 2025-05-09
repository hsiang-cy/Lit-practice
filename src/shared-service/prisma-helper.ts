/*
 * @Author:Kerwin
 * @Date:2024-04-08 14:08:51
 * @LastEditors:Kerwin
 * @LastEditTime:2024-11-13 10:52:39
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import moment from 'moment-timezone'

import {
  BaseSort
} from '$types'

@Injectable()
export class PrismaHelper {
  /** 根據條件是否為`true`，回傳 資料 或 預設值
   * @param condition - 條件
   * @param data - 資料
   * @param defaultValue - 預設值
   * @returns 產生的值
   * @description
   * 若`condition`為`true`，回傳`data`，否則回傳`defaultValue`
   * @example
   * ```ts
   * const input = 'not data'
   *
   * await this.prisma.user.findMany({
   *   where: {
   *     type: returnDataOrDefault(input === 'data', input, 'default') // 'default'
   *   }
   * })
   * ```
   */
  returnDataOrDefault<T, Q> (
    condition: boolean,
    data: T,
    defaultValue: Q
  ) {
    return condition ? data : defaultValue
  }

  /**
   * 處理基本查詢條件 (此函數不支援模糊查詢)
   * @param condition - 查詢條件，可以是任何型別，也可以是該型別的陣列，或是`undefined`
   * @param isCaseInsensitive - 是否忽略大小寫 (只有字串型別支援)
   * @returns 處理後的查詢條件
   * @description
   * 1. 如果原始條件是陣列，去除陣列中的空字串
   * 2. 如果原始條件是`undefined`或 空字串 或 空陣列(已去除陣列中的空字串)，回傳`undefined`
   * 3. 如果原始條件是陣列，則回傳一個物件，其`in`屬性為該陣列
   * 4. 其他情況直接回傳原始條件
   * @example
   * ```ts
   * const id = ''
   * const name = 'Tom'
   * const type = ['a', 'b', '']
   *
   * await this.prisma.user.findMany({
   *   where: {
   *     id: processSearchCondition(searchQuery.id), // undefined
   *     name: processSearchCondition(searchQuery.name, true) // { equals: 'Tom', mode: 'insensitive' }
   *     type: processSearchCondition(searchQuery.type) // { in: ['a', 'b'] }
   *   }
   * })
   * ```
   */
  processSearchCondition<T> (
    condition: T | T[] | undefined,
    isCaseInsensitive?: T extends string ? boolean : never
  ) {
    const filterCondition = TypeCheck.isArray(condition) ? condition.filter(d => TypeCheck.isNotEmpty(d)) : condition

    if (TypeCheck.isEmpty(filterCondition)) return undefined

    return TypeCheck.isArray(filterCondition)
      ? {
        in: filterCondition,
        mode: isCaseInsensitive ? 'insensitive' : undefined as Prisma.QueryMode | undefined
      }
      : {
        equals: filterCondition,
        mode: isCaseInsensitive ? 'insensitive' : undefined as Prisma.QueryMode | undefined
      }
  }

  /**
   * 產生模糊查詢條件
   * @param condition - 查詢條件，為字串 或 字串陣列
   * @param conditionName - 查詢條件的名稱
   * @param isCaseInsensitive - 是否忽略大小寫 (預設為`true`)
   * @returns 處理後的查詢條件
   * @description
   * 1. 如果原始條件是陣列，去除陣列中的空字串
   * 2. 如果原始條件是`undefined`或 空字串 或 空陣列(已去除陣列中的空字串)，回傳`undefined`
   * 3. 如果原始條件是陣列，回傳陣列中每個字串的模糊查詢條件
   * 4. 若原始條件是字串，回傳該字串的模糊查詢條件 (以陣列包裹)
   * @example
   * ```ts
   * const name = 'Name'
   * const address = ['Address', '']
   *
   * await this.prisma.user.findMany({
   *   where: {
   *     AND: [
   *       { OR: createFuzzySearchQuery(searchQuery.name, 'name') }, // { OR: [{ name: { contains: 'Name', mode: 'insensitive' }] }
   *       { OR: createFuzzySearchQuery(searchQuery.address, 'address', false) } // { OR: [{ address: { contains: 'Address', mode: 'default' }] }
   *     ]
   *   }
   * })
   * ```
   */
  createFuzzySearchQuery (
    condition: string | string[] | undefined,
    conditionName: string,
    isCaseInsensitive = true
  ) {
    const filterCondition = TypeCheck.isArray(condition) ? condition.filter(d => TypeCheck.isNotEmpty(d)) : condition

    if (TypeCheck.isEmpty(filterCondition)) return undefined

    // 設定模式 (是否忽略大小寫)
    const mode = isCaseInsensitive ? 'insensitive' : 'default' as Prisma.QueryMode

    return Array.isArray(filterCondition)
      ? filterCondition.map(c => ({
        [conditionName]: {
          contains: c,
          mode
        }
      }))
      : [{
        [conditionName]: {
          contains: filterCondition,
          mode
        }
      }]
  }

  /** 處理排序條件
   * @param sort - 排序條件
   * @param defaultSort - 預設排序條件
   * @param map - 排序條件對應的欄位名稱 (可以對應多個欄位，順序為排序的優先順序)
   * @returns 處理後的排序條件
   * @description
   * 會將`sort`中的每一個排序條件轉換成`Prisma`的排序條件，排除掉沒有對應的欄位名稱的排序條件，若沒有排序條件，回傳預設排序條件
   * @example
   * ```ts
   * const haveSort = [
   *  { name: 'accountId', order: 'desc' },
   *  { name: 'account', order: 'asc' }
   * ]
   * const notHaveSort = []
   * const defaultSort = [{ createTime: 'asc' }]
   *
   * await this.prisma.user.findMany({
   *   orderBy: processSortCondition(haveSort, defaultSort, { accountId: 'id', account: 'account') // [{ id: 'desc' }, { account: 'asc' }]
   * })
   *
   * await this.prisma.user.findMany({
   *   orderBy: processSortCondition(notHaveSort, defaultSort, { accountId: 'id', account: 'account') // [{ createTime: 'asc' }]
   * })
   * ```
   */
  processSortCondition<T extends BaseSort> (
    sort: T[],
    defaultSort: Record<string, 'asc' | 'desc'>[],
    map: Partial<Record<T['name'], string | string[]>>
  ) {
    const sortCondition: Record<string, 'asc' | 'desc'>[] = []

    for (const s of sort) {
      const field = map[s.name as T['name']]

      // 若沒有對應的欄位名稱，跳過
      if (TypeCheck.isEmpty(field)) continue

      if (TypeCheck.isArray(field) && field.length !== 0) {
        for (const f of field) {
          const order = TypeCheck.isNotEmpty(s.order?.trim()) ? s.order?.trim().toLowerCase() : 'asc'
          sortCondition.push({
            [f]: order as 'asc' | 'desc'
          })
        }
      }

      if (TypeCheck.isString(field)) {
        const order = TypeCheck.isNotEmpty(s.order?.trim()) ? s.order?.trim().toLowerCase() : 'asc'
        sortCondition.push({
          [field]: order as 'asc' | 'desc'
        })
      }
    }

    // 若沒有排序條件，回傳預設排序條件
    if (sortCondition.length === 0) return defaultSort

    return sortCondition
  }

  /** 處理`Take`條件
   * @param limit - 取得資料筆數
   * @returns 處理後的`Take`條件
   * @description
   * 若`limit`為`undefined`或 小於等於0，回傳10
   * @example
   * ```ts
   * const limit = 5
   * const noLimit = undefined
   *
   * await this.prisma.user.findMany({
   *   take: processLimitCondition(limit) // 5
   * })
   *
   * await this.prisma.user.findMany({
   *   take: processLimitCondition(noLimit) // 10
   * })
   * ```
   */
  processLimitCondition (limit?: number) {
    if (TypeCheck.isEmpty(limit)) return 10

    return limit > 0 ? limit : undefined
  }

  /** 處理`Skip`條件
   * @param offset - 跳過資料筆數
   * @returns 處理後的`Skip`條件
   * @description
   * 若`offset`為`undefined`或 小於等於0，回傳0
   * @example
   * ```ts
   * const offset = 5
   * const noOffset = undefined
   *
   * await this.prisma.user.findMany({
   *   skip: processOffsetCondition(offset) // 5
   * })
   *
   * await this.prisma.user.findMany({
   *   skip: processOffsetCondition(noOffset) // 0
   * })
   * ```
   */
  processOffsetCondition (offset?: number) {
    if (TypeCheck.isEmpty(offset)) return 0

    return offset > 0 ? offset : 0
  }

  /** 處理時間間隔條件 (`string`版)
   * @param startTime - 開始時間
   * @param endTime - 結束時間
   * @returns 處理後的時間間隔條件
   * @example
   * ```ts
   * const startTime = '2022-01-01'
   * const endTime = '2022-01-02'
   *
   * await this.prisma.user.findMany({
   *   where: {
   *     createTime: processTimeInterval(startTime, endTime) // { gte: '2022-01-01T00:00:00.000Z', lte: '2022-01-02T00:00:00.000Z' }
   *   }
   * })
   * ```
   */
  processTimeInterval (startTime?: string, endTime?: string) {
    const formatTime = (time?: string) =>
      TypeCheck.isNotEmpty(time) ? moment(time).toISOString() : undefined

    return {
      gte: formatTime(startTime),
      lte: formatTime(endTime)
    }
  }

  /** 處理數字間隔條件
   * @param startNumber - 開始數字
   * @param endNumber - 結束數字
   * @returns 處理後的數字間隔條件
   * @example
   * ```ts
   * const startNumber = 1
   * const endNumber = 10
   * const startNumberString = '500'
   * const endNumberString = '1000'
   *
   * await this.prisma.order.findMany({
   *   where: {
   *     count: processNumberInterval(startNumber, endNumber) // { gte: 1, lte: 10 }
   *     price: processNumberInterval(startNumberString, endNumberString) // { gte: 500, lte: 1000 }
   *   }
   * })
   */
  processNumberInterval (startNumber?: number | string, endNumber?: number | string) {
    // 若不是undefined 且 是合法的數字字串，轉換成數字
    const formatNumber = (num?: number | string) =>
      TypeCheck.isNotEmpty(num) && TypeCheck.isNumber(num, true) ? Number(num) : undefined

    return {
      gte: formatNumber(startNumber),
      lte: formatNumber(endNumber)
    }
  }

  /** 處理`Optional`的`input value`
   * @param input - 輸入值
   * @param emptyStringIsUndefined - 是否將空字串視為`undefined` (預設為`false`)
   * @returns 處理後的值
   * @description
   * 1. 如果`input`是`undefined`或`null` => 回傳`undefined`
   * 2. 如果`emptyIsUndefined`是`true`，且`input`是空字串 => 回傳`undefined`
   * @example
   * ```ts
   * const input = 'data'
   * const emptyInput = ''
   * const noInput = undefined
   * const nullInput = null
   *
   * await this.prisma.user.findMany({
   *   where: {
   *     name: processOptionalInput(input) // 'data'
   *     firstName: processOptionalInput(emptyInput, true) // undefined
   *     lastName: processOptionalInput(emptyInput) // ''
   *     age: processOptionalInput(noInput) // undefined
   *     address: processOptionalInput(nullInput) // undefined
   *   }
   * })
   * ```
   */
  processOptionalInput<T> (input: T | undefined | null, emptyStringIsUndefined = false) {
    // 如果input是undefined 或 null => 回傳undefined
    if (TypeCheck.isNullOrUndefined(input)) return undefined

    // 如果emptyIsUndefined 是true，且input是空字串 => 回傳undefined
    if (emptyStringIsUndefined && TypeCheck.isEmpty(input)) return undefined

    return input
  }
}
