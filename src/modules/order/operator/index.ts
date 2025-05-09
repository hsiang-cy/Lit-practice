/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-26 16:59:42
 * @Description:
 */

import {
  Module
} from '@nestjs/common'

import ImportOrder from './7000.import-order'
import SearchOrder from './7001.search-order'
import SearchOrderGroupDestination from './7002.search-order-group-destination'
import StartCalculate from './7004.start-calculate'

const operators = [
  ImportOrder,
  StartCalculate,
  SearchOrder,
  SearchOrderGroupDestination
]

export {
  ImportOrder,
  StartCalculate,
  SearchOrder,
  SearchOrderGroupDestination
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
