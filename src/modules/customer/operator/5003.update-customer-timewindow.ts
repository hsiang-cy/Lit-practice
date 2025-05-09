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
  UpdateCustomerTimewindow
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
  timewindow,
  BusinessTime,
} from '@zuellig-pharma-2/database'

/** 變更客戶時窗 */
@Injectable()
@APIInfo('UPDATE_CUSTOMER_TIMEWINDOW', 'Customer')
export class Operator extends BaseOperator<UpdateCustomerTimewindow.Data, BaseQuery, UpdateCustomerTimewindow.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify(req: { body: UpdateCustomerTimewindow.Body }) {
    const data = await this.validateDto(UpdateCustomerTimewindow.Body, req.body)

    // 是否無任何欄位要更新
    const propertiesToCheck: (keyof UpdateCustomerTimewindow.Body)[] = ['customerId', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    if (propertiesToCheck.every(d => TypeCheck.isNullOrUndefined(data[d]))) throw Category.DataNotModified.UnknownError

    const originCustomer = await this.prisma.customer.findFirst({
      where: {
        id: data.customerId,
        status: { not: DataStatus.DELETED }
      }
    })
    if (!originCustomer) throw Category.Customer.DataNotExist(data.customerId)

    // 建立時間窗物件
    const newTW: timewindow = {
      w1: this.#checkTWLong(data.monday),
      w2: this.#checkTWLong(data.tuesday),
      w3: this.#checkTWLong(data.wednesday),
      w4: this.#checkTWLong(data.thursday),
      w5: this.#checkTWLong(data.friday),
      w6: this.#checkTWLong(data.saturday),
      w7: this.#checkTWLong(data.sunday)
    }

    return { ...data, newTW, originCustomer }
  }

  async operator(data: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { newTW, originCustomer } = data
      const re = await this.prisma.customer.update({
        where: {
          id: data.customerId
        },
        data: {
          timeWindow: newTW as unknown as Prisma.InputJsonValue
        }
      })
      // console.log(typeof (originCustomer.timeWindow));
      // console.log(originCustomer.timeWindow);
      // console.log(typeof (newTW));
      // console.log(newTW);

      // console.log('結果');
      // console.log(re);

      return {
        success: true,
        customerId: data.customerId
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
  #parseTimeWindowString(time: string) {
    return time.trim().replace(/^\[+|\]+$/g, '').split(',').map(d => d.trim())
  }
  #checkTWLong(time: string) {
    const timeWindowString = this.#parseTimeWindowString(time)
    if (timeWindowString.length === 0 || timeWindowString.length > 3) {
      throw Category.Customer.timeWindowError(time)
    }
    return timeWindowString.map(timeStr => this.#convertTimeToMinutes(timeStr));
  }

  #convertTimeToMinutes(timeStr: string): BusinessTime {
    // 從 "9:00 ~ 12:00" 解析出時間
    const [startTime, endTime] = timeStr.split('~').map(t => t.trim());

    // 轉換開始時間為分鐘
    const [startHour, startMinute] = startTime.split(':').map(num => parseInt(num, 10));
    const startMinutes = startHour * 60 + startMinute;

    // 轉換結束時間為分鐘
    const [endHour, endMinute] = endTime.split(':').map(num => parseInt(num, 10));
    const endMinutes = endHour * 60 + endMinute;

    return {
      start: startMinutes,
      end: endMinutes
    };
  }
}

export default Operator
