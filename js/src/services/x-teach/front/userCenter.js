import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let teacherUrl = pathToRegexp.compile('/api/user/follow/:id')
let messageUrl = pathToRegexp.compile('/api/message/front/:id')
let orderUrl = pathToRegexp.compile('/api/order/:id')

/**
 * 获取课程学习列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function courseList(data = {}) {
  return request_get('/api/home/user_courses/speed_info', data)
}

/**
 * 课程学习删除
 * @param  {Object} data
 * @param  {[Array]} data.id           [description]
 * @return {[Promise]}                 [description]
 */
export function courseDel(data = {}) {
  return request_post('/api/home/user_courses/speed_delete', data)
}

/**
 * 获取班级记录列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function classList(data = {}) {
  return request_get('/api/class/student', data)
}

/**
 * 获取班级记录列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function classDel(data = {}) {
  return request_post('/api/home/user_courses/banji/speed_delete', data)
}

/**
 * 获取消息列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @param  {[String]} data.type        [system_message->系统消息','answering_question->教师答疑','private_message->私信']
 * @return {[Promise]}                 [description]
 */
export function messageList(data = {}) {
  switch (data.type) {
    case 'answer':
      data.type = 'answering_question'
      break
    case 'discuss':
      data.type = 'comment'
      break
    case 'private':
      data.type = 'private_message'
      break
    case 'info':
      data.type = 'system_message'
      break
    default:
      break
  }
  return request_get('/api/message/front_user', data)
}

/**
 * 获取消息未读条数
 * @param  {Object} data
 * @return {[Promise]}                 [description]
 */
export function messageStatus(data = {}) {
  return request_get('/api/message/statistics', data).then(res => {
    res.data.forEach(element => {
      switch (element.type) {
        case 'private_message':
          element.type = 'private'
          break
        case 'comment':
          element.type = 'discuss'
          break
        case 'system_message':
          element.type = 'info'
          break
        case 'answering_question':
          element.type = 'answer'
          break
        default:
          break
      }
    })
    return res
  })
}

/**
 * 获取测试报告列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function talkListList(data = {}) {
  return request_get('/api/home/user_courses/paper_info', data)
}

/**
 * 测试报告删除
 * @param  {Object} data
 * @param  {[Array]} data.id           [description]
 * @return {[Promise]}                 [description]
 */
export function talkListDel(data = {}) {
  return request_post('/api/home/user/course_paper', data)
}

/**
 * 获取关注教师列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function teacherList(data = {}) {
  return request_get('/api/user/my_follows', data)
}

/**
 * 关注教师删除
 * @param  {Object} data
 * @param  {[id]} data.id              [教师ID]
 * @return {[Promise]}                 [description]
 */
export function teacherDel(data = {}) {
  return request_delete(teacherUrl(data), data)
}

/**
 * 消息删除
 * @param  {Object} data
 * @param  {[id]} data.id              [消息ID]
 * @return {[Promise]}                 [description]
 */
export function messageDel(data = {}) {
  return request_delete(messageUrl(data), data)
}

/**
 * 获取订单记录列表
 * @param  {Object} data
 * @param  {[String]} data.pageStart   [description]
 * @param  {[String]} data.pageOffset  [description]
 * @param  {[String]} data.pageNum     [description]
 * @return {[Promise]}                 [description]
 */
export function orderList(data = {}) {
  return request_get('/api/order/user', data)
}

/**
 * 订单记录删除
 * @param  {Object} data
 * @param  {[id]} data.id              [订单ID]
 * @return {[Promise]}                 [description]
 */
export function orderDel(data = {}) {
  return request_delete(orderUrl(data), data)
}

/**
 * 获取订单记录列表
 * @param  {Object} data
 * @return {[Promise]}                 [description]
 */
export function del({ type, ...data } = {}) {
  switch (type) {
    case 'course':
      return courseDel(data)
      break
    case 'class':
      return classDel(data)
      break
    case 'talkList':
      return talkListDel(data)
      break
    case 'order':
      return orderDel(data)
      break
    case 'message':
      return messageDel(data)
      break
    case 'teacher':
      return teacherDel(data)
      break
    default:
      return messageDel(data)
      break
  }
}
