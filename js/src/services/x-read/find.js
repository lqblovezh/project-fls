import {request_post,request_get,request_put,request_delete} from 'services/common/request'
/**
 * 发现
 * @param {Object} data
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */

export function find(data={ page:1, last_position: 0 }){
  return request_get("/api/discover/get",data);
}

/**
 * 推荐书籍
 */

 export function recommend(data={}){
    return request_get('/api/books/recommend',data)
 }
