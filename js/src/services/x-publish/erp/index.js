import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let orderUrl = pathToRegexp.compile('/common/api/dragon_infos/:isbn')

/**
 * 获取订单列表
 * @param {Object} data
 * @param {String} data.order - 选填 订单号
 * @param {String} data.status - 选填 状态(1支付完成,0等待支付,其他状态等后台确定)
 * @param {String} data.phone - 选填 手机号
 * @param {String} data.user_name - 选填 用户名
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.start_pay - 选填 支付开始时间
 * @param {String} data.end_pay - 选填 支付结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/common/api/dragon_infos',data)
}

/**
 * 订单详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 消息id
 */
export function detail(data = {}){
  return request_get(orderUrl(data))
}
