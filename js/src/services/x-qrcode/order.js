import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPathModify = pathToRegexp.compile('/api/order/:id')
let detail = pathToRegexp.compile('/api/order/info/:id')

//订单
/**
 * 获取订单列表
 * @param {Object} data
 * @param {String} data.order - 选填 订单编号
 * @param {String} data.user_name - 选填 用户名
 * @param {String} data.phone - 选填 电话
 * @param {String} data.pay_status - 选填 'already_paid','not_pay'
 * @param {String} data.user_id - 选填 用户id
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
  return request_get('/api/order/list', data)
}

/**
 * 删除订单
 * @param {Object} data
 * @param {Array} data.id - 必有字段 订单id
 */
export function del(data = {}) {
  return request_post('/api/order/delete', data)
}

/**
 * 订单详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function detail({ id, ...data }) {
  return request_get(detail({ id }), data)
}

/**
 * 创建/修改订单
 * @param {Object} data
 * @param {String} data.type - 字段 'today', 'yesterday', 'seven_day', 'thirty_day', 'ninety_day'
 */
export function statics(data = {}) {
  return request_get('/api/order/statistics', data)
}
