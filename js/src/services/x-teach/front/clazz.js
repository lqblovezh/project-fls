import {
  request_post,
  request_get
} from 'services/common/request'

/**
 * 学生加入班级
 * @param  {[Array]}    data.id 班级id
 * @param  {[Array]}    data.code 课程码
 * @return {[Promise]}
 */
export function addClazz(data = {}) {
  return request_post(`/api/class/student_add_class`, data)
}
/**
 * 通过课程获取所有的班级
 * @param  {[Array]}    data.id
 * @return {[Promise]}
 */
export function getClazzByCourse(data = {}) {
  return request_get(`/api/class/course/${data.id}`)
}
/**
 * 通过老师获取所有的班级
 * @param  {[Array]}    data.id
 * @return {[Promise]}
 */
export function getClazzByTeacher(data = {}) {
  return request_get(`/api/class/teacher/${data.id}`)
}
/**
 * 通过学生获取所有的班级
 * @param  {[Array]}    data.id
 * @return {[Promise]}
 */
export function getClazzByUser(data = {}) {
  return request_get(`/api/class/student`)
}
