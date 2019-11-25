import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 销售业绩
 */
export function saleInfo(data={}){
  return request_get('/api/sale_achievement_info',data)
}

/**
 * 按年月日返回销售业绩
 * @param {Object} data
 * @param {Number} data.type 1日2月3年
 */
 export function saleByDate(data={}){
   return request_get("/api/book_sale",data)
 }

/**
 * 首页 统计
 * 
 */
 export function statistics(data={}){
  return request_get("/api/admin_index",data)
 }

 /**
  * 首页预期设置
  * @param {Object} data
  * @param {String} data.user_value 用户
  * @param {String} data.browse_value 浏览
  * @param {String} data.share_value 分享
  * @param {String} data.sale_value 购买
  * @param {String} data.sale_bution 分销
  * @param {String} data.read_value 阅读
  */

  export function expected(data={}){
    return request_post("/api/admin_index",data)
  }

/**
 * 首页趋势图
 * @param {Object} data
 * @param {String} data.type 类型  browse|sale
 */
export function trend(data={}){
  return request_get("/api/admin_type",data)
}