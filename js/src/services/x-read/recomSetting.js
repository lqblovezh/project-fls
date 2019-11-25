import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let recomDetail = pathToRegexp.compile('/api/recommends/:id')
let recomGroups =  pathToRegexp.compile('/api/recommends/groups/:id')
let recomSort = pathToRegexp.compile('/api/recommends/sort/:id')

/**
 * 获取recom列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.start_time - 开始时间 选填
 * @param {String} data.end_time - 结束时间 选填
 * @param {String} data.status - 状态(1未使用 2本周 3往期) 选填
 * @param {String} data.group_id - 分组id 选填
 * @param {String} data.name - 推荐语 选填
 * @param {String} data.referee - 推荐语 推荐人
 * @param {String} data.tag - 推荐语 标签
 */
export function getList(data={}){
  return request_get('/api/recommends',data)
}

/**
 * recom添加或修改
 * @param {Object} data
 * @param {String} data.name - 必有字段 推荐语
 * @param {String} data.referee - 必有字段 推荐人
 * @param {String} data.tag - 必有字段 标签
 * @param {String} data.ted_address - 必有字段 关联地址
 * @param {String} data.id - 没有id是新增，有id表示修改
 */
export function save({id,...data}){
  if(id){
    return request_put(recomDetail({id}),data)
  }
  return request_post('/api/recommends',data)
}

/**
 * recom详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 推荐id
 */
export function detail({id,...data}){
  return request_get(recomDetail({id}))
}

/**
 * recom删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 推荐id
 */
export function del(data = {}){
  return request_post('/api/recommends/delete',data)
}

/**
 * recom排序
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.status - 必有字段  备注：up或者down
 */
export function sort({id,...data}){
  return request_put(recomSort({id}),data)
}

/**
 * recom推荐
 * @param {Object} data
 * @param {Array} data.id
 */
export function put(data = {}){
  return request_put('/api/recommends/recommend',data)
}

/**
 * recom撤下
 * @param {Object} data
 * @param {Array} data.id
 */
export function pull(data = {}){
  return request_put('/api/recommends/withdraw',data)
}

/**
 * 推荐分组列表
 * @param {Object} data
 */
export function groupList(){
  return request_get('/api/recommends/groups')
}

/**
 * 推荐分组添加或修改
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.id - 没有id是新增，有id表示修改
 */
export function group({id,...data}){
  if(id){
    return request_put(recomGroups({id}),data)
  }
  return request_post('/api/recommends/groups',data)
}

/**
 * 推荐分组删除
 * @param {Object} data
 * @param {String} data.id - 必有字段 推荐id
 * @param {Array} data.bid - 必有字段 书iD
 */
export function groupDel(data = {}){
  return request_post('/api/recommends/groups/delete',data)
}

/**
 * 推荐移动分组
 * @param {Object} data
 * @param {String} data.new_group_id - 必有字段 分组id
 * @param {String} data.old_group_id - 必有字段 分组iD
 * @param {String} data.id - 必有字段  推荐id
 */
export function groupMove(data={}){
  return request_put('/api/recommends/groups',data)
}