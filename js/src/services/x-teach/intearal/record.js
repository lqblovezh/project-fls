import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 积分兑换记录
 */

 export function getList(data){
		return request_get("/api/intearal/consume_record",data)
 }