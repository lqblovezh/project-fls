import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let detailUrl = pathToRegexp.compile('/api/shared_resource/:id')
let useUrl = pathToRegexp.compile('/api/shared_resource/authorization/:id')
let enableUrl = pathToRegexp.compile('/api/shared_resource/status/:id')

/**
 * 获取资源列表
 * @param {Object} data
 * @param {String} data.order - 选填 资源号
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
  return request_get('/api/shared_resource',data)
}

/**
 * 资源详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 资源id
 */
export function detail(data = {}){
  return request_get(detailUrl(data))
}

/**
 * 资源删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 资源id
 */
export function del(data = {}){
  return request_post('/api/shared_resource/delete',data)
}

/**
 * 资源使用
 * @param {Object} data
 * @param {String} data.id - 必有字段 资源id
 */
export function use({id}) {
  return request_put(useUrl({id}))
}


/**
 * 资源启用 停用
 * @param {Object} data
 * @param {String} data.id - 必有字段 资源id
 */
export function enable({id}) {
  return request_get(enableUrl({id}))
}