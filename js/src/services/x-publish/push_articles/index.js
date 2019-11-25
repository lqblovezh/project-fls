import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import {
  suance
} from '../dbi'
/**
 * 推送文章库列表D
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 数据ID
 * @param {String} data.name - 名称
 * @param {String} data.author - 作者
 * @param {String} data.tag - 标签
 * @param {String} data.start_time - 开始时间
 * @param {String} data.end_time - 结束时间
 * @param {String} data.order - 排序
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id
 */
export function listArticles(data = {}) {
    return request_get(restUrl_publish+'/api/push_articles',data);
}

/**
 * 推送文章库详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 数据ID （必填）
 */
export function detailArticle({id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/push_articles/:id');
  return request_get(toPath({id}),data);
}

/**
 * 推送文章库删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 数据ID （必填）
 */
export function del(data = {}) {
    return request_post(restUrl_publish+'/api/push_articles/delete',data);
}

/**
 * 推送文章库修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 数据ID （必填）
 * @param {String} data.name - 名称
 * @param {String} data.author - 作者
 * @param {String} data.preview - 正文
 * @param {String} data.img - 封面
 * @param {String} data.abs - 摘要
 * @param {String} data.tag - 标签
 * @param {String} data.status - 发布状态  未分发：1 ；待审核：2；审核未通过：3；已发布：4
 * @param {String} data.distribute_time - 分发时间
 */
export function modifyArticle({id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/push_articles/:id');
  return request_put(toPath({id}),data);
}

/**
 * 推送文章库添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称
 * @param {String} data.author - 作者
 * @param {String} data.preview - 正文
 * @param {String} data.img - 封面
 * @param {String} data.abs - 摘要
 * @param {String} data.tag - 标签
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function addArticle(data = {}) {
    return request_post(restUrl_publish+'/api/push_articles',data);
}

/**
 * 推送文章库加急审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data._id
 */
export function urgent(data = {}) {
    return request_post(restUrl_publish+'/api/push_articles/urgent',data);
}

/**
 * 推送文章库分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data._id
 */
export function audits(data = {}) {
    return request_put(restUrl_publish+'/api/push_articles/distribute',data).then(res=>{
        suance({
          id:data.id,
          info:res.data
				})
				return res
    });
}

/**
 * 分组列表
 * @return {Promise}
 */
export function listGroup() {
    return request_get(restUrl_publish+'/api/push_articles/groups/list');
}

/**
 * 新增分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup(data = {}) {
    return request_post(restUrl_publish+'/api/push_articles/groups',data);
}
/**
 * 分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({id,...data} = {}) {
  let toPathGroup= pathToRegexp.compile(restUrl_publish+'/api/push_articles/groups/:id');
  return request_put(toPathGroup({id}),data);
}
/**
 * 删除分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function deleteGroup(data = {}) {
    return request_post(restUrl_publish+'/api/push_articles/groups/delete',data);
}
/**
 * 移动分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.new_group_id
 * @param {String} data.old_group_id
 * @param {Array} data._ids
 */
export function moveGroup(data = {}) {
    return request_post(restUrl_publish+'/api/push_articles/groups/move',data);
}
/**
 * 查询元数据
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function getMetadata({id,...data} = {}) {
  let toPathMetadata = pathToRegexp.compile(restUrl_publish+'/api/push_articles/metadata/:id');
  return request_get(toPathMetadata({id}),data);
}
