import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 *课时列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.course_id - 名称搜索参数
 */
export function getList(data = {}) {
    return request_get(restUrl_publish+'/api/course_period',data);
}

/**
 * 课时新增 或者修改  有ID就修改没ID新增
 * @param {Object} data
 * @param {String} data.name  课时名称
 * @param {String} data.abs
 * @param {String} data.course_id
 */
export function save({id,...data}) {
    if(id) {
        return request_put(`${restUrl_publish}/api/course_period/${id}`,data)
    }
    return request_post(restUrl_publish+'/api/course_period',data)
}

/**
 * 获取课时信息
 * @param {Object} data
 * @param {String} data.id - 必有 课时id
 */
export function getInfo(data={}){
  let coursewareInfo = pathToRegexp.compile(restUrl_publish+'/api/course_period/:id')
  return request_get(coursewareInfo(data))
}

/**
 * 获取计划信息
 * @param {Object} data
 * @param {String} data.id - 必有 课时id
 */
export function getPlanInfo(data={}){
  let coursPlan = pathToRegexp.compile(restUrl_publish+'/api/course_period/teaching_plan/:id')
  return request_get(coursPlan(data))
}

/**
 * 课时删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data = {}) {
    return request_delete(`${restUrl_publish}/api/course_period/${data.id}`)
}

/**
 * 课时删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function delPlan(data = {}) {
    return request_delete(`${restUrl_publish}/api/teaching_plan/${data.id}`)
}


/**
 * 课时排序
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.course_id - 课程id
 * @param {String} data.type - up & down
 * @param {String} data.course_period_id - 课时id（需要移动的课时id）
 */
export function sort({type,...data} = {}) {
  if(type=='up') {
    return request_put(restUrl_publish+'/api/course_period/up',data);
  }
  return request_put(restUrl_publish+'/api/course_period/down',data);
}

/**
 * 计划新增或者修改  有ID就修改没ID新增
 * @param {Object} data
 * @param {String} data.name  计划名称
 * @param {String} data.abs - 简介
 * @param {String} data.time - 时长
 * @param {String} data.period_id - 课时id
 * @param {String} data.period_id - 课时id
 * @param {String} data.teaching_plan_id -课时id
 */
export function savePlan({id,...data}) {
  if(id) {
      return request_put(`${restUrl_publish}/api/course_period/teaching_plan/${id}`,data)
  }
  return request_post(restUrl_publish+'/api/course_period/teaching_plan',data)
}
