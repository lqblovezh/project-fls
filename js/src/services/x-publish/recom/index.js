import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

/**
	* 重组资源列表
	* @return {promise}
	* @param {Object} data
	* @param {String} data.state
**/
export function recomList(data = {}) {
    return request_get(restUrl_publish+'/api/rechapters',data);
}

/**
	* 重组资源详情
	* @return {promise}
	* @param {Object} data
	* @param {String} data.id
**/
export function detailRecom({id,...data}){
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/rechapters/:id');
	return request_get(toPath({id}),data)
}

/**
	* 重组资源删除xxx
	* @return {Promise}
	* @param {Object} data
	* @param {String} data.id
	* @param {String} data.confirm -(强制删除，0否，1是)
**/
export function deleteRecom(data={}){
	return request_post(restUrl_publish+'/api/rechapters/delete',data)
}
/**
	* 重组资源修改xxx
	* @return {promise}
	* @param {Object} data
	* @param {String} data.name
	* @param {String} data.type
	* @param {String} data.word_size
	* @param {String} data.create_time
**/
export function updateRecom(data = {}) {
  let updateRecom = pathToRegexp.compile(restUrl_publish+'/api/rechapters/:id');
  return request_put(put(data),data);
}

/**
	* 新建重组
	* @return {promise}
	* @param {Object} data
	* @param {String} data.name -重组名称
	* @param {String} data.tag -重组标签
	* @param {Array} data.catalogs -目录
**/
export function addRecom(data={}) {
    return request_post(restUrl_publish+'/api/rechapters',data);
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
		return request_put(`${restUrl_publish}/api/rechapters/${id}`,data);
	}
	return request_post(restUrl_publish+'/api/rechapters',data);
}

/**
	* 重组资源分组列表
	* @return {Promise}
	* @param {Object} data
**/
export function listGroup(){
	return request_get(restUrl_publish+'/api/rechapters/groups')
}

/**
	* 重组资源分组新增
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function addGroup(data={}){
	return request_post(restUrl_publish+'/api/rechapters/groups',data);
}

/**
	* 重组资源分组修改
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
	* 重组资源分组删除
	* @return {promise}
	* @param {Object} data
	* @param {Object} data.id
**/
export function deleteGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/chapters/groups/:id');
	return request_delete(toPathGroup({id}),data)
}

/**
	* 重组资源分组移动
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
