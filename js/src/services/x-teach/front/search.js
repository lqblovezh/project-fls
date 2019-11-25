import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

import pathToRegexp from 'path-to-regexp'

/**
 * 前台搜索
 * @param  {[String]} data.name   搜索类容
 * @param  {[String]} data.type   1,2  1课程，2教师
 * @return {[Promise]}
 */
export function search(data = {}) {
  return request_get('/api/home/courses_search', data)
}
/**
 * 热门搜索列表
 * @return {[Promise]}
 */
export function searchHot(data = {}) {
  return request_get('/api/home/courses_popu_search', data)
}

// function search(data = {}) {
//   return request_get('/api/home/courses_search', data)
// }

/**
 * 搜索课程
 */
export function searchCourse(data) {
  return search(Object.assign(data, { type: 1 }))
}
/**
 * 搜索教师
 */
export function searchTeacher(data) {
  return search(Object.assign(data, { type: 2 }))
}

/**
 * 获取热门搜索
 */
export function getHotSearchList(data = {}) {
  return request_get('/api/home/courses_popu_search', data)
}
