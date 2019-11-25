import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'


/**
 * 获取用户报表
 * @param {Object} data
 * @param {String} data.type   - 1日，2日
 */
export function getUserList(data={}){
  return request_get('/api/user/statis',data)
}

/**
 * 获取交易统计列表
 * @param {Object} data
 * @param {String} data.type   - day/month 默认day
 * @param {String} data.time_start - 2018-01-10 默认30天前
 * @param {String} data.time_end - 2018-10-10 默认今天
 */
export function getList(data={}){
  return request_get('/api/order/statistics',data)
}
