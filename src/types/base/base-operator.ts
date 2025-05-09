/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:57:45
 * @LastEditors:Sean Chen
 * @LastEditTime:2025-03-11 14:13:07
 * @Description:
 */
import {
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  plainToClass
} from 'class-transformer'

import {
  validate,
  ValidationError,
  ValidatorOptions
} from 'class-validator'

import _ from 'lodash'

import {
  Category,
  BaseErrorType,
  ErrorObject
} from '$errors'

import {
  ServerException
} from '$exception'

import {
  config as configInstance,
  tracer
} from '$shared-service'

import {
  BaseQuery,
  ServiceResponse
} from '$types'

import {
  handleOperatorErrorSpan,
  isErrorObject,
  isErrorObjectArray
} from '$utility'

/**
 * 基礎操作類別，定義了操作的基本結構和方法
 *
 * @template TReturn - Operator返回值類型
 * @template TQuery - Operator的查詢參數類型
 * @template TBody - Operator的請求主體類型
 */
export abstract class BaseOperator<
  TReturn,
  TQuery extends Partial<BaseQuery> = Partial<BaseQuery>,
  TBody extends Record<string, any> = Record<string, any>
> {
  protected code: string
  protected name: string

  private defaultQuery: BaseQuery = {
    debug: false,
    examine: false,
    attributes: ['module', 'errors', 'data'],
    callback: null
  }

  abstract verify(req: { query?: TQuery, body?: TBody }): unknown
  abstract operator(args: Awaited<ReturnType<this['verify']>>): Promise<TReturn | null>

  /**
   * 處理請求並返回 ServiceResponse 物件
   *
   * @param req.query - 進入請求的 query 物件 (optional)
   * @param req.body - 進入請求的 body 物件 (optional)
   * @param req.unReturnPayload - 不回傳的 payload 鍵值 (須存在於 query 或 body 物件中) (optional)
   * @param moduleInfo - Operator 的模組資訊
   * @returns ServiceResponse 物件
   * @throws 有錯誤時拋出 ServerException
   */
  public async processResponse(
    req: {
      query?: TQuery,
      body?: TBody,
      unReturnPayload?: (keyof TQuery | keyof TBody)[]
    },
    moduleInfo: {
      systemCode: string,
      moduleCode: string,
      moduleName: string
    }
  ) {
    const unReturnPayload = [...(req.unReturnPayload ?? []), ...configInstance.appConfig.unReturnPayload]
    const span = tracer.startSpan('Operator')

    try {
      span.addEvent('verify logic start')
      const verifyArgs = await this.verify({ query: req.query, body: req.body })
      span.addEvent('verify logic end')

      // 如果只是單純檢查參數，直接回傳即可
      if (this.getDefaultQuery(req.query).examine) {
        return this.responseFormat({
          query: _.omit(req.query, unReturnPayload) as TQuery,
          body: _.omit(req.body, unReturnPayload) as TBody
        }, moduleInfo)
      }

      // 執行 operator(API的主要邏輯)
      span.addEvent('operator logic start')
      const responseData = await this.operator(verifyArgs as Awaited<ReturnType<this['verify']>>)
      span.addEvent('operator logic end')

      const response = this.responseFormat({
        query: _.omit(req.query, unReturnPayload) as TQuery,
        body: _.omit(req.body, unReturnPayload) as TBody,
        data: responseData
      }, moduleInfo)

      return response
    } catch (error) {
      const query = _.omit(req.query, unReturnPayload) as TQuery
      const body = _.omit(req.body, unReturnPayload) as TBody

      // 設定錯誤的Span
      handleOperatorErrorSpan(span, error, 'Operator 發生未知錯誤')

      // 額外處理自定義例外，重新拋出
      this.handleCustomException(error)

      // 如果是自定義的錯誤，直接回傳，否則拋出 UnknownError
      throw new ServerException(this.responseFormat({
        query,
        body,
        errors: isErrorObjectArray(error) ? error : isErrorObject(error) ? [error] : [Category.InternalServerError.UnknownError(error.toString())]
      }, moduleInfo))
    } finally {
      span.end()
    }
  }

  /**
   * 將回應的物件格式化為 ServiceResponse 物件
   *
   * @param res.query - 進入請求的 query 物件 (optional)
   * @param res.body - 進入請求的 body 物件 (optional)
   * @param res.data - 要回傳的資料 (optional)
   * @param res.errors - 要回傳的錯誤 (optional)
   * @param moduleInfo - Operator 的模組資訊
   * @returns ServiceResponse 物件
   */
  private responseFormat(
    res: {
      query?: TQuery,
      body?: TBody,
      data?: TReturn | null,
      errors?: ErrorObject<BaseErrorType>[]
    },
    moduleInfo: {
      systemCode: string,
      moduleCode: string,
      moduleName: string
    }
  ) {
    const baseResponse = this.getDefaultQuery(res.query)
    const serverResponse: ServiceResponse<TReturn> = new ServiceResponse()

    if (baseResponse.attributes.includes('module')) { serverResponse.setModule({ code: `${moduleInfo.systemCode}.${moduleInfo.moduleCode}.${this.code}`, name: `${moduleInfo.moduleName}.${this.name}` }) }
    if (baseResponse.attributes.includes('payload')) serverResponse.setPayload({ ...res.query, ...res.body })
    if (baseResponse.attributes.includes('errors')) serverResponse.addError(res.errors ?? [])
    if (baseResponse.attributes.includes('data')) serverResponse.setData(res.data)

    return serverResponse
  }

  /**
   * 回傳與提供的 query 物件合併的 default query 物件
   *
   * @param query - 要合併的 query 物件 (optional)
   * @returns 合併後的 query 物件
   */
  private getDefaultQuery(query?: TQuery) {
    const examine = query?.examine === 'true'
    const debug = query?.debug === 'true'

    let attributes = this.defaultQuery.attributes
    if (TypeCheck.isNotEmpty(query) && TypeCheck.isNotEmpty(query?.attributes)) attributes = query.attributes

    return {
      ...this.defaultQuery,
      ...query,
      attributes,
      examine,
      debug
    }
  }

  /**
   * 驗證給定的資料是否符合指定的 DTO 類別 (套件使用class-validator)
   *
   * @param dto - 要驗證的 DTO 類別
   * @param data - 要驗證的資料
   * @param validatorOptions - 驗證選項 (optional)
   * @returns 驗證通過的 DTO 類別實例
   * @throws 驗證失敗時拋出錯誤
   */
  protected async validateDto<T extends object>(
    dto: new () => T,
    data: unknown,
    validatorOptions?: ValidatorOptions
  ) {
    const dtoInstance = plainToClass(dto, data ?? {})
    const errors = await validate(dtoInstance, { stopAtFirstError: true, ...validatorOptions })
    const errorObjects = this.generateDtoErrorObjects(errors)

    if (errorObjects.length > 0) throw errorObjects

    return dtoInstance
  }

  /**
   * 將傳入的 class-validator 驗證錯誤陣列轉換為"自定義錯誤物件"陣列
   *
   * @param errors - class-validator 驗證錯誤陣列
   * @returns "自定義錯誤物件"陣列
   */
  private generateDtoErrorObjects(errors: ValidationError[]) {
    const errorObjects: ErrorObject<BaseErrorType>[] = []

    for (const error of errors) {
      // constrainKey is the name of the validation constraint that failed.
      for (const constrainKey in error.constraints) {
        if (constrainKey === 'isNotEmpty') {
          const inputEmpty = Category.InputEmpty[error.property as keyof typeof Category.InputEmpty]

          errorObjects.push(inputEmpty ?? Category.InputEmpty.UnknownError)
        } else {
          const inputInValidType = Category.InputInvalid[constrainKey as keyof typeof Category.InputInvalid]
          const inputInvalid = inputInValidType[error.property as keyof typeof inputInValidType]

          errorObjects.push(inputInvalid ?? inputInValidType.UnknownError)
        }
      }

      // Recursively generate error object for child errors.
      if (error.children && error.children.length > 0) errorObjects.push(...this.generateDtoErrorObjects(error.children))
    }

    return errorObjects
  }

  /**
   * 額外處理自定義例外，重新拋出
   * @param error - 錯誤物件
   * @throws 如果錯誤物件是 ForbiddenException 或 UnauthorizedException，則重新拋出
   * @description
   * 因為 ForbiddenException 和 UnauthorizedException 是需要在其他地方進行處理的例外，所以這裡重新拋出。
   */
  private handleCustomException(error: unknown) {
    if (error instanceof ForbiddenException) throw error
    if (error instanceof UnauthorizedException) throw error
  }
}
