/*
 * @Author:Kerwin
 * @Date:2024-09-24 15:48:02
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:41:09
 * @Description:
 */

import {
  ApiProperty
} from '@nestjs/swagger'

import {
  AlgorithmType,
  CalculateJobState,
  CalculateJobType
} from '@zuellig-pharma-2/database'

import {
  i18n
} from '$shared-service/i18n'

import {
  BaseEntity
} from '$types'

import {
  handleEnumDescription
} from '$utility'

export class CalculateJob extends BaseEntity {
  @ApiProperty({ description: i18n.t('entity:calculateJob.orderGroupId') })
  readonly orderGroupId: string

  @ApiProperty({ description: i18n.t('entity:calculateJob.rawComment') })
  readonly rawComment: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:calculateJob.algorithmType')) })
  readonly algorithmType: AlgorithmType

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:calculateJob.jobType')) })
  readonly jobType: CalculateJobType

  @ApiProperty({ description: i18n.t('entity:calculateJob.comment') })
  readonly comment: string

  @ApiProperty({ description: i18n.t('entity:calculateJob.count') })
  readonly count: number

  @ApiProperty({ description: i18n.t('entity:calculateJob.startCalculateTime') })
  readonly startCalculateTime: string

  @ApiProperty({ description: i18n.t('entity:calculateJob.planStartDate') })
  readonly planStartDate: string

  @ApiProperty({ description: i18n.t('entity:calculateJob.planEndDate') })
  readonly planEndDate: string

  @ApiProperty({ description: i18n.t('entity:calculateJob.calculationTime') })
  readonly calculationTime: number

  @ApiProperty({ description: i18n.t('entity:calculateJob.apiVersion') })
  readonly apiVersion: string

  @ApiProperty({ description: handleEnumDescription(i18n.t('entity:calculateJob.state')) })
  readonly state: CalculateJobState
}
