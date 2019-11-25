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
	return request_get('/api/questionnaire',data)
}
/**
 * 新增问卷调查 || 修改问卷调查
 * @param {Data} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {Array} data.questions
 * @param {String} data.questions[0].question
 * @param {String} data.questions[0].type //single''=>''选择题'',''multi ''=>''多选题'
 * @param {String} data.questions[0].must 
 * @param {Array} data.questions[0].resource_id ‘false’ => '非必填'，'true'=> '必填'
 * @param {Object} data.questions[0].option  eg:{A:'',B:'',C:''}
 */

export function save({id,...data}){
	if(id){
		return request_put(`/api/questionnaire/${id}`,data)
	}
	return request_post('/api/questionnaire',data)
}

/**
* 投票详情
* @param {Data} data
* @param {String} data.id 
*/
export function detail({id}){
	return request_get(`/api/questionnaire/${id}`)
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
 * 删除问卷调查
 * @param {Data} data
 * @param {String} data.id
 */
export function del(data){
	return request_post('/api/questionnaire/delete',data)
}
/**
 * 删除问题
 * @param {Array} data  [id1,id2]
 */
export function delQus(data){
	return request_post(`/api/questionnaire/question/delete`,data)
}