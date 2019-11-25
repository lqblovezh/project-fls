import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

import {getList as resourceList} from './resource.js';
import {getList as listQrcodeResource} from './qrcode'
import {getList as listDissert} from './dissertation'
let detail = pathToRegexp.compile('/api/books/:id');
let toPathModify = pathToRegexp.compile('/api/books/:id');
let delQrcode = pathToRegexp.compile('/api/books/qrcode/:id');
//图书库
/**
 * 获取图书库列表
 * @param {Object} data
 * @param {String} data.name - 必填 名称
 * @param {String} data.start_time - 必填 开始时间
 * @param {String} data.end_time - 必填 结束时间
 * @param {String} data.status - 必填 上架状态(true已使用,false未使用)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function booksList(data = {}){
	return request_get('/api/books',data)
}

/**
 * 删除图书库
 * @param {Object} data
 * @param {Array} data.id - 必有字段 二维码id
 */
export function del(data = {}){
	return request_post('/api/books/delete',data)
}

/**
 * 图书库详情
 * @return {promise}
 * @param {Object} data
 * @param {String} data.pageStart -
 **/
export function detail({id,...data}) {
  return request_get(detail({id}), data)
}

/**
 * 图书库详情添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type - 1->图片集 2->音频集 3->视频集 4->文章集 5->数字图书集 6->二维码库
 * @param {String} data.name
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getMainList({type,...data}) {
    log(type,data)
    switch (type) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
				return resourceList({type,...data});
				break;
			case "6":
				return listQrcodeResource(data);
				break;
			case "7":
				return listApplication(data);
				break;
			case "8":
				return listDissert(data);
				break;
			case "9":
				return booksList(data);
				break;
      default:
        return resourceList({type,...data});
        break;
    }
}

/**
 * 应用list
 * @param {Object} data
 */
function listApplication(data) {
	return request_get(`/api/${data.product_type}`)
}

/**
 * 新增/修改图书
 * @param {Object} data
 * @param {String} data.id - 必有字段 二维码id
 */
export function save({id,...data}){
	if(id){
		return request_put(toPathModify({id}),data)
	}
	return request_post('/api/books',data)
}

/**
 * 新增二维码
 * @param {Object} data
 * @param {String} data.id - 必有字段 二维码id
 */
export function addQrcode(data = {}){
	return request_post('/api/books/qrcode',data)
}

/**
 * 删除二维码
 * @param {Object} data
 * @param {Array} data.id - 必有字段 二维码id
 */
export function delQrcode({id,...data}){
	return request_delete(delQrcode({id}),data)
}
 /**
	* 二维码导出
	* @param {Object} data
	* @param {Array} data.id
  */

 export function educe(data){
	return request_get('/api/books/export',data)
}