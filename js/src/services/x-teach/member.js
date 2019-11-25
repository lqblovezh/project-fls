import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let dpath = pathToRegexp.compile("/api/user/users/user/:id")
let updatePath = pathToRegexp.compile("/common/api/user/users/detail/:id")
let userLock = pathToRegexp.compile('/common/api/user/users/lock/:id')

export function getList(data){
  return request_get('/api/user/users/user',data)
}

export function detail(data){
	log(data,888)
	return request_get(dpath(data))
}
/**
 * 修改会员数据
 * @param {Object} data 
 * @param {String} data.name - 选填 用户名
 * @param {String} data.nick_name - 选填 昵称
 * @param {String} data.phone - 选填 手机号
 * @param {String} data.email - 选填 邮箱
 * @param {String} data.lock_status - 选填 空为所有 normal 正常,locked 锁定
 */
export function save(data){
  return request_put(updatePath({id:data.id}),data)
}
/**
 * 会员冻结
 * @param {Object} data
 * @param {String} data.id - 必有字段 会员id
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
 * 教师删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 会员id [id1,id2]
 */
export function del(data){
  return request_post('/common/api/user/users/delete',data)
}