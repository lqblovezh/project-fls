import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import { request } from 'https';

/**
 * 投票列表
 * @param {Data} data
 * @param {String} data.name 
 * @param {String} data.start_time
 * @param {String} data.end_time
 */
export function getList(data){
	return request_get('/api/vote',data)
}
/**
 * 新增投票 || 修改投票
 * @param {Data} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {Array} data.answer
 * @param {Array} data.resource_ids 资源Id
 */

export function save({id,...data}){
if(id){
	return request_put(`/api/vote/${id}`,data)
}
return request_post('/api/vote',data)
}

/**
* 投票详情
* @param {Data} data
* @param {String} data.id 
*/
export function detail({id}){
	return request_get(`/api/vote/${id}`)
}
/**
 * 被使用产品
 * @param {Data} data
 * @param {String} data.id
 */
export function usedVote({id}){
	return request_get(`/api/vote/used/${id}`)
}
/**
 * 删除投票
 * @param {Data} data
 * @param {String} data.id
 */
export function del(data){
	return request_post('/api/vote/delete',data)
}
/**
 * 删除资源
 * @param {Data} data
 * @param {String} data.id
 */
export function delRes({id}){
	return request_delete(`/api/vote/resource/${id}`)
}