import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let circleUrl = pathToRegexp.compile('/api/book_circles_comments_info/:id')

/**
 * 主题下评论
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.id - 必有 主题id
 * @param {String} data.start_time - 开始时间 选填
 * @param {String} data.end_time - 结束时间 选填
 * @param {String} data.status - 状态（1未开启 2开启 3锁定）选填
 * @param {String} data.user_name - 用户名 选填
 * @param {String} data.value - 关键字 选填
 * @param {String} data.author - 作者 选填
 */
export function getList(data={}){
  return request_get(circleUrl(data),data)
}

/**
 * 书圈中主题下评论删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 评论id
 */
export function del(data = {}){
  return request_post('/api/book_circles_comments/delete',data)
}

/**
 * 书圈中主题下评论修改
 * @param {Object} data
 * @param {Array} data.id - 必有字段 评论id
 * @param {String} data.status - 必有字段 (1关闭 2开启 3锁定)
 */
export function modify(data = {}){
  return request_put('/api/book_circles_comments_info',data)
}

