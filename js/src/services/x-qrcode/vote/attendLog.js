import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import { request } from 'https';

/**
 * 问卷调查记录
 * @param {Object} data
 * @param {String} data.product_id
 */
export function getList({id,...data}){
	return request_get(`/api/questionnaire/attend_log/${id}`,data)
}

/**
 * 问卷调查记录详情
 */
export function detail({id,...data}){
	return request_get(`/api/questionnaire/attend_log_info/${id}`,data)
}

/**
 * 问卷调查统计
 */
export function statistics(data){
	return request_get('/api/questionnaire/statistics',data)
}

export function pullList(){
	return request_get('/api/questionnaire')
}

/**
 * 导出投票记录
 * @param {Data} data
 * @param {Data} data.id
 */
export function educe(data){
	return request_get('/api/questionnaire/export',data)
}