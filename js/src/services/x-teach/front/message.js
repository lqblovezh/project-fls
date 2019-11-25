import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 签到
 */
export function sign(data = {}) {
  return request_get('/api/sign_in', data)
}

/**
 * 获取未看的消息
 * @return {[type]} [description]
 */
export function getNumOfMsg (data = {}) {
	return request_get('/api/message/statistics', data)
}

/**
 * 设置消息是否已读
 * @param {Object} [data={}] [description]
 * @param {String} data.id 消息id
 */
export function setMsgStatus (data = {}) {
	return request_get(`/api/message/${data.id}`)
}

/**
 * 获取教师答疑列表
 * @param  {Object} data [description]
 * @param  {Object} data.to_user_id
 * @param  {Object} data.course_id 课程id
 */
export function getTeacherAnswer(data = {}) {
  return request_get('/api/message/answering_question', data)
}

/**
 * 发送消息【评论/私信/回答/提问】
 * @param Object data
 * @param String data.from_user_id
 * @param String data.to_user_id
 * @param String data.content 主体内容
 * @param String data.type  'system_message','answering_question','private_message','leave_word'
 * @param String data.pid 回复的时候 传入_id的值
 * @param String data.course_id 课程id  课程id可以为空当类型为答疑时才有用
 * @param String data.title 标题当类型为答疑时才有用
 */
export function sendMsg(data = {}) {
  return request_post('/api/message', data)
}

/**
 * 获取私信记录
 * @param  {Object} data [description]
 * @param  {String} data.from_user_id 默认当前用户
 * @param  {String} data.to_user_id
 * @param  {String} data.type 默认值/不填
 */
export function getPrivateMsg(data = {}) {
  return request_get('/api/message/record', data)
}

/**
 * 获取消息(系统消息/回复/留言/私信)
 * @param  {[Object]} data [description]
 * @param  {[string]} data.type 消息类型 system_message','answering_question','private_message','leave_word ，comment
 * @param  {[string]} data.user_id [description]
 */
export function getMsg(data = {}) {
  return request_get('/api/message/front_user', data)
}

/**
 * 删除消息
 * @param  {Object} data [description]
 * @param  {Object} data.id [description]
 */
export function delMsg(data = {}) {
  return request_delete(`/api/message/front/${data.id}`)
}

/**
 * 发送评论
 * @param  {Object} data [description]
 * @param  {String} data.user_id 用户id
 * @param  {String} data.pid 回复某个人的评论的id
 * @param  {String} data.content 评论内容
 * @param  {String} data.course_id 课程id
 */
export function sendComment(data = {}) {
  return request_post('/api/comment', data)
}

/**
 * 获取评论列表
 * @param  {Object} data [description]
 * @param  {String} data.course_id 课程id
 * @param  {String} data.pid 层级
 */
export function getComment(data = {}) {
  return request_get('/api/comment/parent', data)
}

/**
 * 删除评论
 * @param  {Object} data [description]
 * @param {String} data.id 评论的id
 */
export function delComment(data = {}) {
  return request_delete(`/api/comment/front/${data.id}`)
}

/**
 * 评论点赞
 * @param  {Object} data [description] comment_id
 * @param  {String} data.comment_id 单条讨论的id
 */
export function giveLike(data = {}) {
  return request_post('/api/praise', data)
}
