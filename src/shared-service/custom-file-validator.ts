/*
 * @Author:Kerwin
 * @Date:2024-04-21 17:01:52
 * @LastEditors:Kerwin
 * @LastEditTime:2025-01-14 13:51:31
 * @Description:
 */

import {
  Injectable,
  PayloadTooLargeException,
  UnsupportedMediaTypeException
} from '@nestjs/common'

import TypeCheck from '@saico/type-check-js'

import {
  FileEmptyException
} from '$exception'

import {
  File
} from '$types'

@Injectable()
export class CustomFileValidator {
  /**
   * 驗證檔案相關資訊
   * @param fileName 檔案名稱
   * @param options.file 檔案
   * @param options.fileRequired 是否必傳檔案 (預設為true)
   * @param options.maxFileSize 檔案大小限制
   * @param options.fileType 檔案類型
   * @description
   * 1. 若fileRequired為true且file為空，則拋出FileEmptyException
   * 2. 若maxFileSize有值，則檢查file大小是否超過maxFileSize，若超過則拋出PayloadTooLargeException
   * 3. 若fileType有值，則檢查file類型是否符合fileType，若不符合則拋出UnsupportedMediaTypeException
   */
  validateFile (
    fileName: string,
    options?: {
      file?: File | File[],
      fileRequired?: boolean,
      maxFileSize?: number,
      fileType?: string | RegExp
    }
  ) {
    const file = options?.file
    const fileRequired = options?.fileRequired ?? true
    const maxFileSize = options?.maxFileSize
    const fileType = options?.fileType

    if (TypeCheck.isEmpty(file) && fileRequired) {
      throw new FileEmptyException(fileName)
    }

    if (TypeCheck.isEmpty(file)) return

    if (TypeCheck.isNotUndefined(maxFileSize)) {
      if (TypeCheck.isArray(file)) {
        if (file.some(f => f.size > maxFileSize)) throw new PayloadTooLargeException(fileName)
      } else if (file.size > maxFileSize) {
        throw new PayloadTooLargeException(fileName)
      }
    }

    if (TypeCheck.isNotUndefined(fileType)) {
      if (TypeCheck.isArray(file)) {
        for (const f of file) {
          if (!this.validateFileType(f, fileType)) throw new UnsupportedMediaTypeException(fileName)
        }
      } else if (!this.validateFileType(file, fileType)) {
        throw new UnsupportedMediaTypeException(fileName)
      }
    }
  }

  /**
   * 驗證檔案類型
   * @param file 檔案
   * @param fileType 檔案類型
   * @returns 是否符合檔案類型
   * @description
   * 1. 若fileType為字串，則檢查file的mimetype是否等於fileType
   * 2. 若fileType為正規表示式，則檢查file的mimetype是否符合fileType
   */
  private validateFileType (file: File, fileType: string | RegExp) {
    if (TypeCheck.isString(fileType)) {
      return file.mimetype === fileType
    }

    return fileType.test(file.mimetype)
  }
}
