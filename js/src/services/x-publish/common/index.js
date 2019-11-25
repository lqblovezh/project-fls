import qs from 'qs'
import { request_post, request_get } from 'services/common/request'
import config from '../../config'
import { addResListener } from '../dbi'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取sessin里的userInfo
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function getUserInfo() {
  return qs.parse(window.sessionStorage.getItem('userInfo'))
}

/**
 * 获取默认图片
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function getDefaultCover() {
  return request_get(restUrl_publish + '/api/videos/images')
}

let commonPreviewPath = pathToRegexp.compile(
  restUrl_publish + '/api/preview/:id'
)

/**
 * 预览详情
 * @param {Object}  data - 传入对象
 * @param {String}  data.id - 传入对象
 */
export function commonPreview(data = {}) {
  return request_get(commonPreviewPath(data))
}

/**
 * 生成预览地址和二维码
 * @param {Object}  data - 传入对象
 * @param {Object}  data.entity_type -
 * @param {Object}  data.entity - 传入对象
 */
export function commonPreviewCode(data = {}) {
  return request_post(restUrl_publish + '/api/preview', data)
}

/**
 * App应用
 * @return {Promise}
 * @param {Object} data - 传入对象
 * @param {String} data.id - 传入对象
 */
export function platInfo(data = {}) {
  let platUrl = pathToRegexp.compile(restUrl_publish + '/api/current')
  return request_get(platUrl(data)).then(res => {
    config.app_id = res.data.id
    sessionStorage.app_id = res.data.id
    document.title = res.data.application
      ? res.data.application.name
      : res.data.publisher.name
    return res
  })
}

let exportUrl = pathToRegexp.compile(
  restUrl_publish + '/api/content/export/:id'
)
/**
 * 导出详情地址获取
 * @param {Object}  data - 传入对象
 * @param {Object}  data.id - 后台获取id
 */
export function fileExport(data = {}) {
  return request_get(exportUrl(data))
}

/**
 * 删除分组
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 * */
export function groupsDelete(data = {}) {
  return request_post(restUrl_publish + '/api/groups/delete', data)
}
