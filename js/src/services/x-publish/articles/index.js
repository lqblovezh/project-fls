import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
let detailRes = pathToRegexp.compile(restUrl_publish+'/api/dataarticles/:id');

/**
	* 文章产品分组新增
	* @return {Promise}
	* @param {Object} data
**/
export function addGroup(data={}){
	return request_post(restUrl_publish+'/api/dataarticles/groups',data)
}

/**
	* 获取文章列表
	* @return {Promise}
	* @param {Object} data
**/
export function getList(data={}){
	return request_get(restUrl_publish+'/api/dataarticles',data)
}

/**
	* 資源详情
	* @return {promise}
	* @param {Object} data
	* @param {String} data.type -1,2
**/
export function detailResource({id,...data} = {}) {
	return request_get(detailRes({id}),data);
}

/**
	* 文章加急
	* @return {Promise}
	* @param {Object} data
**/
export function urgentDigital(data={}){
	return request_put(restUrl_publish+'/api/dataarticles/urgent',data)
}

/**
 * 产品审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要审核的产品信息id
 */
export function audits (data = {}) {
	return request_put(restUrl_publish+'/api/dataarticles/audits',data)
}

/**
 * 分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要加急审核的产品信息id
 * @param {String} data.platforms -  //类型：String  可有字段  备注：分发平台，X-READ => 1 ，微信公众平台 => 2 ，微博 => 3
 */
export function issuance ({id,...data} = {}) {
	return request_put(toPathIssuance({id}),data).then(res=>{
		suance({
			id,
			info:res.data
		})
		return res
	});
}

/**
	* 新建
	* @return {promise}
	* @param {Object} data
	* @param {String} data.name -名称
	* @param {String} data.tag -标签
	* @param {Array} data.catalogs -目录
**/
export function save({id,...data}={}) {
	if(id) {
		return request_put(`${restUrl_publish}/api/dataarticles/${id}`,data);
	}
	return request_post(restUrl_publish+'/api/dataarticles',data);
}

/**
	* 文章产品删除
	* @return {Promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function del(data = {}){
	return request_post(restUrl_publish+'/api/dataarticles/delete',data)
}

/**
	* 文章产品产品分组修改
	* @return {Promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function modifyGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/dataarticles/groups/:id');
	return request_put(toPathGroup({id}),data)
}

/**
	* 文章产品产品分组列表
	* @return {Promise}
	* @param {Object} data
**/
export function listGroup(data = {}){
	return request_get(restUrl_publish+'/api/dataarticles/groups',data)
}

/**
	* 文章产品产品分组删除
	* @return {Promise}
	* @param {Object} data
	* @param {Object} data.name
**/
export function deleteGroup({id,...data} = {}){
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/dataarticles/groups/:id');
	return request_delete(toPathGroup({id}),data)
}

/**
	* 文章产品产品分组移动
	* @return {Promise}
	* @param {Object} data
	* @param {String} data.id
	* @param {String} data.new_group_id -要移动到的分组id
	* @param {String} data.old_group_id -当前的所属分组id
**/
export function moveGroup(data={}){
	return request_put(restUrl_publish+'/api/groups/dataarticles',data)
}
