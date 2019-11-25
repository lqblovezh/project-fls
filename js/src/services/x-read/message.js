import {request_post,request_get,request_put,request_delete} from 'services/common/request'

/**
 * 消息列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/messages/home_list',data)
}

/**
 * 消息删除 
 * @param {Object} data
 * @param {Array} data.id - 必有字段 消息id
 */
export function del(data = {}){
  return request_post('/api/messages/home_delete',data)
}

/**
 * 消息删除 
 * @param {Object} data
 * @param {String} data.id - 必有字段 消息id
 */
export function read(data = {}){
  return request_put('/api/messages/read',data)
}


