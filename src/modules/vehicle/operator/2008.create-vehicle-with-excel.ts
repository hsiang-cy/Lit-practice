/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-15 15:15:00
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Category
} from '$errors'

import {
  CreateVehicleWithExcel
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

import { endTime } from './vehicle_end'

const objectTitle = [
  '區域', '車隊',
  '車牌號碼', '駕駛',
  '負責路線', '噸數',
  '尺寸', '件數上限',
  '材積', '出發時間',
  '工時上限(小時)', '強制出發時間',
  '強制出勤', '啟用狀態'
]

/** 用excel上傳車輛資訊, 以此批量建立 */
@Injectable()
@APIInfo('CREATE_VEHICLE_WITH_EXCEL', 'Vehicle')
export class Operator extends BaseOperator<CreateVehicleWithExcel.Data, BaseQuery, CreateVehicleWithExcel.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly snowFlake: SnowflakeService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify(req: { body: CreateVehicleWithExcel.Body }) {
    const data = req.body;
    const currentAccount = this.zuHelper.getCurrentAccount();

    if (!data.file?.buffer) throw Category.Vehicle.UploadVehicleExcelEmpty;

    const excelData = parse(data.file.buffer)[0].data.filter(row => {
      return !(row.length === 0)  // 過濾空陣列
    });
    // console.log(excelData[0]);
    if (JSON.stringify(excelData[0]) === JSON.stringify(objectTitle)) {
      // console.log('title相同');
    } else {
      throw Category.Vehicle.Temporary('excel格式錯誤')
    }  // TODO: 之後用其他方法，以免順序不同, 以及新增錯誤 i18


    // TODO: 之後用柏宇說的更周全的方法，而不是用行數，現在先湊合
    const formatInfo = new Map
    for (let r = 1; r < excelData.length; r++) {
      formatInfo.set(r + 1, {
        area: excelData[r][0] === '北區' ? Area.NORTH : excelData[r][0] === '中區' ? Area.CENTRAL : Area.SOUTHERN,
        fleet: excelData[r][1],
        code: excelData[r][2],
        driverName: excelData[r][3],
        routes: excelData[r][4].split(',').map((route: string) => route.trim()),
        tonnage: parseInt(excelData[r][5]),
        size: excelData[r][6],
        maxCapacity: excelData[r][7],
        volume: excelData[r][8],
        startTime: excelData[r][9] * 24 * 60,
        maxWorkTime: excelData[r][10] * 24 * 60,
        forceStartTime: turnTF(excelData[r][11]),
        forceWork: turnTF(excelData[r][12]),
        status: turnTF(excelData[r][13]),
      })
    }
    // console.log(formatInfo);

    // 檢查車牌號碼是否重複
    const codeCheck = new Set
    for (const [key, value] of formatInfo) {
      codeCheck.add(value.code)
    }
    // console.log(`codeCheck`);
    // console.table(codeCheck)

    if (codeCheck.size !== formatInfo.size) throw Category.Vehicle.Temporary('excel 中車牌號碼有重複')  // TODO: 新增錯誤 i18


    // 檢查車隊都存在
    const totalFleetSet = new Set
    for (const [key, value] of formatInfo) {
      totalFleetSet.add(value.fleet)
    }
    // 對所有車隊取Set之後，去資料庫找
    const fleetsInDB = await this.prisma.webFleet.findMany({
      where: {
        name: {
          in: Array.from(totalFleetSet) as string[]
        }
      },
      select: {
        id: true,
        name: true,
      }
    })
    console.log(totalFleetSet);
    console.log(fleetsInDB);
    const fleetNotInDB = Array.from(totalFleetSet).filter(fleet => {
      return !fleetsInDB.some(dbFleet => dbFleet.name === fleet)
    })
    if (totalFleetSet.size !== fleetsInDB.length) throw Category.Vehicle.Temporary(`部份車隊不存在:[${fleetNotInDB}]`)  // TODO: 新增錯誤 i18

    // 將 fleetId 加入 Map 中
    for (const [key, value] of formatInfo) {
      // 先設定一個預設值
      value.fleetId = null;

      // 找到匹配的車隊名稱，才設定 fleetId
      const matchedFleet = fleetsInDB.find(dbFleet => dbFleet.name === value.fleet);
      if (matchedFleet) {
        value.fleetId = matchedFleet.id;
      }
    }
    console.log(formatInfo);


    // 確認路線都存在
    const totalRoutesSet = new Set
    for (const [key, value] of formatInfo) {
      value.routes.forEach((route: string) => {
        totalRoutesSet.add(route)
      })
    }
    // // 對所有路線取Set之後，去資料庫找
    const routesInDB = await this.prisma.webRoute.findMany({
      where: {
        name: {
          in: Array.from(totalRoutesSet) as string[]
        }
      },
      select: {
        id: true,
        name: true,
      }
    })
    const routeNotInDB = Array.from(totalRoutesSet).filter(route => {
      return !routesInDB.some(dbRoute => dbRoute.name === route)
    })
    if (totalRoutesSet.size !== routesInDB.length) throw Category.Vehicle.Temporary(`部份路線不存在:[${routeNotInDB}]`)  // TODO: 新增錯誤 i18


    return {
      ...data,
      formatInfo,
      currentAccount,
      fleetsInDB,
      routesInDB
    }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { formatInfo, currentAccount, fleetsInDB, routesInDB } = data;

      const infoObjectArr = (Array.from(formatInfo)).map((info: any) => info[1])

      let errMes = ''

      try {
        await this.prisma.$transaction(async trx => {
          for (let i = 0; i < infoObjectArr.length; i++) {
            const currentVehicle = infoObjectArr[i]

            errMes = `建立車輛(${currentVehicle.code})失敗)`
            // 先查詢是否存在
            const existingVehicle = await trx.webVehicle.findFirst({
              where: {
                code: currentVehicle.code
              },
              select: {
                id: true
              }
            });
            const vehicleId = existingVehicle?.id || "0";
            const upsertedVehicle = await trx.webVehicle.upsert({
              where: {
                id: vehicleId
              },
              update: {
                updater: currentAccount.id,
                status: DataStatus.ACTIVE,
                driverName: currentVehicle.driverName,
                type: 'TRUCK',
                forceUse: currentVehicle.forceWork,
                forceStart: currentVehicle.forceStartTime,
                timeWindow: {
                  start: currentVehicle.startTime,
                  end: endTime
                },
                maxCapacity: String(currentVehicle.maxCapacity),
                area: currentVehicle.area,
                tonnage: String(currentVehicle.tonnage),
                size: currentVehicle.size,
                regularWorkTime: currentVehicle.maxWorkTime,
                volume: currentVehicle.volume,
              },
              create: {
                id: this.snowFlake.snowflakeId(),
                creator: currentAccount.id,
                updater: currentAccount.id,
                status: DataStatus.ACTIVE,
                code: currentVehicle.code,
                driverName: currentVehicle.driverName,
                type: 'TRUCK',
                forceUse: currentVehicle.forceWork,
                forceStart: currentVehicle.forceStartTime,
                timeWindow: {
                  start: currentVehicle.startTime,
                  end: endTime
                },
                maxCapacity: String(currentVehicle.maxCapacity),
                area: currentVehicle.area,
                tonnage: String(currentVehicle.tonnage),
                volume: currentVehicle.volume,
                size: currentVehicle.size,
                regularWorkTime: currentVehicle.maxWorkTime,
              }
            })

            errMes = `處理(${currentVehicle.code})車隊失敗})`

            // 處理相關車隊
            // 直接刪除現有關係
            if (currentVehicle.fleetId) {
              await trx.webFleetMember.deleteMany({
                where: {
                  vehicleId: upsertedVehicle.id,
                  fleetId: currentVehicle.fleetId
                }
              });
            }

            errMes = `建立(${currentVehicle.code})的所屬車隊失敗 fleetId:${currentVehicle.fleetId}`
            // 創建新車隊的關係
            await trx.webFleetMember.create({
              data: {
                id: this.snowFlake.snowflakeId(),
                creator: currentAccount.id,
                updater: currentAccount.id,
                status: DataStatus.ACTIVE,
                vehicleId: upsertedVehicle.id,
                fleetId: currentVehicle.fleetId,
              }
            })

            errMes = `處理(${currentVehicle.code})路線失敗})`
            // 處理路線關係
            // 先刪除所有現有的路線關係
            await trx.webVehicleRoute.deleteMany({
              where: {
                vehicleId: upsertedVehicle.id
              }
            });

            // 準備新的路線關係資料
            const route_vehicle_relation = currentVehicle.routes.map((routeName: string) => {
              const routeObj = routesInDB.find(r => r.name === routeName);

              if (!routeObj) {
                errMes = `路線(${routeName})不存在於 DB})`
                throw Error
              }

              return {
                id: this.snowFlake.snowflakeId(),
                creator: currentAccount.id,
                updater: currentAccount.id,
                status: DataStatus.ACTIVE,
                vehicleId: upsertedVehicle.id,
                routeId: routeObj.id
              };
            });

            // 如果有路線關係需要創建，則批量創建
            if (route_vehicle_relation.length > 0) {
              await trx.webVehicleRoute.createMany({
                data: route_vehicle_relation,
              });
            }
          }
        })
      } catch (err) {
        throw Category.Vehicle.Temporary(errMes)
      }

      return {
        data: 'success',
      }
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

function turnTF(tf: string): boolean {
  if (tf === '是') return true
  return false
}

export default Operator
