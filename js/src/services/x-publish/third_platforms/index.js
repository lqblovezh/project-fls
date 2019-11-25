import {request_post,request_get,request_put,request_delete,request_file} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取已授权帐号列表
 * @return {Promise}
 * @param {Object} data
 */
export function getList(data = {}) {
    return request_get(restUrl_publish+'/api/platforms',data)
}

/**
 * 取消授权
 * @return {Promise}
 * @param {Object} data
 * */
export function cancelAuthorize(data = {}) {
  let toPathCancel = pathToRegexp.compile(restUrl_publish+'/api/platforms/cancel/:id')
  return request_put(toPathCancel(data),data)
}

/**
 * 获取微信授权地址
 * @return {Promise}
 * @param {Object} data
 * */
export function detail(data = {}) {
    return request_get(restUrl_publish+'/api/wechat/wxauth')
}
