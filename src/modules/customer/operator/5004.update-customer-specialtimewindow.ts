/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors: kerwin.hou kerwin.hou@gosaico.com
 * @LastEditTime: 2024-10-14 02:09:08
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
  UpdateCustomerSpecialtimewindow
} from '$modules/customer/dto'

import {
  PrismaHelper,
  PrismaService
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
  DataStatus,
  SpecialTimeWindow,
  SpecialInterval
} from '@zuellig-pharma-2/database'

/** 變更特殊作業時間 */
@Injectable()
@APIInfo('UPDATE_CUSTOMER_SPECIALTIMEWINDOW', 'Customer')
export class Operator extends BaseOperator<UpdateCustomerSpecialtimewindow.Data, BaseQuery, UpdateCustomerSpecialtimewindow.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify(req: { body: UpdateCustomerSpecialtimewindow.Body }) {
    const data = await this.validateDto(UpdateCustomerSpecialtimewindow.Body, req.body)

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof UpdateCustomerSpecialtimewindow.Body)[] = ['customerId', 'specialTW']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) throw Category.Customer.FormatError(`輸入格式錯誤`)


    const customer = await this.prisma.customer.findFirst({
      where: {
        id: data.customerId,
        status: { not: DataStatus.DELETED }
      }
    })
    if (!customer) throw Category.DataNotExist.customer
    const originTW = customer.specialTimeWindow
    if (data.specialTW && !this.#isSPTW(data.specialTW)) {
      throw Category.Customer.FormatError(`specialTW 格式錯誤`)
    }

    return { data, originTW }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { customerId, specialTW } = data.data


      console.log(typeof (data.originTW));
      console.log(data.originTW);
      console.log(typeof (specialTW));
      console.log(specialTW);
      await this.prisma.customer.update({
        where: {
          id: customerId
        },
        data: {
          specialTimeWindow: specialTW
        }
      })



      return {
        success: true,
        customerId
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
  #isSpecialInterval(obj: any): obj is SpecialInterval {
    if (!obj || typeof (obj) !== 'object') return false
    if (
      typeof (obj.startDay) !== 'number' ||
      typeof (obj.endDay) !== 'number' ||
      typeof (obj.workingTime) !== 'number' ||
      typeof (obj.comment) !== 'string'
    ) return false
    return true
  }

  #isSPTW(obj: any): obj is SpecialTimeWindow {
    if (!obj || typeof obj !== 'object') return false
    if (!('interval1' in obj) || !('interval2' in obj) || !('interval3' in obj)) return false
    if (
      !this.#isSpecialInterval(obj.interval1) ||
      !this.#isSpecialInterval(obj.interval2) ||
      !this.#isSpecialInterval(obj.interval3)
    ) return false
    return true
  }
}

export default Operator
