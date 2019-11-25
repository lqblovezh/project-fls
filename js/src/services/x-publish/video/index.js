import {request_post,request_get,request_put,request_delete,getFullPath} from 'services/common/request';
import qs from 'qs'
import pathToRegexp from 'path-to-regexp';
import {
    addResListener,
    educeResListener
} from '../dbi'
/**
 * 视频添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 视频名字
 * @param {String} data.author - 视频作者
 * @param {String} data.preview - 视频内容
 * @param {String} data.tag - 视频标签
 * @param {String} data.img - 封面
 * @param {String} data.abs - 视频摘要或者简介
 * @param {String} data.length - 长度
 * @param {String} data.size - 大小
 * @param {String} data.format - 格式
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function add(data = {}) {
    log("add",data)
    return request_post(restUrl_publish+'/api/videos',data).then(result=>{
        const{
            _id,
            name,
            author,
            abs,
            tag,
            type_name,
        }=result.data
        addResListener({
            res_id:_id,
            res_author:author,
            res_name:name,
            res_exp:abs,
            res_type:type_name,
            res_lables:[tag],
        })
        return result;
    });
}

/**
 * 视频修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.preview
 * @param {String} data.tag
 * @param {String} data.img
 * @param {String} data.abs
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function modify({id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/videos/:id');
  return request_put(toPath({id}),data);
}

/**
 * 视频列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.state
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id - 未分组 ： non
 */
export function listVideo(data = {}) {
    return request_get(restUrl_publish+'/api/videos',data);
}

/**
 * 视频导出
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.state
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id - 未分组 ： non
 * @param {Array} data.id
 */
export function educe(data = {}) {
    educeResListener({
      res_url:getFullPath(restUrl_publish+'/api/videos/export' + qs.stringify(data, {addQueryPrefix: true}))
    })
    return request_get(restUrl_publish+'/api/videos/export',data)
}

/**
* 视频导入
* @return {Promise}
* @param {Object} data
* @param {String} data.name
* @param {String} data.temp
*/
export function putin(data = {}) {
    return request_post(restUrl_publish+'/api/videos/import',data)
}

/**
 * 视频列表
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteVideo(data = {}) {
    return request_post(restUrl_publish+'/api/videos/delete',data);
}

/**
 * 视频详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function detailVideo(data = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/videos/:id');
  return request_get(toPath(data));
}

/**
 * 视频分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({id,...data} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/videos/groups/:id')
  return request_put(toPathGroup({id}),data);
}

/**
 * 视频分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup(data = {}) {
    return request_post(restUrl_publish+'/api/videos/groups/delete',data);
}

/**
 * 视频分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup(data = {}) {
    return request_post(restUrl_publish+'/api/videos/groups',data);
}

/**
 * 视频分组列表
 * @return {Promise}
 */
export function listGroup() {
    return request_get(restUrl_publish+'/api/videos/groups');
}

/**
 * 视频分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.new_group_id - 要移动到的分组ID
 * @param {String} data.old_group_id - 当前的所属分组ID
 * @param {Array} data.id - 书籍ID
 */
export function moveGroup(data = {}) {
    return request_put(restUrl_publish+'/api/videos/groups',data);
}
