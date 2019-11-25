import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let detailUrl = pathToRegexp.compile('/api/comment/:id')

/**
 * 获取评论列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/comment/parent',data)
}

/**
 * 添加评论
 * @param {Object} data
 * @param {String} data.pid
 * @param {String} data.content
 * @param {String} data.course_id
 */
export function add(data={}){
  return request_post('/api/comment',data)
}

/**
 * 添加评论
 * @param {Object} data
 * @param {String} data.pid
 * @param {String} data.content
 * @param {String} data.course_id
 */
export function del(data={}){
  return request_delete(detailUrl(data))
}

/**
 * 评论评论
 * @param {Object} data
 * @param {String} data.comment_id  - 评论的id
 */
export function thumbsUp(data={}){
  return request_post('/api/praise',data)
}