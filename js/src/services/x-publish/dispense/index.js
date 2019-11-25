/**
 * 我的分发
 */

import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import {
  suance
} from '../dbi'

/**
 * 查询云数据
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function getMetadatas({id,...data} = {}) {
  let toPathMetadata = pathToRegexp.compile(restUrl_publish+'/api/releases/metadata/:id');
  return request_get(toPathMetadata({id}),data)
}
/**
 * 查询详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function getDetail(data = {}) {
  let detailPath = pathToRegexp.compile(restUrl_publish+'/api/releases/product/:id');
  return request_get(detailPath(data))
}
/**
 * 查询列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必选 平台ID
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/releases/:id');
  return request_get(toPath(data),data);
}

/**
 * 查询所有分发平台
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.entity_type - 推送文章产品
 * @param {String} data.order - 排序
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getDispense(data = {}) {
    return request_get(restUrl_publish+'/api/platforms',data);
}
/**
 * 查询概况
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称
 * @param {String} data.start_time - 开始时间
 * @param {String} data.end_time - 结束时间
 * @param {String} data.order - 排序
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getOverview(data = {}) {
    return request_get(restUrl_publish+'/api/releases/basic',data)
}

/**
 * 分发
 * @return {Promise}
 * @param {Object} data - 传入对象
 * @param {String} data.audits_id - 必有 审核ID
 * @param {String} data.platform_id - 必有 平台ID
 * @param {String} data.is_cover - 是否覆盖发布
 */
export function dispense(data = {}){
    return request_post(restUrl_publish+'/api/common/issuance',data).then(res=>{
      log(res,888)
      suance({
        id:data.audits_id,
        info:res.data
			})
			return res;
    })
}