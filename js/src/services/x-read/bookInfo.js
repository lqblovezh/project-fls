import { request_post, request_get, request_put, request_delete } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let bookInfo = pathToRegexp.compile('/api/books/:id/XSearch')
let infoUrl = pathToRegexp.compile('/api/books/:id/home_info')
let themeUrl = pathToRegexp.compile('/api/theme/:id/book_info')
let courseUrl = pathToRegexp.compile('/api/course_ware/:id/home_info')

/**
 * 图书详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 书籍id
 */
export function info(data = {}) {
  return request_get(infoUrl(data), data)
}

/**
 * X一下list
 * @param {Object} data
 * @param {String} data.id - 必选 书籍id
 */
export function xList(data = {}) {
  return request_get(bookInfo(data), data)
}

/**
 * X一下  确定
 * @param {Object} data
 * @param {String} data.id - 必选 书籍id
 * @param {Array} data.ids - 知识点id
 */
export function xInfo(data = {}) {
  return request_put(bookInfo(data), data)
}

/**
 * 进入听视读 详情
 * @param {Object} data
 * @param {String} data.id - 必选 图书id
 * @param {String} data.type - 必选(1听读,2视读,3电子书)
 */
export function getMedia(data = {}) {
  return request_get('/api/books/get_content', data)
}
/**
 * 进入课件
 * @param {Object} data
 * @param {String} data.id - 必选 图书id
 */
export function getCourse(data = {}) {
  return request_get(courseUrl(data), data)
}

/**
 *
 * @param {*} data
 * @param {String} data.book_id  - 图书id
 * @param {String} data.text
 */
export function bookComment(data) {
  return request_post('/api/home/book_comments', data)
}

/**
 * 获取图书评论
 * @param {*} data
 * @param {String} data.book_id  - 图书id
 */
export function getBookComment(data) {
  return request_get('/api/home/book_comments', data)
}

/**
 * 图书点赞
 * @param {*} data
 * @param {String} data.id  - 评论id
 */
export function bookCommentUp(data) {
  return request_put('/api/home/book_comments', data)
}

/**
 * 图书推荐
 * @param {*} data
 * @param {String} data.id  - id
 */
export function bookRelate(data) {
  return request_get('/api/relation', data)
}

/**
 * 
 * @param {*} data
 * @param {String} data.id  - 图书id
 * @param {String} data.type  - 1 听读 2 视读 3电子书
 */
export function getAccessCode(data) {
  return request_get('/api/books/get_access_code', data)
}

/**
 *
 * @param {*} data
 * @param {*} data.id  - 主题id
 * @param {*} data.book_id  - 主题id
 */
export function getThemeBookDetail(data) {
  return request_get(themeUrl(data), data)
}
