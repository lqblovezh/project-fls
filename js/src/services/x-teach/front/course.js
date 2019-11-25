import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 获取课程的分类列表
 * @param  {[Number]}    options.id   一级分类id
 * @param  {[Object]} options.data [description]
 * @return {[Promise]}                 [description]
 */
export function getCategoryLists(data = {}) {
  return request_get('/api/classify/find_children', data)
}

/**
 * 课程详情
 * @param  {[String]}    data.id
 * @return {[Promise]}
 */
export function getDetail(data = {}) {
  return request_get(`/api/home/courses/${data.id}`)
}

/**
 * 试卷详情
//  * @param  {[String]}  data.id  试卷的id(非course_id)
 * @return {[Promise]}
 */
export function getExercise(data = {}) {
  return request_get(`/api/home/courses/user_paper/${data.id}`)
}
/**
 * 课程历史错题
 * @param  {[String]}  data.id
 * @return {[Promise]}
 */
export function getHistory(data = {}) {
  return request_get(`/api/home/courses/user_error_paper/${data.id}`)
}
/**
 * 获取某个试卷下的错题列表
 * @param {Object} data 
 * @param {String} data.id 试卷id
 */
export function getDetailErrors (data = {}) {
  return request_get(`/api/home/courses/user_paper_status/${data.id}`)
}

/**
 * 课程试卷列表
 * @param  {[String]}  data.id
 * @return {[Promise]}
 */
export function getPaper(data = {}) {
  return request_get(`/api/home/courses/user_examination_paper/${data.id}`)
}
/**
 * 试卷得分信息
 * @param  {[String]}  data.id
 * @return {[Promise]}
 */
export function getPaperScore(data = {}) {
  return request_get(`/api/home/courses/user_examination_paper/info/${data.id}`)
}
/**
 * 习题答案提交
 * @param  {[String]}  data.id
 * @param  {[Object?]}  data.user_answer
 * @return {[Promise]}
 */
export function answer(data = {}) {
  // id: this.$route.query.tid, // 测评id
  // data: this.formatMyAnswer()
  // formatMyAnswer ==
  //   0:
  // answer: "A"
  // id: "8c6ef40253554217b196ea1df4dce454"
  // __proto__: Object
  // 1:
  // answer: "A,B,D"
  // id: "8c6ef40260364da8ac9ca0f766e75cc6"
  // __proto__: Object
  // 2:
  // answer: "dsaaaaaaaaaaa"
  // id: "8c6ef4026d3e44cc832531ae801dd19c"
  // __proto__: Object
  // 3:
  // answer: "false"
  // id: "8c6ef4027a4a4f90a2988ea47d16eb54"
  // __proto__: Object
  // 4:
  // answer: "dasdsad"
  // id: "8c6ef40290c8463cbef287bd13266acd"
  return request_post(
    `/api/home/courses/user_paper_answer/${data.id}`,
    data.data
  )
}
/**
 * 试卷在做一次
 * @param  {[String]}  data.id
 * @return {[Promise]}
 */
export function rePaper(data = {}) {
  return request_post(`/api/home/courses/user_paper/${data.id}`, data)
}

/**
 * 获取课程的tree分类列表
 * @param  {[Object]} options.data [description]
 * @return {[Promise]}                 [description]
 */
export function getCategoryTree(data = {}) {
  return request_get('/api/classify/tree', data)
}

/**
 * 获取某一分类下的课程
 * @param  {Object} data [description]
 * @param  {String} data.id [的]
 * @return {[Promise]}      [description]
 */
export function getClass(data = {}) {
  return request_get('/api/home/course/get_by_classify', data)
}

/**
 * 设置课程评分
 * @param {Object} data [description]
 * @param {String} data.course_id 课程id
 * @param {String} data.score 分数
 */
export function setScore(data = {}) {
  return request_post('/api/score', data)
}

/**
 * 获取课程评分
 * @param {Object} data [description]
 * @param {String} data.course_id 课程id
 * @param {String} data.score 分数
 */
export function getScore(data = {}) {
  return request_get(`/api/score/${data.course_id}`)
}

/**
 * 离开时, 需要保存的当前视频点
 * 返回继续学习的时候定位该点
 * 每一个资源在离开的时候, 都应该触发该操作
 *
 * 对于图片course_time和resources_time 设置为1
 * 表示,看过
 *
 * @param  {Object} data [description]
 * @param  {String} data.course_id [的] 课程id
 * @param  {String} data.course_hour_id [的] 课程下, 课时id
 * @param  {String} data.course_teaching_id [的] 课时下, 计划id
 * @param  {String} data.course_teaching_plan_id [的] 计划下, 具体资源的id
 * @param  {String} data.course_time [的] 离开时, 视频的当前秒, 注意单位是秒
 * @param  {String} data.resources_time [的] 视频的总秒数,  图片设置1
 *  因为视频资源上传的就没有改字段, 这里加上, 计算每一个视频的进度用
 * @return {[Promise]}      [description]
 */
export function leaveVideoPonit(data = {}) {
  return request_post('/api/home/courses/user_speed', data)
}

/**
 * 重置课程学习时长
 * @param {Object} data 
 * @param {String} data.id 课程ID数组
 */
export function resetCourseTime(data = {}) {
  return request_post('/api/home/user_courses/banji/speed_delete', data)
}
/**
 * 重置删除学习
 * @param {Object} data 
 * @param {String} data.id 课程ID数组
 */
export function delCourse(data = {}) {
  return request_post('/api/home/user_courses/speed_delete', data)
}