/*
 * @Author:Kerwin
 * @Date:2024-04-08 16:34:59
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-28 11:31:10
 * @Description:
 */

export enum FleetAPICodes {
  SEARCH_FLEET = 1000,
  GET_FLEET = 1001,
  CREATE_FLEET = 1002,
  UPDATE_FLEET = 1003,
  DELETE_FLEET = 1004,
  UPDATE_FLEET_STATUS = 1005
}

export enum VehicleAPICodes {
  SEARCH_VEHICLE = 2000,
  GET_VEHICLE = 2001,
  UPDATE_VEHICLE = 2003,
  DELETE_VEHICLE = 2004,
  UPDATE_VEHICLE_ROUTE = 2005,
  SEARCH_NO_VEHICLE_ROUTE = 2006,
  CREATE_VEHICLE = 2002,
  UPDATE_VEHICLE_STATUS = 2007,
  CREATE_VEHICLE_WITH_EXCEL = 2008
}

export enum RouteAPICodes {
  SEARCH_ROUTE = 3000,
  GET_ROUTE = 3001,
  CREATE_ROUTE = 3002,
  UPDATE_ROUTE = 3003,
  DELETE_ROUTE = 3004,
  UPDATE_ROUTE_STATUS = 3005,
  CREATE_ROUTE_WITH_EXCEL = 3008
}

export enum AccountAPICodes {
  SEARCH_ACCOUNT = 4000,
  GET_ACCOUNT = 4001,
  CREATE_ACCOUNT = 4002,
  UPDATE_ACCOUNT = 4003,
  DELETE_ACCOUNT = 4004,
  UPDATE_ACCOUNT_STATUS = 4005,
  CHANGE_PASSWORD = 4006
}

export enum AuthAPICodes {
  SING_IN = 8000,
  SING_OUT = 8001
}

export enum OrderAPICodes {
  IMPORT_ORDER = 7000,
  SEARCH_ORDER = 7001,
  SEARCH_ORDER_GROUP_DESTINATION = 7002,
  START_CALCULATE = 7010
}

export enum CalculateJobAPICodes {
  GET_CALCULATE_JOB_ROUTE = 6000,
  GET_CALCULATE_JOB_ROUTE_TASK = 6001,
  SEARCH_DROP_DESTINATION = 6002,
  GET_CALCULATE_JOB_ROUTE_PATH = 6003,
  SEARCH_CALCULATE_JOB = 6004,
  SEARCH_CALCULATE_JOB_STATE = 6005,
}

export enum CustomerAPICodes {
  SEARCH_CUSTOMER = 5000,
  GET_CUSTOMER = 5001,
  UPDATE_CUSTOMER_INFO = 5002,
  UPDATE_CUSTOMER_TIMEWINDOW = 5003,
  UPDATE_CUSTOMER_SPECIALTIMEWINDOW = 5004
}

type APICodeModule = typeof APICodeObj
type APICodeValue<M extends keyof APICodeModule> = keyof APICodeModule[M]

// 根據需求擴充此物件 (用module來區分)
const APICodeObj = {
  Fleet: FleetAPICodes,
  Vehicle: VehicleAPICodes,
  Route: RouteAPICodes,
  Account: AccountAPICodes,
  Auth: AuthAPICodes,
  Order: OrderAPICodes,
  CalculateJob: CalculateJobAPICodes,
  Customer: CustomerAPICodes
}

/** insert api code */
export function APIInfo<
  M extends keyof APICodeModule,
  N extends APICodeValue<M>> (
  name: N,
  module: M
) {
  // eslint-disable-next-line
  return function (constructor: Function) {
    constructor.prototype.code = JSON.stringify(APICodeObj[module][name])
    constructor.prototype.name = APICodeObj[module][APICodeObj[module][name] as any]
  }
}

export const FleetAPIDoc = {
  /** 取得車隊管理清單 */
  [FleetAPICodes.SEARCH_FLEET]: [FleetAPICodes.SEARCH_FLEET.toString(), FleetAPICodes[FleetAPICodes.SEARCH_FLEET], '取得車隊管理清單', 'Post', '/search'],
  /** 取得單筆車隊資料 */
  [FleetAPICodes.GET_FLEET]: [FleetAPICodes.GET_FLEET.toString(), FleetAPICodes[FleetAPICodes.GET_FLEET], '取得單筆車隊資料', 'Get', '/fleet'],
  /** 新增車隊 */
  [FleetAPICodes.CREATE_FLEET]: [FleetAPICodes.CREATE_FLEET.toString(), FleetAPICodes[FleetAPICodes.CREATE_FLEET], '新增車隊', 'Post', '/'],
  /** 更新車隊資訊 */
  [FleetAPICodes.UPDATE_FLEET]: [FleetAPICodes.UPDATE_FLEET.toString(), FleetAPICodes[FleetAPICodes.UPDATE_FLEET], '更新車隊資訊', 'Put', '/'],
  /** 刪除車隊資料 */
  [FleetAPICodes.DELETE_FLEET]: [FleetAPICodes.DELETE_FLEET.toString(), FleetAPICodes[FleetAPICodes.DELETE_FLEET], '刪除車隊資料', 'Delete', '/'],
  /** 編輯車隊狀態 */
  [FleetAPICodes.UPDATE_FLEET_STATUS]: [FleetAPICodes.UPDATE_FLEET_STATUS.toString(), FleetAPICodes[FleetAPICodes.UPDATE_FLEET_STATUS], '編輯車隊狀態', 'Put', '/status']
}

