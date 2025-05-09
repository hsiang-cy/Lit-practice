/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-15 17:09:58
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import { DataStatus, VehicleTimeWindow } from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  UpdateVehicle
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
  SuccessWithIdResponse
} from '$types'

import {
  isErrorObject
} from '$utility'

import { endTime } from './vehicle_end'

/** 更新車輛資訊 */
@Injectable()
@APIInfo('UPDATE_VEHICLE', 'Vehicle')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, UpdateVehicle.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify(req: { body: UpdateVehicle.Body }) {
    const data = await this.validateDto(UpdateVehicle.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof UpdateVehicle.Body)[] = ['code', 'driverName', 'forceStart', 'forceUse', 'maxCapacity', 'regularWorkTime', 'startTime', 'size', 'volume', 'area', 'tonnage', 'fleetId']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) throw Category.DataNotModified.vehicle

    // 檢查車輛是否存在
    const vehicle = await this.prisma.webVehicle.findFirst({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      },
      select: {
        id: true,
        area: true,
        code: true,
        driverName: true,
        timeWindow: true,
        maxCapacity: true,
        type: true,
        forceUse: true,
        forceStart: true,
        maxDrivingDistance: true,
        regularWorkTime: true,
        maxDrivingTime: true,
        status: true,
        tonnage: true,
        size: true,
        volume: true,
        members: {
          where: {
            status: { not: DataStatus.DELETED }
          },
          select: {
            fleet: {
              select: {
                id: true
              }
            }
          }
        }
      }
    })
    // if (TypeCheck.isNull(vehicle)) throw Category.DataNotExist.vehicle

    if (vehicle?.members.length === 0) throw Category.DataNotExist.fleetMember

    // 如果有傳入開始時間 或 結束時間，並且兩者都有值，則開始時間不能晚於結束時間
    let startTime = (vehicle?.timeWindow as VehicleTimeWindow)?.start
    let regularWorkTime = vehicle?.regularWorkTime ?? 0
    if (TypeCheck.isNotEmpty(data.startTime)) startTime = data.startTime
    if (TypeCheck.isNotEmpty(data.regularWorkTime)) regularWorkTime = data.regularWorkTime
    if (TypeCheck.isEmpty(startTime) || TypeCheck.isEmpty(regularWorkTime)) throw Category.Vehicle.EndTimeCalculate()
    const timeWindow: VehicleTimeWindow = {
      start: startTime,
      end: endTime
    }

    // 如果有傳入code，則檢查是否重複 (不包含自己)
    if (TypeCheck.isNotEmpty(data.code)) {
      const codeCount = await this.prisma.webVehicle.count({
        where: {
          id: {
            not: data.id
          },
          code: {
            equals: data.code,
            mode: 'insensitive'
          },
          status: {
            not: DataStatus.DELETED
          }
        }
      })
      if (codeCount > 0) throw Category.DataDuplicate.code
    }

    return {
      ...data,
      currentAccount,
      timeWindow,
      newFleetId: data.fleetId || '',
      originFleetId: vehicle?.members[0].fleet.id
    }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount, timeWindow } = data

      let message = ''

      const update = await this.prisma.webVehicle.update({
        where: {
          id: data.id
        },
        data: {
          code: this.prismaHelper.processOptionalInput(data.code, true),
          driverName: this.prismaHelper.processOptionalInput(data.driverName, true),
          area: this.prismaHelper.processOptionalInput(data.area),
          timeWindow,
          forceUse: this.prismaHelper.processOptionalInput(data.forceUse),
          forceStart: this.prismaHelper.processOptionalInput(data.forceStart),
          maxCapacity: this.prismaHelper.processOptionalInput(data.maxCapacity),
          regularWorkTime: this.prismaHelper.processOptionalInput(data.regularWorkTime),
          tonnage: this.prismaHelper.processOptionalInput(data.tonnage),
          volume: this.prismaHelper.processOptionalInput(data.volume),
          size: this.prismaHelper.processOptionalInput(data.size),
          updater: currentAccount.id
        },
        select: { id: true }
      })
      if (TypeCheck.isNull(update)) throw Category.DataNotExist.vehicle
      else message += '更新成功!'

      // 若有需要更新隸屬車隊, 則先判斷
      if (data.newFleetId && data.newFleetId !== data.originFleetId) {
        message += '更新車隊為：'
        // 將舊的移除
        await this.prisma.webFleetMember.deleteMany({
          where: {
            vehicleId: data.id
          }
        })

        // 創建新關聯
        await this.prisma.webFleetMember.create({
          data: {
            id: this.snowFlake.snowflakeId(),
            fleetId: data.newFleetId,
            vehicleId: data.id,
            status: DataStatus.ACTIVE,
            creator: currentAccount.id,
            updater: currentAccount.id,
          }
        })
      } else message += '不須更新車隊。'

      return {
        message,
        success: true,
        id: data.id
      } satisfies SuccessWithIdResponse
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
