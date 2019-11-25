import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

/**
	* 习题库列表
	* @return {promise}
	* @param {Object} data
	* @param {String} data.state
**/
export function getList(data = {}) {
    return request_get(restUrl_publish+'/api/practice',data);
}

/**
	* 习题库详情
	* @return {promise}
	* @param {Object} data
	* @param {String} data.id
**/
export function detail({id,...data}){
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/practice/:id');
	return request_get(toPath({id}),data)
}

/**
	* 习题库删除xxx
	* @return {Promise}
	* @param {Object} data
	* @param {String} data.id
	* @param {String} data.confirm -(强制删除，0否，1是)
**/
export function del(data={}){
	return request_post(restUrl_publish+'/api/practice/delete',data)
}
/**
	* 新建重组
	* @return {promise}
	* @param {Object} data
	* @param {String} data.name -重组名称
	* @param {String} data.tag -重组标签
	* @param {Array} data.catalogs -目录
**/
export function save({id,...data}={}) {
	if(id) {
		return request_put(`${restUrl_publish}/api/practice/${id}`,data);
	}
	return request_post(restUrl_publish+'/api/practice',data);
}

/**
	* 习题库分组列表
	* @return {Promise}
	* @param {Object} data
**/
export function listGroup(){
	return request_get(restUrl_publish+'/api/practice/groups')
}

/**
	* 习题库分组新增
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function addGroup(data={}){
	return request_post(restUrl_publish+'/api/practice/groups',data);
}

/**
	* 习题库分组修改
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.id
	* @param {Object} data.name
**/
export function modifyGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/chapters/groups/:id');
	return request_put(toPathGroup({id}),data)
}

/**
	* 习题库分组删除
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.id
**/
export function deleteGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/chapters/groups/:id');
	return request_delete(toPathGroup({id}),data)
}

/**
	* 习题库分组移动
	* @return {promise}
	* @param {Object} data
	* @param {String} data.id
	* @param {String} data.new_group_id -要移动到的分组id
	* @param {String} data.old_group_id -当前的所属分组id
	* @param {Array} data.rel_id -书籍id
**/
export function moveGroup(data={}){
	return request_put(restUrl_publish+'/api/groups/chapters',data)
}
