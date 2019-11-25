import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let bookCity = pathToRegexp.compile('/api/home/book_city/:id')
let category = pathToRegexp.compile('/api/home/category_book/:id')

/**
 * 前台书城列表（差包含数量）
 * @param {Object} data
 */
export function cityList(data={}){
  return request_get('/api/home/book_city',data)
}

/**
 * 首页书城子集分类
 * @param {Object} data
 * @param {String} data.id - 必选
 */
export function citycolumn(data={}){
  return request_get(bookCity(data),data)
}

/**
 * 首页书城分类下书列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.id - 必选
 */
export function categoryList(data={}){
  return request_get(category(data),data)
}