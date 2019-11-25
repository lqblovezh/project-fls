import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'


/**
 * 获取服务器时间
 * 
 */

 export function getServiceTime(data){
	  return request_get('/api/statistics/admin_home',data)
 }