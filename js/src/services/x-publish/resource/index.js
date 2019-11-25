import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import {
  createProListener,
  suance
} from '../dbi'


/**
 *资源列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称搜索参数
 * @param {String} data.start_time - 开始时间
 * @param {String} data.end_time - 结束时间
 * @param {String} data.status
 * @param {String} data.group_id
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
    return request_get(restUrl_publish+'/api/resource',data);
}

/**
 * 资源新增 或者修改  有ID就修改没ID新增
 * @param {Object} data
 * @param {String} data.name  资源名称
 * @param {String} data.img 图片地址
 * @param {String} data.abs
 * @param {String} data.x_read.author
 * @param {String} data.x_read.tag
 * @param {String} data.e_commerce.out_of_print
 * @param {String} data.e_commerce.have_print
 * @param {String} data.e_commerce.author
 * @param {String} data.e_commerce.subject_terms
 * @param {String} data.e_commerce.clc_category
 * @param {String} data.e_commerce.cp_category
 * @param {String} data.e_commerce.describe
 * @param {String} data.e_commerce.editor_recommend
 */
export function save({id,...data}) {
    if(id) {
      let infoPath = pathToRegexp.compile(restUrl_publish+'/api/resource/:id')
      return request_put(infoPath({id}),data)
    }
    return request_post(restUrl_publish+'/api/resource',data)
}
/**
 * 获取资源信息
 * @param {Object} data
 * @param {String} data.id - 必有 资源id
 */
export function getInfo(id){
  let coursewareInfo = pathToRegexp.compile(restUrl_publish+'/api/resource/:id')
  return request_get(coursewareInfo({id}))
}
/**
 * 资源删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data = {}) {
    return request_post(restUrl_publish+'/api/resource/delete',data);
}

/**
 * 加急审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要加急审核的产品信息id
 */
export function urgentDigital(data = {}) {
    return request_put(restUrl_publish+'/api/resource/urgent',data);
}

/**
 * 资源审核
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要审核的产品信息id
 */
export function audits (data = {}) {
    return request_put(restUrl_publish+'/api/resource/audits',data)
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
    return res;
  });
}