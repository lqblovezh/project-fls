import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPathDel = pathToRegexp.compile('/api/category/:id')
let detail = pathToRegexp.compile('/api/special/:id')
let contentList = pathToRegexp.compile('/api/content/:special_id')
let adList = pathToRegexp.compile('/api/ad/:special_id')
let cateList = pathToRegexp.compile('/api/category/:special_id')
let delContent = pathToRegexp.compile('/api/content/:id')
let delAd = pathToRegexp.compile('/api/ad/:id')
let useList = pathToRegexp.compile('/api/use/:special_id')

//专题库

/**
 * 专题列表
 * @param {Object} data
 * @param {String} data.id - 必填
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 * @param {String} data.status - 必填 上架状态(true已使用,false未使用)
 */
export function getList(data = {}) {
  return request_get('/api/special', data)
}

/**
 * 专题详情
 * @param {Object} data
 * @param {String} data.id - 必填
 */
export function detail({ id, ...data }) {
  return request_get(detail({ id }), data)
}

/**
 * 修改所属分类
 * @param {Object} data
 * @param {String} data.id - 必填 内容id
 * @param {String} data.category_id - 必填
 */
export function mofdifyCate(data = {}) {
  return request_put('/api/content', data)
}
/**
 * 专题基本信息修改/新增
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.abs - 必填
 * @param {String} data.img - 必填
 * @param {Array} data.category_list - 必填 一级分类列表
 * @param {Array} data.category_list.children - 必填 二级分类列表
 */
export function save({ id, ...data }) {
  if (id) {
    return request_put(detail({ id }), data)
  }
  return request_post('/api/special', data)
}

/**
 * 获取分类列表
 * @param {Object} data
 * @param {String} data.id - 必填
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 * @param {String} data.status - 必填 上架状态(true已使用,false未使用)
 */
export function getCateList(data = {}) {
  return request_get(cateList(data), data)
}

/**
 * 新增分类
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.color - 必填
 * @param {String} data.length - 必填
 * @param {String} data.code - 必填
 * @param {String} data.master - 必填
 */
export function addCate(data = {}) {
  return request_post('/api/category', data)
}

/**
 * 删除分类
 * @param {Object} data
 * @param {Array} data.id - 必填
 */
export function del(data = {}) {
  return request_post('/api/special/delete', data)
}

/**
 * 删除分类
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.abs - 必填
 * @param {String} data.img - 必填
 */
export function delCate(data = {}) {
  return request_delete(toPathDel(data), data)
}

/**
 * 获取广告位列表
 * @param {Object} data
 * @param {String} data.special_id - 必填
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 */
export function getAdList({ special_id, ...data }) {
  return request_get(adList({ special_id }), data)
}

/**
 * 广告位添加
 * @param {Object} data
 * @param {String} data.special_id - 必填 专题id
 * @param {String} data.category_id - 必填 分类id
 * @param {String} data.name - 必填 名称
 * @param {String} data.status - 必填 首页弹窗状态 是否启用
 * @param {String} data.img - 必填
 * @param {String} data.preview - 必填 链接地址
 */
export function saveAdver({ id, ...data } = {}) {
  if (id) {
    return request_put(delAd({ id }), data)
  }
  return request_post('/api/ad', data)
}

/**
 * 删除广告位
 * @param {Object} data
 * @param {String} data.id - 必填 id
 */
export function delAd(data = {}) {
  return request_delete(delAd(data), data)
}

/**
 * 获取内容列表
 * @param {Object} data
 * @param {String} data.special_id - 必填
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 */
export function getContList({ special_id, ...data }) {
  return request_get(contentList({ special_id }), data)
}

/**
 * 内容添加
 * @param {Object} data
 * @param {String} data.id - 必填
 * @param {String} data.special_id - 必填 专题id
 * @param {String} data.category_id - 必填 分类id
 * @param {String} data.app_id - 应用库id
 * @param {String} data.resource_id - 资源库id
 * @param {String} data.type - 'resource'/'app'
 */
export function addContent(data = {}) {
  return request_post('/api/content', data)
}

/**
 * 删除内容
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.abs - 必填
 * @param {String} data.img - 必填
 */
export function delContent(data = {}) {
  return request_delete(delContent(data), data)
}

/**
 * 使用中产品
 * @param {Object} data
 * @param {String} data.special_id - 必填
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 */
export function getUseList(data = {}) {
  return request_get(useList(data), data)
}
