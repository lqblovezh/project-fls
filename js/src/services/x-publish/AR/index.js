import {
  request_post,
  request_get,
  request_put,
  request_delete,
  getFullPath,
} from 'services/common/request'
import qs from 'qs'
import pathToRegexp from 'path-to-regexp'
import { addResListener, educeResListener } from '../dbi'

/**
 * AR和VR内容库添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.preview
 * @param {String} data.tag
 * @param {String} data.img
 * @param {String} data.abs
 * @param {String} data.length
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function add(data = {}) {
  return request_post(restUrl_publish + '/api/librariess_ar', data).then(
    result => {
      const { _id, name, abs, author, tag, type_name } = result.data
      addResListener({
        res_id: _id,
        res_type: type_name,
        res_name: name,
        res_exp: abs,
        res_author: author,
        res_lables: [tag],
      })
      return result
    }
  )
}

/**
 * AR和VR内容库修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.preview
 * @param {String} data.tag
 * @param {String} data.img
 * @param {String} data.abs
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function modify({ id, ...data } = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish + '/api/librariess_ar/:id')
  return request_put(toPath({ id }), data)
}

/**
 * AR和VR内容库列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id - 未分组 ： non
 */
export function listLibraries(data = {}) {
  return request_get(restUrl_publish + '/api/librariess_ar', data)
}

/**
 * AR和VR内容库导出
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id - 未分组 ： non
 * @param {Array} data.id
 */
export function educe(data = {}) {
  educeResListener({
    res_url: getFullPath(
      restUrl_publish +
        '/api/librariess_ar/export' +
        qs.stringify(data, { addQueryPrefix: true })
    ),
  })
  return request_get(restUrl_publish + '/api/librariess_ar/export', data)
}

/**
 * AR和VR内容库导入
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.temp
 */
export function putin(data = {}) {
  return request_post(restUrl_publish + '/api/librariess_ar/import', data)
}

/**
 * AR和VR内容库删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteLibraries(data = {}) {
  return request_post(restUrl_publish + '/api/librariess_ar/delete', data)
}

/**
 * AR和VR内容库详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function detailLibraries(data = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish + '/api/librariess_ar/:id')
  return request_get(toPath(data))
}

/**
 * AR和VR分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({ id, ...data } = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish + '/api/librariess_ar/groups/:id')
  return request_put(toPathGroup({ id }), data)
}

/**
 * AR和VR分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup(data = {}) {
  return request_post(
    restUrl_publish + '/api/librariess_ar/groups/delete',
    data
  )
}

/**
 * AR和VR分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup(data = {}) {
  return request_post(restUrl_publish + '/api/librariess_ar/groups', data)
}

/**
 * AR和VR分组列表
 * @return {Promise}
 */
export function listGroup() {
  return request_get(restUrl_publish + '/api/librariess_ar/groups')
}

/**
 * AR和VR分组移动修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.new_group_id - 要移动到的分组ID
 * @param {String} data.old_group_id - 当前的所属分组ID
 * @param {Array} data.id - 书籍ID
 */
export function moveGroup(data = {}) {
  return request_put(restUrl_publish + '/api/librariess_ar/groups', data)
}
