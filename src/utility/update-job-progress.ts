/*
 * @Author:Sean Chen
 * @Date:2025-03-11 09:57:39
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-03-11 09:57:40
 * @Description:
 */
/*
 * @Author:Kerwin
 * @Date:2024-11-21 16:20:44
 * @LastEditors:Kerwin
 * @LastEditTime:2024-11-22 10:33:06
 * @Description:
 */

import {
  Job
} from 'bullmq'

interface PassJobProgress {
  totalStep: number
  currentStep: number
  message: string
}

interface JobProgress {
  progress: number
  message: string
}

/**
 * 更新 Job 進度
 * @param job 任務
 * @param progress.totalStep 總步驟數
 * @param progress.currentStep 目前進行到第幾步
 * @param progress.message 訊息
 * @description
 * 1. 透過 Job 的 updateProgress 方法更新進度
 * 2. 會自動計算目前的進度百分比
 */
export async function updateJobProgress (
  job: Job,
  progress: PassJobProgress
) {
  const { totalStep, currentStep, message } = progress

  await job.updateProgress({
    progress: (currentStep / totalStep) * 100,
    message
  } satisfies JobProgress)
}
