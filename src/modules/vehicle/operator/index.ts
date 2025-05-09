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

import SearchVehicle from './2000.search-vehicle'
import GetVehicle from './2001.get-vehicle'
import CreateVehicle from './2002.create-vehicle'
import UpdateVehicle from './2003.update-vehicle'
import DeleteVehicle from './2004.delete-vehicle'
import UpdateVehicleRoute from './2005.update-vehicle-route'
import SearchNoVehicleRoute from './2006.search-no-vehicle-route'
import UpdateVehicleStatus from './2007.update-vehicle-status'
import CreateVehicleWithExcel from './2008.create-vehicle-with-excel'

const operators = [
  SearchVehicle,
  GetVehicle,
  UpdateVehicle,
  DeleteVehicle,
  UpdateVehicleRoute,
  SearchNoVehicleRoute,
  CreateVehicle,
  UpdateVehicleStatus,
  CreateVehicleWithExcel
]

export {
  SearchVehicle,
  GetVehicle,
  UpdateVehicle,
  DeleteVehicle,
  UpdateVehicleRoute,
  SearchNoVehicleRoute,
  CreateVehicle,
  UpdateVehicleStatus,
  CreateVehicleWithExcel
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
