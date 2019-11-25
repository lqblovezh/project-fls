import {
  request_post,
  request_get,
  request_put,
  request_delete
} from 'services/common/request'

/**
	* 历史记录列表
	* @param {Object} data
	* @param {String} data.pageStart
	* @param {String} data.pageOffset
	* @param {String} data.pageNum
*/
export function getList(data={}){
	return request_get('/api/read_list', data)
}
