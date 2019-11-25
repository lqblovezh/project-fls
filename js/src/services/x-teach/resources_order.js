import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取课程订单列表
 * @param {Object} data
 * @param {String} data.type course（课程）| resources（资源）
 * @param {String} data.goods_name 授权名称
 * @param {String} data.use_goods_name 使用名称
 */

export function getList(data){
	return request_get("/api/order/authorization_order",data);
}