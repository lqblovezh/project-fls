import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

let toPathGroup = pathToRegexp.compile('/api/course_ware/groups/:id');
let toPathGroupModify = pathToRegexp.compile('/api/course_ware/:id/groups');
let bookDetail = pathToRegexp.compile('/api/theme/:id')
let putSettingInfo = pathToRegexp.compile('/api/course_ware/:id/setting')
let putInfo = pathToRegexp.compile('/api/books/setting_info/:id')
/**
 * 获取课件列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.tag - 选填 标签
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.group_id - 选填 分组id
 * @param {String} data.status - 选填 上架状态(0未上架,1已上架)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}){
  return request_get('/api/course_ware',data)
}

/**
 * 课件详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 主题id
 */
export function detail(data = {}){
  // return request_get(bookDetail(data),data).then(res => {
  //   let components = res.data.books_info.components
  //   components.forEach(element => {
  //     const {content,id} = element
  //     element = Object.assign(element,content)
  //     element.id = id
  //   });
  //   return res
  // })
  return request_get(bookDetail(data),data)
}

/**
 * 删除课件
 * @param {Object} data
 * @param {Array} data.id - 必有字段 主题id
 */
export function del(data = {}){
  return request_post('/api/theme/delete',data)
}
/**
 * 视读设置详情
 * @param {Object} data 
 * @param {String} data.id  
 */
export function putInfo(data){
  return request_get(putInfo(data), data)
}
/**
 * 课件上架
 * @param {Object} data 
 * @param {Array} data.id - 必有字段 主题id
 */
export function put(data){
  return request_put('/api/theme/put', data)
}

/**
 * 课件下架
 * @param {Object} data 
 * @param {Array} data.id - 必有字段 主题id
 */
export function pull(data){
  return request_put('/api/theme/pull', data)
}

/**
 * 分组列表
 */
export function groupList(){
  return request_get('/api/course_ware/groups')
}

/**
 * 新增或修改分组
 * @param {Object} data 
 * @param {String} data.name - 必有 分组名称
 * @param {String} data.id - 没有id是新增，有id表示修改 
 */
export function group({id,...data}){
  if(id){
    return request_put(toPathGroupModify({id}), data)
  }
    return request_post('/api/course_ware/groups',data)
}

/**
 * 删除分组
 * @param {Object} data 
 * @param {String} data.id 
 */
export function groupDel(data={}){
  return request_delete(toPathGroup(data), data)
}

/**
 * 移动分组
 * @param {Object} data 
 * @param {String} data.old_group_id
 * @param {String} data.new_group_id
 * @param {Array} data.rel_id  
 */
export function groupMove(data={}){
  return request_put('/api/groups/course_ware', data)
}

/**
 * 主题上架设置
 * @param {Object} data 
 * @param {String} data.id - 必有字段 主题id
 * @param {String} data.price - 必有字段 价格
 */
export function putSave(data={}){
  return request_post('/api/course_ware/save_price', data)
}

/**
 * 主题预览
 * @param {Object} data 
 * @param {String} data.product_id - 必有字段 产品id
 * @param {String} data.resource_id - 必有字段 资源id
 * @param {String} data.type - 必有字段 类型（books videos  picture  audio）
 */
export function preview(data={}){
  return request_get('/api/theme/preview', data)
}

/**
 * 主题预览
 * @param {Object} data 
 * @param {String} data.id - 必有字段 产品id
 */
export function courseSetInfo(data={}){
  return request_get(putSettingInfo(data))
}
