/*
 * @Author:Kerwin
 * @Date:2024-04-21 17:01:52
 * @LastEditors:Kerwin
 * @LastEditTime:2025-01-14 11:18:24
 * @Description:
 */

import {
  HttpStatus,
  HttpException
} from '@nestjs/common'

export class FileEmptyException extends HttpException {
  constructor (fileName: string) {
    super(fileName, HttpStatus.BAD_REQUEST)
  }
}

export class InvalidFieldException extends HttpException {
  constructor (fileName: string) {
    super(fileName, HttpStatus.BAD_REQUEST)
  }
}

export class ExceededFileLimitException extends HttpException {
  constructor (fileName: string) {
    super(fileName, HttpStatus.BAD_REQUEST)
  }
}
