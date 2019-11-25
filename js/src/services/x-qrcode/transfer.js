import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

/**
 * 导入导出列表
 */
export function getList(data){
	return request_get('/api/system/export',data)
 }
export function delTask(data){
	return request_post('/api/system/tasks_delete',data)
}