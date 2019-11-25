import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import { request } from 'https';

/**
 * 抽奖列表
 * @param {Data} data
 * @param {String} data.name 
 * @param {String} data.start_time
 * @param {String} data.end_time
 */
export function getList(data){
	return request_get('/api/lottery',data)
}
/**
 * 新增抽奖 || 修改抽奖
 * @param {Data} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.abs
 * @param {Object} data.lottery_info
 * @param {String} data.lottery_info.type
 * @param {Array}  data.lottery_info.content
 * @param {String} data.lottery_info.content[0].award_id 奖品Id
 * @param {String} data.lottery_info.content[0].award_name 奖品Id
 * @param {String} data.lottery_info.content[0].chance 概率
 */

export function save({id,...data}){
	if(id){
		return request_put(`/api/lottery/${id}`,data)
	}
	return request_post('/api/lottery',data)
}

/**
 * 删除抽奖
 * @param {Data} data
 * @param {String} data.id
 */
export function del(data){
	return request_post('/api/lottery/delete',data)
}
/**
* 抽奖详情
* @param {Data} data
* @param {String} data.id 
*/
export function detail({id}){
	return request_get(`/api/lottery/${id}`)
}
/**
 * 奖品列表
 * @param {Data} data 
 */
export function awardList(data){
	return request_get('/api/award',data)
}
/**
 * 抽奖记录
 */
export function awardRecord({id}){
	return request_get(`/api/lottery_record/${id}`)
}
/**
 * 新增或修改奖品
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.price
 * @param {String} data.id
 */
export function saveAward(data){
	return request_post('/api/award',data)
} 
/**
 * 删除奖品
 */
export function delAward(data){
	return request_post('/api/award/delete',data)
}