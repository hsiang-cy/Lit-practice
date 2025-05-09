/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-16 17:13:08
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import { DataStatus } from '@zuellig-pharma-2/database'
import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  CreateRoute
} from '$modules/route/dto'

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

/** 新增路線 */
@Injectable()
@APIInfo('CREATE_ROUTE', 'Route')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, CreateRoute.Body> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify (req: { body: CreateRoute.Body }) {
    const data = await this.validateDto(CreateRoute.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 檢查 code 是否重複 (同一個應用程式下)
    const nameCount = await this.prisma.webRoute.count({
      where: {
        name: {
          equals: data.name,
          mode: 'insensitive'
        },
        status: {
          not: DataStatus.DELETED
        }
      }
    })

    if (nameCount > 0) throw Category.DataDuplicate.name

    return {
      ...data,
      currentAccount
    }
  }

  async operator (data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data

      const existingRoute = await this.prisma.webRoute.findFirst({
        where: {
          name: data.name
        }
      })

      let newRoute, message
      // 根據查詢結果，分三種情況處理
      if (!existingRoute) {
        // 情況1：完全沒有找到記錄，建立新路線
        message = '已新增路線'
        newRoute = await this.prisma.webRoute.create({
          data: {
            id: this.snowFlake.snowflakeId(),
            area: data.area,
            name: data.name,
            comment: data.comment,
            creator: currentAccount.id,
            updater: currentAccount.id,
            status: DataStatus.ACTIVE
          },
          select: { id: true }
        })
      } else if (existingRoute.status === DataStatus.DELETED) {
        // 情況2：找到已刪除的路線，進行復原更新
        message = '已重啟路線'
        newRoute = await this.prisma.webRoute.update({
          where: {
            id: existingRoute.id
          },
          data: {
            area: data.area,
            comment: data.comment,
            updater: currentAccount.id,
            updateTime: new Date(),
            status: DataStatus.ACTIVE
          },
          select: { id: true }
        })
      } else {
        // 情況3：找到現存的有效路線，拋出重複錯誤
        newRoute = { id: 'null' }
        message = '路線已存在'
      }

      return {
        success: true,
        id: newRoute.id,
        message
      } satisfies SuccessWithIdResponse
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Route.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
