import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
// import * as book from './mediaBook'
// import * as theme from './mediaTheme'
import pathToRegexp from 'path-to-regexp'

let columnDetail = pathToRegexp.compile('/api/date_cate/:id')
let columnInfo = pathToRegexp.compile('/api/recommend/:id')
let columnInfoSort = pathToRegexp.compile('/api/recommend/sort/:id')
let columnSort = pathToRegexp.compile('/api/date_cate/sort/:id')
let columnInfoSelect = pathToRegexp.compile('/api/date_cate/info_select/:id')

/**
 * 获取column列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
  return request_get('/api/date_cate', data)
}

/**
 * column添加或修改
 * @param {Object} data
 * @param {String} data.name - 必有字段
 * @param {String} data.tmp - 必有字段
 * @param {String} data.id - 没有id是新增，有id表示修改
 */
export function save({ id, ...data }) {
  if (id) {
    return request_put(columnDetail({ id }), data)
  }
  return request_post('/api/date_cate', data)
}

/**
 * column详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 */
export function detail({ id, ...data }) {
  return request_get('/api/recommend/list', data)
}

/**
 * column删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 栏目id
 */
export function del(data = {}) {
  return request_delete(columnDetail({ id: data.id }))
}

/**
 * column排序
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.status - 必有字段  备注：up或者down
 */
export function sort({ id, ...data }) {
  return request_put(columnSort({ id }), data)
}

/**
 * 栏目详情列表
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getInfoList(data = {}) {
  return request_get('/api/recommend/list', data)
}

/**
 * 栏目详情列表所有选中
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 */

export function getInfoSelect(data = {}) {
  return request_get(columnInfoSelect(data), data)
}

/**
 * 栏目详情添加
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 * @param {Array} data.bid - 必有字段 书iD
 */
export function infoAdd(data = {}) {
  return request_post('/api/recommend', data)
}

/**
 * 栏目详情删除
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 * @param {Array} data.bid - 必有字段 书iD
 */
export function infoDel(data = {}) {
  return request_delete(columnInfo({ id: data.id }), data)
}

/**
 * 栏目详情修改排序
 * @param {Object} data
 * @param {String} data.id - 必有字段 栏目id
 * @param {Array} data.bid - 必有字段 书iD
 * @param {String} data.status - 必有字段  备注：up或者down
 */
export function infoSort({ id, ...data }) {
  return request_put(columnInfoSort({ id }), data)
}

/**
 * 获取书籍或者主题列表
 * @param {Object} data
 * @param {String} data.type - 必有字段 (book书籍,theme主题)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function productList({ type, ...data }) {
  if (type == 'book') {
    return book.getList({ ...data, status: 1 }).then(res => {
      //TODO:演示的临时方案！
      let data = res.data
      data.forEach(element => {
        const { books_info, id } = element
        element = Object.assign(element, books_info)
        element.bid = books_info.id
        element.id = id
      })
      return res
    })
  }
  return theme.getList({ ...data, status: 1 })
}

/**
 * 获取书籍或者主题列表
 * @param {Object} data
 * @param {String} data.type - 必有字段 (book书籍,theme主题)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function recommend({ id, ...data }) {
  return request_put(columnInfo({ id }), data)
}
