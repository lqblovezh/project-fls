import { request_post, request_get, request_put, request_delete,request_file } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile('/system/api/cooperations/audit/:id');
/**
 * 获取申请列表
 */
export function getList(data){
  return request_get("/system/api/cooperations/apply",data)
}

/**
 * 申请审核
 * @param {Data} data
 * @param {String} data.id
 * @param {Number} data.passed
 */

 export function audit(data){
    return request_post(toPath(data),data)
 }
/**
 * 合作申请
 */
export function save(data){
  return request_post("/system/api/cooperations/apply",data)
}

/**
 * 获取验证码
 */

export function getCode(data){
  return request_get("/system/api/captcha/image",data)
}

/**
 * 验证码验证
 */

export function checkCode(data){
  return request_post("/system/api/captcha/check",data)
}
/**
 * 验证码短信
 */

export function msg(data){
  return request_post("/system/api/captcha/mobile",data)
}