export const VehicleAPIDoc = {
  /** 取得車輛管理清單 */
  [VehicleAPICodes.SEARCH_VEHICLE]: [VehicleAPICodes.SEARCH_VEHICLE.toString(), VehicleAPICodes[VehicleAPICodes.SEARCH_VEHICLE], '取得車輛管理清單', 'Post', '/search'],
  /** 取得單筆車輛資訊 */
  [VehicleAPICodes.GET_VEHICLE]: [VehicleAPICodes.GET_VEHICLE.toString(), VehicleAPICodes[VehicleAPICodes.GET_VEHICLE], '取得單筆車輛資訊', 'Get', '/'],
  /** 更新車輛資訊 */
  [VehicleAPICodes.UPDATE_VEHICLE]: [VehicleAPICodes.UPDATE_VEHICLE.toString(), VehicleAPICodes[VehicleAPICodes.UPDATE_VEHICLE], '更新車輛資訊', 'Put', '/'],
  /** 刪除車輛 */
  [VehicleAPICodes.DELETE_VEHICLE]: [VehicleAPICodes.DELETE_VEHICLE.toString(), VehicleAPICodes[VehicleAPICodes.DELETE_VEHICLE], '刪除車輛', 'Delete', '/'],
  /** 編輯車輛負責路線 */
  [VehicleAPICodes.UPDATE_VEHICLE_ROUTE]: [VehicleAPICodes.UPDATE_VEHICLE_ROUTE.toString(), VehicleAPICodes[VehicleAPICodes.UPDATE_VEHICLE_ROUTE], '編輯車輛負責路線', 'Put', '/routes'],
  /** 取得非該車輛的負責路線 */
  [VehicleAPICodes.SEARCH_NO_VEHICLE_ROUTE]: [VehicleAPICodes.SEARCH_NO_VEHICLE_ROUTE.toString(), VehicleAPICodes[VehicleAPICodes.SEARCH_NO_VEHICLE_ROUTE], '取得非該車輛的負責路線', 'Post', '/routes'],
  /** 新增車輛 */
  [VehicleAPICodes.CREATE_VEHICLE]: [VehicleAPICodes.CREATE_VEHICLE.toString(), VehicleAPICodes[VehicleAPICodes.CREATE_VEHICLE], '新增車輛', 'Post', '/'],
  /** 編輯車輛狀態 */
  [VehicleAPICodes.UPDATE_VEHICLE_STATUS]: [VehicleAPICodes.UPDATE_VEHICLE_STATUS.toString(), VehicleAPICodes[VehicleAPICodes.UPDATE_VEHICLE_STATUS], '編輯車輛狀態', 'Put', '/status'],
  /** 用excel上傳車輛資訊, 以此批量建立 */
  [VehicleAPICodes.CREATE_VEHICLE_WITH_EXCEL]: [VehicleAPICodes.CREATE_VEHICLE_WITH_EXCEL.toString(), VehicleAPICodes[VehicleAPICodes.CREATE_VEHICLE_WITH_EXCEL], '用excel上傳車輛資訊, 以此批量建立', 'Post', '/vehicle/excel']
}

