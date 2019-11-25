import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 删除商品 ids参数是数组, 支持批量
 * @param  {[Array]}    data.ids
 * @return {[Promise]}
 */
export function del(data = {}) {
  return request_post(`/api/cart/goods`, data)
}

/**
 * 添加购物车 参数是数组, 支持批量(登陆合并购物车)
 * @param  {[Array]}    data.ids
 * @return {[Promise]}
 */
export function add(data = {}) {
  return request_post(`/api/cart`, data)
}

/**
 * 清空一个用户的购物车
 * @return {[Promise]}
 */
export function clean(data = {}) {
  return request_delete(`/api/cart/user`)
}

/**
 * 获取购物车
 * @return {[Promise]}
 */
export function getCart(data = {}) {
  return request_get(`/api/cart/user`)
}


/**
 * 添加订单  点击支付走这里
 * @param  {[String]}    data.pay_from  'alipay','wechat'
 * @param  {[String]}    data.goods 数组形式  ["id"]
 * @param  {[String]}    data.coupon 优惠券
 * @return {[Promise]}
 */
export function pay(data = {}) {
  return request_post(`/api/order`, data)
}

/**
 * 获取用户订单
 */
export function getOrderList (data = {}) {
  return request_get('/api/order/user', data)
}

/**
 * 删除订单
 * @param  {Object} data [description]
 * @param  {String} data.id 订单id
 */
export function delOrder (data = {}) {
  return request_delete(`/api/order/${data.id}`)
}