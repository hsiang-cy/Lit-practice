/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-15 17:04:21
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  DataStatus,
  VehicleTimeWindow,
  VehicleType
} from '@zuellig-pharma-2/database'

import {
  Category
} from '$errors'

import {
  CreateVehicle
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

/** 新增車輛 */
@Injectable()
@APIInfo('CREATE_VEHICLE', 'Vehicle')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, CreateVehicle.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { body: CreateVehicle.Body }) {
    const data = await this.validateDto(CreateVehicle.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 檢查車輛代碼是否重複
    const vehicleCount = await this.prisma.webVehicle.count({
      where: {
        code: {
          equals: data.code,
          mode: 'insensitive'
        },
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (vehicleCount > 0) throw Category.DataDuplicate.code

    // 判斷隸屬車隊是否存在
    const fleet = await this.prisma.webFleet.count({
      where: {
        id: data.fleetId,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (fleet === 0) throw Category.DataNotExist.fleet

    return {
      ...data,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data
      const timeWindow: VehicleTimeWindow = {
        start: data.startTime,
        end: endTime
      }

      // 先查詢是否存在已刪除的相同代碼記錄
      const existingDeletedVehicle = await this.prisma.webVehicle.findFirst({
        where: {
          code: data.code,
          status: DataStatus.DELETED
        }
      })

      let newVehicle
      if (existingDeletedVehicle) {
      // 如果存在已刪除的記錄，則更新
        newVehicle = await this.prisma.webVehicle.update({
          where: {
            id: existingDeletedVehicle.id
          },
          data: {
            driverName: data.driverName,
            type: VehicleType.TRUCK,
            forceUse: data.forceUse,
            forceStart: data.forceStart,
            timeWindow,
            maxCapacity: data.maxCapacity,
            regularWorkTime: data.regularWorkTime,
            area: data.area,
            tonnage: data.tonnage,
            size: data.size,
            volume: data.volume,
            minCapacity: null,
            minWorkTime: null,
            maxWorkOverTime: null,
            considerOvertime: false,
            minDrivingTime: null,
            maxDrivingTime: null,
            minDestinationCount: null,
            maxDestinationCount: null,
            maxDrivingDistance: null,
            creator: currentAccount.id,
            updater: currentAccount.id,
            createTime: new Date(),
            updateTime: new Date(),
            status: DataStatus.ACTIVE
          },
          select: { id: true }
        })
      } else {
      // 不存在已刪除的記錄，則創建
        newVehicle = await this.prisma.webVehicle.create({
          data: {
            id: this.snowFlake.snowflakeId(),
            code: data.code,
            driverName: data.driverName,
            forceUse: data.forceUse,
            forceStart: data.forceStart,
            timeWindow,
            maxCapacity: data.maxCapacity,
            regularWorkTime: data.regularWorkTime,
            area: data.area,
            tonnage: data.tonnage ?? '',
            size: data.size ?? '',
            volume: data.volume ?? '',
            type: VehicleType.TRUCK,
            minCapacity: null,
            minWorkTime: null,
            maxWorkOverTime: null,
            considerOvertime: false,
            minDrivingTime: null,
            maxDrivingTime: null,
            minDestinationCount: null,
            maxDestinationCount: null,
            maxDrivingDistance: null,
            creator: currentAccount.id,
            updater: currentAccount.id,
            status: DataStatus.ACTIVE
          },
          select: { id: true }
        })
      }

      let message

      // 新增或修改webFleetMember
      /** 查詢有沒有既存的 車輛-車隊 關係 */
      const existingMember = await this.prisma.webFleetMember.findFirst({
        where: {
          fleetId: data.fleetId,
          vehicleId: newVehicle.id
        }
      })

      if (!existingMember) {
        // 情況1：沒找到記錄，建立新的關係
        message = '沒找到記錄，建立新的關係'
        await this.prisma.webFleetMember.create({
          data: {
            id: this.snowFlake.snowflakeId(),
            fleetId: data.fleetId,
            vehicleId: newVehicle.id,
            status: DataStatus.ACTIVE,
            creator: currentAccount.id,
            updater: currentAccount.id
          },
          select: { id: true }
        })
      } else if (existingMember.status === DataStatus.DELETED) {
        // 情況2：找到已刪除的記錄，並更新
        message = '找到已刪除的記錄，並更新'
        await this.prisma.webFleetMember.update({
          where: {
            id: existingMember.id
          },
          data: {
            status: DataStatus.ACTIVE,
            updater: currentAccount.id,
            updateTime: new Date()
          },
          select: { id: true }
        })
      } else {
        // 情況3：找到既存的有效記錄
        message = '已存在相同 車輛-車隊 關係'
      }
      return {
        success: true,
        message,
        id: newVehicle.id
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
