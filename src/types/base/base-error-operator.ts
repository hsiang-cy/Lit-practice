/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:57:30
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-12 19:00:36
 * @Description:
 */

import type {
  BaseErrorType,
  ErrorObject
} from '$errors'

import {
  BaseQuery,
  ServiceResponse
} from '$types'

/** 用來處理未進入operator的error */
export class BaseErrorOperator {
  private defaultQuery: BaseQuery = {
    debug: false,
    examine: false,
    attributes: ['errors'],
    callback: null
  }

  constructor (
    private readonly query: any,
    private readonly body: any,
    private readonly errors: ErrorObject<BaseErrorType>[]
  ) { }

  public async processResponse () {
    const baseResponse = this.getDefaultQuery(this.query as BaseQuery)
    const serverResponse = new ServiceResponse()

    if (baseResponse.attributes.includes('payload')) serverResponse.setPayload({ ...this.query, ...this.body })
    if (baseResponse.attributes.includes('errors')) serverResponse.addError(this.errors)

    return serverResponse
  }

  private getDefaultQuery (query?: BaseQuery) {
    const examine = query?.examine === 'true'
    const debug = query?.debug === 'true'

    return {
      ...this.defaultQuery,
      ...query,
      examine,
      debug
    }
  }
}
