import {
  SystemSettingService
} from '$shared-service'

/**
 * 根據車輛數量 & 目的地數量計算演算法執行時間
 * @param systemSettingService 系統設定服務
 * @param destinationCount 目的地數量
 * @returns 演算法執行時間 (秒)
 * @description
 * 1. 演算法提供計算方式
 * 2. 目前只有依照目的地數量計算演算法執行時間
 * @see https://gosaico.atlassian.net/browse/AIR-328?atlOrigin=eyJpIjoiNjQ4ZDFiZjg1NTQ2NGQ3ZThkM2Q0MGJhZjAwYzYxMmUiLCJwIjoiaiJ9
 */
export async function generateCalculateTimeLimit (
  systemSettingService: SystemSettingService,
  destinationCount: number
) {
  const baseRunTime = await systemSettingService.getAlgorithmTimeMin()
  const maxRunTime = await systemSettingService.getAlgorithmTimeMax()
  let calculatedRunTime = baseRunTime

  if (destinationCount <= 100) {
    return calculatedRunTime
  } else if (destinationCount <= 300) {
    calculatedRunTime = 3 * 60
  } else if (destinationCount <= 500) {
    calculatedRunTime = 5 * 60
  } else if (destinationCount <= 800) {
    calculatedRunTime = 10 * 60
  } else if (destinationCount <= 1000) {
    calculatedRunTime = 20 * 60
  } else if (destinationCount <= 1500) {
    calculatedRunTime = 40 * 60
  } else if (destinationCount <= 2000) {
    calculatedRunTime = 50 * 60
  } else {
    calculatedRunTime = maxRunTime
  }

  return Math.min(calculatedRunTime, maxRunTime)
}
