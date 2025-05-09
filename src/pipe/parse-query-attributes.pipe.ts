/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:59:24
 * @LastEditors:Kerwin
 * @LastEditTime:2023-09-28 11:59:26
 * @Description:
 */

import {
  ArgumentMetadata,
  Injectable,
  PipeTransform
} from '@nestjs/common'

@Injectable()
export class ParseQueryAttributesPipe implements PipeTransform {
  transform (
    value: any,
    metadata: ArgumentMetadata
  ) {
    if (metadata.type !== 'query') {
      return value
    }

    if (value.attributes) {
      value.attributes = String(value.attributes).split(',').map(att => att.trim())
    }

    return value
  }
}
