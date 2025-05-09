/*
 * @Author:Kerwin
 * @Date:2024-09-18 10:58:18
 * @LastEditors:Kerwin
 * @LastEditTime:2024-09-18 10:58:19
 * @Description:
 */

import {
  randomBytes
} from 'crypto'

/**
 * 生成指定長度的隨機字串 (16 進位)，所以長度會是 length * 2
 * @param length - 長度 (預設 32)
 * @returns string
 * @description 若要用來當作 token，請確保長度足夠(建議 32 字元以上)
 */
export function generateRandomString (length = 32): string {
  return randomBytes(length).toString('hex')
}
