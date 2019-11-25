import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let circleUrl = pathToRegexp.compile('/api/book_circles_comments/:id')
let circleUser = pathToRegexp.compile('/api/book_circles_comments_user/:id')
let themeInfo = pathToRegexp.compile('/api/book_circles/:id')


/**
 * 书圈主题列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.id - 书圈id
 */
export function getList(data={}){
  return request_get(circleUrl(data),data)
}

/**
 * 书圈中主题删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 主题id
 */
export function del(data = {}){
  return request_post('/api/book_circles_comments/delete',data)
}

/**
 * 书圈中主题修改
 * @param {Object} data
 * @param {Array} data.id - 必有字段 主题id
 * @param {String} data.status - 必有字段 (1屏蔽 2开启 3结束)
 */
export function modify(data = {}){
  return request_put('/api/book_circles_comments',data)
}

/**
 * 主题中用户修改状态  禁言
 * @param {Object} data
 * @param {String} data.id - 必有字段 主题id
 * @param {String} data.status - 必有字段 1 恢复。。。2  禁言。。。 3屏蔽
 */
export function userModify(data = {}){
  return request_put(circleUser(data),data)
}

/**
 * 书圈中主题下所有用户列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.id - 书圈id
 */
export function userList(data={}){
  return request_get(circleUser(data),data)
}

/**
 * 书圈中主题用户删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 用户id
 */
export function userDel(data = {}){
  return request_post('/api/book_circles_comments_user/delete',data)
}

/**
 * 书圈中主题用户添加
 * @param {Object} data
 * @param {String} data.book_circle_id - 必有字段 书圈id
 * @param {String} data.user_id - 必有字段 用户id
 */
export function userAdd(data = {}){
  return request_post('/api/book_circles_comments_user',data)
}

/**
 * 书圈单条信息
 * @param {Object} data
 * @param {String} data.id - 必有字段 主题id
 */
export function info(data = {}){
  return request_get(themeInfo(data),data)
}


/**
 * 添加精华和取消精华
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有字段 主题id
 * @param {String} data.essence_type - 必有字段 状态 (true或者false)
 */
export function essence(data = {}) {
  return request_put('/api/book_circles_comments/essence_type',data)
}