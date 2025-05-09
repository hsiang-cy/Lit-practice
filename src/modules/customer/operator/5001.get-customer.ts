/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-07 10:47:29
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  Category
} from '$errors'

import {
  GetCustomer
} from '$modules/customer/dto'

import {
  PrismaHelper,
  PrismaService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator
} from '$types'

import {
  isErrorObject
} from '$utility'
import { DataStatus } from '@zuellig-pharma-2/database'

interface formatBusinessDay {
  w1: string[],
  w2: string[],
  w3: string[],
  w4: string[],
  w5: string[],
  w6: string[],
  w7: string[],
}

interface businessDay {
  w1: businessTime[],
  w2: businessTime[],
  w3: businessTime[],
  w4: businessTime[],
  w5: businessTime[],
  w6: businessTime[],
  w7: businessTime[],
}

interface businessTime {
  start: number,
  end: number
}

/** 取得單筆客戶詳細資料 */
@Injectable()
@APIInfo('GET_CUSTOMER', 'Customer')
export class Operator extends BaseOperator<GetCustomer.Data, GetCustomer.Query> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify(req: { query: GetCustomer.Query }) {
    const data = await this.validateDto(GetCustomer.Query, req.query)

    // 確認該客戶主檔是否存在
    const customerCount = await this.prisma.customer.count({
      where: {
        id: data.customerId
      }
    })
    if (customerCount === 0) {
      throw Category.Customer.DataNotExist(data.customerId)
    }
    return data
  }

  async operator(query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const customer = await this.prisma.customer.findFirst({
        where: {
          id: query.customerId,
          status: {
            not: DataStatus.DELETED
          }
        },
        select: {
          id: true,
          name: true,
          code: true,
          area: true,
          type: true,
          address: true,
          formatAddress: true,
          lat: true,
          lng: true,
          route: true,
          fleet: true,
          timeWindow: true,
          specialTimeWindow: true,
          phone: true,
          locationCode: true
        }
      })
      if (TypeCheck.isNull(customer)) return null

        function turnTime(t: businessDay | undefined): formatBusinessDay {
          const result: formatBusinessDay = { w1: [], w2: [], w3: [], w4: [], w5: [], w6: [], w7: [] }
          if (!t) return result

          for (const key in t) {
            if (t.hasOwnProperty(key)) {
              const businessTimes = t[key as keyof businessDay]
              const formatTimes = businessTimes.map(w => {
                if (w.start === w.end) {
                  return '休息'
                } else {
                  return `${Math.floor(w.start / 60)}:${String(w.start % 60).padStart(2, '0')} ~ ${Math.floor(w.end / 60)}:${String(w.end % 60).padStart(2, '0')}`
                }
              })
              result[key as keyof formatBusinessDay] = formatTimes
            }
          }
          return result
        }

      const data = {
        id: customer.id,
        name: customer.name,
        code: customer.code,
        area: customer.area,
        type: customer.type,
        address: customer.address,
        formatAddress: customer.formatAddress,
        lat: customer.lat,
        lng: customer.lng,
        route: customer.route,
        fleet: customer.fleet,
        specialTimeWindow: customer.specialTimeWindow,
        phone: customer.phone,
        locationCode: customer.locationCode,
        timeWindow: turnTime(customer.timeWindow as unknown as businessDay),
      }

      return {
        ...data,
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
