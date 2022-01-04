/*
 * @Descripttion: 常用校验方法
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-12-30 13:36:59
 * @LastEditors: Ada
 * @LastEditTime: 2021-12-30 13:37:00
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) { return true }
    return false
  }
  return false
}