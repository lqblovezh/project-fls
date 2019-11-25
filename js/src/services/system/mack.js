import {
  request_post,
  request_get,
  request_put,
  request_delete,
  request_file,
  request_progress,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile('/system/api/demo_demo/:id')

/**
 * 快速（电子书，课程，数据库）任务级开馆
 * @param {Object} data
 * @param {String} data.type  - 必填 类型（read,teach,library）
 * @param {String} data.task_id -选填 任务id
 */
export function fast_task(data = {}) {
  return request_post('/system/api/fast_type_task', data)
}

/**
 * 快捷任务进度获取
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - task_id
 */
let toPathMount = pathToRegexp.compile('/system/api/fast_task_info/:id')
export function mountSchedule({ id, ...data } = {}, callback = () => {}) {
  return request_get(toPathMount({ id }))
}

/**
 * 个人作品
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - task_id
 */
export function personal(data = {}) {
  return request_get('/system/api/personal_works', data)
}

/**
 * 个人作品删除
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - task_id
 */
export function del(data = {}) {
  return request_post('/system/api/personal_works/delete', data)
}
