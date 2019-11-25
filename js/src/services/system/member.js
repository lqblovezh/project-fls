import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let userDetail = pathToRegexp.compile('/api/user/users/detail/:id');
let userLock = pathToRegexp.compile('/common/api/user/users/lock/:id');
let detail = pathToRegexp.compile('/common/api/user/users/detail/:id');
/**
 * 会员列表
 * @param {Object} data
 * @param {String} data.name - 选填 用户名
 * @param {String} data.nick_name - 选填 昵称
 * @param {String} data.phone - 选填 手机号
 * @param {String} data.email - 选填 邮箱
 * @param {String} data.role - 添加时传 角色
 * @param {String} data.lock_status - 选填 空为所有 normal 正常,locked 锁定
 * @param {String} data.time_start - 选填 开始时间
 * @param {String} data.time_end - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/user/users/user',data)
}

/**
 * 会员详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 会员id
 */
export function detail(data = {}){
  return request_get(userDetail(data),data)
}

/**
 * 会员锁定
 * @param {Object} data
 * @param {Array} data.id - 必有字段 会员id
 * @param {String} data.lock_time - 选填 锁定到期时间 如 2018-06-06 12:11:12 ，如果不传则锁定到 9999-12-31 23:59:59
 */
export function lock(data = {}){
  return request_post(userLock(data),data)
}

/**
 * 会员解锁
 * @param {Object} data
 * @param {String} data.id - 必有字段 会员id
 */
export function unlock(data={}){
  return request_delete(userLock(data),data)
}

/**
 * 会员列表导出
 * @param {Object} data
 * @param {String} data.id - 必有字段 会员id
 */
export function educe(data = {}) {
  return request_get('/api/user/users/export/user',data)
}


/**
 * 角色权限
 */
 export function auth(){
   return request_get('/api/user/positions')
 }

/**
 * 角色详情修改
 */

export function save(data){
  return request_put(detail({id:data.id}),data)
}

