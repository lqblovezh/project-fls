import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取直播列表
 * @param  {[Number]} options.id   一级分类id
 * @param  {[Object]} options.data [description]
 * @return {[Promise]}                 [description]
 */
export function getList(data = {}) {
  return request_get('/api/live/front_all', data)
}
