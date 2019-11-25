import {request_post,request_get,request_put,request_delete,getFullPath} from 'services/common/request';
import qs from 'qs'
import pathToRegexp from 'path-to-regexp';
import {
  educeResListener
} from '../dbi'


/*多形态 */
/**
 * 发布图书
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 要发布的图书ID
 * @param {String} data.type - 类型(epub,pdf...)
 */
export function startStorage(data = {}) {
    return request_post(restUrl_publish+'/api/mult_books',data)
}
/**
 * 修改
 * @param  
 */
export function modify({id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/mult_books/:id');
  return request_put(toPath({id}),data);
}

/**
 * 列表
 * @param 
 */
export function list(data = {}) {
    return request_get(restUrl_publish+'/api/mult_books',data);
}

/**
 * 多形态库导出
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
      res_url:getFullPath(restUrl_publish+'/api/mult_books/export' + qs.stringify(data, {addQueryPrefix: true}))
    })
    return request_get(restUrl_publish+'/api/mult_books/export',data)
}

/**
 * 删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del(data = {}) {
    return request_post(restUrl_publish+'/api/mult_books/delete',data);
}

/**
 * 详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function detail(data = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/mult_books/:id');
  return request_get(toPath(data));
}

/**
 * 获取图书目录
 * @return {Promise}
 * @param {Object} data
 * @param {Object} data.id
 * @param {Object} data.name
 * @param {Object} data.color
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */

export function getCatalog({id,...data} = {}) {
  let toPath_catalog = pathToRegexp.compile(restUrl_publish+'/api/books/:id/catalogs');
  return request_get(toPath_catalog({id}),data)
}



/**
 * 删除分组
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup({id,...data} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/mult_books/groups/:id');
  return request_delete(toPathGroup({id}));
}



/**
 * 分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({id,...data} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/mult_books/groups/:id');
  return request_put(toPathGroup({id}),data);
}

/**
 * 分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup(data = {}) {
    return request_post(restUrl_publish+'/api/mult_books/groups',data);
}

/**
 * 分组列表
 * @return {Promise}
 */
export function listGroup() {
    return request_get(restUrl_publish+'/api/mult_books/groups');
}


/**
 * 分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.new_group_id - 要移动到的分组ID
 * @param {String} data.old_group_id - 当前的所属分组ID
 * @param {Array} data.rel_id - 书籍ID
 */
export function moveGroup(data = {}) {
    return request_put(restUrl_publish+'/api/groups/books',data);
}


/**
 * 图书同级排序
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.sort - 操作(up/down)
 */
export function siblingSort({id,...data} = {}) {
  let toPathSort = pathToRegexp.compile(restUrl_publish+'/api/catalogs/sort/:id');
  return request_put(toPathSort({id}),data);
}