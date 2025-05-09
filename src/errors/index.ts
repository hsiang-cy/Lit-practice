/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:01:35
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-08 16:51:54
 * @Description:
 */

import RouteError from './001.route-error'
import AuthenticationError from './002.authentication-error'
import AuthorizationError from './003.authorization-error'
import BadRequest from './010.bad-request'
import InputEmpty from './011.input-empty'
import InputInvalid from './012.input-invalid'
import InputFileError from './013.input-file-error'
import DataNotExist from './020.data-not-exist'
import DataDuplicate from './021.data-duplicate'
import DataNotModified from './022.data-not-modified'
import DataExpired from './023.data-expired'
import ExternalServerError from './098.external-server.error'
import InternalServerError from './099.internal-server-error'
import Fleet from './100.fleet'
import Vehicle from './200.vehicle'
import Route from './300.route'
import Account from './400.account'
import Customer from './500.customer'
import CalculateJob from './600.calculate-job'
import Order from './700.order'
import Auth from './800.auth'

export * from './base'

const Category = {
  RouteError,
  AuthenticationError,
  AuthorizationError,
  BadRequest,
  InputEmpty,
  InputInvalid,
  InputFileError,
  DataNotExist,
  DataDuplicate,
  DataNotModified,
  DataExpired,
  ExternalServerError,
  InternalServerError,
  Fleet,
  Vehicle,
  Route,
  Account,
  Customer,
  CalculateJob,
  Order,
  Auth
}

export {
  Category
}
