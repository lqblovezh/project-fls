import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let circleUrl = pathToRegexp.compile('/api/home/book_circles_comments/:id')

/**
 * 用户中心书圈列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function circle(data={}){
  return request_get('/api/home/book_circles_user',data)
}

/**
 * 用户中心我的回复
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function reply(data = {}){
  return request_get('/api/home/book_circles_user_reply',data)
}

/**
 * 用户中心账号安全
 * @param {Object} data
 * @param {String} data.old_pass 必有字段
 * @param {String} data.new_passs 必有字段
 * @param {String} data.new_pass_confirm 必有字段
 */

 export function resetPwd(data={}){
    return request_post("/common/api/auth/pass",data);
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
