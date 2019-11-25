import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let bannerDetail = pathToRegexp.compile('/api/banners/:id')
let bannerSort = pathToRegexp.compile('/api/banners/sort/:id')

/**
 * 获取banner列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/banners',data)
}

/**
 * banner添加或修改
 * @param {Object} data
 * @param {String} data.banner - 必有字段
 * @param {String} data.src - 必有字段
 * @param {String} data.id - 没有id是新增，有id表示修改
 */
export function save({id,...data}){
  if(id){
    return request_put(bannerDetail({id}),data)
  }
  return request_post('/api/banners',data)
}

/**
 * banner详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 banner id
 */
export function detail({id,...data}){
  return request_get(bannerDetail({id}),data)
}

/**
 * banner删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 banner id
 */
export function del(data = {}){
  return request_post('/api/banners/delete',data)
}

/**
 * banner排序
 * @param {Object} data
 * @param {String} data.id - 必有字段 banner id
 * @param {String} data.status - 必有字段  备注：up或者down
 */
export function sort({id,...data}){
  return request_put(bannerSort({id}),data)
}