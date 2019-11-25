import { request_post, request_get, request_put, request_delete,request_file } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile('/system/api/demo_demo/:id');

/**
 * demo列表
 */
 export function getList(data){
   return request_get("/system/api/demo_demos",data)
 }

 /**
  * 修改 or 添加
  * @param {Object} data
  * @param {String} data.id  修改数据的ID 
  * @param {String} data.name
  * @param {String} data.img 图片path
  * @param {String} data.img_code 二维码Path
  * @param {String} data.text 介绍内容
  */

export function save(data){
  log(data,888)
  if(data.id){
    return request_put(toPath(data),data)
  }
  return request_post('/system/api/demo_demo',data)
}

/**
 * 删除
 * @param {Object} data
 * @param {Array} data.id
 */

export function del(data){
  return request_post('/system/api/demo_demo/delete',data)
}