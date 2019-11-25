// 点赞，评分
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let path = pathToRegexp.compile('/api/home/book_city/:id')
/**
 * 添加评分
 * @param {Object} data 数据对象
 * @param {String} data.book_id 书籍id
 * @param {String} data.score 分数为0-10的整数 
 */

export function add(data){
   return request_post('/api/score',data)
}

/**
 * 获取评分
 * @param {Object} data 数据对象
 * @param {String} data.book_id 产品ID
 */

export function getStar(data){
  return request_get('/api/score',data)
}

/**
 * 获取刚开始点赞状态
 * @param {Object} data 数据对象
 * @param {String} data.book_id 书ID
 * @param {String} data.type 类型
 */

export function getPraise(data){
  return request_get('/api/praise',data)
}

/**
 * 点赞
 * @param {Object} data 数据对象
 * @param {String} data.book_id 书id
 * @param {String} data.type 类型
 */
export function praise(data){
  return request_post('/api/praise',data)
}