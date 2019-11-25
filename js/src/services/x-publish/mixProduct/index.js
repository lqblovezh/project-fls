import {request_post,request_get,request_put,request_delete,request_file} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'


/**
 * 获取列表信息
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type - 必有 产品类型
 * @param {String} data.id - 必有 产品id
 * @param {String} data.resource_type - 选填 资源类型
 */
export function getList({type,id,resource_type}) {
    if(type == 'book') {
        return bookList({id})
    }else if(type == 'video') {
        return videoList({id})
    }else if(type == 'resource') {
        return resourceList({id,resource_type})
    }
}

/**
 * 删除列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type - 必有 产品类型
 * @param {String} data.id - 必有 产品id
 */
export function del({type,...data}) {
    if(type == 'book') {
        return bookDel(data)
    }else if(type == 'video') {
        return videoDel(data)
    }else if(type == 'resource') {
        return resourceDel(data)
    }else if(type == 'audio') {
        return audioDel(data)
    }
}

/**
 * 添加资源
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type - 必有 产品类型
 * @param {String} data.product_id - 必有 产品id
 * @param {String} data.resource_type - 必有 必有 1图片集 2视频集 3音频集
 * @param {Array} data.constitute - 必有 关联关系
 */
export function add({type,...data}) {
    if(type == 'book') {
        return bookDel(data) //TODO:书籍添加
    }else if(type == 'video') {
        return videoAdd(data)
    }else if(type == 'resource') {
        return resourceAdd(data)
    }
}

/**
 * 检测纸质类型
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 */ 
export function check(data = {}) {
  let checkPath = pathToRegexp.compile(restUrl_publish+'/api/components_paper/:id/check')
  return request_get(checkPath(data))
}

/**
 * 纸质书籍列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 */
export function bookList(data={}) {
  let bookListPath = pathToRegexp.compile(restUrl_publish+'/api/components_paper/:id/list')
  return request_get(bookListPath(data))
}

/**
 * 纸质书籍详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 纸质书籍id
 */
export function bookInfo(data = {}) {
  let bookPath = pathToRegexp.compile(restUrl_publish+'/api/components_paper/:id')
  return request_get(bookPath(data))
}

/**
 * 纸质书籍删除
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 纸质书籍id
 */
export function bookDel(data = {}) {
  let bookPath = pathToRegexp.compile(restUrl_publish+'/api/components_paper/:id')
  return request_delete(bookPath(data))
}

/**
 * 纸质书籍新增或修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 必有 资源名称
 * @param {String} data.product_id - 必有 资源名称
 * @param {String} data.book_isbn - 必有 ISBN
 * @param {String} data.book_isbn_extension - 必有 ISBN扩展
 * @param {String} data.book_weight - 必有 图书重量
 * @param {String} data.img - 必有 封面地址
 * @param {String} data.type - 必有 paperback => 平装 hardcover => 精装 soft_hardcover => 软精装 thread_bound => 线装
 * @param {String} data.price - 必有 定价
 * @param {String} data.sales_price_min - 必有 最低定价
 * @param {Array} data.attributes - 必有 元数据数组
 * @param {String} data.id - 有id表示修改，没有id表示新增
 */
export function bookSave({id,...data}) {
    if(id){
      let bookPath = pathToRegexp.compile(restUrl_publish+'/api/components_paper/:id')
      return request_put(bookPath({id}),data)
    }
    return request_post(restUrl_publish+'/api/components_paper',data)
}

/**
 * 视读列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 */
export function videoList(data={}) {
  let videoListPath = pathToRegexp.compile(restUrl_publish+'/api/components/:id/video')
  return request_get(videoListPath(data))
}

/**
 * 视读新增
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 * @param {Array} data.constitute - 必有 关联关系
 */
export function videoAdd(data={}) {
    return request_post(restUrl_publish+'/api/components/video',data)
}

/**
 * 删除视读
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 */
export function videoDel(data={}) {
  let videoListPath = pathToRegexp.compile(restUrl_publish+'/api/components/:id/video')
  return request_delete(videoListPath({id:data.constitute_id}))
}

