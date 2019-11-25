import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let orderUrl = pathToRegexp.compile('/api/order/orders/:id')

/**
 * 订单列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.start_time - 开始时间 选填
 * @param {String} data.end_time - 结束时间 选填
 * @param {String} data.status - 状态(1未使用 2本周 3往期) 选填
 * @param {String} data.name - 名称
 * @param {String} data.book_name - 书名
 * @param {String} data.author - 作者
 */
export function getList(data={}){
  return request_get('/api/order/orders',data)
}

/**
 * 订单详情
 * @param {Object} data
 * @param {Array} data.id - 必有字段 订单id
 */
export function detail(data = {}){
  return request_get(orderUrl(data),data)
}

