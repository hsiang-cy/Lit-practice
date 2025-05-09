/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 16:26:17
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  DataStatus,
  Location
} from '@zuellig-pharma-2/database'

import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  CreateFleet
} from '$modules/fleet/dto'

import {
  PrismaService,
  SnowflakeService,
  RouteService,
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

/** 新增車隊 */
@Injectable()
@APIInfo('CREATE_FLEET', 'Fleet')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, CreateFleet.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly snowFlake: SnowflakeService,
    private readonly routeService: RouteService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify(req: { body: CreateFleet.Body }) {
    const data = await this.validateDto(CreateFleet.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    const fleets = await this.prisma.webFleet.findMany({
      where: {
        name: {
          equals: data.name
        },
        status: {
          not: DataStatus.DELETED
        }
      }
    })

    // 如果找到重複的 name, 且不是刪除狀態, 則拋出錯誤
    if (fleets.length > 0) throw Category.DataDuplicate.name

    // 如果車隊名稱不重複，則進行地址解析
    const start = await this.routeService.parseAddress([data.startAddress])
    const startParse = start.get(data.startAddress)
    if (TypeCheck.isUndefined(startParse)) throw Category.Fleet.ParseAddressFailed(`data.startAddress:${data.startAddress}`)

    let endLocation: Location = {}    //  如果是 undifined 或空字串, 則 endLocation 是 {}
    if (!(data.endAddress === undefined || data.endAddress === '')) {
      const end = await this.routeService.parseAddress([data.endAddress])
      const endParse = end.get(data.endAddress)
      if (TypeCheck.isUndefined(endParse)) throw Category.Fleet.ParseAddressFailed(`data.endAddress:${data.endAddress}`)
      endLocation = {
        source: endParse.source,
        formatted: endParse.formatted,
        coordinate: endParse.location
      }
    }

    const startLocation: Location = {
      source: startParse.source,
      formatted: startParse.formatted,
      coordinate: startParse.location
    }

    return {
      ...data,
      currentAccount,
      startLocation,
      endLocation
    }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount, startLocation, endLocation } = data

      const ifNameExist = await this.prisma.webFleet.findFirst({
        where: {
          name: data.name
        },
        select: {
          id: true,
          name: true,
          status: true
        }
      })
      // 上面查詢車隊名稱
      if (!ifNameExist) { // 如果「沒有」找到車隊名
        const uniqueID = this.snowFlake.snowflakeId() //  將 id, code 定義為同一個雪花
        const newFleet = await this.prisma.webFleet.create({
          data: {
            id: uniqueID,
            area: data.area,
            code: uniqueID,
            name: data.name,
            startLocation: startLocation as Prisma.JsonObject,
            endLocation: endLocation as Prisma.JsonObject,
            priority: data.priority,
            creator: currentAccount.id,
            updater: currentAccount.id,
            status: DataStatus.ACTIVE,
            comment:data.comment
          },
          select: { id: true }
        })

        return {
          success: true,
          id: newFleet.id
        } satisfies SuccessWithIdResponse
      } else {
        // 如果找到車隊名且狀態為 delete
        // 理論上必定是 delete, 因為在 verify 已經篩選掉不是 delete 的
        const newFleet = await this.prisma.webFleet.update({
          where: {
            id: ifNameExist.id
          },
          data: {
            area: data.area,
            name: data.name,
            startLocation: startLocation as Prisma.JsonObject,
            endLocation: endLocation as Prisma.JsonObject,
            priority: data.priority,
            updater: currentAccount.id,
            createTime: new Date(), // 要重置 createTime，避免使用者看到資料時，會以為有問題
            updateTime: new Date(), // 要重置 updateTime，避免使用者看到資料時，會以為有問題
            status: DataStatus.ACTIVE
          },
          select: { id: true }
        })
        return {
          success: true,
          id: newFleet.id
        } satisfies SuccessWithIdResponse
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Fleet.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
