import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
let toPathDel = pathToRegexp.compile('/api/category/:id');
let detail = pathToRegexp.compile('/api/special/:id')

//专题库

/**
 * 专题列表
 * @param {Object} data
 * @param {String} data.id - 必填
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 * @param {String} data.status - 必填 上架状态(true已使用,false未使用)
 */
export function getList(data={}){
	return request_get('/api/special',data)
}

/**
 * 专题详情
 * @param {Object} data
 * @param {String} data.id - 必填
 */
export function detail({id,...data}){
	return request_get(detail({id}),data)
}

/**
 * 专题基本信息
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.abs - 必填
 * @param {String} data.img - 必填
 */
export function modifyInfo({id,...data}){
	return request_put(toPathDel({id}),data)
}

/**
 * 专题基本信息修改
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.abs - 必填
 * @param {String} data.img - 必填
 */
export function getInfo(){
	return request_post('/api/special',data)
}

/**
 * 新增分类
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.color - 必填
 * @param {String} data.length - 必填
 * @param {String} data.code - 必填
 * @param {String} data.master - 必填
 */
export function addCate(data={}){
	return request_post('/api/category',data)
}

/**
 * 删除分类
 * @param {Object} data
 * @param {String} data.name - 必填
 * @param {String} data.abs - 必填
 * @param {String} data.img - 必填
 */
export function delCate({id,...data}){
	return request_delete(toPathDel({id}),data)
}
