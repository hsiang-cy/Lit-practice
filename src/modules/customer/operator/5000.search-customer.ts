/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-02 18:08:34
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import dayjs from 'dayjs'
import {
  Category
} from '$errors'

import {
  SearchCustomer
} from '$modules/customer/dto'

import {
  PrismaHelper,
  PrismaService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  BaseQuery,
  BaseSearchResult
} from '$types'

import {
  isErrorObject
} from '$utility'

import {
  DataStatus,
  Area
} from '@zuellig-pharma-2/database'

interface timeWindow {
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

/** 獲取客戶主檔清單 */
@Injectable()
@APIInfo('SEARCH_CUSTOMER', 'Customer')
export class Operator extends BaseOperator<BaseSearchResult<SearchCustomer.Data>, BaseQuery, SearchCustomer.Body> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify(req: { body: SearchCustomer.Body }) {
    const data = await this.validateDto(SearchCustomer.Body, req.body)

    return data
  }

  async operator(query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const searchQuery = query.query ?? {}
      const searchSort = query.sort ?? []
      const searchPagination = query.pagination ?? {}

      if (searchQuery.area && !(searchQuery.area in Area)) throw Category.Customer.FormatError('area 必須是列舉值')

      const count = await this.prisma.customer.count({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.customerId),
          name: this.prismaHelper.processSearchCondition(searchQuery.customerName),
          area: this.prismaHelper.processSearchCondition(searchQuery.area),
          code: searchQuery.code as string | undefined
        }
      })
      if (count === 0) return { count: 0, data: [] }

      const rowData = await this.prisma.customer.findMany({
        where: {
          id: this.prismaHelper.processSearchCondition(searchQuery.customerId),
          name: this.prismaHelper.processSearchCondition(searchQuery.customerName),
          area: this.prismaHelper.processSearchCondition(searchQuery.area),
          code: searchQuery.code as string | undefined,
        },
        orderBy: this.prismaHelper.processSortCondition(searchSort, [{ id: 'desc' }], { id: 'id', }),
        take: this.prismaHelper.processLimitCondition(searchPagination.limit),
        skip: this.prismaHelper.processOffsetCondition(searchPagination.offset),
        select: {
          id: true,
          name: true,
          locationCode: true,
          area: true,
          code: true,
          timeWindow: true,
          address: true,
          formatAddress: true,
          middleCar: true,
          bigCar: true,
          route: true,
          type: true,
          phone: true,
          specialTimeWindow: true
        }
      })
      const data = rowData.map((item) => {
        const t = item.timeWindow as unknown as timeWindow
        function turnTime(t: businessTime[] | undefined): string[] {
          if (!t) return []
          const formattedTime = t.map(time => {
            const format = `${Math.floor(time.start / 60)}:${String(time.start % 60).padStart(2, '0')} ~ ${Math.floor(time.end / 60)}:${String(time.end % 60).padStart(2, '0')}`
            return `${format}`
          })
          return formattedTime
        }
        return {
          customerId: item.id,
          code: item.code,
          customerName: item.name,
          // locationCode: item.locationCode,
          area: item.area,
          type: item.type,
          address: item.address,
          formatAddress: item.formatAddress,
          route: item.route,
          phone: item.phone,
          middleCar: item.middleCar,
          bigCar: item.bigCar,
          timeWindow: item.timeWindow,
          specialTimeWindow: item.specialTimeWindow,
          monday: turnTime(t.w1),
          tuesday: turnTime(t.w2),
          wednesday: turnTime(t.w3),
          thursday: turnTime(t.w4),
          friday: turnTime(t.w5),
          saturday: turnTime(t.w6),
          sunday: turnTime(t.w7),
        }
      })

      return {
        data,
        count
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