export const RouteAPIDoc = {
  /** 路線管理清單 */
  [RouteAPICodes.SEARCH_ROUTE]: [RouteAPICodes.SEARCH_ROUTE.toString(), RouteAPICodes[RouteAPICodes.SEARCH_ROUTE], '路線管理清單', 'Post', '/search'],
  /** 取得單一路線資訊 */
  [RouteAPICodes.GET_ROUTE]: [RouteAPICodes.GET_ROUTE.toString(), RouteAPICodes[RouteAPICodes.GET_ROUTE], '取得單一路線資訊', 'Get', '/'],
  /** 新增路線 */
  [RouteAPICodes.CREATE_ROUTE]: [RouteAPICodes.CREATE_ROUTE.toString(), RouteAPICodes[RouteAPICodes.CREATE_ROUTE], '新增路線', 'Post', '/'],
  /** 編輯路線資訊 */
  [RouteAPICodes.UPDATE_ROUTE]: [RouteAPICodes.UPDATE_ROUTE.toString(), RouteAPICodes[RouteAPICodes.UPDATE_ROUTE], '編輯路線資訊', 'Put', '/'],
  /** 刪除路線 */
  [RouteAPICodes.DELETE_ROUTE]: [RouteAPICodes.DELETE_ROUTE.toString(), RouteAPICodes[RouteAPICodes.DELETE_ROUTE], '刪除路線', 'Delete', '/'],
  /** 編輯路線資料狀態 */
  [RouteAPICodes.UPDATE_ROUTE_STATUS]: [RouteAPICodes.UPDATE_ROUTE_STATUS.toString(), RouteAPICodes[RouteAPICodes.UPDATE_ROUTE_STATUS], '編輯路線資料狀態', 'Put', '/status'],
  /** 上傳 Excel 匹量建立路線資料 */
  [RouteAPICodes.CREATE_ROUTE_WITH_EXCEL]: [RouteAPICodes.CREATE_ROUTE_WITH_EXCEL.toString(), RouteAPICodes[RouteAPICodes.CREATE_ROUTE_WITH_EXCEL], '上傳 Excel 匹量建立路線資料', 'Post', '/route/excel']
}

export const AccountAPIDoc = {
  /** 取得登錄者清單 */
  [AccountAPICodes.SEARCH_ACCOUNT]: [AccountAPICodes.SEARCH_ACCOUNT.toString(), AccountAPICodes[AccountAPICodes.SEARCH_ACCOUNT], '取得登錄者清單', 'Post', '/search'],
  /** 取得單一登錄者資訊 */
  [AccountAPICodes.GET_ACCOUNT]: [AccountAPICodes.GET_ACCOUNT.toString(), AccountAPICodes[AccountAPICodes.GET_ACCOUNT], '取得單一登錄者資訊', 'Get', '/'],
  /** 新增登錄者 */
  [AccountAPICodes.CREATE_ACCOUNT]: [AccountAPICodes.CREATE_ACCOUNT.toString(), AccountAPICodes[AccountAPICodes.CREATE_ACCOUNT], '新增登錄者', 'Post', '/'],
  /** 編輯登錄者資訊 */
  [AccountAPICodes.UPDATE_ACCOUNT]: [AccountAPICodes.UPDATE_ACCOUNT.toString(), AccountAPICodes[AccountAPICodes.UPDATE_ACCOUNT], '編輯登錄者資訊', 'Put', '/'],
  /** 刪除登錄者 */
  [AccountAPICodes.DELETE_ACCOUNT]: [AccountAPICodes.DELETE_ACCOUNT.toString(), AccountAPICodes[AccountAPICodes.DELETE_ACCOUNT], '刪除登錄者', 'Delete', '/'],
  /** 更新登錄者狀態 */
  [AccountAPICodes.UPDATE_ACCOUNT_STATUS]: [AccountAPICodes.UPDATE_ACCOUNT_STATUS.toString(), AccountAPICodes[AccountAPICodes.UPDATE_ACCOUNT_STATUS], '更新登錄者狀態', 'Put', '/status'],
  /** 變更密碼 */
  [AccountAPICodes.CHANGE_PASSWORD]: [AccountAPICodes.CHANGE_PASSWORD.toString(), AccountAPICodes[AccountAPICodes.CHANGE_PASSWORD], '變更密碼', 'Put', '/changePassword']
}

export const AuthAPIDoc = {
  /** 登入 */
  [AuthAPICodes.SING_IN]: [AuthAPICodes.SING_IN.toString(), AuthAPICodes[AuthAPICodes.SING_IN], '登入', 'Post', '/sign-in'],
  /** 登出 */
  [AuthAPICodes.SING_OUT]: [AuthAPICodes.SING_OUT.toString(), AuthAPICodes[AuthAPICodes.SING_OUT], '登出', 'Post', '/sing-out']
}

