import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

// 法律社内容仓库数据库产品
/**
	* 資源列表
	* @return {promise}
	* @param {Object} data
	* @param {String} data.type -1,2
**/
export function resourceList(data = {}) {
	let type = data.type
	if(type&&type.indexOf('-')) {
		data.type = type.split('-')[1]
	}
	return request_get(restUrl_publish+'/api/databooks',data);
}

export function save({id,...data}={}) {
	if(id){
    let detailRes = pathToRegexp.compile(restUrl_publish+'/api/databooks/:id');
		return request_put(detailRes({id}),data)
	}
	return request_post(restUrl_publish+'/api/databooks',data)
}

/**
	* 資源详情
	* @return {promise}
	* @param {Object} data
	* @param {String} data.type -1,2
**/
export function detailResource({id,...data} = {}) {
  let detailRes = pathToRegexp.compile(restUrl_publish+'/api/databooks/:id');
  return request_get(detailRes({id}),data);
}

/**
	* 数据库删除
	* @return {Promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function del(data = {}){
	return request_post(restUrl_publish+'/api/databooks/delete',data)
}


/**
	* 数据库产品分组列表
	* @return {Promise}
	* @param {Object} data
**/
export function listGroup(data = {}){
	return request_get(restUrl_publish+'/api/databooks/groups',data)
}

/**
	* 数据库产品分组新增
	* @return {Promise}
	* @param {Object} data
**/
export function addGroup(data={}){
	return request_post(restUrl_publish+'/api/databooks/groups',data)
}

/**
	* 数据库产品分组修改
	* @return {Promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function modifyGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/databooks/groups/:id');
	return request_put(toPathGroup({id}),data)
}

/**
	* 数据库产品分组删除
	* @return {Promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function deleteGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/databooks/groups/:id');
	return request_delete(toPathGroup({id}),data)
}

/**
	* 数据库产品分组移动
	* @return {Promise}
	* @param {Object} data
	* @param {String} data.id
	* @param {String} data.new_group_id -要移动到的分组id
	* @param {String} data.old_group_id -当前的所属分组id
**/
export function moveGroup(data={}){
	return request_put(restUrl_publish+'/api/groups/databooks',data)
}
