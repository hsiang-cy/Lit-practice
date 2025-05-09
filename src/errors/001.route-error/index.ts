/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:02:57
 * @LastEditors:Kerwin
 * @LastEditTime:2023-09-28 12:02:59
 * @Description:
 */

import {
  ErrorCodes as APINotFoundErrorCodes,
  APINotFound
} from './001.api-not-found'

import {
  ErrorCodes as APIVersionErrorCodes,
  APIVersionError
} from './002.api-version-error'

export default {
  APINotFound,
  APIVersionError
}

export {
  APINotFoundErrorCodes,
  APIVersionErrorCodes
}
