/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:59:00
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-08 15:56:34
 * @Description:
 */

import {
  Injectable
} from '@nestjs/common'

import {
  Snowflake
} from 'nodejs-snowflake'

import {
  Config
} from './config'

@Injectable()
export class SnowflakeService {
  private readonly snowflake: Snowflake

  constructor (
    private readonly appConfig: Config
  ) {
    const config = this.appConfig.appConfig.snowFlake

    this.snowflake = new Snowflake({
      instance_id: config.instanceId,
      custom_epoch: config.customEpoch
    })
  }

  /** 產生唯一識別碼 (會轉成string) */
  snowflakeId (): string {
    return this.snowflake.getUniqueID().toString()
  }
}
