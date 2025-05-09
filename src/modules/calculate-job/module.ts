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
  CalculateJobController
} from './controller'

import {
  OperatorModule
} from './operator'

import {
  CalculateJobStateProcessor,
  CallAlgorithmProcessor,
  DataPostprocessingProcessor,
  DataPreprocessingProcessor
} from './processor'

import {
  CalculateJobService
} from './service'

@Module({
  imports: [OperatorModule],
  controllers: [CalculateJobController],
  providers: [
    CalculateJobService,
    CalculateJobStateProcessor,
    CallAlgorithmProcessor,
    DataPostprocessingProcessor,
    DataPreprocessingProcessor
  ]
})
export class CalculateJobModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name)

  onModuleInit (): void {
    this.logger.verbose('CalculateJobModule has been initialized.')
  }
}

export default CalculateJobModule
