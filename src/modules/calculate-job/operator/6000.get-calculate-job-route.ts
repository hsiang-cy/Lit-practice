/*
 * @Author:Kerwin
 * @Date:2024-04-14 15:00:24
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-03-28 17:32:02
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  CalculateJobState,
  DestinationType,
  DispatchRouteTaskEvent,
  VehicleType
} from '@zuellig-pharma-2/database'

import _ from 'lodash'

import {
  Category
} from '$errors'

import {
  GetCalculateJobRoute
} from '$modules/calculate-job/dto'

import {
  PrismaService
} from '$shared-service'

import {
  APIInfo,
  BaseOperator,
  CalculateJobVehicleInfo,
  Writeable
} from '$types'

import {
  isErrorObject
} from '$utility'

/** 取得計算任務派遣總覽 */
@Injectable()
@APIInfo('GET_CALCULATE_JOB_ROUTE', 'CalculateJob')
export class Operator extends BaseOperator<GetCalculateJobRoute.Data, GetCalculateJobRoute.Query> {
  constructor (
    private readonly prisma: PrismaService
  ) {
    super()
  }

  async verify (req: { query: GetCalculateJobRoute.Query }) {
    const data = await this.validateDto(GetCalculateJobRoute.Query, req.query)

    // 確認計算任務是否存在
    const calculateJob = await this.prisma.calculateJob.findFirst({
      where: {
        id: data.calculateJobId
      },
      select: {
        state: true
      }
    })
    if (TypeCheck.isNull(calculateJob)) throw Category.DataNotExist.calculateJob

    // 確認計算任務是否計算完成
    if (calculateJob.state !== CalculateJobState.JOB_FINISHED) throw Category.CalculateJob.CalculateJobNotFinished

    // 取得全部的路線任務
    const calculateJobRoute = await this.prisma.dispatchRoute.findMany({
      where: { calculateJobId: data.calculateJobId },
      select: {
        id:true,
        actualStartTime: true,
        actualEndTime: true,
        calculateJobVehicle: {
          select: {
            type: true,
            code: true,
            regularWorkTime: true,
            maxCapacity: true,
            info: true
          }
        },
        tasks: {
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
            deliveryDemand: true
          }
        }
      }
    })

    // 如果沒有代表全部掉單
    if (calculateJobRoute.length === 0) throw Category.DataNotExist.dispatchRoute

