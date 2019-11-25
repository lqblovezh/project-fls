import {
  request_post,
  request_get,
  request_put,
  request_delete,
  request_file,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile('/system/api/works/:id')

/**
 * 作品类型
 */
export function getType(data) {
  return request_get('/system/api/works_type', data)
}

/**
 * 作品列表
 * @param {Object} data
 * @param {String} data.type  修改数据的ID
 */
export function getList(data) {
  return request_get('/system/api/works', data)
}

/**
 * 修改 or 添加
 * @param {Object} data
 * @param {String} data.id  修改数据的ID
 * @param {String} data.name
 * @param {String} data.img 图片path
 * @param {String} data.img_code 二维码Path
 * @param {String} data.text 介绍内容
 */

export function shelf(data) {
  return request_put(toPath(data), data)
}

/**
 * 删除
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data) {
  return request_post('/system/api/works/delete', data)
}

/**
 * sort
 * @param {Object} data
 * @param {Array} data.id
 */
export function sort(data) {
  return request_put(`/system/api/works/sort/${data.id}`, data)
}
