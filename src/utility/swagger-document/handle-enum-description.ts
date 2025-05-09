/*
 * @Author:Kerwin
 * @Date:2024-08-10 21:55:07
 * @LastEditors:Kerwin
 * @LastEditTime:2024-08-10 21:55:07
 * @Description:
 */

/** 將i18n的文字轉為swagger UI比較好顯示的方式 */
export const handleEnumDescription = (i18nString: string) => {
  // 這邊一定要加上換行符號和"4"個空格，不然swagger UI會顯示不正確
  return `\n    ${i18nString.replace(/\n/g, '\n    ')}`
}
