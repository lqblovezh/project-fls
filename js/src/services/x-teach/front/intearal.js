import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 积分商城列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function getList(data = {}) {
  return request_get('/api/intearal/all_front', data)
}

/**
 * 积分兑换
 * @param  {Object} data
 * @param  {[String]} data.id          [description]
 * @return {[Promise]}                 [description]
 */
export function exchange(data = {}) {
  return request_post('/api/intearal/change', data)
}

/**
 * 我的积分商城列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function MyList(data = {}) {
  return request_get('/api/intearal/coupon', data)
}
