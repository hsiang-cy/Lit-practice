/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:58:04
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-06 15:11:27
 * @Description:
 */

import {
  ApiProperty,
  ApiPropertyOptional
} from '@nestjs/swagger'

import { DataStatus } from '@zuellig-pharma-2/database'
import {
  Transform,
  Type
} from 'class-transformer'

import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator'

import {
  Trim
} from '$decorator/trim'

import {
  i18n
} from '$shared-service/i18n'

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type CommonStatus = Extract<DataStatus, DataStatus.ACTIVE | DataStatus.INACTIVE>

export type ISortName = 'id' | 'status' | 'createTime' | 'updateTime'

export class BaseSort {
  @ApiProperty({ description: i18n.t('types:base.base-search.name') })
  @Trim()
  @IsString()
  @IsNotEmpty()
  name: ISortName | string

  @ApiPropertyOptional({ description: i18n.t('types:base.base-search.order'), enum: SortType, default: SortType.ASC })
  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(SortType)
  @IsOptional()
  order?: SortType = SortType.ASC
}

export class BasePagination {
  @ApiPropertyOptional({ description: i18n.t('types:base.base-search.limit'), default: 10 })
  @Max(2147483647) // int32 max
  @Min(0)
  @IsNumber()
  @IsOptional()
  limit?: number

  @ApiPropertyOptional({ description: i18n.t('types:base.base-search.offset'), default: 0 })
  @Max(2147483647) // int32 max
  @Min(0)
  @IsNumber()
  @IsOptional()
  offset?: number
}

export abstract class BaseSearch {
  abstract query?: any

  @ApiPropertyOptional({ type: () => BaseSort, isArray: true })
  @ValidateNested()
  @Type(() => BaseSort)
  @IsArray()
  @IsOptional()
  abstract sort?: BaseSort[]

  @ApiPropertyOptional({ type: () => BasePagination })
  @ValidateNested()
  @Type(() => BasePagination)
  pagination?: BasePagination
}

export class BaseSearchResult<T> {
  @ApiProperty({ description: i18n.t('types:base.base-search.count'), example: 10 })
  count: number

  data: T[]
}

export default BaseSearch
