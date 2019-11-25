import {request_post,request_get,request_put,request_delete,getFullPath} from 'services/common/request';
import qs from 'qs'
import pathToRegexp from 'path-to-regexp'
import { 
  addResListener,
  educeResListener 
  }from '../dbi'

/**
 * 文章添加
 * @return {Promise}
 * @param {Object} data
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
export function addArticle(data = {}) {
  return request_post(restUrl_publish+'/api/articles', data).then(result => {
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
  })
}

/**
 * 文章修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.preview // 文章内容
 * @param {String} data.tag
 * @param {String} data.img
 * @param {String} data.abs
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function modifyArticle({ id, ...data } = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/articles/:id')
  return request_put(toPath({ id }), data)
}

/**
 * 文章列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.state
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
export function listArticle(data = {}) {
  return request_get(restUrl_publish+'/api/articles', data)
}

/**
 * 文章导出
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.state
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
    res_url:getFullPath(restUrl_publish+'/api/articles/export' + qs.stringify(data, {addQueryPrefix: true}))
  })
  return request_get(restUrl_publish+'/api/articles/export', data)
}

/**
 * 文章导入
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.temp
 */
export function putin(data = {}) {
  return request_post(restUrl_publish+'/api/articles/import', data)
}

/**
 * 文章删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 * @param {String} data.state
 */
export function deleteArticle(data = {}) {
  return request_post(restUrl_publish+'/api/articles/delete', data)
}

/**
 * 文章详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.state
 */
export function detailArticle({ id, ...data } = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/articles/:id')
  return request_get(toPath({ id }), data)
}

/**
 * 文章发布
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - ID
 */
export function pushArticle(data = {}) {
  return request_post(restUrl_publish+'/api/articles/push', data)
}

/**
 * 文章分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({ id, ...data } = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/articles/groups/:id')
  return request_put(toPathGroup({ id }), data)
}

/**
 * 文章分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup(data = {}) {
  return request_post(restUrl_publish+'/api/articles/groups/delete', data)
}

/**
 * 文章分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup(data = {}) {
  return request_post(restUrl_publish+'/api/articles/groups', data)
}

/**
 * 文章分组列表
 * @return {Promise}
 */
export function listGroup() {
  return request_get(restUrl_publish+'/api/articles/groups')
}

/**
 * 文章分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.new_group_id - 要移动到的分组ID
 * @param {String} data.old_group_id - 当前的所属分组ID
 * @param {Array} data.id - 书籍ID
 */
export function moveGroup(data = {}) {
  return request_put(restUrl_publish+'/api/articles/groups', data)
}
