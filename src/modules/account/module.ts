/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2024-05-13 10:42:20
 * @Description:
 */

import {
  Logger,
  Module,
  OnModuleInit
} from '@nestjs/common'

import {
  AccountController
} from './controller'

import {
  OperatorModule
} from './operator'

import {
  AccountService
} from './service'

@Module({
  imports: [OperatorModule],
  controllers: [AccountController],
  providers: [
    AccountService
  ]
})
export class AccountModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name)

  onModuleInit (): void {
    this.logger.verbose('AccountModule has been initialized.')
  }
}

export default AccountModule
