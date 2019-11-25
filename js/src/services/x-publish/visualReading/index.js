import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import {
  suance
} from '../dbi'
/**
 *视读产品列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称搜索参数
 * @param {String} data.group_id
 * @param {String} data.start_time - 创建时间
 * @param {String} data.end_time - 更新时间
 * @param {String} data.audits_status - 状态搜索(审核状态，未审核 => 0 ；待审核 => 1 ；审核未通过 => 2 ；已通过 => 3)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}) {
    return request_get(restUrl_publish+'/api/video_product',data);
}
/**
 * 视读产品新增 或者修改  有ID就修改没ID新增
 * @param {Object} data
 * @param {String} data.name  听读产品名称
 * @param {String} data.img 图片地址
 * @param {String} data.abs 简介
 *  
 * @param {Array}  data.pro_attributes 元数据 eg [{key:'',name:'',value:''},...]
 * 
 * @param {Object} data.attributes 扩展信息
 * 
 * @param {Object} data.attributes.x_read xread信息对象
 * @param {String} data.attributes.x_read.author xread 作者
 * @param {String} data.attributes.x_read.tag xreaad 标签
 *
 * @param {Object} data.attributes.eCommerce 电商信息
 * @param {String} data.attributes.eCommerce.translator 译者
 * @param {String} data.attributes.eCommerce.translator_id 译者ID
 * @param {String} data.attributes.eCommerce.author 作者
 * @param {String} data.attributes.eCommerce.author_id 作者ID
 * @param {String} data.attributes.eCommerce.have_print 是否有版
 * @param {String} data.attributes.eCommerce.out_print 是否绝版
 * @param {String} data.attributes.eCommerce.translator_id 译者ID
 * @param {String} data.attributes.eCommerce.subject_terms 主题f词
 * @param {String} data.attributes.eCommerce.clc_category 中图法分类
 * @param {String} data.attributes.eCommerce.clc_category_id 中图法分类id
 * @param {String} data.attributes.eCommerce.target_audience 读者对象
 * @param {String} data.attributes.eCommerce.cp_category 营销分类
 * @param {String} data.attributes.eCommerce.cp_category_id 营销分类ID
 * @param {String} data.attributes.eCommerce.describe 简介
 * @param {String} data.attributes.eCommerce.editor_recommend 编辑推荐
 * 
 * @param {Array} data.constitute 关联关系  [id1,id2,.......] //id 为关联的视频 ID
 */
export function save({id,...data}){
    if(id) {
        return request_put(`${restUrl_publish}/api/video_product/${id}`,data)
    }
    return request_post(restUrl_publish+'/api/video_product',data)
}
/**
 * 获取视读产品信息
 * @param {Object} data
 * @param {String} data.id - 必有 视读产品id
 */
export function getInfo(data={}){
  let visualReadingInfo = pathToRegexp.compile(restUrl_publish+'/api/video_product/:id')
  return request_get(visualReadingInfo(data),data)
}
/**
 * 视读产品删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data = {}) {
    return request_post(restUrl_publish+'/api/video_product/delete',data);
}
/**
 * 加急审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要加急审核的产品信息id
 */
export function urgentDigital(data = {}) {
    return request_put(restUrl_publish+'/api/video_product/urgent',data);
}

/**
 * 视读产品审核
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要审核的产品信息id
 */
export function audits (data = {}) {
    return request_put(restUrl_publish+'/api/video_product/audits',data)
}

/**
 * 分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要加急审核的产品信息id
 * @param {String} data.platforms -  //类型：String  可有字段  备注：分发平台，X-READ => 1 ，微信公众平台 => 2 ，微博 => 3
 */
export function issuance ({id,...data} = {}) {
  let toPathIssuance = pathToRegexp.compile(restUrl_publish+'/api/comproduct/:id/issuance')
  return request_put(toPathIssuance({id}),data).then(res=>{
    suance({
      id,
      info:res.data
    })
    return res;
  });
}

/**
 * 新增视读产品分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 分组名称
 */
export function addGroup (data = {}) {
    return request_post(restUrl_publish+'/api/video_product/groups',data);
}

/**
 * 修改视读产品分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup (data = {}) {
  let toPathGroupModify = pathToRegexp.compile(restUrl_publish+'/api/video_product/:id/groups')
  return request_put(toPathGroupModify(data),data)
}

/**
 * 删除视读产品分组--删除单条
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup (data = {}) {
  let toPathGroupDelete=pathToRegexp.compile(restUrl_publish+'/api/video_product/:id/groups')
  return request_delete(toPathGroupDelete({id:data.id[0]}),data);
}

/**
 * 视读产品分组列表
 * @return {Promise}
 */
export function listGroup (data = {}) {
    return request_get(restUrl_publish+'/api/video_product/groups',data);
}

/**
 * 视读产品分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.old_group_id - 必有 要移动到的分组ID
 * @param {String} data.new_group_id - 必有 当前的所属分组ID
 * @param {Array} data.rel_id - 必有 要移动的id
 */
export function moveGroup (data = {}) {
    data.rel_id = data.id;
    delete data.id ;
    return request_put(restUrl_publish+'/api/groups/video_product',data);
}

/**
 * 保存视读产品结构
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.product_id - 必有 产品ID
 * @param {Array} data.attributes - 必有 关联数据ID
 */
export function add (data = {}) {
    return request_post(restUrl_publish+'/api/video_product/component',data);
}


