import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let messageUrl = pathToRegexp.compile('/api/messages/:id')
let userLock = pathToRegexp.compile('/api/user/lock/:id')

/**
 * 产品数据报表
 * @param {Object} data
 * @param {String} data.book_name - 选填 书名
 * @param {String} data.tag - 选填 标签
 * @param {String} data.type - 选填 1或者2
 * @param {String} data.time - 选填 1,3,7,30,60(这个时间与开始时间结束时间不能重复)
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/book_info',data)
}

/**
 * 产品数据报表导出
 * @param {Object} data
 * @param {String} data.book_name - 选填 书名
 * @param {String} data.tag - 选填 标签
 * @param {String} data.type - 选填 1或者2  主题2,图书1
 * @param {String} data.time - 选填 1,3,7,30,60(这个时间与开始时间结束时间不能重复)
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.id - 产品id 
 */
export function educe(data={}){
  return request_get('/api/book_info_export',data)
}

/**
 * 合并查看趋势图
 * @param {Object} data
 * @param {String} data.id - 选填 书id
 * @param {String} data.time - 选填 1,3,7,30,60(这个时间与开始时间结束时间不能重复)
 * @param {String} data.type - 选填 browse(浏览c书)share(分享次数)sale(销售次数)(销售金额)(分销次数)
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.txt - 浏览数  分享数 销售次数 分销数
 */
export function detail(data={}){
  return request_get('/api/book_info_all',data)
}
/**
 * 统计分析订单列表
 * @param {Object} data
 * @param {Array} data.id - 选填 书id Array
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.time - 选填 1,3,7,30,60(这个时间与开始时间结束时间不能重复)
 */
export function getOrders(data={}){
  return request_get('/api/book_order_info',data)
}

/**
 * 销售业绩（日月年）
 * @param {Object} data
 * @param {String} data.type  - 1:日  2:月  3:年
 */
export function bookSale(data={}){
  return request_get('/api/book_sale',data)
}

/**
 * 销售业绩（销售额）
 * @param {Object} data
 */
export function bookSaleAchievement(data={}){
  return request_get('/api/sale_achievement_info',data)
}



