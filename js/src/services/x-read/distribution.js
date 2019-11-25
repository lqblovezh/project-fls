import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let cashUrl = pathToRegexp.compile('/api/distribute/cash/:id')
let distUrl = pathToRegexp.compile('/api/distribute/distributes/:id')
let update = pathToRegexp.compile('/api/distribute/cash/:id')
/**
 * 获取分销设置
 * @param {Object} data
 */
export function info(data={}){
  return request_get('/api/distribute/setting',data)
}

/**
 * 分销设置修改
 * @param {Object} data
 * @param {String} data.service_money - 必有字段 手续费
 * @param {String} data.reward_money - 必有字段 分销奖励金额
 * @param {String} data.distribute_rule - 必有字段 分销规则
 * @param {String} data.reward_type - 必有字段 分销奖励,0按比例1,按固定
 * @param {String} data.service_type - 必有字段 手续费,0按比例1,按固定
 * @param {Array} data.pay_type - 必有字段 支付方式1正常支付,2支付宝,3微信,4...
 */
export function save(data = {}){
   return request_put('/api/distribute/setting',data)

}

/**
 * 兑现列表
 * @param {String} data.order - 选填 订单号
 * @param {String} data.status - 选填 状态(1已结算,0未结算,2驳回兑付)
 * @param {String} data.phone - 选填 手机号
 * @param {String} data.user_name - 选填 用户名
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function cashList(data={}){
  return request_get('/api/distribute/cash',data)
}

/**
 * 兑现详情
 * @param {Object} data
 * @param {String} data.id - 必填 id
 */
export function cashDetail(data={}){
  return request_get(cashUrl(data),data)
}
/**
 * 兑现修改
 */
export function cashUpdata(data={}){
  return request_put(update(data),data)
}

/**
 * 分销列表
 * @param {String} data.order - 选填 订单号 
 * @param {String} data.status - 选填 状态(1已结算,0未结算,2驳回兑付)
 * @param {String} data.phone - 选填 手机号
 * @param {String} data.user_name - 选填 用户名
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/distribute/distributes',data)
}

/**
 * 分销详情
 * @param {Object} data
 * @param {String} data.id - 必填 id
 */
export function detail(data={}){
  return request_get(distUrl(data),data)
}

/**
 * 分销结算
 * @param {Object} data
 * @param {String} data.id - 必填 id
 */
export function settlement(data={}){
  return request_put('/api/distribute/cashs',data)
}

/**
 * 分销导出
 * @param {Object} data
 * @param {String} data.id - 必填 id
 */
export function educe(data={}){
  return request_get('/api/distribute/export',data)
}

/**
 * 兑换导出
 * @param {Object} data
 * @param {String} data.id - 必填 id
 */
export function educes(data={}){
  return request_get('/api/cash/export',data)
}




