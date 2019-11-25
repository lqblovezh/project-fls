import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取积分商城列表
 */

export function getList(data){
	return request_get("/api/intearal/all",data)
}

/**
 * 上下架
 */
export function isOnline(data){
	return request_put("/api/intearal/online",data)
}

/**
 * 积分设置
 */

 export function getRule(data){
  return request_get('/api/intearal/rule_list',data)
 }

 /**
	* 积分设置保存
	* @param {Object} data
	* @param {String} data.id
	* @param {String} data.integral 积分
	* @param {String} data.state  可用禁用  true  false
  */

export function save(data){
	return request_put("/api/intearal/rule",data)
}