/**
 * 资源列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 * @param {String} data.resource_type - 必有 1图片集 2视频集 3音频集
 */
export function resourceList(data={}) {
  let resourceListPath = pathToRegexp.compile(restUrl_publish+'/api/components/:id/resource')
  return request_get(resourceListPath(data),data)
}

/**
 * 资源新增
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 * @param {Array} data.constitute - 必有 关联关系
 * @param {String} data.resource_type - 必有 必有 1图片集 2视频集 3音频集
 */
export function resourceAdd(data={}) {
    return request_post(restUrl_publish+'/api/components/resource',data)
}

/**
 * 删除资源
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 */
export function resourceDel(data={}) {
  let resourceListPath = pathToRegexp.compile(restUrl_publish+'/api/components/:id/resource')
  return request_delete(resourceListPath({id:data.constitute_id}))
}

/**
 * 听读组列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 * @param {String} data.type - 必有 类型（1音频组  2课件组
 */
export function groupList(data={}) {
  let audioListPath = pathToRegexp.compile(restUrl_publish+'/api/components_groups/:id/list')
  return request_get(audioListPath(data),data)
}

/**
 * 听读组修改或添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.group_name - 必有 组名称
 * @param {String} data.product_id - 必有 产品id
 * @param {String} data.price - 必有 定价
 * @param {String} data.min_price - 必有 最低定价
 * @param {String} data.speaker - 必有 主讲人
 * @param {String} data.src - 必有 浏览地址
 * @param {String} data.type - 必有 (1听读  2课件)
 * @param {String} data.id - 选填 有则修改无则添加
 * @param {Array} data.constitute - 必有 关联数据 eg [{id:'',type:''},...] 资源id/资源类型（4 音频）
 */
export function groupSave({id,...data}) {
    if(id){
      let groupPath = pathToRegexp.compile(restUrl_publish+'/api/components_groups/:id')
      return request_put(groupPath({id}),data)
    } 
    return request_post(restUrl_publish+'/api/components_groups',data)
}

/**
 * 听读组详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 组id
 */
export function groupDetail({id}) {
  let groupPath = pathToRegexp.compile(restUrl_publish+'/api/components_groups/:id')
  return request_get(groupPath({id}))
}

/**
 * 删除组音频
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 * @param {String} data.resource_id - 选填 资源id（即音频_id  或者课件id）
 * @param {String} data.product_id - 必有 产品id
 */
export function audioDel(data={}) {
    //console.log(data)
    let groupPath = pathToRegexp.compile(restUrl_publish+'/api/components_groups/:id')
    return request_delete(groupPath(data),data)
}

/**
 * 产品电子书新增或者修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 必有 名称
 * @param {String} data.author - 必有 作者
 * @param {String} data.tag - 必有 标签
 * @param {String} data.abs - 必有 简介
 * @param {String} data.book_id - 必有 书籍id
 * @param {String} data.constitute_id - 必有 第二次关联内容仓库id
 * @param {String} data.retailer_id - 必有 电子书电商信息id
 * @param {String} data.trial_url - 必有 试读地址
 * @param {String} data.read_url - 必有 阅读地址
 * @param {String} data.sale_price - 必有 定价
 * @param {String} data.min_sale_price - 必有 最低定价
 * @param {String} data.attributes - 必有 元数据
 * @param {String} data.shop_attributes - 必有 电商元数据
 * @param {String} data.components_id - 必有 产品id
 */
export function saveEBook(data = {}) {
    if(data.current_id) {
      let eBookPath = pathToRegexp.compile(restUrl_publish+'/api/components_ebooks/:id')
      return request_put(eBookPath({id:data.current_id}),data)
    }
    return request_post(restUrl_publish+'/api/components_ebooks',data)
}

/**
 * 产品电子书详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 产品id
 */
export function getEBook(data = {}) {
  let eBookPath = pathToRegexp.compile(restUrl_publish+'/api/components_ebooks/:id')
  return request_get(eBookPath(data))
}