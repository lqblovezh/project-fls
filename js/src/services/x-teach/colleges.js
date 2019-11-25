import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile('/api/university/cancel_course/:id')
let dpath = pathToRegexp.compile('/api/university/:id')
let spath = pathToRegexp.compile('/api/university/online/:id')

/**
 * @description 院校列表
 * @param {Object} data
 * @param {String} data.id 院校id
 */
export function getList(data) {
  return request_get('/api/university', data)
}

/**
 * @description 院校课程列表
 * @param {Object} data
 * @param {String} data._id 院校id
 */
export function getInfoList(data) {
  return request_get('/api/university/course_list', data)
}

/**
 * @description 院校课程列表
 * @param {Object} data
 * @param {String} data._id 院校id
 * @param {String} data.course_id 课程id
 */
export function infoAdd(data) {
  return request_post('/api/university/add_course', data)
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
  return request_post('/api/university', data)
}

/**
 * 删除
 * @param {Object} data
 * @param {Array} data._ids
 */
export function del(data) {
  return request_post('/api/university/delete', data)
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
 * 院校课程删除
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 */
export function infoDel(data = {}) {
  return request_post('/api/university/cancel_course', data)
}
