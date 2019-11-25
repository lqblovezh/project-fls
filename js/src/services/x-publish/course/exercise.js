import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 *习题列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 习题id
 */
export function getList(data = {}) {
  let course = pathToRegexp.compile(restUrl_publish+'/api/course_examination_paper/:id')
  return request_get(course(data));
}

/**
 * 习题新增 或者修改  有ID就修改没ID新增
 * @param {Object} data
 * @param {String} data.name  习题名称
 * @param {String} data.course_id - 课程id
 * @param {String} data.period_id - 习题id
 * @param {String} data.is_auto - 是否自动阅卷
 */
export function save({id,...data}) {
    if(id) {
      let course = pathToRegexp.compile(restUrl_publish+'/api/course_examination_paper/:id')
      return request_put(course({id}),data)
    }
    return request_post(restUrl_publish+'/api/course_examination_paper',data)
}

/**
 * 获取习题信息
 * @param {Object} data
 * @param {String} data.id - 必有 习题id
 */
export function getInfo(data={}){
  let coursewareInfo = pathToRegexp.compile(restUrl_publish+'/api/course_examination_paper/paper/:id')
  return request_get(coursewareInfo(data))
}

/**
 * 获取习题信息-新接口
 * @param {Object} data
 * @param {String} data.id - 必有 习题id
 */
export function getInfos(data={}){
  let coursewareInfo = pathToRegexp.compile(restUrl_publish+'/api/course_examination_paper/paper_info/:id')
  return request_get(coursewareInfo(data))
}

/**
 * 习题删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data = {}) {
    return request_delete(`${restUrl_publish}/api/course_examination_paper/${data.id}`)
}

/**
 * 添加/修改 习题
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.questions - 题目列表
 * @param {Array} data.paper_id - 习题id
 */
export function saveExercise(data = {}) {
  return request_put(restUrl_publish+'/api/course_examination_paper/practice',data)
}

/**
 * 添加/修改 习题 - 新接口
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.questions - 题目列表
 * @param {Array} data.paper_id - 习题id
 */
export function saveExercises(data = {}) {
  return request_put(restUrl_publish+'/api/course_examination_paper/practice_update',data)
}

/**
 * 获取课程下的资源
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.course_id - 课程id
 */
export function getResource(data = {}) {
  let coursUrl = pathToRegexp.compile(restUrl_publish+'/api/course_examination_paper/get_tp_list/:id')
  return request_get(coursUrl({id:data.course_id}))
}
