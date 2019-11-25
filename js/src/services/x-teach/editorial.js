import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let dpath = pathToRegexp.compile("/api/user/users/teacher/:id");
let savePath = pathToRegexp.compile("/api/user/setting/:id");
let delPath = pathToRegexp.compile("/common/api/user/users/delete/:id");
/**
 * 获取编辑列表信息
 * @param {Object} data 
 * @param {String} data.nick_name 姓名
 * @param {String} data.phone 电话
 * @param {String} data.company 单位
 */
export function getList(data){
  return request_get('/api/user/users/teacher',data)
}

export function detail(data){
	return request_get(dpath(data))
}

export function save(data){
	return request_post(savePath(data),data)
}

/**
 * 管理员删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 * */
export function del(data){
	return request_post('/common/api/user/users/delete',data);
}

/**
 * 提现记录
 * @param {Object} data
 * @param {String} data.user_id
 */
export function cashRecord(data){
	return request_get('/api/withdraw/list',data)
}

/**
 * 添加提现记录
 * @param {Object} data
 * @param {String} data.user_id
 * @param {String} data.money
 */
export function addRecord(data){
	return request_post("/api/withdraw",data)
}