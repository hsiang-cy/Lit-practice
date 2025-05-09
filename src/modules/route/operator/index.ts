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

import SearchRoute from './3000.search-route'
import GetRoute from './3001.get-route'
import CreateRoute from './3002.create-route'
import UpdateRoute from './3003.update-route'
import DeleteRoute from './3004.delete-route'
import UpdateRouteStatus from './3005.update-route-status'
import CreateRouteWithExcel from './3008.create-route-with-excel'

const operators = [
  SearchRoute,
  GetRoute,
  CreateRoute,
  UpdateRoute,
  DeleteRoute,
  UpdateRouteStatus,
  CreateRouteWithExcel
]

export {
  SearchRoute,
  GetRoute,
  CreateRoute,
  UpdateRoute,
  DeleteRoute,
  UpdateRouteStatus,
  CreateRouteWithExcel
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
