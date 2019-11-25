import { request_post, request_get, request_put, request_delete } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'


let path = pathToRegexp.compile('/system/api/publishers/:id');
let disabledPath = pathToRegexp.compile('/system/api/publishers/:id/disable');
let AppsPath = pathToRegexp.compile('/system/api/app/apps/:id');
let allowed_types = pathToRegexp.compile('/system/api/app/allowed_types/:id');
let auth = pathToRegexp.compile('/system/api/publishers/app_accesses/:id');
/**
 * 新增 or 修改
 * @param {Object} data  存储数据对象
 * @param {Array}  data.type   权限系统
 * @param {String} data.name   出版社名称，不可复用
 * @param {String} data.liaisons 联系人
 * @param {String} data.address 地址
 * @param {Number} data.phone 电话
 * @param {String} data.email 邮箱
 * @param {String} data.manager_name 管理员账号，不可重复
 * @param {Number} data.manager_pass 密码，可为空,或者不传,默认123456
 * @param {String} data.license 营业执照(图片地址)
 *
 * @param {Array} data.apps eg [{name:'',read_front_uri:''},...]
 * @param {String} data.app_id  //详情->apps->id 修改的APPID、新增时为空 
 * @param {String} data.apps[0].name 平台名称
 * @param {String} data.apps[0].read_front_uri 前台地址
 */

export function save(data) {
  if(!data.name){
    return Promise.reject('出版社名不能为空')
  }else if(data.phone && !/^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/.test(data.phone)){
    return Promise.reject('手机号不正确')
  }else if(data.email && !/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(data.email)){
    return Promise.reject('邮箱格式不正确')
  }
  //验证表单后提交
  if (data.id) {
    return request_put(path(data), data)
  }
  return request_post('/system/api/publishers', data)
}

/**
 * 出版社列表
 * @param {Object} data
 * @param {String} data.name 出版社名称
 * @param {String} data.liaisons 联系人
 * @param {Number} data.phone 电话
 * @param {String} data.manager_name 账户
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */

export function getList(data) {
  return request_get('/system/api/publishers', data)
}

/**
 * 出版社详情
 * @param {Object} data
 * @param {String} data.id 出版社ID
 */

export function detail(data) {
  return request_get(path(data), data)
}

/**
 * 删除出版社
 * @param {Object} data
 * @param {String} data.id 出版社ID
 */

 export function del(data){
    return request_delete(path(data),data)
 }

 /**
  * 禁用
  * @param {Object} data
  * @param {Object} data.id 出版社ID
  */
export function disabled({id,...data}){
   return request_put(disabledPath({id}),data);
}

/**
 * 删除一个平台
 * @param {Object} data
 * @param {Object} data.id  详情->apps->id
 */

export function delFlat(data){
   return request_delete(AppsPath(data),data);
}

/**
 * 添加一个平台
 * @param {Object} data
 * @param {Object} data.name  平台名称
 * @param {Object} data.identifier  平台名称
 * @param {Object} data.type 平台名称
 */

export function addFlat(data){
  if(data.id){
    return request_put(AppsPath(data),data);
  }
  return request_post("/system/api/app/apps",data)
}

/**
 * 允许的应用列表
 */
 export function getAllowedType(data){
   return request_get(allowed_types(data),data);
 }

 /**
  * 所有权限列表
  */
export function getAuthList(){
  return request_get("/system/api/publishers/app_accesses")
}

/**
 * 保存权限数据
 * @param {Object} data
 * @param {String} data.id 保存出版社权限
 * @param {Array} data.app_accesses 权限数组["publish_contentLibrary_digitalBook","publish_contentLibrary_3dMedia",...] 
 */
export function saveAuth(data){
  log(data,333)
  return request_put(auth(data),data)
}