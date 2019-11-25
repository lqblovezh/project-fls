import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import { request } from 'https';

/**
 * 书圈列表
 * @param {Data} data
 * @param {String} data.name 
 * @param {String} data.start_time
 * @param {String} data.end_time
 */
export function getList(data){
	return request_get('/api/circle',data)
}
/**
 * 新增书圈 || 修改书圈
 * @param {Data} data
 * @param {String} data.id
 * @param {String} data.resource_id
 * @param {String} data.name
 * @param {String} data.abs
 * @param {String} data.type books =》数组图书集   special=>专题
 */

export function save({id,...data}){
	if(id){
		return request_put(`/api/circle/${id}`,data)
	}
	return request_post('/api/circle',data)
}

/**
 * 删除书圈
 * @param {Data} data
 * @param {String} data.id
 */
export function del(data){
	return request_post('/api/circle/delete',data)
}
/**
* 书圈详情
* @param {Data} data
* @param {String} data.id 
*/
export function detail({id}){
	return request_get(`/api/circle/${id}`)
}
/**
 * 书圈主题列表
 */
export function themeList({id}){
	return request_get(`/api/theme/${id}`)
}
/**
 * 书圈主题详情
 * @param {Data} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function themeDetail({id}){
	return request_get(`/api/circle/theme/${id}`)
}
/**
 * 书圈主题删除
 */
export function delTheme({id}){
	return request_delete(`/api/circle_theme/${id}`)
}
/**
 * 删除消息
 */
export function delMsg({id}){
	return request_delete(`/api/messages/${id}`)
}