import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

let toPathGroup = pathToRegexp.compile('/api/data_subjects/groups/:id');
let toPathGroupModify = pathToRegexp.compile('/api/data_subjects/:id/groups');
//二维码库

/**
 * 彻底删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 二维码id
 */
export function del(data = {}){
	return request_post('/api/qrcode/force_delete',data)
}

/**
 * 删除列表
 * @param {Object} data
 * @param {Array} data.id - 必有字段 二维码id
 */
export function getList(data = {}){
	return request_get('/api/qrcode/delete_list',data)
}

/**
 * 恢复二维码
 * @param {Object} data
 * @param {String} data.id - 必有字段 二维码id
 */
export function reset(data = {}){
	return request_post('/api/qrcode/reset',data)
}
