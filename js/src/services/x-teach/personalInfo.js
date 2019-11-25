import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let userInfo = pathToRegexp.compile('/common/api/user/users/detail/:user_id')
/**
 * 获取用户信息
 * @param {Object} data
 * @param {String} data.id
 */
export function getUserInfo(id){
  return request_get(userInfo({id}))
}


/**
 * 个人资料修改
 * @param {Object} data
 * @param {String} data.nick_name 昵称
 * @param {String} data.sex 性别
 * @param {String} data.date_of_birth 出生年月 eg:2018-08-12
 * @param {String} data.phone 手机号
 * @param {String} data.email 邮箱
 * @param {String} data.picture 头像
 */

export function userInfo(data={}){
	return request_put("/common/api/user/users/detail",data);
}

/**
 * 用户个人资料修改
 * @param {Object} data
 * @param {String} data.nick_name - 必选 昵称
 * @param {String} data.sex - 必选 性别  男|女|保密
 * @param {String} data.date_of_birth - 必选 出生年月 2018-08-12
 * @param {String} data.phone - 必选 手机号
 * @param {String} data.email - 必选 邮箱
 * @param {String} data.picture - 必选 头像（上传返回的path）
 */
export function update(data={}){
  return request_put(userInfo(data),data)
}
