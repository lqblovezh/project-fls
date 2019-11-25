import * as $ from '../common/request'
import pathToRegexp from 'path-to-regexp'
import qs from 'qs'
let toPath = pathToRegexp.compile("/api/setting/:id");
let lives = pathToRegexp.compile("/api/live/online/:id");
let state = pathToRegexp.compile("/api/live/state/:id");
let course = pathToRegexp.compile("/api/recommend/:id");
/**
 * @description 列表
 * @param {Object} data
 * @param {String} data.radio 网站编辑类型 bannner_pc,banner_mobile,ad,bottom
 */

export function getList(data){
  return $.request_get('/api/setting/all',data)
}

/**
 * @description 新增或保存
 * @param {Object} data
 * @param {String} data.key  类型
 * @param {String} data.value Json
 * @param {String} data.type 1 文本 2 图片
 */

export function save(data){
  if(data.id){
    return $.request_put(toPath(data),data)
  }
  return $.request_post("/api/setting",data)
}

/**
 * 删除
 * @param {Object} data
 * @param {String} data.id
 */
export function del(data){
  return $.request_delete(toPath(data),data)
}
/**
 * 移动文件
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.temp - 临时文件路径
 */
export function files_move(data){
  return $.request_put("/api/setting/files_move",data);
}

/**
 * 推荐设置添加与修改 
 * @param {Object} data
 * @param {String} data.ids 添加的ID []
 */
export function recommend(data){
  return $.request_post('/api/recommend',data)
}

/**
 * 获取推荐设置列表
 * @param {Object} data
 * @param {String} data.type
 */

 export function courseList(data){
   return $.request_get('/api/recommend/list',data)
 }

 /**
  * 删除推荐设置列表
  */
 export function courseDel(data){
    return $.request_delete(course({id:data.id}),data)
 }

/**
 * 获取教师列表
 */
export function teacherList(){
  return $.request_get('/common/api/user/users/teacher')
}