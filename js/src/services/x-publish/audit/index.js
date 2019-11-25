import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

/**
 * 发布审核详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function modifyAudit({id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/audits/:id');
  return request_get(toPath({id}),data)
}

/**
 * 新增单行审核数据
 * @return {Promise}
 * @param {String} data.foreign_id
 * @param {String} data.name
 * @param {String} data.summary
 * @param {String} data.type
 * @param {String} data.platforms
 * @param {String} data.submit
 * @param {String} data.status
 * @param {String} data.urgent
 * @param {String} data.url
 * @param {String} data.picture
 */
export function addOneAudit(data = {}) {
  return request_post(restUrl_publish+'/api/audits', data)
}

/**
 * 发布审核获取列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称
 * @param {String} data.tag - 标签
 * @param {String} data.submit - 提交人
 * @param {String} data.start_time - 开始时间
 * @param {String} data.end_time - 结束时间
 * @param {String} data.order - 排序
 * @param {String} data.type - 类型
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function listAudit(data = {}) {
    return request_get(restUrl_publish+'/api/audits',data)
}

/**
 * 审核通过
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function auditPass(data = {}) {
    return request_post(restUrl_publish+'/api/audits/pass',data)
}

/**
 * 驳回申请
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id 
 */
export function auditReject(data = {}) {
    return request_post(restUrl_publish+'/api/audits/reject',data)
}
