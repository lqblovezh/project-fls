import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import { request } from 'https';

/**
 * 投票列表
 * @param {Data} data
 * @param {String} data.id 
 * @param {String} data.product_id 产品二维码Id 
 * @param {String} data.type vote投票 questionnaire 问卷调查
 * @param {String} data.start_time
 * @param {String} data.end_time
 */

export function getList({id,...data}){
	return request_get(`/api/vote/log/${id}`,data)
}

export function pullList(){
	return request_get('/api/vote')
}
/**
 * 投票统计
 * @param {Data} data
 */
export function statics(data){
	return request_get('/api/vote/statistics',data)
}
/**
 * 导出投票记录
 * @param {Data} data
 * @param {Data} data.id
 */
export function educe(data){
	return request_get('/api/vote/export',data)
}