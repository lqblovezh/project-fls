import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取导入导出列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.state
 * @param {String} data.name
 * @param {String} data.color
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 */
export function getList(data = {}) {
  return request_get(restUrl_publish+'/api/content/export/list',data)
}

/**
 * 删除某个任务
 * @return {Promise}
 * @parma {Object} data
 * @param {String} data.id
 */
export function delTask(data = {}) {
  let delPath = pathToRegexp.compile(restUrl_publish+'/api/tasks/:id')
  return request_get(delPath(data), data)
}