    return {
      calculateJobRoute
    }
  }

  async operator (query: Awaited<ReturnType<Operator['verify']>>) {
    try {
      const { calculateJobRoute } = query

      // 由於有 reload 的問題，必須考慮到同一個路線任務可能會會有多趟的 task
      const routes: GetCalculateJobRoute.SingleRouteInfoInGetCalculateJobRoute[] = []
      const totalRoute: Writeable<GetCalculateJobRoute.RouteInfoInGetCalculateJobRoute> = {
        counts: 0,
        workTime: 0,
        taskCount: 0,
        deliveryDemand: '0',
        distance: 0,
        drivingTime: 0,
        slackTime: 0,
        serviceTime: 0
      }

      const createRouteInfo = (
        id: string,
        tasks: typeof calculateJobRoute[number]['tasks'],
        routeVehicle: typeof calculateJobRoute[number]['calculateJobVehicle'],
        vehicleInfo: CalculateJobVehicleInfo,
        count: number,
        startTime?: number,
        endTime?: number
      ) => {
        const actualStartTime = startTime ?? tasks[0].arrivalTime + tasks[0].slackTime
        const actualEndTime = endTime ?? tasks[tasks.length - 1].arrivalTime + tasks[tasks.length - 1].slackTime
        const workTime = actualEndTime - actualStartTime

        let distance = 0
        let drivingTime = 0
        let slackTime = 0
        let serviceTime = 0
        let deliveryDemand = BigInt(0)
        let taskCount = 0

        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i]
          if (i > 0) {
            distance += task.transitDistance
            drivingTime += task.transitTime
            slackTime += task.slackTime
            serviceTime += task.serviceTime
            deliveryDemand += BigInt(task.deliveryDemand)
          }
          if (task.event === DispatchRouteTaskEvent.DESTINATION && task.type === DestinationType.NORMAL) taskCount += 1
        }

        // 累加到總計
        totalRoute.counts += count
        totalRoute.workTime += workTime
        totalRoute.taskCount += taskCount
        totalRoute.deliveryDemand = (BigInt(totalRoute.deliveryDemand) + deliveryDemand).toString()
        totalRoute.distance += distance
        totalRoute.drivingTime += drivingTime
        totalRoute.slackTime += slackTime
        totalRoute.serviceTime += serviceTime

        return {
          id,
          code: `${routeVehicle.code}-${count}`,
          fleetName: vehicleInfo.fleetName,
          area: vehicleInfo.area,
          driverName: vehicleInfo.driverName,
          type: routeVehicle.type as VehicleType,
          tonnage: vehicleInfo.tonnage,
          size: vehicleInfo.size,
          volume: vehicleInfo.volume,
          maxCapacity: routeVehicle.maxCapacity ?? '0',
          regularWorkTime: routeVehicle.regularWorkTime ?? 0,
          vehicleRoute: vehicleInfo.vehicleRoute,
          counts: count,
          taskCount,
          deliveryDemand: deliveryDemand.toString(),
          actualStartTime,
          actualEndTime,
          workTime,
          distance,
          drivingTime,
          slackTime,
          serviceTime
        } satisfies GetCalculateJobRoute.SingleRouteInfoInGetCalculateJobRoute
      }

      for (const route of calculateJobRoute) {
        const { tasks, calculateJobVehicle: routeVehicle } = route
        const vehicleInfo = routeVehicle.info as unknown as CalculateJobVehicleInfo

        // 確認是否一個 route 有多趟的 task
        const groupTask = tasks.some(t => t.count !== 1) ? _.groupBy(tasks, 'count') : {}
        const groupKeys = Object.keys(groupTask)
        const hasMultipleTask = groupKeys.length > 1

        if (hasMultipleTask) {
          for (const key of groupKeys) {
            const currentCount = Number(key)
            const currentTasks = [...groupTask[currentCount]]
            const lastTaskGroup = currentCount !== 1 ? groupTask[currentCount - 1] : undefined
            if (lastTaskGroup) currentTasks.unshift(lastTaskGroup[lastTaskGroup.length - 1])

            routes.push(createRouteInfo(route.id, currentTasks, routeVehicle, vehicleInfo, currentCount))
          }
        } else {
          // 沒有多趟時，route 的 actualStartTime 與 actualEndTime 可以直接用
          routes.push(createRouteInfo(route.id, tasks, routeVehicle, vehicleInfo, 1, route.actualStartTime, route.actualEndTime))
        }
      }

      const routeCount = routes.length
      const vehicleSet = new Set(routes.map(route => route.code.split('-')[0]))
      const vehicleCount = vehicleSet.size

      const averageRoute: GetCalculateJobRoute.RouteInfoInGetCalculateJobRoute = {
        counts: +(totalRoute.counts / routeCount).toFixed(2),
        workTime: +(totalRoute.workTime / routeCount).toFixed(2),
        taskCount: +(totalRoute.taskCount / routeCount).toFixed(2),
        deliveryDemand: (BigInt(totalRoute.deliveryDemand) / BigInt(routeCount)).toString(),
        distance: +(totalRoute.distance / routeCount).toFixed(2),
        drivingTime: +(totalRoute.drivingTime / routeCount).toFixed(2),
        slackTime: +(totalRoute.slackTime / routeCount).toFixed(2),
        serviceTime: +(totalRoute.serviceTime / routeCount).toFixed(2)
      }

      const averageVehicle: GetCalculateJobRoute.RouteInfoInGetCalculateJobRoute = {
        counts: +(totalRoute.counts / vehicleCount).toFixed(2),
        workTime: +(totalRoute.workTime / vehicleCount).toFixed(2),
        taskCount: +(totalRoute.taskCount / vehicleCount).toFixed(2),
        deliveryDemand: (BigInt(totalRoute.deliveryDemand) / BigInt(vehicleCount)).toString(),
        distance: +(totalRoute.distance / vehicleCount).toFixed(2),
        drivingTime: +(totalRoute.drivingTime / vehicleCount).toFixed(2),
        slackTime: +(totalRoute.slackTime / vehicleCount).toFixed(2),
        serviceTime: +(totalRoute.serviceTime / vehicleCount).toFixed(2)
      }

      return { totalRoute, averageRoute, averageVehicle, routes } satisfies GetCalculateJobRoute.Data
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
