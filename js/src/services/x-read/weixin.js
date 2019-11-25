import {request_post,request_get,request_put,request_delete} from 'services/common/request'
/**
 * 获取access-token
 * @return {Object}
 * @param {Object} data
 * @param {String} data.grant_type
 * @param {String} data.appId
 * @param {String} data.secret
 */
export function getAccessToken(data = {}) {
	return request_get('http://127.0.0.1:8081/common/third/wx_js_sdk/config', data)
}
