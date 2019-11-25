import {
  request_post,
  request_get,
  request_put,
  request_delete
} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

/**
 * 套系列表
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function getList(data = {}) {
  return request_get(restUrl_publish+'/api/datasubjects', data);
}

/**
	* 套系加急
	* @return {Promise}
	* @param {Object} data
**/
export function urgentDigital(data={}){
	return request_put(restUrl_publish+'/api/datasubjects/urgent',data)
}

/**
 * 产品审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要审核的产品信息id
 */
export function audits (data = {}) {
	return request_put(restUrl_publish+'/api/datasubjects/audits',data)
}

/**
 * 套系添加/修改
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function save({
  id,
  ...data
}) {
  if (id) {
    return request_put(`${restUrl_publish}/api/datasubjects/${id}`, data)
  }
  return request_post(restUrl_publish+'/api/datasubjects', data);
}

/**
 * 套系详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function detail(data = {}) {
  let detail = pathToRegexp.compile(restUrl_publish+'/api/datasubjects/:id');
  return request_get(detail(data), data);
}

/**
 * 套系删除
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function del(data = {}) {
  return request_post(restUrl_publish+'/api/datasubjects/delete', data);
}

/**
 * 套系资源列表
 * @return {promise}
 * @param {Object} data
 * @param {String} data.id -套系ID
 * @param {String} data.class_id -栏目ID
 **/
export function seriesResList(data = {}) {
  return request_get(restUrl_publish+'/api/datasubjects/class/books', data);
}

/**
 * 套系资源列表
 * @return {promise}
 * @param {Object} data
 * @param {String} data.id -套系ID
 * @param {String} data.class_id -栏目ID
 **/
export function seriesListOnly(data = {}) {
  return request_get(restUrl_publish+'/api/data_subjects/class/books', data);
}

/**
 * 套系资源删除
 * @return {promise}
 * @param {Object} data
 * @param {String} data.id -套系ID
 * @param {String} data.class_id -栏目ID
 * @param {String} data.rel_id -资源ID
 **/
export function deleteSerRes(data = {}) {
  return request_post(restUrl_publish+'/api/datasubjects/class/books/delete', data);
}

/**
 * 套系资源添加
 * @return {promise}
 * @param {Object} data
 * @param {String} data.id -套系ID
 * @param {String} data.class_id -栏目ID
 * @param {String} data.rel_id -资源ID
 **/
export function addSerRes(data = {}) {
  return request_post(restUrl_publish+'/api/datasubjects/class/books', data);
}

// 套系栏目/类别

/**
 * 套系栏目/类别列表
 * @return {promise}
 * @param {Object} data
 * @param {String} data.type -1,2
 **/
export function seriesList(data = {}) {
  return request_get(restUrl_publish+'/api/datasubjects/class', data);
}

/**
 * 套系栏目/类别删除(单条)
 * @return {promise}
 * @param {Object} data
 **/
export function delSeries({
  id,
  ...data
} = {}) {
  let del = pathToRegexp.compile(restUrl_publish+'/api/datasubjects/class/:id');
  return request_delete(del({
    id
  }), data);
}

/**
 * 套系产品分组新增
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.type -1类别,2栏目
 * @param {String} data.code -编码
 **/
export function saveSeries({id,...data}={}) {
	if(id) {
    let modifySeries = pathToRegexp.compile(restUrl_publish+'/api/datasubjects/class/:id');
		return request_put(modifySeries({id}), data);
	}
  return request_post(restUrl_publish+'/api/datasubjects/class',data)
}

/**
 * 套系产品分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {Object} data.name
 **/
export function modifyGroup({
  id,
  ...data
} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/datasubjects/groups/:id');
  return request_put(toPathGroup({
    id
  }), data)
}

/**
	* 文章产品产品分组列表
	* @return {Promise}
	* @param {Object} data
**/
export function listGroup(data = {}){
	return request_get(restUrl_publish+'/api/datasubjects/groups',data)
}

/**
	* 文章产品分组新增
	* @return {Promise}
	* @param {Object} data
**/
export function addGroup(data={}){
	return request_post(restUrl_publish+'/api/datasubjects/groups',data)
}

/**
 * 套系产品分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Object} data.name
 **/
export function deleteGroup({
  id,
  ...data
} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/datasubjects/groups/:id');
  return request_delete(toPathGroup({
    id
  }), data)
}

/**
 * 套系产品分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.new_group_id -要移动到的分组id
 * @param {String} data.old_group_id -当前的所属分组id
 **/
export function moveGroup(data = {}) {
  return request_put(restUrl_publish+'/api/groups/datasubjects', data)
}
