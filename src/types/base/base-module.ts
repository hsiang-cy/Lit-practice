/*
 * @Author:Kerwin
 * @Date:2023-09-28 11:57:37
 * @LastEditors:Kerwin
 * @LastEditTime:2023-10-17 15:24:05
 * @Description:
 */

export interface Module {
  code: string
  name: string
}

export abstract class BaseModule implements Module {
  abstract systemCode: string
  abstract code: string
  abstract name: string

  protected getModuleInfo () {
    return {
      systemCode: this.systemCode,
      moduleCode: this.code,
      moduleName: this.name
    }
  }
}

export default BaseModule
