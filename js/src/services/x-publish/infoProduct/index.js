import {request_post,request_get,request_put,request_delete,request_file} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取首页信息
 * @return {Promise}
 */
export function homeInfo() {
    return request_get(restUrl_publish+'/api/home/statistics')
}

/**
 * 产品信息详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 */
export function getInfo(data={}) {
  let infoPath = pathToRegexp.compile(restUrl_publish+'/api/comproduct/:id')
  return request_get(infoPath(data))
}
/**
 * 产品信息 新增|修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 产品id有则修改无则添加
 * @param {String} data.name - 必有 产品名称
 * @param {String} data.book_isbn - 必有 国际标准书号
 * @param {String} data.abs - 必有 内容简介
 * @param {String} data.img - 必有 封面图片
 * @param {Array}  data.pro_attributes 元数据 eg:{key:'',name:'',value:''}
 * 
 * @param {Object} data.attributes (可选填)n
 * 
 * @param {String} data.attributes.xRead.tag - 可选 标签
 * @param {String} data.attributes.xRead.author - 可选 作者
 * 
 * @param {Object} data.attributes.eCommerce (可选填)
 * @param {String} data.attributes.eCommerce.have_print 必填 是有有版 1有 2无
 * @param {String} data.attributes.eCommerce.out_print 必填 是否绝版 1有 2无
 * @param {String} data.attributes.eCommerce.author - 必填 作者
 * @param {String} data.attributes.eCommerce.author_id - 必填 作者id 先留空上传
 * @param {String} data.attributes.eCommerce.translator - 可选 译者
 * @param {String} data.attributes.eCommerce.translator_id - 可选  译者id 先留空上传
 * @param {String} data.attributes.eCommerce.subject_terms - 可选 主题词
 * @param {String} data.attributes.eCommerce.target_audience - 可选 读者对象
 * @param {String} data.attributes.eCommerce.clc_category - 可选 中图法分类
 * @param {String} data.attributes.eCommerce.clc_category_id - 可选 中图法分类id 先留空上传
 * @param {String} data.attributes.eCommerce.cp_category - 可选 营销分类
 * @param {String} data.attributes.eCommerce.cp_category_id - 可选 营销分类id 先留空上传
 * @param {String} data.attributes.eCommerce.describe - 可选 内容简介
 * @param {String} data.attributes.eCommerce.editor_recommend - 可选 编辑推荐
 * @param {String} data.attributes.eCommerce.book_directory - 可选 图书目录
 */
export function save({id,...data}){
    if(id) {
      let infoPath = pathToRegexp.compile(restUrl_publish+'/api/comproduct/:id')
      return request_put(infoPath({id}),data)
    }
    return request_post(restUrl_publish+'/api/comproduct/add',data)
}
/**
 * 产品扩展信息保存
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.product_id - 产品id有则修改无则添加
 * @param {String} data.type - 必有 xread 1,电商2
 * @param {Object} data.attributes - 必有 关联数据
 * @param {String} data.attributes.tag - 必有 标签
 * @param {String} data.attributes.author - 必有 作者
 * @param {String} data.attributes.translator - 必有 译者
 * @param {String} data.attributes.subject_terms - 必有 主题词
 * @param {String} data.attributes.target_audience - 必有 读者对象
 * @param {String} data.attributes.clc_category - 必有 中图法分类
 * @param {String} data.attributes.cp_category - 必有 营销分类
 * @param {String} data.attributes.describe - 必有 内容简介
 * @param {String} data.attributes.editor_recommend - 必有 编辑推荐
 * @param {String} data.attributes.book_directory - 必有 图书目录
 */
export function saveInfo({id,...data}) {
    return request_post(restUrl_publish+'/api/comproduct/attributes',data)
}