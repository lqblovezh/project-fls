import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let buttonDetail = pathToRegexp.compile('/api/buttons/:id')
let buttonSort = pathToRegexp.compile('/api/buttons/sort/:id')

/**
 * 获取button列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/buttons',data)
}

/**
 * button添加或修改
 * @param {Object} data - 必有字段 名称
 * @param {String} data.name - 必有字段
 * @param {String} data.img - 必有字段 图标
 * @param {String} data.src - 必有字段 地址
 * @param {String} data.num - 必有字段 地址
 * @param {String} data.src_status - 必有字段 true或false(是否勾选地址)
 * @param {String} data.type - 添加时传 1(圆形 default)或者2(方形),修改时不传
 * @param {String} data.status - 必有字段 是否启用（true或false）
 * @param {String} data.id - 没有id是新增,有id表示修改
 */
export function save({id,...data}){
  if(id){
    return request_put(buttonDetail({id}),data)
  }
  return request_post('/api/buttons',data)
}

/**
 * button详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 按钮id
 */
export function detail({id,...data}){
  return request_get(buttonDetail({id}),data)
}

/**
 * button删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 按钮id
 */
export function del(data = {}){
  return request_post('/api/buttons/delete',data)
}

/**
 * button排序
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.status - 必有字段 备注：up或者down
 */
export function sort({id,...data}){
  return request_put(buttonSort({id}),data)
}
/**
 * 按钮前台显示选中修改
 * @param {Object} data
 * @param {String} data.type - 必有字段 1(圆形 default)或者2(方形)
 */
export function show(data = {}){
  return request_put('/api/buttons/status',data)
}