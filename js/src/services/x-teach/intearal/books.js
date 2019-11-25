import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile('/api/p_book/edit_sort/:id')
let dpath = pathToRegexp.compile('/api/p_book/:id')
let spath = pathToRegexp.compile('/api/p_book/online/:id')

/**
 * @description 资源列表
 * @param {Object} data
 * @param {String} data.id 资源名称
 */
export function getList(data) {
  return request_get('/api/p_book', data)
}

/**
 * @description 新增或保存
 * @param {Object} data
 * @param {String} data.pid  父ID 顶级为0
 * @param {String} data.name 分类名称
 */

export function save(data) {
  if (data.id) {
    return request_put(dpath(data), data)
  }
  return request_post('/api/p_book', data)
}

/**
 * 删除
 * @param {Object} data
 * @param {Array} data._ids
 */
export function del(data) {
  return request_post('/api/p_book/delete', data)
}

/**
 * 详情
 * @param {Object} data
 * @param {Array} data._ids
 */
export function detail(data) {
  return request_get(dpath({ id: data.id }), data)
}

/**
 * 上、下架
 */
export function isOnline(data) {
  return request_put(spath({ id: data.id }), data)
}
