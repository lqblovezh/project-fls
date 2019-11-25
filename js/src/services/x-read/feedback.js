import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let id = pathToRegexp.compile('/api/user/feedback/:id')
/**
 * 反馈 列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/user/feedback',data)
}

/**
 * 会员反馈
 * @param {Object} data
 * @param {String} data.content - 必有字段 文字
 */
export function save(data = {}){
  return request_post('/api/user/feedback',data)
}

/**
 * 删除反馈
 * @param {Object} data
 * @param {String} data.content - 必有字段 文字
 */

 export function del(data={}){
let columns = pathToRegexp.compile('/api/home/columns/:id')
    return request_delete(id(data),data)
 }