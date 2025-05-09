/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-04-08 17:06:19
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  CalculateJobState,
  DispatchRouteTaskEvent,
  DestinationType
} from '@zuellig-pharma-2/database'

import {
  CalculateJobDestination,
  CalculateJobVehicle
} from '@zuellig-pharma-2/database/client'

import {
  Category
} from '$errors'

import {
  GetCalculateJobRouteTask
} from '$modules/calculate-job/dto'

import {
  PrismaHelper,
  PrismaService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  CalculateJobDestinationInfo,
  Location
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 取得計算任務路線清單 */
@Injectable()
@APIInfo('GET_CALCULATE_JOB_ROUTE_TASK', 'CalculateJob')
export class Operator extends BaseOperator<GetCalculateJobRouteTask.Data, GetCalculateJobRouteTask.Query> {
  constructor (
    private readonly prisma: PrismaService,
    private readonly prismaHelper: PrismaHelper
  ) {
    super()
  }

  async verify (req: { query: GetCalculateJobRouteTask.Query }) {
    const data = await this.validateDto(GetCalculateJobRouteTask.Query, req.query)

    // 確認計算任務是否存在
    const calculateJob = await this.prisma.calculateJob.findFirst({
      where: { id: data.calculateJobId },
      select: { state: true }
    })
    if (TypeCheck.isNull(calculateJob)) throw Category.DataNotExist.calculateJob

    // 確認計算任務是否計算完成
    if (calculateJob.state !== CalculateJobState.JOB_FINISHED) throw Category.CalculateJob.CalculateJobNotFinished

    const calculateJobRouteTask = await this.prisma.dispatchRouteTask.findMany({
      where: {
        dispatchRouteId: data.dispatchRouteId,
        count: data.counts
      },
      orderBy: [
        { count: 'asc' },
        { seq: 'asc' }
      ],
      select: {
        count: true,
        seq: true,
        event: true,
        type: true,
        transitDistance: true,
        transitTime: true,
        arrivalTime: true,
        arrivalCapacity: true,
        serviceTime: true,
        slackTime: true,
        pickupDemand: true,
        deliveryDemand: true,
        calculateJobDestination: {
          select: {
            code: true,
            type: true,
            info: true,
            location: true
          }
        },
        calculateJobVehicle: {
          select: {
            startLocation: true,
            endLocation: true
          }
        }
      }
    })
    if (calculateJobRouteTask.length === 0) throw Category.DataNotExist.dispatchRouteTask

    return {
      ...data,
      calculateJobRouteTask
    }
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { calculateJobRouteTask, counts, dispatchRouteId } = query

      const handleTask = (
        tasks: typeof calculateJobRouteTask
      ) => {
        return tasks.map((task, i) => {
          const base = {
            count: counts,
            seq: i + 1,     // sequence 任務順序
            arrivalTime: task.arrivalTime,
            deliveryDemand: task.deliveryDemand,
            serviceTime: task.serviceTime,
            slackTime: task.slackTime,
            transitTime: task.transitTime
          }

          // 依據是 一般目的地 Reload 車輛起訖點 來區分不同回傳值
          // TODO: 回傳值請團隊共同確認
          // TODO:(sean ✅) task type 的部份，請團隊加入 database 的 enum 中
          if (task.event === DispatchRouteTaskEvent.DESTINATION && task.type !== DestinationType.RELOAD) {
            const destination = task.calculateJobDestination as Pick<CalculateJobDestination, 'code' | 'type' | 'info' | 'location'>
            const location = destination.location as unknown as Location
            const info = destination.info as unknown as CalculateJobDestinationInfo

            return {
              ...base,
              code: destination.code ?? '',
              type: info.customerType,
              name: info.name,
              address: location.source ?? '',
              route: info.route,
              depot: info.depot ?? ''
            } satisfies GetCalculateJobRouteTask.TaskInGetCalculateJobRouteTask
          }

          if (task.type === DestinationType.RELOAD) {
            const destination = task.calculateJobDestination as Pick<CalculateJobDestination, 'code' | 'type' | 'info' | 'location'>
            const location = destination.location as unknown as Location

            return {
              ...base,
              code: 'Reload',
              type: 'Reload',
              name: '倉庫',
              address: location.source ?? '',
              route: '',
              depot: ''
            } satisfies GetCalculateJobRouteTask.TaskInGetCalculateJobRouteTask
          }

          const vehicle = task.calculateJobVehicle as Pick<CalculateJobVehicle, 'startLocation' | 'endLocation'>
          const startLocation = vehicle.startLocation as unknown as Location
          const endLocation = vehicle.endLocation as unknown as Location

          return {
            ...base,
            code: task.event,
            type: 'Vehicle',
            name: task.event,
            address: task.event === DispatchRouteTaskEvent.VEHICLE_START ? startLocation.source ?? '' : endLocation.source ?? '',
            route: '',
            depot: ''
          } satisfies GetCalculateJobRouteTask.TaskInGetCalculateJobRouteTask
        })
      }

      if (counts !== 1) {
        // 不是第一趟的話，會先查詢上一趟的最後一個任務
        // 然後在下面用 unshift 加入資料中
        const firstTask = await this.prisma.dispatchRouteTask.findFirst({
          where: {
            dispatchRouteId,
            count: counts - 1
          },
          orderBy: [
            { seq: 'desc' }
          ],
          select: {
            count: true,
            seq: true,
            event: true,
            type: true,
            transitDistance: true,
            transitTime: true,
            arrivalTime: true,
            arrivalCapacity: true,
            serviceTime: true,
            slackTime: true,
            pickupDemand: true,
            deliveryDemand: true,
            calculateJobDestination: {
              select: {
                code: true,
                type: true,
                info: true,
                location: true
              }
            },
            calculateJobVehicle: {
              select: {
                startLocation: true,
                endLocation: true
              }
            }
          }
        }) as typeof calculateJobRouteTask[number]

        if (TypeCheck.isNotNull(firstTask)) calculateJobRouteTask.unshift(firstTask)
      }

      return {
        tasks: handleTask(calculateJobRouteTask)
      }
    } catch (error) {
      if (isErrorObject(error)) {
        throw error
      } else {
        const errorMessage = error.message ?? error.toString()
        throw Category.CalculateJob.UnknownError(errorMessage)
      }
    }
  }
}

export default Operator
