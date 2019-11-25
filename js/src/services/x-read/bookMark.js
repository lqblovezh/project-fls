import {request_post,request_get,request_put,request_delete} from 'services/common/request'

/**
 * 用户中心我的书签
 * @param {Object} data
 * @param {String} data.book_id
 * @param {String} data.user_id
 */

export function getList(data={}){
  return request_get('/api/book_marks',data)
}


/**
 * 用户中心我的书签-笔记书签删除
 * @param {Object} data
 * @param {String} data.id
 */

 export function del(data={}){
    return request_post('/api/book_exegesis/delete',data);
 }
