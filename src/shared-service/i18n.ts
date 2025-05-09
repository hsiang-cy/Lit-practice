/*
 * @Author:Kerwin
 * @Date:2024-07-25 16:30:52
 * @LastEditors:Kerwin
 * @LastEditTime:2024-07-29 14:31:51
 * @Description:
 */

import 'dotenv/config'

import * as path from 'path'
import i18n from 'i18next'
import Backend from 'i18next-fs-backend'

import { logger } from './pino-logger'

type TranslationResources = {
  translation: object,
  decorator: typeof import('$i18n/zh-TW/decorator.json'),
  errors: typeof import('$i18n/zh-TW/errors.json'),
  entity: typeof import('$i18n/zh-TW/entity.json'),
  modules: typeof import('$i18n/zh-TW/modules.json'),
  types: typeof import('$i18n/zh-TW/types.json'),
  utility: typeof import('$i18n/zh-TW/utility.json'),
  others: typeof import('$i18n/zh-TW/others.json')
}

// 讓使用i18n.t()時能夠有型別提示
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: TranslationResources,
    defaultNs: 'translation'
  }
}

i18n
  .use(Backend)
  .init({
    lng: process.env.I18N_LANG || 'zh-TW',
    fallbackLng: 'zh-TW',
    load: 'currentOnly', // 只載入當前語言檔案
    initImmediate: false,
    backend: {
      loadPath: path.join(__dirname, '../i18n/{{lng}}/{{ns}}.json')
    },
    ns: ['translation', 'decorator', 'errors', 'entity', 'modules', 'types', 'utility', 'others']
  })
  .then(() => {
    logger.debug('i18n initialized')
  })
  .catch((err) => {
    logger.error(err)
  })

export {
  i18n
}
