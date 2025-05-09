/*
 * @Author:Kerwin
 * @Date:2023-10-27 18:22:25
 * @LastEditors:Kerwin
 * @LastEditTime:2023-10-27 18:22:28
 * @Description:
 */

export function expiredTime (milliseconds: number): Date {
  const now = new Date()
  const expired = new Date(now)
  expired.setTime(now.getTime() + milliseconds)

  return expired
}

export default expiredTime
