/*
 * @Author:Kerwin
 * @Date:2024-09-11 16:11:11
 * @LastEditors:Kerwin
 * @LastEditTime:2024-09-11 16:11:12
 * @Description:
 */

import {
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common'

import {
  isErrorObject
} from './is-error-object'

/**
 * 根據錯誤類型決定要丟去哪個`exception filter`處理
 * @param error
 * @description
 * 只判斷自定義錯誤類型，因為所有有被檢查的都一定會包裝成自定義錯誤
 */
export function CheckAuthErrorType (error: unknown) {
  if (isErrorObject(error)) {
    if (error.type === 'AUTHENTICATION_ERROR') throw new UnauthorizedException(error)
    else if (error.type === 'AUTHORIZATION_ERROR') throw new ForbiddenException(error)
  }
}
