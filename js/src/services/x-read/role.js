import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let userDetail = pathToRegexp.compile('/api/user/roles/:id')

/**
 * 会员角色列表
 * @param {Object} data
 * @param {String} data.name - 选填 用户名
 * @param {String} data.role - 添加时传 角色
 * @param {String} data.time_start - 选填 开始时间
 * @param {String} data.time_end - 选填 结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/user/roles',data)
}

/**
 * 会员角色添加或修改
 * @param {Object} data
 * @param {String} data.name - 必有字段 角色名
 * @param {String} data.exp - 必有字段 角色简介
 * @param {String} data.id - 角色id 有表示修改，没有表示添加
 */
export function save({id,...data}){
  if(id){
    return request_put(userDetail({id}),data)
  }
  return request_post('/api/user/roles',data)
}

/**
 * 会员角色详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 角色id
 */
export function detail(data = {}){
  return request_get(userDetail(data),data)
}

/**
 * 会员角色删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 角色ID
 */
export function del(data = {}){
  return request_post('/api/user/roles/delete',data)
}