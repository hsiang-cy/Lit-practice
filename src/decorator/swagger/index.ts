/*
 * @Author:Kerwin
 * @Date:2023-09-28 13:42:25
 * @LastEditors:Kerwin
 * @LastEditTime:2023-09-28 13:42:27
 * @Description:
 */

import {
  ErrorApiResponse
} from './error-api-response'

import {
  SearchQueryProperty
} from './search-query-property'

import {
  SuccessApiResponse
} from './success-api-response'

import {
  SuccessSearchApiResponse
} from './success-search-api-response'

export class SwaggerDecorators {
  public static SearchQueryProperty = SearchQueryProperty
  public static ErrorApiResponse = ErrorApiResponse
  public static SuccessApiResponse = SuccessApiResponse
  public static SuccessSearchApiResponse = SuccessSearchApiResponse
}
