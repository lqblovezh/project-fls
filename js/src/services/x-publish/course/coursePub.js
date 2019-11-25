import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import {getList as getHours} from './hours'
import {getList as getExercise} from './exercise'
import pathToRegexp from 'path-to-regexp'
import { __await } from 'tslib';
import {
  createProListener
} from '../dbi'

/**
 *课程列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称搜索参数
 * @param {String} data.start_time - 开始时间
 * @param {String} data.end_time - 结束时间
 * @param {String} data.status
 * @param {String} data.group_id
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
    return request_get(restUrl_publish+'/api/shared_course',data);
}
/**
 * 课程新增 或者修改  有ID就修改没ID新增
 * @param {Object} data
 * @param {String} data.name  课程名称
 * @param {String} data.img 图片地址
 * @param {String} data.abs
 * @param {String} data.x_read.author
 * @param {String} data.x_read.tag
 * @param {String} data.e_commerce.out_of_print
 * @param {String} data.e_commerce.have_print
 * @param {String} data.e_commerce.author
 * @param {String} data.e_commerce.subject_terms
 * @param {String} data.e_commerce.clc_category
 * @param {String} data.e_commerce.cp_category
 * @param {String} data.e_commerce.describe
 * @param {String} data.e_commerce.editor_recommend
 */
export function save({id,...data}) {
    if(id) {
        return request_put(`${restUrl_publish}/api/shared_course/${id}`,data)
    }
    return request_post(restUrl_publish+'/api/shared_course',data).then(res=>{
      createProListener({
        res_id:res.data.id,
        res_type:res.data.type_name,
        res_name:res.data.name,
        res_cover:res.data.img_src,
        res_covers:'',
        res_exp:res.data.abs,
        res_author:'',
        res_author_id:'',
        res_Interpreter:'',
        res_Interpreter_id:'',
        res_lables:'',
        res_money:'',
        res_isbn:'',
        res_isbn_ext:'',
			})
			return res;
    })
}
/**
 * 获取课程信息
 * @param {Object} data
 * @param {String} data.id - 必有 课程id
 */
export function getInfo(data={}){
  let coursewareInfo = pathToRegexp.compile(restUrl_publish+'/api/shared_course/:id')
  return request_get(coursewareInfo(data))
}
/**
 * 课程删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data = {}) {
    return request_post(restUrl_publish+'/api/shared_course/delete',data);
}

/**
 * 加急审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要加急审核的产品信息id
 */
export function urgentDigital(data = {}) {
    return request_put(restUrl_publish+'/api/shared_course/urgent',data);
}

/**
 * 课程审核
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要审核的产品信息id
 */
export function audits (data = {}) {
    return request_put(restUrl_publish+'/api/shared_course/audits',data)
}

/**
 * 课程价格详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 课程id
 */
export function getPrice (data = {}) {
  let pricePath = pathToRegexp.compile(restUrl_publish+'/api/shared_course/setting_info/:id')
  return request_get(pricePath(data))
}

/**
 * 课程价格保存
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 课程id
 * @param {String} data.price - 必有 课程价格
 * @param {String} data.proceeds - 必有 预计收益
 * @param {String} data.share_course_price - 必有 共享课程价格
 * @param {String} data.share_resource_price - 必有 共享资源价格
 */
export function savePrice (data = {}) {
  return request_post(restUrl_publish+'/api/shared_course/save_price',data)
}

/**
 * 获取所有课程详情数据
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 课程id
 */
export async function getAllInfo(id) {
  let data = {}
  data = await getInfo({id}).then(res => {
    return res.data
  })
  data.course_period_list = await getHours({course_id:id}).then(res => {
    return res.data
  })
  data.examination_paper_list = await getExercise({id}).then(res => {
    return res.data
  })
  data.price = await getPrice({id}).then(res => {
    return res.data
  })
  console.log(data)
  return data
}
