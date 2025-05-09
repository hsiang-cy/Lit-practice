/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 11:28:07
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import { DataStatus } from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  UpdateVehicleRoute
} from '$modules/vehicle/dto'

import {
  PrismaHelper,
  PrismaService,
  SnowflakeService,
  ZUHelper
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery,
  SuccessWithoutIdResponse
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 編輯車輛負責路線 */
@Injectable()
@APIInfo('UPDATE_VEHICLE_ROUTE', 'Vehicle')
export class Operator extends BaseOperator<SuccessWithoutIdResponse, BaseQuery, UpdateVehicleRoute.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { body: UpdateVehicleRoute.Body }) {
    const data = await this.validateDto(UpdateVehicleRoute.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof UpdateVehicleRoute.Body)[] = ['routeIds']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) throw Category.DataNotModified.UnknownError

    // 檢查車輛是否存在
    const vehicle = await this.prisma.webVehicle.findFirst({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (TypeCheck.isNull(vehicle)) throw Category.DataNotExist.vehicle

    // 確認 routeIds 都存在
    const routes = await this.prisma.webRoute.count({
      where: {
        id: {
          in: data.routeIds
        },
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (routes < data.routeIds.length) throw Category.InputInvalid.matches.routeIds

    return {
      ...data,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount,routeIds } = data
      const newRelation=routeIds.map((routeId)=>{
        
        return {
          routeId,
          vehicleId:data.id,
          status:DataStatus.ACTIVE,
          creator:currentAccount.id,
          updater:currentAccount.id,
          id:this.snowFlake.snowflakeId()
        }
      })
      
      await this.prisma.$transaction(async trx => {

        // 先移除所有 route 資料
        await trx.webVehicleRoute.deleteMany({
          where: {
            vehicleId: data.id,
          }
        })
        //    對於僅紀錄關係的資料表我決定用硬刪除
        await trx.webVehicleRoute.createMany({
          data:newRelation
        })
      })

      return {
        success: true
      } satisfies SuccessWithoutIdResponse
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Vehicle.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
