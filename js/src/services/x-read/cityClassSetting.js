import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let cityDetail = pathToRegexp.compile('/api/categorys/:id')

/**
 * 书城分类列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/categorys',data)
}

/**
 * 书城分类添加
 * @param {Object} data - 必有字段 名称
 * @param {String} data.name - 必有字段 图标
 * @param {String} data.img - 必有字段 图标
 * @param {String} data.pid - 选填 分类的父id(如果不存在表示新建顶级分类,若存在表示新建二级分类)
 */
export function add(data = {}){
  return request_post('/api/categorys',data)
}

/**
 * 书城分类修改
 * @param {Object} data - 必有字段 名称
 * @param {String} data.name - 必有字段 分类名称
 * @param {String} data.img - 选填 分类图标(只有顶级分类才有分类图标)
 * @param {String} data.number - 必有字段 分类顺序
 * @param {String} data.id - 必有字段 分类id
 */
export function modify({id,...data}){
  return request_put(cityDetail({id}),data)
}

/**
 * 书城分类详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 分类id
 */
export function detail({id,...data}){
  return request_get(cityDetail({id}),data)
}

/**
 * 书城分类设置删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 分类id
 */
export function del(data = {}){
  return request_post('/api/categorys/delete',data)
}

/**
 * 书城获取顶级分类
 * @param {Object} data
 */
export function top(data = {}){
  return request_get('/api/categorys/top',data)
}