/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:00:31
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:55:54
 * @Description:
 */

import type {
  BaseErrorType
} from '$errors'

import type {
  ServiceResponse
} from '$types'

import {
  HttpStatus,
  HttpException
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

export class ServerException<T> extends HttpException {
  static httpCode: Record<BaseErrorType, HttpStatus> = {
    ROUTE_ERROR: HttpStatus.NOT_FOUND,
    AUTHENTICATION_ERROR: HttpStatus.UNAUTHORIZED,
    AUTHORIZATION_ERROR: HttpStatus.FORBIDDEN,
    BAD_REQUEST: HttpStatus.BAD_REQUEST,
    INPUT_EMPTY: HttpStatus.BAD_REQUEST,
    INPUT_INVALID: HttpStatus.BAD_REQUEST,
    INPUT_FILE_ERROR: HttpStatus.BAD_REQUEST,
    DATA_NOT_EXIST: HttpStatus.BAD_REQUEST,
    DATA_DUPLICATE: HttpStatus.BAD_REQUEST,
    DATA_NOT_MODIFIED: HttpStatus.BAD_REQUEST,
    DATA_EXPIRED: HttpStatus.BAD_REQUEST,
    EXTERNAL_SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
    FLEET_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    VEHICLE_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    ROUTE_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    ACCOUNT_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    CUSTOMER_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    CALCULATE_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    ORDER_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    AUTH_MODULE_ERROR: HttpStatus.BAD_REQUEST,
    CALCULATE_JOB_MODULE_ERROR: HttpStatus.BAD_REQUEST
  }

  constructor(data: ServiceResponse<T>) {
    // 有錯誤訊息時，取第一筆錯誤訊息的type當作http status code，沒有時預設500
    if (TypeCheck.isNotEmpty(data.errors)) {
      super(data, ServerException.httpCode[data.errors[0].type] ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } else {
      super(data, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

export default ServerException
