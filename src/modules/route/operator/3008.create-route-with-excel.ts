/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-10 11:35:57
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  CreateRouteWithExcel
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
  BaseQuery
} from '$types'

import {
  isErrorObject
} from '$utility'

import {
  parse
} from 'node-xlsx'
import {
  DataStatus,
  Area
} from '@zuellig-pharma-2/database'

/** 上傳 Excel 匹量建立路線資料 */
@Injectable()
@APIInfo('CREATE_ROUTE_WITH_EXCEL', 'Route')
export class Operator extends BaseOperator<CreateRouteWithExcel.Data, BaseQuery, CreateRouteWithExcel.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify(req: { body: CreateRouteWithExcel.Body }) {
    const data = req.body;
    const currentAccountid = this.zuHelper.getCurrentAccount().id;

    if (!data.file?.buffer) throw Category.Fleet.ParseAddressFailed('檔案錯誤'); //TODO 新增 error

    const excelData = parse(data.file.buffer)[0].data.filter(row => {
      return !(row.length === 0)  // 過濾空陣列
    });
    console.log('格式：');

    if (!(JSON.stringify(excelData[0]) === JSON.stringify(['區域', '路線', '備註']))) throw Category.Fleet.ParseAddressFailed('Excel 格式錯誤')//TODO 新增 error

    const totalRoutesSet = new Set
    for (let r = 1; r < excelData.length; r++) {
      totalRoutesSet.add(excelData[r][1])
    }
    // console.log(totalRoutesSet);

    if (totalRoutesSet.size === 0) throw Category.Fleet.ParseAddressFailed('Excel 中路線資料為0筆')//TODO 新增 error

    const infoMap = new Map
    for (let r = 1; r < excelData.length; r++) {
      infoMap.set(r + 1, { area: excelData[r][0], route: excelData[r][1], comment: excelData[r][2] })
    }
    // console.log(infoMap);



    return { infoMap, totalRoutesSet, currentAccountid }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { infoMap, totalRoutesSet, currentAccountid } = data

      const createFail: Array<{ key: string; value: any; err: unknown }> = []

      await this.prisma.$transaction(async (trx) => {
        for (const [key, value] of infoMap) {
          try {
            // 先搜尋是否存在相同 name 的記錄
            const existingRoute = await trx.webRoute.findFirst({
              where: {
                name: value.route
              }
            })

            let createRoute;
            if (existingRoute) {
              // 如果找到，則進行更新
              createRoute = await trx.webRoute.update({
                where: { id: existingRoute.id },
                data: {
                  updater: currentAccountid,
                  status: DataStatus.ACTIVE,
                  updateTime: new Date(),
                  area: value.area === '北區' ? Area.NORTH : value.area === '中區' ? Area.CENTRAL : Area.SOUTHERN,
                  comment: value.comment
                }
              })
            } else {
              // 如果沒找到，則創建新記錄
              createRoute = await trx.webRoute.create({
                data: {
                  id: this.snowFlake.snowflakeId(),
                  creator: currentAccountid,
                  updater: 'null',
                  status: DataStatus.ACTIVE,
                  area: value.area === '北區' ? Area.NORTH : value.area === '中區' ? Area.CENTRAL : Area.SOUTHERN,
                  name: value.route,
                  comment: value.comment,
                }
              })
            }
          } catch (err) {
            createFail.push({ key, value, err })
          }
        }

        // 如果有失敗的記錄，拋出錯誤來觸發回滾
        if (createFail.length > 0) {
          throw new Error(`創建路線發生錯誤: ${createFail}`)
        }
      })

      return {
        success: true,
        count: infoMap.size
      }
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
