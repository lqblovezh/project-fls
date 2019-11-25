import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

//法律社数字产品库二维码产品

/**
 * 二维码列表
 * @return {promise}
 * @param {Object} data
 * @param {String} data.name - 产品名称
 * @param {String} data.start_time - 开始时间
 * @param {String} data.end_time - 结束时间
 * @param {String} data.product_type - 必选 pictures=>图片集，videos=>视频集,audios=>音频集,articles=>文章集，books =>数字图书集
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 **/
export function getList(data = {}) {
  return request_get(restUrl_publish+'/api/qrcode', data)
}

/**
 * 二维码加急
 * @return {Promise}
 * @param {Object} data
 **/
export function urgentDigital(data = {}) {
  return request_put(restUrl_publish+'/api/qrcode/urgent', data)
}

/**
 * 产品审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要审核的产品信息id
 */
export function audits(data = {}) {
  return request_put(restUrl_publish+'/api/qrcode/audits', data)
}

/**
 * 二维码添加/修改
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function save({ id, ...data }) {
  if (id) {
    let detail = pathToRegexp.compile(restUrl_publish+'/api/qrcode/:id')
    return request_put(detail({ id }), data)
  }
  return request_post(restUrl_publish+'/api/qrcode', data)
}

/**
 * 二维码详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function detail(data = {}) {
  let detail = pathToRegexp.compile(restUrl_publish+'/api/qrcode/:id')
  return request_get(detail(data), data)
}

/**
 * 二维码删除
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function del(data = {}) {
  return request_post(restUrl_publish+'/api/qrcode/delete', data)
}

/**
 * 二维码产品分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {Object} data.name
 **/
export function modifyGroup({ id, ...data } = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/qrcode/groups/:id')
  return request_put(
    toPathGroup({
      id,
    }),
    data
  )
}

/**
 * 二维码产品产品分组列表
 * @return {Promise}
 * @param {Object} data
 **/
export function listGroup(data = {}) {
  return request_get(restUrl_publish+'/api/qrcode/groups', data)
}

/**
 * 二维码产品分组新增
 * @return {Promise}
 * @param {Object} data
 **/
export function addGroup(data = {}) {
  return request_post(restUrl_publish+'/api/qrcode/groups', data)
}

/**
 * 二维码产品分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Object} data.name
 **/
export function deleteGroup({ id, ...data } = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/qrcode/groups/:id')
  return request_delete(
    toPathGroup({
      id,
    }),
    data
  )
}

/**
 * 二维码产品分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.new_group_id -要移动到的分组id
 * @param {String} data.old_group_id -当前的所属分组id
 **/
export function moveGroup(data = {}) {
  data.rel_id = data.id
  delete data.id
  return request_put(restUrl_publish+'/api/groups/qrcode', data)
}
