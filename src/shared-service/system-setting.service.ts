import {
  ArrivalMode,
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  Injectable
} from '@nestjs/common'

import {
  PrismaService
} from './prisma-database'

@Injectable()
export class SystemSettingService {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  /**
   * 從資料庫取得系統設定的`演算法輸出格式`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `PROTO`)
   */
  async getAlgorithmOutputFormat (
    defaultValue: 'PROTO' | 'JSON' = 'PROTO'
  ) {
    const key = 'OUTPUT_FORMAT'
    const value = (await this.getSystemSettingValue(key))?.value

    return value ?? defaultValue
  }

  /**
   * 從資料庫取得系統設定的`整體最大緩衝時間 (分)`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `-1`)
   */
  async getAlgorithmMaxSlack (defaultValue = -1) {
    const key = 'MAX_SLACK'
    const value = Number((await this.getSystemSettingValue(key))?.value)

    return value || defaultValue
  }

  /**
   * 從資料庫取得系統設定的`演算法最少求解時間 (秒)`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `45`)
   */
  async getAlgorithmTimeMin (defaultValue = 45) {
    const key = 'TIME_LIMIT_MIN'
    const value = Number((await this.getSystemSettingValue(key))?.value)

    return value || defaultValue
  }

  /**
   * 從資料庫取得系統設定的`演算法最大求解時間 (秒)`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `2400`)
   */
  async getAlgorithmTimeMax (defaultValue = 2400) {
    const key = 'TIME_LIMIT_MAX'
    const value = Number((await this.getSystemSettingValue(key))?.value)

    return value || defaultValue
  }

  /**
   * 從資料庫取得系統設定的`全局目標式`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `MIN_TRIPS_TRANSIT_DISTANCES`)
   */
  async getAlgorithmGlobalObjectiveMode (
    defaultValue: 'MIN_TRIPS_TRANSIT_DISTANCES' | 'MIN_TRIPS_TRANSIT_TIMES' | 'MIN_TRIPS_QTDS' | 'MIN_TRANSIT_DISTANCES' | 'MIN_TRANSIT_TIMES' = 'MIN_TRIPS_TRANSIT_DISTANCES'
  ) {
    const key = 'GLOBAL_OBJECTIVE_MODE'
    const value = (await this.getSystemSettingValue(key))?.value

    return value ?? defaultValue
  }

  /**
   * 從資料庫取得系統設定的`初解策略`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `-1`)
   */
  async getAlgorithmFirstSolutionStrategy (defaultValue = -1) {
    const key = 'FIRST_SOLUTION_STRATEGY'
    const value = Number((await this.getSystemSettingValue(key))?.value)

    return value || defaultValue
  }

  /**
   * 從資料庫取得系統設定的`改善策略`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `-1`)
   */
  async getAlgorithmImprovedSolutionStrategy (defaultValue = -1) {
    const key = 'IMPROVED_SOLUTION_STRATEGY'
    const value = Number((await this.getSystemSettingValue(key))?.value)

    return value || defaultValue
  }

  /**
   * 從資料庫取得系統設定的`目的地抵達模式`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `ARRIVAL_IN_TW`)
   */
  async getDestinationArrivalMode (defaultValue: ArrivalMode = ArrivalMode.ARRIVAL_IN_TW) {
    const key = 'ARRIVAL_MODE'
    const value = (await this.getSystemSettingValue(key))?.value

    return value ?? defaultValue
  }

  /**
   * 從資料庫取得系統設定的`計算緩衝時間 (秒)`
   * @param defaultValue 若無法取得資料庫的值，則使用此預設值 (預設值: `300`)
   */
  async getAlgorithmCalculateBufferTime (defaultValue = 300) {
    const key = 'CALCULATE_BUFFER_TIME'
    const value = Number((await this.getSystemSettingValue(key))?.value)

    return value || defaultValue
  }

  private async getSystemSettingValue (key: string) {
    return await this.prisma.systemSetting.findFirst({
      where: {
        key,
        status: DataStatus.ACTIVE
      },
      select: { value: true }
    })
  }
}
