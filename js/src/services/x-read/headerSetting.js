import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let cityDetail = pathToRegexp.compile('/api/head_books/:id')
let citySort = pathToRegexp.compile('/api/head_books/sort/:id')

/**
 * 书城头部列表
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.color
 */
export function getList(data={}){
  return request_get('/api/head_books',data)
}

/**
 * 书城头部添加或修改
 * @param {Object} data
 * @param {String} data.name - 必有字段
 * @param {String} data.img - 必有字段
 * @param {String} data.id - 没有id是新增，有id表示修改
 */
export function save({id,...data}){
  if(id){
    return request_put(cityDetail({id}),data)
  }
  return request_post('/api/head_books',data)
}

/**
 * 书城头部详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 头部id
 */
export function detail({id,...data}){
  return request_get(cityDetail({id}),data)
}

/**
 * 书城头部设置删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 头部id
 */
export function del(data = {}){
  return request_post('/api/head_books/delete',data)
}

/**
 * 书城头部排序
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.status - 必有字段  备注：up或者down
 */
export function sort({id,...data}){
  return request_put(citySort({id}),data)
}