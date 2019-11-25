import {request_post,request_get,request_put,request_delete,request_file} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
/**
 * 获取首页信息
 * @return {Promise}
 */
export function homeInfo() {
    return request_get(restUrl_publish+'/api/home/statistics')
}
/**
 * 首页全书导入
 * @return {Promise}
 * @param {Object} data
 * @param {String} temp
 */
 export function sendTemp(data = {}) {
   return request_post(restUrl_publish+'/api/articles/book_temp/import', data)
 }

/**
 * 获取模板地址
 * @return {Promise}
 */
export function getTplUrl() {
  return request_get(restUrl_publish+'/api/temp_address')
}
