import {
  Readable
} from 'stream'
import {
  ApiProperty,
  ApiPropertyOptional
} from '@nestjs/swagger'

import {
  Area,
  customerType,
  DataStatus
} from '@zuellig-pharma-2/database'

import {
  ServiceResponse
} from './base'

import {
  ApplicationMemberRole,
  OrganizationMemberRole,
  OrganizationType
} from './enum'

import {
  i18n
} from '$shared-service/i18n'

export interface File {
  /** 與此文件相關聯的表單字段的名稱 */
  fieldname: string
  /** 上傳者電腦上的文件名稱 */
  originalname: string
  /**
   * 此文件的 Content-Transfer-Encoding 標頭的值
   * 自2015年7月起已棄用
   * 參見 RFC 7578, Section 4.7
   * @deprecated
   */
  encoding: string
  /** 此文件的 Content-Type 標頭的值 */
  mimetype: string
  /** 文件的大小（以字節為單位） */
  size: number
  /**
   * 此文件的可讀流只對自定義 StorageEngines 的 _handleFile 回調可用
   */
  stream: Readable
  /** 僅 DiskStorage：已上傳此文件的目錄 */
  destination: string
  /** 僅 DiskStorage：destination 中此文件的名稱 */
  filename: string
  /** 僅 DiskStorage：已上傳文件的完整路徑 */
  path: string
  /** 僅 MemoryStorage：包含整個文件的 Buffer */
  buffer: Buffer
}

export type SaicoApiSuccessData<T> = Required<Pick<ServiceResponse<T>, 'data'>>
export type SaicoApiErrorData = Required<Pick<ServiceResponse<null>, 'errors'>>
export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

/** Access Token 解析來的帳號資訊 */
export interface AccountInfo {
  /** 使用者識別碼 */
  id: string
  /** 使用者帳號 */
  account: string
  /** 使用者狀態 */
  state: number
  /** 使用者名稱 */
  displayName: string
  /** 使用者電話 */
  phone: string
  /** 使用者所屬組織 */
  organization: {
    /** 組織識別碼 */
    id: string
    /** 組織代碼 */
    code: string
    /** 組織名稱 */
    name: string
    /** 組織類型 */
    type: OrganizationType
    /** 組織狀態 */
    status: DataStatus
    /** 組織角色 */
    role: OrganizationMemberRole
  }
  /** 使用者擁有授權的應用程式 */
  applications: {
    /** 應用程式識別碼 */
    id: string
    /** 組織識別碼 */
    organizationId: string
    /** 應用程式代碼 */
    code: string
    /** 應用程式名稱 */
    name: string
    /** 應用程式類型 */
    type: number
    /** 應用程式狀態 */
    status: DataStatus
    /** 應用系統成員權限 */
    role: ApplicationMemberRole
  }[]
}

/** Access Token Guard 驗證參數 */
export interface GuardParamsAccessToken {
  /** 驗證是否是Saico組織 */
  verifyIsSaico?: boolean
  /** 允許的Saico組織的角色權限 */
  allowSaicoRoles?: OrganizationMemberRole[]
  /** 是否有Air權限 */
  verifyAir?: boolean
  /** 驗證是否有傳入應用程式權限 */
  verifyApplication?: boolean
  /** 傳入應用程式的允許角色權限 */
  allowRoles?: ApplicationMemberRole[]
}

/** 待驗證的應用程式資訊 */
export interface ServerApplicationInfoInVerifyAccessTokenApi {
  applicationId: string
  isApplicationActive?: boolean
  allowRoles?: ApplicationMemberRole[]
}

/** 驗證`Access Token`的API參數 */
export interface VerifyAccessTokenApiInput {
  accessToken: string
  isSaico?: boolean
  allowOrganizationRoles?: OrganizationMemberRole[]
  serverApplications?: ServerApplicationInfoInVerifyAccessTokenApi[]
}

/** 成功回應包含 Id */
export class SuccessWithIdResponse {
  @ApiProperty({ description: i18n.t('types:type.id'), example: '219488397597249421' })
  id: string

  @ApiProperty({ description: i18n.t('types:type.success'), example: true })
  success: boolean

  @ApiProperty({ description: i18n.t('types:type.message'), example: 'success', required: false })
  message?: string
}

/** 成功回應不包含 Id */
export class SuccessWithoutIdResponse {
  @ApiProperty({ description: i18n.t('types:type.success'), example: true })
  success: boolean
}

/** 經緯度 */
export class CoordinateClass {
  @ApiProperty({ description: i18n.t('types:type.location.lat') })
  lat: number

  @ApiProperty({ description: i18n.t('types:type.location.lng') })
  lng: number
}

/** 地址資訊 */
export class LocationClass {
  @ApiPropertyOptional({ description: i18n.t('types:type.location.source') })
  source: string

  @ApiPropertyOptional({ description: i18n.t('types:type.location.formatted') })
  formatted: string

  @ApiPropertyOptional({ description: i18n.t('types:type.location.coordinate'), type: () => CoordinateClass })
  coordinate: CoordinateClass
}

/** 經緯度 */
export interface Coordinate {
  /** 緯度 */
  lat: number;
  /** 經度 */
  lng: number;
}
/** 地點資訊 */
export interface Location {
  /** 來源地址 */
  source?: string;
  /** 格式化地址 */
  formatted?: string;
  /** 經緯度 */
  coordinate?: Coordinate;
  /** geohash */
  geohash?: string
}

/** SAICO 應用程式資訊 */
export interface SaicoAppInfo {
  /** 應用程式識別碼 */
  id: string
  /** 應用程式客戶端代碼 */
  clientId: string
  /** 應用程式客戶端密鑰 */
  clientSecret: string
}

/** 計算任務車輛資訊 */
export interface CalculateJobVehicleInfo {
  /** 區域 */
  area: Area
  /** 車隊代碼 */
  fleetCode: string
  /** 車隊名稱 */
  fleetName: string
  /** 司機姓名 */
  driverName: string
  /** 頓數 */
  tonnage: string
  /** 車輛尺寸 */
  size: string
  /** 材積 */
  volume: string
  /** 負責路線 */
  vehicleRoute: string[]
}

/** 計算任務目的地資訊 */
export interface CalculateJobDestinationInfo {
  /** 客戶類型 */
  customerType: customerType
  /** 名稱 */
  name: string
  /** 路線 */
  route: string
  /** 倉庫 */
  depot: string
  /** 是否為管制藥品 */
  typeControlled: boolean
  /** 是否為冷藏品 */
  typeRefrigerated: boolean
  /** 是否為實驗藥品 */
  typeExperimental: boolean
  /** 是否為樣品 */
  typeSample: boolean
  /** 是否收現金 */
  typeCash: boolean
  /** 應收金額 */
  price: number
}
