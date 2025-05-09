/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 11:48:41
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
  UpdateFleet
} from '$modules/fleet/dto'

import {
  PrismaHelper,
  PrismaService,
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

/** 更新車隊資訊 */
@Injectable()
@APIInfo('UPDATE_FLEET', 'Fleet')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, UpdateFleet.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly routeService: RouteService,
    private readonly zuHelper: ZUHelper
  ) {
    super()
  }

  async verify(req: { body: UpdateFleet.Body }) {
    const data = await this.validateDto(UpdateFleet.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof UpdateFleet.Body)[] = ['area', 'name', 'startAddress', 'priority', 'endAddress']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) throw Category.DataNotModified.fleet

    // 確認fleet是否存在
    const fleetInDB = await this.prisma.webFleet.findFirst({
      where: {
        id: data.id,
        status: {
          not: DataStatus.DELETED
        }
      }
    })
    if (!fleetInDB) throw Category.DataNotExist.fleet
    // console.log(fleetInDB);

    // 名子不可重複
    if (TypeCheck.isNotEmpty(data.name)) {
      const ifNameExist = await this.prisma.webFleet.findFirst({
        where: {
          name: data.name,
          status: {
            not: DataStatus.DELETED
          },
          id: {
            not: data.id
          }
        }
      })
      if (ifNameExist) throw Category.DataDuplicate.name
    }
    // 如果有傳入地址，則進行地址解析
    const { startAddress, endAddress } = data
    let startLocation: Location | undefined
    let endLocation: Location | undefined

    if (TypeCheck.isNotEmpty(startAddress)) {
      const addressList = [startAddress].filter(d => TypeCheck.isNotEmpty(d))
      const addressMap = await this.routeService.parseAddress(addressList)

      if (TypeCheck.isNotEmpty(startAddress)) {
        const startParse = addressMap.get(startAddress)
        if (TypeCheck.isUndefined(startParse)) throw Category.Fleet.ParseAddressFailed(`startAddress:${startAddress}`)

        startLocation = {
          source: startParse.source,
          formatted: startParse.formatted,
          coordinate: startParse.location
        }
      }
    }
    if (endAddress === 'isEmpty') {
      endLocation = undefined
    }
    else if(endAddress==='notChange'){
      endLocation = fleetInDB.endLocation as Location
      // console.log('haha');
      // console.log(endLocation);
    }
    else if (TypeCheck.isNotEmpty(endAddress)) {
      const addressList = [endAddress].filter(d => TypeCheck.isNotEmpty(d))
      const addressMap = await this.routeService.parseAddress(addressList)

      if (TypeCheck.isNotEmpty(endAddress)) {
        const endParse = addressMap.get(endAddress)
        if (TypeCheck.isUndefined(endParse)) throw Category.Fleet.ParseAddressFailed(`endAddress:${endAddress}`)

        endLocation = {
          source: endParse.source,
          formatted: endParse.formatted,
          coordinate: endParse.location
        }
      }
    }

    return {
      ...data,
      startLocation,
      endLocation,
      currentAccount
    }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount } = data

      const cc = await this.prisma.webFleet.update({
        where: {
          id: data.id
        },
        data: {
          area: this.prismaHelper.processOptionalInput(data.area),
          name: this.prismaHelper.processOptionalInput(data.name, true),
          startLocation: this.prismaHelper.processOptionalInput(data.startLocation) as Prisma.JsonObject,
          endLocation: this.prismaHelper.processOptionalInput(data.endLocation) as Prisma.JsonObject || null,
          priority: this.prismaHelper.processOptionalInput(data.priority),
          updater: currentAccount.id,
          comment: data.comment
        },

      })
      // console.table(cc);
      // console.log(this.prismaHelper.processOptionalInput(data.endLocation) as Prisma.JsonObject);


      return {
        success: true,
        id: data.id
      } satisfies SuccessWithIdResponse
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
