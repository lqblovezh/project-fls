import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import {
  suance
} from '../dbi'

/**
 * 产品信息列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 */
export function getList(data = {}) {
    return request_get(restUrl_publish+'/api/comproduct/list',data);
}

/**
 * 获取产品详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} id
 */
export function getDetail(data = {}) {
    return request_get(restUrl_publish+'/api/comproduct', data)
}

/**
 * 产品信息删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del (data = {}) {
    return request_post(restUrl_publish+'/api/comproduct/delete',data);
}

/**
 * 加急审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要加急审核的产品信息id
 */
export function urgentDigitalBook (data = {}) {
    return request_put(restUrl_publish+'/api/comproduct/urgent',data);
}

/**
 * 产品审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要审核的产品信息id
 */
export function audits (data = {}) {
    return request_put(restUrl_publish+'/api/comproduct/audits',data)
}

/**
 * 分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要加急审核的产品信息id
 * @param {String} data.platforms -  //类型：String  可有字段  备注：分发平台，X-READ => 1 ，微信公众平台 => 2 ，微博 => 3
 */
export function issuance ({id,...data} = {}) {
  let toPathIssuance = pathToRegexp.compile(restUrl_publish+'/api/comproduct/:id/issuance')
  return request_put(toPathIssuance({id}),data).then(res=>{
    suance({
      id,
      info:res.data
    })
    return res
  });
}

/**
 * 新增产品信息库分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 分组名称
 */
export function addGroup (data = {}) {
    return request_post(restUrl_publish+'/api/comproduct/groups',data);
}

/**
 * 修改产品信息库分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup (data = {}) {
  let toPathGroupModify = pathToRegexp.compile(restUrl_publish+'/api/comproduct/groups/:id')
  return request_put(toPathGroupModify(data),data)
}

/**
 * 删除产品信息库分组
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup (data = {}) {
    return request_post(restUrl_publish+'/api/themes/groups/delete',data);
}

/**
 * 产品信息库分组列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} PageStart
 * @param {String} PageOffset
 */
export function listGroup (data = {}) {
    return request_get(restUrl_publish+'/api/comproduct/groups',data);
}

/**
 * 产品信息库分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.old_group_id - 必有 要移动到的分组ID
 * @param {String} data.new_group_id - 必有 当前的所属分组ID
 * @param {Array} data.rel_id - 必有 要移动的id
 */
export function moveGroup (data = {}) {
    data.rel_id = data.id;
    delete data.id ;
    return request_put(restUrl_publish+'/api/groups/comproduct',data);
}
