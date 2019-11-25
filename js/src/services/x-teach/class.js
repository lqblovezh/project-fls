import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let accUrl = pathToRegexp.compile('/api/courses/authorization/:id')
let detailUrl = pathToRegexp.compile('/api/courses/:id')
let refuseUrl = pathToRegexp.compile('/api/class/refuse/:id')
let calssUrl = pathToRegexp.compile('/api/class/:id')
let upfileUrl = pathToRegexp.compile('/api/class/agree_and_upload/:id')
let backUrl = pathToRegexp.compile('/api/code/withdraw/:id')
let codeUrl = pathToRegexp.compile('/api/code/:id')

/**
 * 获取班级列表
 * @param {Object} data
 * @param {String} data.order - 选填 班级号
 * @param {String} data.status - 选填 状态(1支付完成,0等待支付,其他状态等后台确定)
 * @param {String} data.phone - 选填 手机号
 * @param {String} data.user_name - 选填 用户名
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.start_pay - 选填 支付开始时间
 * @param {String} data.end_pay - 选填 支付结束时间
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data={}){
  return request_get('/api/class/all',data)
}

/**
 * 班级详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 班级id
 */
export function detail(data = {}){
  return request_get(detailUrl(data))
}

/**
 * 班级删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 班级id
 */
export function del(data = {}){
  return request_post('/api/class/delete',data)
}

/**
 * 班级授权
 * @param {Object} data
 * @param {String} data.id - 必有字段 班级id
 */
export function accredit(data = {}) {
  return request_put(accUrl(data))
}

/**
 * 班级申请
 * @param {Object} data
 * @param {String} data.class_name - 必有字段 班级名称
 * @param {String} data.code_count - 必有字段 班级数量
 * @param {String} data.course_id - 必有字段 课程id
 */
export function apply(data = {}) {
  return request_post('/api/class',data)
}

/**
 * 再次申请授权码
 * @param {Object} data
 * @param {String} data.code_count - 必有字段 申请数量
 * @param {String} data.class_id - 必有字段 班级id
 */
export function applyAgain(data = {}) {
  return request_post('/api/class/re_apply_code',data)
}

/**
 * 班级审核
 * @param {Object} data
 * @param {String} data.class_name - 必有字段 班级名称
 * @param {String} data.code_count - 必有字段 班级数量
 * @param {String} data.course_id - 必有字段 课程id
 */
export function getAuditList(data = {}) {
  return request_get('/api/class/verify_list',data)
}

/**
 * 班级审核 驳回
 * @param {Object} data
 * @param {String} data.id - 必有字段 班级id
 */
export function refuse(data = {}) {
  return request_put(refuseUrl({id:data.id}))
}

/**
 * 班级审核 通过 并上传授权码
 * @param {Object} data
 * @param {String} data.id - 必有字段 班级id
 * @param {String} data.url - 必有字段 临时文件地址
 */
export function upload(data = {}) {
  return request_put(upfileUrl(data),data)
}

/**
 * 获取授权码列表
 * @param {Object} data
 * @param {String} data.code - 必有字段 某一个授权码
 * @param {String} data.state - 必有字段 状态
 * @param {String} data.class_id - 必有字段 班级下的授权码
 */
export function codeList(data = {}) {
  return request_get('/api/code/all',data).then(res => {
    res.data.forEach(element => {
      element.prescription = element.satrt_time +'-'+ element.end_time
    })
    return res
  })
}

/**
 * 获取学生列表
 * @param {Object} data
 * @param {String} data.class_id - 选填 班级id
 * @param {String} data.course_id - 选填 课程id
 * @param {String} data.name - 学生姓名
 * @param {String} data.time -  时长
 */
export function studentList({type,...data} = {}) {
	if(type == 'course'){
		return request_get('/api/class/student_list',data)
	}
	return request_get('/api/class/class_student_list',data)
}

/**
 * 导出授权码
 * @param {Object} data
 * @param {String} data.class_id - 必有字段 班级id
 */
export function educe(data = {}) {
  data.class_id = data.id
  return request_get('/api/code/export',data)
}

/**
 * 收回授权码
 * @param {Object} data
 * @param {String} data.class_id - 必有字段 班级id
 */
export function back(data = {}) {
  return request_put(backUrl(data))
}

/**
 * 授权码删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 授权码id
 */
export function delCode(data = {}){
  return request_delete(codeUrl(data))
}