/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-18 14:36:39
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  Prisma
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  UpdateCustomerInfo
} from '$modules/customer/dto'

import {
  PrismaHelper,
  PrismaService,
  ZUHelper,
  RouteService
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

import {
  encode
} from 'ngeohash'

/** 編輯客戶資料 */
@Injectable()
@APIInfo('UPDATE_CUSTOMER_INFO', 'Customer')
export class Operator extends BaseOperator<SuccessWithIdResponse, BaseQuery, UpdateCustomerInfo.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper,
    private readonly zuHelper: ZUHelper,
    private readonly routeService: RouteService
  ) {
    super()
  }

  async verify(req: { body: UpdateCustomerInfo.Body }) {
    const data = await this.validateDto(UpdateCustomerInfo.Body, req.body)
    const currentAccount = this.zuHelper.getCurrentAccount()

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof UpdateCustomerInfo.Body)[] = ['area', 'address', 'phone']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) {
      throw Category.DataNotModified.UnknownError
    }

    // 確認客戶是否存在
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: data.id,
        status: { not: DataStatus.DELETED }
      }
    })
    if (!customer) throw Category.DataNotExist.customer


    // 處理地址更新
    let newFormatAddress, newLat, newLng, newGeohash
    if (TypeCheck.isNotEmpty(data.address) && data.address !== customer.address) {
      const addressMap = await this.routeService.parseAddress([data.address])
      const addressInfo = addressMap.get(data.address)

      if (TypeCheck.isUndefined(addressInfo)) throw Category.Fleet.ParseAddressFailed(`data.address:${data.address}`)

      newFormatAddress = addressInfo.formatted
      newLat = addressInfo.location.lat
      newLng = addressInfo.location.lng
      newGeohash = encode(newLat, newLng)
    }

    return {
      ...data,
      newFormatAddress,
      newLat,
      newLng,
      newGeohash,
      currentAccount,
      customer
    }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { currentAccount, newFormatAddress, newLat, newLng, newGeohash } = data

      // 原本的數據，用於比較
      const originalCustomer = data.customer

      // 準備更新的數據
      const updateData = {
        name: this.prismaHelper.processOptionalInput(data.name, true),
        area: this.prismaHelper.processOptionalInput(data.area, true),
        address: this.prismaHelper.processOptionalInput(data.address, true),
        formatAddress: this.prismaHelper.processOptionalInput(newFormatAddress, true),
        lat: this.prismaHelper.processOptionalInput(newLat),
        lng: this.prismaHelper.processOptionalInput(newLng),
        geohash: this.prismaHelper.processOptionalInput(newGeohash, true),
        phone: this.prismaHelper.processOptionalInput(data.phone, true),
        updater: currentAccount.id,
        updateTime: new Date(),
        middleCar: data.middleCar,
        bigCar: data.bigCar,
        type: data.type,
        route: data.route
      };

      // 更新客戶數據
      await this.prisma.customer.update({
        where: { id: data.id },
        data: updateData,
        select: { id: true }
      });

      // 生成變更消息
      const changes: string[] = [];
      if (updateData.name !== undefined && updateData.name !== originalCustomer.name) {
        changes.push(`名稱: ${originalCustomer.name} -> ${updateData.name}`);
      }
      if (updateData.area !== undefined && updateData.area !== originalCustomer.area) {
        changes.push(`區域: ${originalCustomer.area} -> ${updateData.area}`);
      }
      if (updateData.address !== undefined && updateData.address !== originalCustomer.address) {
        changes.push(`地址: ${originalCustomer.address} -> ${updateData.address}`);
      }
      if (updateData.address !== undefined && updateData.address !== originalCustomer.address) {
        changes.push(`標準地址: ${originalCustomer.formatAddress} -> ${updateData.formatAddress}`);
      }
      if (updateData.phone !== undefined && updateData.phone !== originalCustomer.phone) {
        changes.push(`電話: ${originalCustomer.phone ?? '無'} -> ${updateData.phone}`);
      }
      if (updateData.middleCar !== undefined && updateData.middleCar !== originalCustomer.middleCar) {
        changes.push(`中型車: ${originalCustomer.middleCar} -> ${updateData.middleCar}`);
      }
      if (updateData.bigCar !== undefined && updateData.bigCar !== originalCustomer.bigCar) {
        changes.push(`大型車: ${originalCustomer.bigCar} -> ${updateData.bigCar}`);
      }
      if (updateData.type !== undefined && updateData.type !== originalCustomer.type) {
        changes.push(`客戶類型: ${originalCustomer.type} -> ${updateData.type}`);
      }
      if (updateData.route !== undefined && updateData.route !== originalCustomer.route) {
        changes.push(`路線: ${originalCustomer.route} -> ${updateData.route}`);
      }

      const message = changes.length > 0 ? `${changes.join(',')}` : '沒有需要變更項目';


      return {
        success: true,
        id: data.id,
        message
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.Customer.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator