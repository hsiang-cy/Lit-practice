/*
 * @Author:Kerwin
 * @Date:2024-09-11 15:15:16
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-07 14:56:22
 * @Description:
 */

/** SAICO 系統代碼 */
export enum SaicoApplicationCode {
  /** SAICO SSO系統 */
  SAICO_SSO = 'SAICO_SSO',
  /** SAICO AIR系統 */
  SAICO_AIR = 'SAICO_AIR'
}

/** 應用系統成員權限 */
export enum ApplicationMemberRole {
  /** 擁有者 */
  OWNER = 'OWNER',
  /** 管理者 */
  ADMIN = 'ADMIN',
  /** 編輯者 */
  EDITOR = 'EDITOR',
  /** 檢視者 */
  VIEWER = 'VIEWER'
}

/** 組織成員權限 */
export enum OrganizationMemberRole {
  /** 擁有者 */
  OWNER = 'OWNER',
  /** 管理者 */
  ADMIN = 'ADMIN',
  /** 編輯者 */
  EDITOR = 'EDITOR',
  /** 檢視者 */
  VIEWER = 'VIEWER'
}

/** 應用系統類型 */
export enum ApplicationType {
  /** 系統創建預設應用系統 */
  DEFAULT = 0,
  /** 驗證應用系統 */
  APPLICATION = 10,
  /** 奇點無限 */
  SAICO = 999
}

/** 組織類型 */
export enum OrganizationType {
  /** 系統創建預設組織 */
  DEFAULT = 0,
  /** 驗證個人戶 */
  PERSONAL = 10,
  /** 驗證企業 */
  COMPANY = 20,
  /** 奇點無限 */
  SAICO = 999
}

/** Guard 參數類型 */
export enum GuardParamsType {
  /** 驗證Access Token */
  GUARD_PARAMS_ACCESS_TOKEN = 'guard_params_access_token'
}

/** 系統參數鍵值 */
export enum SystemSettingKey {
  /** 是否儲存上傳檔案 */
  SAVE_UPLOADED_FILE = 'SAVE_UPLOADED_FILE',
  /** 範例訂單Excel檔案路徑 */
  EXAMPLE_ORDER_EXCEL_URL = 'EXAMPLE_ORDER_EXCEL_URL',
  /** 範例車輛Excel檔案路徑 */
  EXAMPLE_VEHICLE_EXCEL_URL = 'EXAMPLE_VEHICLE_EXCEL_URL'
}

/** Redis名稱 */
export enum RedisName {
  /** 處理Sso */
  REDIS_SSO = 'REDIS_SSO',
  /** 處理演算法 */
  REDIS_ALGORITHM = 'REDIS_ALGORITHM',
  /** 處理推播 */
  REDIS_PUBLISHER = 'REDIS_PUBLISHER',
  /** 處理接收 */
  REDIS_SUBSCRIBER = 'REDIS_SUBSCRIBER'
}

/** redis Subscribe 頻道名稱 */
export enum RedisSubscriberChannel {
  /** 訂單群組解析 */
  ORDER_GROUP_PARSE = 'ORDER_GROUP_PARSE',
  /** 計算任務狀態 */
  CALCULATE_JOB_STATE = 'CALCULATE_JOB_STATE',
  /** 演算法狀態 */
  ALGO_STATUS = 'ALGO_STATUS',
  /** 演算法錯誤 */
  ALGO_ERROR = 'ALGO_ERROR'
}

/** 佇列名稱 */
export enum QueueName {
  /** 解析訂單群組內容 */
  PARSE_ORDER_GROUP_CONTENT = 'PARSE_ORDER_GROUP_CONTENT',
  /** 資料前處理 */
  DATA_PREPROCESSING = 'DATA_PREPROCESSING',
  /** 計算任務資料前處理(從API發起計算) */
  DATA_PREPROCESSING_FROM_API = 'DATA_PREPROCESSING_FROM_API',
  /** 呼叫演算法 */
  CALL_ALGORITHM = 'CALL_ALGORITHM',
  /** 計算任務狀態處理 */
  CALCULATE_JOB_STATE = 'CALCULATE_JOB_STATE',
  /** 資料後處理 */
  DATA_POSTPROCESSING = 'DATA_POSTPROCESSING',
  /** 演算法錯誤處理 */
  ALGORITHM_ERROR = 'ALGORITHM_ERROR',
  /** 系統建立訂閱 */
  CREATE_AIR_SUBSCRIPTION = 'CREATE_AIR_SUBSCRIPTION',
  /** 排程更新訂閱狀態 */
  SCHEDULE_UPDATE_SUBSCRIPTION_STATE = 'SCHEDULE_UPDATE_SUBSCRIPTION_STATE'
}

/** 帳戶類型 */
export enum AccountType {
  /** 管理者 */
  MANAGER = 'MANAGER',
  /** 一般員工/使用者 */
  GENERAL = 'GENERAL'
}