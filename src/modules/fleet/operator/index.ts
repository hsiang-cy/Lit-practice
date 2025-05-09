/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-14 13:36:10
 * @Description:
 */

import {
  Module
} from '@nestjs/common'

import SearchFleet from './1000.search-fleet'
import GetFleet from './1001.get-fleet'
import CreateFleet from './1002.create-fleet'
import UpdateFleet from './1003.update-fleet'
import DeleteFleet from './1004.delete-fleet'
import UpdateFleetStatus from './1005.update-fleet-status'

const operators = [
  SearchFleet,
  GetFleet,
  CreateFleet,
  UpdateFleet,
  DeleteFleet,
  UpdateFleetStatus
]

export {
  SearchFleet,
  GetFleet,
  CreateFleet,
  UpdateFleet,
  DeleteFleet,
  UpdateFleetStatus
}

@Module({
  providers: [
    // -- operator
    ...operators
  ],
  exports: [
    ...operators
  ]
})
export class OperatorModule { }
