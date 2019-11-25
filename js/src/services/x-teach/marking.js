import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let detailUrl = pathToRegexp.compile('/api/courses/user_paper/:id')

/**
 * 获取课程列表
 * @param {Object} data
 * @param {String} data.name - 选填 课程号
 * @param {String} data.status - 选填 状态(1未阅卷,0已阅卷)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/course_paper',data)
}

/**
 * 课程详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 课程id
 */
export function detail(data = {}){
  return request_get(detailUrl(data))
}

/**
 * 课程删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 课程id
 */
export function del(data = {}){
  return request_post('/api/course_paper/delete',data)
}

/**
 * 阅卷
 * @param {Object} data
 * @param {Array} data.id - 必有字段 课程id
 */
export function save(data = {}){
  return request_post('/api/courses/teach_paper_answer',data)
}


