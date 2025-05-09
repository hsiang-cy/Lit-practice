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
  FleetController
} from './controller'

import {
  OperatorModule
} from './operator'

import {
  FleetService
} from './service'

@Module({
  imports: [OperatorModule],
  controllers: [FleetController],
  providers: [
    FleetService
  ]
})
export class FleetModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name)

  onModuleInit (): void {
    this.logger.verbose('FleetModule has been initialized.')
  }
}

export default FleetModule
