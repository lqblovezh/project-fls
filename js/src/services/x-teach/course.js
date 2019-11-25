import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let accUrl = pathToRegexp.compile('/api/courses/authorization/:id')
let classUrl = pathToRegexp.compile('/api/courses/enable_class/:id')
let detailUrl = pathToRegexp.compile('/api/courses/:id')
let classfiyUrl = pathToRegexp.compile('/api/courses/classfiy/:id')
let useUrl = pathToRegexp.compile('/api/course_share/authorization/:id')
let courseBill = pathToRegexp.compile('/api/courses/statis/:id')
let classBill = pathToRegexp.compile('/api/courses/class/statis/:id')

/**
 * 获取课程列表
 * @param {Object} data
 * @param {String} data.order - 选填 课程号
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
  return request_get('/api/courses',data)
}

/**
 * 获取课程列表
 * @param {Object} data
 * @param {String} data.coures_name - 课程名称
 * @param {String} data.teach_name - 教师名称
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getPubList(data={}){
  return request_get('/api/course_share',data)
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
  return request_post('/api/courses/delete',data)
}

/**
 * 课程和班级授权
 * @param {Object} data
 * @param {String} data.id - 必有字段 课程id
 * @param {String} data.type - 必有字段 acc=>'启用授权' class=>'班级授权'
 */
export function accredit({id,type}) {
  if(type=='acc'){
    return request_put(accUrl({id}))
  }
  return request_put(classUrl({id}))
}

/**
 * 课程 上、下架
 * @param {Object} data
 * @param {String} data.id - 必有字段 课程id
 * @param {String} data.status - 必有字段 up=>'上架' down=>'下架'
 * @param {String} data.class_id - 必有字段 分类id
 */
export function shelf({id,...data}) {
  return request_put(classfiyUrl({id}),data)
}

/**
 * 课程 分类
 * @param {Object} data
 */
export function classfiy(data={}) {
  return request_get('/api/classify/tree',data)
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
 * 课程使用
 * @param {Object} data
 * @param {String} data.id - 必有字段 课程id
 */
export function use({id}) {
  return request_put(useUrl({id}))
}

/**
 * 课程报表
 * @param {Object} data
 * @param {String} data.id - 必有字段 课程id
 */
export function bill({type,id}) {
	if(type == 'course'){
		return request_get(courseBill({id}))
	}
	return request_get(classBill({id}))
}

/**
 * 个人统计报表
 * @param {Object} data
 * @param {String} data.student_id - 必有字段 学生id
 * @param {String} data.course_id - 必有字段 课程id
 */
export function userBill(data = {}) {
	return request_get('/api/courses/user_statis',data)
}


