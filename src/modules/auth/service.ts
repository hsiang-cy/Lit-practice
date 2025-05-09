/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2024-05-24 17:57:30
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import * as Dto from './dto'

import * as Operator from './operator'

import {
  Config
} from '$shared-service'

import {
  BaseModule,
  BaseQuery
} from '$types'

@Injectable()
export class AuthService extends BaseModule {
  get systemCode (): string { return this.appConfig.appConfig.systemCode }
  get code (): string { return '800' }
  get name (): string { return 'AUTH' }

  constructor (
    private readonly appConfig: Config,
    // --
    private readonly singInOperator: Operator.SingIn,
    private readonly singOutOperator: Operator.SingOut
  ) {
    super()
  }

  async singIn (query: BaseQuery, body: Dto.SingIn.Body) {
    const res = await this.singInOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }

  async singOut (query: BaseQuery, body: Dto.SingOut.Body) {
    const res = await this.singOutOperator.processResponse({ query, body }, this.getModuleInfo())
    return res
  }
}

export default AuthService
