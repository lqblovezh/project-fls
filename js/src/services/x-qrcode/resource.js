import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
let toPathModify = pathToRegexp.compile('/api/qrcode/:id');
let detail = pathToRegexp.compile('/api/qrcode_resource/:id')
let delQrcode = pathToRegexp.compile('/api/qrcode_resource/delete')

//资源库
/**
 * 获取资源库列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.username - 选填 所属用户
 * @param {String} data.product_type - 必选 pictures=>图片集，videos=>视频集,audios=>音频集,articles=>文章集，books =>数字图书集
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.status - 选填 上架状态(true已使用,false未使用)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}){
	return request_get('/api/qrcode_resource',data)
}

/**
 * 删除二维码资源
 * @param {Object} data
 * @param {Array} data.id - 必有字段 资源id
 */
export function del(data = {}){
	return request_post(delQrcode(data),data)
}

/**
 * 资源详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function detail(data={}) {
  return request_get(detail(data), data)
}

/**
 * 创建/修改资源
 * @param {Object} data
 * @param {String} data.id - 必有字段 资源id
 */
 export function save({id,...data}){
 	if(id){
 		return request_put(toPathModify({id}), data)
 	}
 	return request_post('/api/qrcode',data)
 }
