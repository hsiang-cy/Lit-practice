/*
 * @Author:Kerwin
 * @Date:2024-09-12 10:52:34
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 16:40:18
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  ClsService
} from 'nestjs-cls'

import {
  Category
} from '$errors'

@Injectable()
export class ZUHelper {
  constructor (
    private readonly cls: ClsService
  ) { }

  /**
   * 取得當前Request的`Account`資訊
   * @description
   * 1. 會從`cls`中取得`account`的資訊，代表驗證過`AccessToken`
   * 2. 如果`account`不存在，代表有錯誤
   */
  getCurrentAccount () {
    const account = this.cls.get('account')
    if (TypeCheck.isUndefined(account)) throw Category.AuthorizationError.AccountNotExist

    return account
  }

  // /**
  //  * 取得訂單群組範例檔案路徑
  //  * @description
  //  * 1. 會從系統參數中取得`EXAMPLE_ORDER_EXCEL_URL`的值
  //  * 2. 如果取不到，預設為`example/order-example-excel`
  //  */
  // async getOrderGroupExampleExcelKey () {
  //   const systemSetting = await this.prisma.systemSetting.findFirst({
  //     where: {
  //       key: SystemSettingKey.EXAMPLE_ORDER_EXCEL_URL,
  //       status: DataStatus.ACTIVE
  //     },
  //     select: {
  //       value: true
  //     }
  //   })

  //   return systemSetting?.value ?? 'example/order-example-excel'
  // }

  // /**
  //  * 取得車輛範例檔案路徑
  //  * @description
  //  * 1. 會從系統參數中取得`EXAMPLE_VEHICLE_EXCEL_URL`的值
  //  * 2. 如果取不到，預設為`example/vehicle-example`
  //  */
  // async getVehicleExampleExcelKey () {
  //   const systemSetting = await this.prisma.systemSetting.findFirst({
  //     where: {
  //       key: SystemSettingKey.EXAMPLE_VEHICLE_EXCEL_URL,
  //       status: DataStatus.ACTIVE
  //     },
  //     select: {
  //       value: true
  //     }
  //   })

  //   return systemSetting?.value ?? 'example/vehicle-example'
  // }
}
