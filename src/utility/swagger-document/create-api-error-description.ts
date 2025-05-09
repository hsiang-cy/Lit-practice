/*
 * @Author:Kerwin
 * @Date:2024-07-25 16:29:24
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 14:40:40
 * @Description:
 */

import {
  ErrorObject
} from '$errors'

import {
  i18n
} from '$shared-service/i18n'

/**
 * 建立 API 錯誤代碼對應的描述html
 * @param errorObjects - 錯誤代碼對應的物件
 * @returns html 字串
 */
export const createApiErrorDescription = (
  errorObjects: ErrorObject[]
) => {
  const sortedErrors = [...errorObjects].sort((pre, next) => pre.code.localeCompare(next.code))

  const tableHeaders = {
    title: i18n.t('utility:swagger-document.create-api-error-description.title'),
    errorCode: i18n.t('utility:swagger-document.create-api-error-description.code'),
    errorType: i18n.t('utility:swagger-document.create-api-error-description.type'),
    errorDescription: i18n.t('utility:swagger-document.create-api-error-description.description')
  }

  // error.type有時會過長，加上style去限制寬度
  const errorRows = sortedErrors.map(error =>
    `<tr>
      <td>${error.code}</td>
      <td style="max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${error.type}">
        ${error.type}
      </td>
      <td>${error.message}</td>
    </tr>`).join('')

  const description = `
    <p>${tableHeaders.title}</p>
    <table>
      <thead>
        <tr>
          <th>${tableHeaders.errorCode}</th>
          <th>${tableHeaders.errorType}</th>
          <th>${tableHeaders.errorDescription}</th>
        </tr>
      </thead>
      <tbody>
        ${errorRows}
      </tbody>
    </table>
  `

  return description.trim()
}
