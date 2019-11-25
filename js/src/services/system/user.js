//用户列表
import { request_post, request_get, request_put, request_delete } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let path = pathToRegexp.compile('/system/api/app_manager/managers/:id');
/**
 * 用户列表
 * @param {Object} data
 * @param {String} data.name 搜索 用户名
 * @param {String} data.nick_name 搜索 名称（昵称）
 * @param {String} data.phone 搜索 电话
 * @param {String} data.email 搜索 邮箱
 * @param {String} data.time_start 搜索 开始时间（日期格式   如： 2018-03-11）
 * @param {String} data.time_end 搜索 结束时间（日期格式   如： 2018-03-11）
 */

 export function getList(data={}){
   return request_get("/system/api/app_manager/managers",data)
 }

 /**
  * 删除用户
  * @param {Object} data
  * @param {Array} data.id [id1,id2]
  */
export function del(data={}){
  return request_post("/system/api/app_manager/managers/delete",data)
}

/**
 * 用户详情
 * @param {Object} data
 * @param {String} data.id
 */
export function detail(data={}){
  return request_get(path(data),data)
}

/**
 * 用户新增
 * @param {Object} data
 * @param {String} data.name 用户名
 * @param {String} data.nick_name 名称(昵称)
 * @param {String} data.phone 电话
 * @param {String} data.email 邮箱
 * @param {String} data.reset_pass
 */

export function save({id,...data}){
  //log(data,id);
  if(id){
    return request_put(path({id}),data)
  }
  return request_post("/system/api/app_manager/managers",data).then(res=>{
		  if(data.apps && data.apps.length){
				data.apps.forEach(e=>{   
          authorize({manager_id:res.data.id,app_id:e.id})
			  })
			}
			 return res
  });
}

/**
 * 出版社列表
 * @param {Object} data
 * @param {String} data.name 出版社名称
 */

 export function getApps(data={}){
   return request_get("/system/api/publishers",data);
 }

/**
 * 用户授权APP
 * @param {Object} data
 * @param {String} data.manager_id 用户id
 * @param {String} data.app_id 应用ID
 */

export function authorize(data={}){
  return request_post("/system/api/app_manager/managers/app_authorize",data)
}

/**
 * 取消用户授权APP
 * @param {Object} data
 * @param {String} data.manager_id 用户id
 * @param {String} data.app_id 应用ID
 */

export function revoke(data={}){
  return request_post("/system/api/app_manager/managers/app_revoke",data)
}
