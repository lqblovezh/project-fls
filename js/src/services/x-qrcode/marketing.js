import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp';
let detailUrl = pathToRegexp.compile('/api/marketing/:id')
let recordUrl = pathToRegexp.compile('/api/marketing/record/:id')
let useList = pathToRegexp.compile('/api/marketing/used/:special_id')

//营销库
/**
 * 获取营销库列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.abs - 选填 简介
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.type - 选填 retransmission=>转发营销，show_order=>晒单营销
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
  return request_get('/api/marketing', data)
}

/**
 * 删除营销
 * @param {Object} data
 * @param {Array} data.id - 必有字段 营销id
 */
export function del(data = {}) {
  return request_post('/api/marketing/delete', data)
}

/**
 * 营销详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.id-
 **/
export function detail({ id, ...data }) {
  return request_get(detailUrl({ id }), data)
}

/**
 * 新增/修改营销
 * @param {Object} data
 * @param {String} data.qrcode_id - 必有字段 营销id
 * @param {String} data.name - 必有字段 营销名称
 * @param {String} data.abs - 必有字段 营销简介
 * @param {String} data.is_show_order - 必有字段 晒单活动是否勾选（true/false)
 * @param {String} data.show_order_id -  晒单活动id
 * @param {String} data.is_retransmission - 必有字段 转发活动是否勾选（true/false)
 * @param {String} data.retransmission_id -  转发活动id
 */
export function save({ id, ...data }) {
  if (id) {
    return request_put(detailUrl({ id }), data)
  }
  return request_post('/api/marketing', data)
}

/**
 * 使用中产品
 * @param {Object} data
 * @param {String} data.special_id - 必填
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 */
export function getUseList(data = {}) {
  return request_get(useList(data))
}

/**
 * 使用中产品
 * @param {Object} data
 * @param {String} data.id - 必填
 */
export function getRecord(data = {}) {
  return request_get(recordUrl(data))
}

