import * as $ from '../common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile("/api/message/:id");
/**
 * @description 直播列表
 * @param {Object} data
 * @param {String} data.title 直播名称
 * @param {String} data.start_time 开始时间
 * @param {String} data.end_time 结束时间
 * @param {String} data.type //system_message','answering_question','private_message','leave_word
 * @param {String} data.user_id 
 */

export function getList(data){
  return $.request_get("/api/message/user",data);
}
/**
 * 保存回复消息
 * @param {Object} data
 * @param {String} data.from_user_id  可以不填 默认为登陆者
 * @param {String} data.to_user_id  接收者 ID 
 * @param {String} data.type 'system_message','answering_question','private_message','leave 
 * @param {String} data.pid 回复的时候 传入_id的值 
 * @param {String} data.course_id 课程id  课程id可以为空当类型为答疑时才有用
 * @param {String} data.title  标题当类型为答疑时才有用
 * @param {String} data.content 
 */
export function save(data){
   return $.request_post('/api/message',data)
}

/**
 * 删除
 * @param {Object} data
 * @param {String} data.id
 */
export function del(data){
  return $.request_delete(toPath(data),data)
}

/**
 * 查看私信记录
 * @param {Object} data
 * @param {String} data.from_user_id 默认当前用户
 * @param {String} data.to_user_id 
 * @param {String} data.type private_message 默认值可不填
 */

export function getMsgInfo(data){
   return $.request_get('/api/message/record',data)
}