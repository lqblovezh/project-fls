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
	return request_get('/api/question',data)
}

/**
 * 新增问答 || 修改问答
 * @param {Data} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.img
 * @param {String} data.abs
 * @param {Object} data.questions
 * @param {String} data.questions.question
 * @param {String} data.questions.answer
 * @param {Array} data.questions.resource_id 
 * @param {Object} data.questions[0].option  eg:{A:'',B:'',C:''}
 * @param {String} data.master ''
 */

export function save({id,...data}){
	if(id){
		return request_put(`/api/question/${id}`,data)
	}
	return request_post('/api/question',data)
}

/**
 * 删除问答
 * @param {Data} data
 * @param {String} data.id
 */
export function del(data){
	return request_post('/api/question/delete',data)
}
/**
* 问答详情
* @param {Data} data
* @param {String} data.id 
*/
export function detail({id}){
	return request_get(`/api/question/${id}`)
}

/**
 * 删除问答题目
 * @param {Data} data
 * @param {Array} data.id
 */
export function delQus(data){
	return request_post(`/api/question/title/delete`,data)
}

/**
 * 删除问答资源
 */

export function delRes(data){
	return request_post(`/api/question/resource/delete`,data)
}