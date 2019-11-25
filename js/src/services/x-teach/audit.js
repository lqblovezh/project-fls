import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let dpath = pathToRegexp.compile("/api/user/audits/detail/:id");
let savePath = pathToRegexp.compile("/api/user/setting/:id");
let auditPath = pathToRegexp.compile("/api/user/audits/handle/:id");
export function getList(data){
	log(data,88999)
  return request_get('/api/user/audits',data)
}

export function save(data){
	return request_post(savePath(data),data)
}

export function detail(data){
	log(data,888)
	return request_get(dpath(data))
}

export function audit(data){
	return request_post(auditPath(data),data);
}
