import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

const teacherReg = pathToRegexp.compile('/api/user/teachers/:id')
const courseReg = pathToRegexp.compile('/api/home/courses_search/:id')
const classReg = pathToRegexp.compile('/api/class/teacher/:id')

/**
 * 获取教师列表
 */
export function getTeacherList(data = {}) {
  return request_get('/api/user/teachers', data)
}

/**
 * 获取教师详细信息
 * @param  {Object} data [description]
 * @param  {Object} data.id [description]
 */
export function getDetailTeacher(data = {}) {
  return request_get(teacherReg(data))
}

/**
 * 关注教师
 * @param  {Object} data [description]
 * @param  {Object} data.id 教师id
 */
export function sendFollowRequest(data = {}) {
  return request_post(`/api/user/follow/${data.id}`)
}

/**
 * 取消关注教师
 * @param  {Object} data
 * @param  {Object} data.id
 */
export function cancelFollowedRequest(data = {}) {
  return request_delete(`/api/user/follow/${data.id}`)
}

/**
 * 获取当前用户关注的教师列表
 * @param  {Object} data [description]
 * @param  {String} data.id 用户id，当前用户不用传
 */
export function getMyFollowList(data = {}) {
  return request_get('/api/user/my_follows', data)
}

/**
 * 获取某个教师下的课程
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export function getCourseByTid(data = {}) {
  return request_get(courseReg(data), data)
}

/**
 * 获取直播列表
 * @param  {[Number]} options.id   一级分类id
 * @param  {[Object]} options.data [description]
 * @return {[Promise]}                 [description]
 */
export function getLivesByTid(data = {}) {
  return request_get('/api/live/front_all', data)
}

/**
 * 获取某个教师下的班级
 * @param  {Object} data [description]
 * @return {[Promise]}      [description]
 */
export function getClassByTid(data = {}) {
  return request_get(classReg(data), data)
}

/**
 * 取消或关注老师
 * @param  {Object} data [description]
 * @return {[Promise]}      [description]
 */
export function follow({ type, ...data } = {}) {
  if (type) {
    return sendFollowRequest(data)
  }
  return cancelFollowedRequest(data)
}

/**
 * 教师留言列表
 * @param  {Object} data    [description]
 * @param  {String} data.id [教师id]
 * @return {[Promise]}      [description]
 */
export function getTeacherMessage(data = {}) {
  return request_get('/api/message/leave_word', {
    to_user_id: data.id,
    ...data,
  })
}
