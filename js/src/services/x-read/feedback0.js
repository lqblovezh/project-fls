import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let feedUrl = pathToRegexp.compile('/api/user/feedback/:id')
let userLock = pathToRegexp.compile('/api/user/lock/:id')

/**
 * 反馈 列表
 * @param {Object} data
 * @param {String} data.status - 选填 状态 空为全部 ,replied（已回复），‘noreplied‘（未回复）
 * @param {String} data.user_name - 选填 用户名
 * @param {String} data.user_phone - 选填 手机
 * @param {String} data.time_start - 选填 开始时间
 * @param {String} data.time_end - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/user/feedback',data)
}

/**
 * 会员反馈 回复
 * @param {Object} data
 * @param {String} data.content - 必有字段 文字
 * @param {String} data.feedback_id - 反馈id 
 */
export function save(data = {}){
  return request_post('/api/user/feedback/reply',data)
}

/**
 * 反馈 详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 反馈id
 */
export function detail(data = {}){
  return request_get(feedUrl(data),data)
}

/**
 * 反馈 删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 反馈id
 */
export function del(data = {}){
  return request_post('/api/user/feedback/delete',data)
}