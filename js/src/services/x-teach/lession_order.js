import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取课程订单列表
 * @param {Object} data
 * @param {String} data.course_name 课程名
 * @param {String} data.order_number 交易编号
 */

export function getList(data){
	return request_get("/api/order/all",data);
}