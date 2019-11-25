import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let messageUrl = pathToRegexp.compile('/api/messages/:id')
let userLock = pathToRegexp.compile('/api/user/lock/:id')

/**
 * 消息列表
 * @param {Object} data
 * @param {String} data.title - 选填 用户名
 * @param {String} data.contents - 选填 内容
 * @param {String} data.type - 选填 消息类型
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
    return request_get('/api/messages',data)
}

/**
 * 消息或新增修改
 * @param {Object} data
 * @param {String} data.contents - 必有字段 昵称
 * @param {String} data.title - 必有字段 手机号
 * @param {String} data.type - 必有字段 邮箱
 * @param {String} data.id - 消息id 有表示修改,没有表示新增
 */
export function save({id,...data} = {}){
  if(id){
    return request_put(messageUrl({id}),data)
  }
  return request_post('/api/messages',data)
}

/**
 * 消息详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 消息id
 */
export function detail(data = {}){
  return request_get(messageUrl(data),data)
}

/**
 * 消息删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 消息id
 */
export function del(data = {}){
  return request_post('/api/messages/delete',data)
}

/**
 * 消息推送
 * @param {Object} data
 * @param {Array} data.id - 必有字段 消息id
 */
export function push(data = {}){
  return request_put('/api/messages/push',data)
}

/**
 * 取消消息推送
 * @param {Object} data
 * @param {String} data.id - 必有字段 消息id
 */
export function pull(data={}){
  return request_delete('/api/messages/pull',data)
}

/**
 * 获取类型
 * @param {Object} data
 */
export function getType(data={}){
  return request_get('/api/messages/get_type')
}