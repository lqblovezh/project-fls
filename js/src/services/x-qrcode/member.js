import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import { getList as orderList } from './order'
import { scanList } from './statics'
let toPathModify = pathToRegexp.compile('/api/user/:id')
let detail = pathToRegexp.compile('/api/user/:id')

//二维码库
/**
 * 获取二维码库列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.abs - 选填 简介
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.product_status - 选填 上架状态(true已使用,false未使用)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
  return request_get('/api/user/list', data)
}

/**
 * 删除二维码库
 * @param {Object} data
 * @param {Array} data.id - 必有字段 二维码id
 */
export function del(data = {}) {
  return request_post('/api/user/delete', data)
}

/**
 * 二维码详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export async function detail({ id, ...info }) {
  let data = {
    ...info,
  }
  data.orderList = await orderList({ user_id: id }).then(res => {
    return res.data
  })
  // data.scanList = await scanList({ user_id: id }).then(res => {
  //   return res.data
  // })
  data.sourceList = await resourceList({ user_id: id }).then(res => {
    return res.data
	})
  return data
}

export function resourceList(data = {}) {
  	return request_get('/api/resource/list', data)
}

/**
 * 创建/修改二维码
 * @param {Object} data
 * @param {String} data.id - 必有字段 二维码id
 */
export function save({ id, ...data }) {
  if (id) {
    return request_put(toPathModify({ id }), data)
  }
  return request_post('/api/user', data)
}

/**
 * 获取印码位置
 * @param {Object} data
 * @param {String} data.id - 必有字段 二维码id
 */
export function codePosition() {
  return request_get('/api/user/position')
}
