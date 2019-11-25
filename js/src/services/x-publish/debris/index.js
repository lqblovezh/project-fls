import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

/**
	* 碎片资源列表
	* @return {promise}
	* @param {Object} data
	* @param {String} data.state
**/
export function debrisList(data = {}) {
    return request_get(restUrl_publish+'/api/chapters',data);
}

/**
* 碎片资源新增
* @return {promise}
* @param {Object} data
* @param {String} data.name  -名称
* @param {String} data.text -内容
**/
export function addDebris(data = {}) {
    return request_post(restUrl_publish+'/api/chapters',data);
}

/**
	* 碎片资源修改
	* @return {promise}
	* @param {Object} data
	* @param {String} data.name
	* @param {String} data.type
	* @param {String} data.word_size
	* @param {String} data.create_time
**/
export function modifyDebris(data = {}) {
  let modifyDebris= pathToRegexp.compile(restUrl_publish+'/api/chapters/:id');
  return request_put(modifyDebris(data),data);
}

/**
	* 发布作品
	* @return {promise}
	* @param {Object} data
	* @param {String} data.id -重组资源id
	* @param {String} data.name
	* @param {String} data.type -1电子书,2案例,3法规,4文献,5裁判
**/
export function publishWork(data={}) {
  let publishDebris= pathToRegexp.compile(restUrl_publish+'/api/chapters/books');
  return request_post(publishDebris(data),data);
}

/**
	* 碎片资源删除
	* @return {promise}
	* @param {Object} data
	* @param {String} data.state
	* @param {String} data.confirm(强制删除，0否，1是)
**/
export function deleteDbris(data={}) {
    return request_post(restUrl_publish+'/api/chapters/delete',data);
}

/**
	* 碎片资源详情
	* @return {promise}
	* @param {Object} data
	* @param {String} data.id
**/
export function detailDebris({
    id,
    ...data
} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/chapters/:id');
  return request_get(toPath({id}),data)
}

/**
	* 碎片资源分组列表
	* @return {promise}
	* @param {Object} data
**/
export function listGroup() {
	return request_get(restUrl_publish+'/api/chapters/groups')
}

/**
	* 碎片资源分组新增
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function addGroup(data={}){
	return request_post(restUrl_publish+'/api/chapters/groups',data);
}

/**
	* 碎片资源分组修改
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
	* 碎片资源分组删除
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.id
**/
export function deleteGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/chapters/groups/:id');
	return request_delete(toPathGroup({id}),data)
}

/**
	* 碎片资源分组移动
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.id
	* @param {String} data.new_group_id -要移动到的分组id
	* @param {String} data.old_group_id -当前的所属分组id
	* @param {Array} data.rel_id -书籍id
**/
export function moveGroup(data={}){
	return request_put(restUrl_publish+'/api/groups/chapters',data)
}
