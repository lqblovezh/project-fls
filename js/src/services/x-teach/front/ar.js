import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 获取AR列表
 * @param {Object} data 
 */
export function queryARList(data = {}) {
  return request_get(`/api/ar/models`, data)
}