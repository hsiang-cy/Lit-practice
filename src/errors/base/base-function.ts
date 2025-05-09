/*
 * @Author:Kerwin
 * @Date:2023-09-28 12:01:54
 * @LastEditors:Kerwin
 * @LastEditTime:2024-04-12 19:00:24
 * @Description:
 */

import {
  BaseErrorType,
  ErrorObject
} from './error-type'

/** 用來產生user input error的parse function */
type ErrorParseFunction<TType extends string = BaseErrorType> = (code: number, message: string, field?: any) => ErrorObject<TType>

/**
 * Generates an error object.
 *
 * @param type - The type of error.
 * @param code - The error code.
 * @param name - The error name.
 * @param message - The error message.
 * @param extraInfoValue - The extra info value (can be anything).
 * @returns The error object.
 */
export const GenerateErrorObject = <
  TType extends string = BaseErrorType
> (
  type: TType,
  code: string,
  name: string,
  message: string,
  extraInfoValue?: Record<string, any>
): ErrorObject<TType> => {
  return {
    code,
    type,
    name,
    message,
    extraInfo: extraInfoValue
  }
}

/**
 * Generates an error object with error template.
 *
 * @param errorCodes - The error enum.
 * @param errorParseFunction - The error parse function.
 * @param errorMessagesTemplate - The error messages template.
 * @returns The error object.
 */
export const GenerateErrorObjectWithTemplate = <
  TErrorCodes extends Record<string, any>,
  TType extends string = BaseErrorType
> (
  errorCodes: TErrorCodes,
  errorParseFunction: ErrorParseFunction<TType>,
  errorMessagesTemplate: string
) => {
  const error: Record<string, ErrorObject<TType>> = {}

  Object.keys(errorCodes)
    .filter(key => isNaN(Number(key))) // Filter out numeric string keys
    .forEach((key: string) => {
      const code = errorCodes[key]
      error[key] = errorParseFunction(code, `${key} ${errorMessagesTemplate}`, key)
    })

  return error as Record<keyof TErrorCodes, ErrorObject<TType>>
}
