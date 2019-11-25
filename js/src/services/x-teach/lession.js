import * as $ from '../common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile("/api/classify/find_children/:id");
let path = pathToRegexp.compile("/api/classify/find_parent/:id");
let dpath = pathToRegexp.compile("/api/classify/:id");
/**
 * @description 直播列表
 * @param {Object} data
 * @param {String} data.id 直播名称
 */

export function getList(data){
  return $.request_get('/api/classify/tree',data)
}
export function find_children(data){
   return $.request_get(path(data))
}

/**
 * @description 新增或保存
 * @param {Object} data
 * @param {String} data.pid  父ID 顶级为0
 * @param {String} data.name 分类名称
 */

export function save(data){
  if(data.id){
   // return $.request_put(toPath(data),data)
  }
  return $.request_post('/api/classify',data)
}

/**
 * 删除
 * @param {Object} data
 * @param {String} data.id
 */
export function del(data){
  return $.request_delete(dpath(data),data);
}

/* 移动端API */