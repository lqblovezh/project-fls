import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
let toPathModify = pathToRegexp.compile('/api/qrcode_product/:id');
let detail = pathToRegexp.compile('/api/qrcode_product/:id')
let resDetail = pathToRegexp.compile('/api/qrcode_product/resource/:id')
let modifyStatus = pathToRegexp.compile('/api/qrcode_product/use/:id')

//二维码产品库
/**
 * 获取二维码产品库列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.abs - 选填 简介
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.status - 选填 上架状态(true已使用,false未使用)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}){
	return request_get('/api/qrcode_product',data)
}

/**
 * 删除二维码产品
 * @param {Object} data
 * @param {Array} data.id - 必有字段 二维码产品id
 */
export function del(data = {}){
	return request_post('/api/qrcode_product/delete',data)
}

/**
 * 修改状态(使用中/禁用)
 * @param {Object} data
 * @param {Array} data.status - 必有字段 二维码产品状态
 */
export function modifyStatus({id,...data}){
	if(id){
		return request_put(modifyStatus({id}),data)
	}
}

/**
 * 二维码产品详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.id-
 **/
export function detail({id,...data}) {
  return request_get(detail({id}), data)
}

/**
 * 新增/修改二维码产品
 * @param {Object} data
 * @param {String} data.qrcode_id - 必有字段 二维码产品id
 * @param {String} data.name - 必有字段 二维码产品名称
 * @param {String} data.abs - 必有字段 二维码产品简介
 * @param {String} data.is_show_order - 必有字段 晒单活动是否勾选（true/false)
 * @param {String} data.show_order_id -  晒单活动id
 * @param {String} data.is_retransmission - 必有字段 转发活动是否勾选（true/false)
 * @param {String} data.retransmission_id -  转发活动id
 */
 export function save({id,...data}){
 	if(id){
 		return request_put(toPathModify({id}), data)
 	}
 	return request_post('/api/qrcode_product',data)
 }

 /**
  * 资源配置详情
  * @param {Object} data
	* @param {Array} data.product_id - 必有字段 二维码产品id
	* @param {Array} data.constitute - 必有字段 二维码产品id
	* @param {Object} data.constitute.name -  资源名称
	* @param {Object} data.costitute.resource_id -  资源id
	* @param {Object} data.constitute.preview -  链接地址
  * @param {Object} data.constitute.resource_type -  资源类型
  */
 export function getResConf(data = {}){
 	return request_get(resDetail(data),data)
 }

 /**
	* 新增/修改资源配置
	* @param {Object} data
 * @param {Array} data.product_id - 必有字段 二维码产品id
 * @param {Array} data.constitute - 必有字段 二维码产品id
 * @param {Object} data.constitute.name - 必有字段 资源名称
 * @param {Object} data.resource_id - 必有字段 资源id
 * @param {Object} data.preview - 必有字段 链接地址
	* @param {Object} data.resource_type - 必有字段 资源类型
	*/
 export function saveRes({id,...data}){
	if(id){
		return request_put(resDetail({id}),data)
	}
 }
