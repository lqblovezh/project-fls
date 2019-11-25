import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import { suance } from '../dbi'

/**
 *课件列表
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
  return request_get(restUrl_publish + '/api/course_ware', data)
}
/**
 * 课件新增 或者修改  有ID就修改没ID新增
 * @param {Object} data
 * @param {String} data.name  课件名称
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
export function save({ id, ...data }) {
  if (id) {
    return request_put(`${restUrl_publish}/api/course_ware/${id}`, data)
  }
  return request_post(restUrl_publish + '/api/course_ware', data)
}
/**
 * 获取课件信息
 * @param {Object} data
 * @param {String} data.id - 必有 课件id
 */
export function getInfo(data = {}) {
  let coursewareInfo = pathToRegexp.compile(restUrl_publish + '/api/course_ware/:id')
  return request_get(coursewareInfo(data))
}
/**
 * 课件删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data = {}) {
  return request_post(restUrl_publish + '/api/course_ware/delete', data)
}

/**
 * 加急审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要加急审核的产品信息id
 */
export function urgentDigital(data = {}) {
  return request_put(restUrl_publish + '/api/course_ware/urgent', data)
}

/**
 * 课件审核
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要审核的产品信息id
 */
export function audits(data = {}) {
  return request_put(restUrl_publish + '/api/course_ware/audits', data)
}

/**
 * 分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要加急审核的产品信息id
 * @param {String} data.platforms -  //类型：String  可有字段  备注：分发平台，X-READ => 1 ，微信公众平台 => 2 ，微博 => 3
 */
export function issuance({ id, ...data } = {}) {
  let toPathIssuance = pathToRegexp.compile(
    restUrl_publish + '/api/comproduct/:id/issuance'
  )
  return request_put(toPathIssuance({ id }), data).then(res => {
    suance({
      id,
      info: res.data,
    })
    return res
  })
}

/**
 * 新增课件分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 分组名称
 */
export function addGroup(data = {}) {
  return request_post(restUrl_publish + '/api/course_ware/groups', data)
}

/**
 * 修改课件分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup(data = {}) {
  let toPathGroupModify = pathToRegexp.compile(
    restUrl_publish + '/api/course_ware/:id/groups'
  )
  return request_put(toPathGroupModify(data), data)
}

/**
 * 删除课件分组
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup(data = {}) {
  return request_delete(
    restUrl_publish + '/api/course_ware/groups/' + data.id[0],
    data
  )
}

/**
 * 课件分组列表
 * @return {Promise}
 */
export function listGroup(data = {}) {
  return request_get(restUrl_publish + '/api/course_ware/groups', data)
}

/**
 * 课件分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.old_group_id - 必有 要移动到的分组ID
 * @param {String} data.new_group_id - 必有 当前的所属分组ID
 * @param {Array} data.rel_id - 必有 要移动的id
 */
export function moveGroup(data = {}) {
  data.rel_id = data.id
  delete data.id
  return request_put(restUrl_publish + '/api/groups/course_ware', data)
}
