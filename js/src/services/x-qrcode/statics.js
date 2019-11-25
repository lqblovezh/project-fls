import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPathModify = pathToRegexp.compile('/api/statistics/product_list/:id')
let detail = pathToRegexp.compile('/api/statistics/product_list/:id')

/**
 * 获取产品统计列表
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
  return request_get('/api/statistics/product_list', data)
}

/**
 * 获取书籍统计列表
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
export function getBookList(data = {}) {
  return request_get('/api/statistics/book_list', data)
}

/**
 * 删除产品统计
 * @param {Object} data
 * @param {Array} data.id - 必有字段 产品统计id
 */
export function del(data = {}) {
  return request_post('/api/statistics/product_list', data)
}

/**
 * 产品统计详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function detail({ id, ...data }) {
  return request_get(detail({ id }), data)
}

/**
 * 扫码记录列表
 * @return {promise}
 * @param {Object} data
 * @param {String} data.book_id - 字段 书籍id
 * @param {String} data.user_id - 字段 用户id
 * @param {String} data.product_id - 字段 产品id
 **/
export function scanList(data = {}) {
  if (data.type == '/wms/proStatics') {
    data.product_id = data.id
  } else if (data.type == '/wms/bookStatics') {
    data.book_id = data.id
  } else {
  }
  return request_get('/api/statistics/scan_record_list', data)
}

/**
 * 用户列表
 * @return {promise}
 * @param {Object} data
 * @param {String} data.book_id - 字段 书籍id
 * @param {String} data.user_id - 字段 用户id
 * @param {String} data.product_id - 字段 产品id
 **/
export function userList(data = {}) {
  if (data.type == '/wms/proStatics') {
    data.product_id = data.id
  } else if (data.type == '/wms/bookStatics') {
    data.book_id = data.id
  } else {
  }
  return request_get('/api/statistics/user_list', data)
}

/**
 * 扫码记录列表导出
 * @return {promise}
 * @param {Object} data
 * @param {String} data.book_id - 字段 书籍id
 * @param {String} data.user_id - 字段 用户id
 * @param {String} data.product_id - 字段 产品id
 **/
export function scanExport(data = {}) {
  if (data.type == '/wms/proStatics') {
    data.product_id = data.ids
  } else if (data.type == '/wms/bookStatics') {
    data.book_id = data.ids
  }
  return request_get('/api/statistics/scan_record_list_export', data)
}

/**
 * 扫码记录列表导出
 * @return {promise}
 * @param {Object} data
 * @param {String} data.book_id - 字段 书籍id
 * @param {String} data.user_id - 字段 用户id
 * @param {String} data.product_id - 字段 产品id
 **/
export function userExport(data = {}) {
  // console.log(data)
  if (data.type == '/wms/proStatics') {
    data.product_ids = data.ids
    data.product_id = data.id
  } else if (data.type == '/wms/bookStatics') {
    data.book_ids = data.ids
    data.book_id = data.id
  }
  return request_get('/api/statistics/user_list_export', data)
}

/**
 * 扫码记录列表导出
 * @return {promise}
 * @param {Object} data
 * @param {String} data.book_id - 字段 书籍id
 * @param {String} data.user_id - 字段 用户id
 * @param {String} data.product_id - 字段 产品id
 **/
export async function userStatics(data = {}) {
  return request_get('/api/statistics/user', data)
}

/**
 * 数据分析
 * @return {promise}
 * @param {Object} data
 * @param {String} data.book_id - 字段 书籍id
 * @param {String} data.product_id - 字段 产品id
 **/
export async function analysisData(data = {}) {
  if (data.type == '/wms/proStatics') {
    data.product_id = data.id
  } else if (data.type == '/wms/bookStatics') {
    data.book_id = data.id
  }
  return request_get('/api/statistics/data_analysis', data)
}

/**
 * 数据分析
 * @return {promise}
 * @param {Object} data
 **/
export async function analysAll(data = {}) {
  return request_get('/api/statistics/all', data)
}
