import {request_post,request_get,request_put,request_delete,getFullPath} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import qs from 'qs'
import {
  educeResListener,
  createProListener
} from '../dbi'
import { reject } from 'when';

/**
* 修改图书
* @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.preview
 * @param {String} data.img
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
*/
export function modifyBooks({
    id,
    ...data,
} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/books/:id');
  return request_put(toPath({id}),data);
}
/**
 * 图书内容的导出
 * @return {Promise}
 * @param {Object} data
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
      res_url:getFullPath(restUrl_publish+'/api/books/export' + qs.stringify(data, {addQueryPrefix: true}))
    })
    return request_get(restUrl_publish+'/api/books/export',data)
}

/**
 * 图书内容的导入
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.temp
 */
export function putin(data = {}) {
  return request_post(restUrl_publish+'/api/books/import', data)
}


/**
 * 发布图书
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function fabu(data){
    return  request_post(restUrl_publish+'/api/mult_books' , data)
}
/**
 * 获取发布进度
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function getProgress(task_id){
    return  request_get(`${restUrl_publish}/api/mult_book/progress/${task_id}`)
}



/**
 * 删除图书
 * @return {Promise}
 * @param {Object} data
 * @param {Object} data.id
 */
export function deleteBooks(data = {}) {
    return request_post(restUrl_publish+'/api/books/delete',data)
}
/**
 * 获取图书列表
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
 * @param {String} data.group_id
 */
export function listBooks(data = {}) {
    return request_get(restUrl_publish+'/api/books',data);
}
/**
 * 获取图书详情
 * @return {Promise}
 * @param {Object} data
 * @param {Object} data.id
 */
export function detailBooks({
    id,
    ...data
} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/books/:id');
  return request_get(toPath({id}),data)
}


/**
 * 新建图书
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.preview
 * @param {String} data.img
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function addBooks(data = {}) {
    return request_post(restUrl_publish+'/api/books',data).then(res=>{
      createProListener({
          res_id:res.data.task_id,
          res_type:'数字图书',
          res_cover:data.img,
          res_covers:'',
          res_exp:data.abs,
          res_author:data.author,
          res_author_id:'',
          res_Interpreter:'',
          res_Interpreter_id:'',
          res_lables:'',
          res_currency:'',
          res_money:'',
          res_isbn:'',
          res_isbn_ext:'',
          res_publication:''
      })
    });
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

export function getBookCatalog({id,...data} = {}) {
  let toPath_catalog = pathToRegexp.compile(restUrl_publish+'/api/books/:id/catalogs');
  return request_get(toPath_catalog({id}),data)
}

/**
 * 图书分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({id,...data} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/books/groups/:id');
  return request_put(toPathGroup({id}),data);
}

/**
 * 图书分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function deleteGroup({id,...data} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/books/groups/:id');
  return request_delete(toPathGroup({id}),data);
}

/**
 * 图书分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup(data = {}) {
    return request_post(restUrl_publish+'/api/books/groups',data);
}

/**
 * 图书分组列表
 * @return {Promise}
 */
export function listGroup() {
    return request_get(restUrl_publish+'/api/books/groups');
}

/**
 * 图书分组移动
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

/**
 * 图书目录层级移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.sort - 操作(up/down)
 */
export function moveCatalog({id,...data} = {}) {
    return request_put(restUrl_publish+'/api/catalogs/outline',data)
}

/**
 * 内容仓库电子书-直接生成产品
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function products(data = {}) {
    return request_post(restUrl_publish+'/api/books/products',data)
}

/**
 * 插入音视频
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 融合产品Id
 * @param {String} data.book_id - 必有 内容仓库id
 * @param {Array} data.audio - 可选 音频集合
 * @param {Array} data.video - 可选 视频集合
 */
export function fastAdd(data = {}) {
    return request_post(restUrl_publish+'/api/comproduct/fast/add',data)
}

/**
 * 快速电子书预览
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 融合产品Id
 * @param {String} data.task_id - 必有 任务id
 */
export function fastPrevew(data = {}) {
    return request_post(restUrl_publish+'/api/audits/fast',data)
}

/**
 * 快速数据库资源添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.tmp - 必有 zip
 * @param {String} data.task_id - 必有 任务id
 */
export function fastLibrary(data = {}) {
    return request_post(restUrl_publish+'/api/databook/temp',data)
}

/**
 * 数据库 入库
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必有 zip
 * @param {String} data.task_id - 必有 任务id
 */
export function bookAdd(data = {}) {
    return request_post(restUrl_publish+'/api/databook/add',data)
}

/**
 * 数据库 审核
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.task_id - 必有 任务id
 */
export function dataFast(data = {}) {
  return request_post(restUrl_publish+'/api/data_fast',data).then(res => {
    if(res.data.data==2) {
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          resolve(dataFast(data))
        },2000)
      })
    }else{
      return res
    }
  })
}
