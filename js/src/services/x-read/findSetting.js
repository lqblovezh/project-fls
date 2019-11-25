import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

const findUrl = pathToRegexp.compile('/api/discover/:id')

/**
 * 发现列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/discover/list',data)
}

/**
 * 发现删除
 * @param {Object} data
 * @param {String} data.id - 必有字段 发现id
 */
export function del({id}){
  return request_delete(findUrl({id:id[0]}))
}

/**
 * 发现添加
 * @param {Object} data
 * @param {Array} data.id - 必有字段 发现id
 * @param {String} data.status - 必有字段 (1未开启 2开启 3锁定)
 */
export function save(data = {}){
  return request_post('/api/discover/add',data)
}
