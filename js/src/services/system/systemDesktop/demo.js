import { request_post, request_get, request_put, request_delete,request_file } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
/**
 * demo列表
 */
export function getList(data){
  return request_get("/system/api/home/demo_demo",data)
}