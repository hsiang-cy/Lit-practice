/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:55:01
 * @LastEditors:Kerwin
 * @LastEditTime:2023-09-28 11:55:03
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Config
} from '$shared-service'

@Injectable()
export class AppService {
  constructor (private readonly appConfig: Config) { }

  getSystemCode (): string {
    return this.appConfig.appConfig.systemCode
  }
}

export default AppService
