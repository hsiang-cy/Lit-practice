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

import SearchCustomer from './5000.search-customer'
import GetCustomer from './5001.get-customer'
import UpdateCustomerInfo from './5002.update-customer-info'
import UpdateCustomerTimewindow from './5003.update-customer-timewindow'
import UpdateCustomerSpecialtimewindow from './5004.update-customer-specialtimewindow'

const operators = [
  SearchCustomer,
  GetCustomer,
  UpdateCustomerInfo,
  UpdateCustomerTimewindow,
  UpdateCustomerSpecialtimewindow
]

export {
  SearchCustomer,
  GetCustomer,
  UpdateCustomerInfo,
  UpdateCustomerTimewindow,
  UpdateCustomerSpecialtimewindow
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