export const OrderAPIDoc = {
  /** 匯入訂單資訊，從前端接收.xlsx */
  [OrderAPICodes.IMPORT_ORDER]: [OrderAPICodes.IMPORT_ORDER.toString(), OrderAPICodes[OrderAPICodes.IMPORT_ORDER], '匯入訂單資訊，從前端接收.xlsx', 'Post', '/order/upload/excel'],
  /** 查詢訂單列表 */
  [OrderAPICodes.SEARCH_ORDER]: [OrderAPICodes.SEARCH_ORDER.toString(), OrderAPICodes[OrderAPICodes.SEARCH_ORDER], '查詢訂單列表', 'Post', '/order/search'],
  /** 查詢訂單目的地列表 */
  [OrderAPICodes.SEARCH_ORDER_GROUP_DESTINATION]: [OrderAPICodes.SEARCH_ORDER_GROUP_DESTINATION.toString(), OrderAPICodes[OrderAPICodes.SEARCH_ORDER_GROUP_DESTINATION], '查詢訂單目的地列表', 'Post', '/order/destination/search'],
  /** 開始計算訂單 */
  [OrderAPICodes.START_CALCULATE]: [OrderAPICodes.START_CALCULATE.toString(), OrderAPICodes[OrderAPICodes.START_CALCULATE], '開始計算訂單', 'Post', '/order']
}

export const CalculateJobAPIDoc = {
  /** 取得計算任務派遣總覽 */
  [CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE]: [CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE.toString(), CalculateJobAPICodes[CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE], '取得計算任務派遣總覽', 'Get', '/calculate-job/route'],
  /** 取得計算任務路線清單 */
  [CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE_TASK]: [CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE_TASK.toString(), CalculateJobAPICodes[CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE_TASK], '取得計算任務路線清單', 'Get', '/calculate-job/route/task'],
  /** 查詢無法分派的目的地 */
  [CalculateJobAPICodes.SEARCH_DROP_DESTINATION]: [CalculateJobAPICodes.SEARCH_DROP_DESTINATION.toString(), CalculateJobAPICodes[CalculateJobAPICodes.SEARCH_DROP_DESTINATION], '查詢無法分派的目的地', 'Post', '/calculate-job/drop-destination'],
  /** 取得計算任務路線導航資訊 */
  [CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE_PATH]: [CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE_PATH.toString(), CalculateJobAPICodes[CalculateJobAPICodes.GET_CALCULATE_JOB_ROUTE_PATH], '取得計算任務路線導航資訊', 'Get', '/calculate-job/route/path'],
  /** 查詢計算任務列表 */
  [CalculateJobAPICodes.SEARCH_CALCULATE_JOB]: [CalculateJobAPICodes.SEARCH_CALCULATE_JOB.toString(), CalculateJobAPICodes[CalculateJobAPICodes.SEARCH_CALCULATE_JOB], '查詢計算任務列表', 'Post', '/calculate-job/search'],
  /** 查詢計算任務狀態列表 */
  [CalculateJobAPICodes.SEARCH_CALCULATE_JOB_STATE]: [CalculateJobAPICodes.SEARCH_CALCULATE_JOB_STATE.toString(), CalculateJobAPICodes[CalculateJobAPICodes.SEARCH_CALCULATE_JOB_STATE], '查詢計算任務狀態列表', 'Post', '/calculate-job/state/search']
}

export const CustomerAPIDoc = {
  /** 獲取客戶主檔清單 */
  [CustomerAPICodes.SEARCH_CUSTOMER]: [CustomerAPICodes.SEARCH_CUSTOMER.toString(), CustomerAPICodes[CustomerAPICodes.SEARCH_CUSTOMER], '獲取客戶主檔清單', 'Post', '/customer/search'],
  /** 取得單筆客戶詳細資料 */
  [CustomerAPICodes.GET_CUSTOMER]: [CustomerAPICodes.GET_CUSTOMER.toString(), CustomerAPICodes[CustomerAPICodes.GET_CUSTOMER], '取得單筆客戶詳細資料', 'Get', '/customer'],
  /** 編輯使用客戶資料 */
  [CustomerAPICodes.UPDATE_CUSTOMER_INFO]: [CustomerAPICodes.UPDATE_CUSTOMER_INFO.toString(), CustomerAPICodes[CustomerAPICodes.UPDATE_CUSTOMER_INFO], '編輯使用客戶資料', 'Put', '/customer/'],
  /** 變更客戶時窗 */
  [CustomerAPICodes.UPDATE_CUSTOMER_TIMEWINDOW]: [CustomerAPICodes.UPDATE_CUSTOMER_TIMEWINDOW.toString(), CustomerAPICodes[CustomerAPICodes.UPDATE_CUSTOMER_TIMEWINDOW], '變更客戶時窗', 'Put', '/customer/update-timewindow'],
  /** 變更特殊作業時間 */
  [CustomerAPICodes.UPDATE_CUSTOMER_SPECIALTIMEWINDOW]: [CustomerAPICodes.UPDATE_CUSTOMER_SPECIALTIMEWINDOW.toString(), CustomerAPICodes[CustomerAPICodes.UPDATE_CUSTOMER_SPECIALTIMEWINDOW], '變更特殊作業時間', 'Put', '/costomer/specialtimewindow']
}
