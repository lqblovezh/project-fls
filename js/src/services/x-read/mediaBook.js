import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

let toPathGroup = pathToRegexp.compile('/api/books/groups/:id');
let toPathGroupModify = pathToRegexp.compile('/api/books/:id/groups');
let bookDetail = pathToRegexp.compile('/api/books/:id')
let putSettingInfo = pathToRegexp.compile('/api/books/setting_info/:id')

/**
 * 获取媒体列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.author - 选填 作者
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
  return request_get('/api/books',data)
}

/**
 * 图书详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 图书id
 */
export function detail(data = {}){
  return request_get(bookDetail(data),data)
}

/**
 * 删除图书
 * @param {Object} data
 * @param {Array} data.id - 必有字段 图书id
 */
export function del(data = {}){
  return request_post('/api/books/delete',data)
}

/**
 * 图书上架
 * @param {Object} data 
 * @param {Array} data.id - 必有字段 图书id
 */
export function put(data){
  return request_put('/api/books/put', data)
}

/**
 * 图书下架
 * @param {Object} data 
 * @param {Array} data.id - 必有字段 图书id
 */
export function pull(data){
  return request_put('/api/books/pull', data)
}

/**
 * 分组列表
 */
export function groupList(data={}){
  return request_get('/api/books/groups',data )
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
  return request_post('/api/books/groups',data)
}

/**
 * 删除分组
 * @param {Object} data 
 * @param {String} data.id 
 */
export function groupDel(data ){
  return request_delete(toPathGroup(data), data)
}

/**
 * 移动分组
 * @param {Object} data 
 * @param {String} data.old_group_id
 * @param {String} data.new_group_id
 * @param {Array} data.rel_id  
 */
export function groupMove(data){
  return request_put('/api/groups/books', data)
}

/**
 * 上架设置详情
 * @param {Object} data 
 * @param {String} data.id  
 */
export function putInfo(data){
  return request_get(putSettingInfo(data), data)
}

/**
 * 保存上架设置数据
 * @param {Object} data 
 * @param {String} data.book_id - 必有字段 图书id
 * @param {String} data.books_type - 必有字段 图书定价类型
 * @param {Array} data.books_free_ids - 必有字段 阅读免费章节id
 * @param {Array} data.picture_free_ids - 必有字段 图片免费章节id
 * @param {Array} data.audio_free_ids - 必有字段 音频免费章节id
 * @param {Array} data.video_free_ids - 必有字段 视频免费章节id
 * @param {String} data.books_all_price - 必有字段 阅读总价格
 * @param {String} data.picture_all_price - 必有字段 图片总价格
 * @param {String} data.audio_all_price - 必有字段 音频总价格
 * @param {String} data.video_all_price - 必有字段 视频总价格
 * @param {String} data.put_audio - 选填 是否上架到听读(不传默认为0)
 * @param {String} data.put_video - 选填 是否上架的视读(不传默认为0)
 * @param {String} data.category_id - 必有字段 上架书城的id
 */
export function putSave(data){
  return request_put('/api/books/save_data', data)
}

/**
 * 计算图书章节价格
 * @param {Object} data 
 * @param {String} data.book_id - 必有字段 图书id
 * @param {String} data.type - 必有字段 分章定价策略(1平均定价,2篇幅定价)
 * @param {String} data.resource_type - 必有字段 图书构成类型(1阅读,2图片,3音频,4视频)
 * @param {String} data.all_price - 必有字段 总价
 * @param {Array} data.id - 选填 对应类型的免费资源id
 */
export function computePrice(data){
  return request_put('/api/books/compute_price', data)
}

/**
 * 图书预览
 * @param {Object} data 
 * @param {String} data.product_id - 必有字段 产品id
 * @param {String} data.resource_id - 必有字段 资源id
 * @param {String} data.type - 必有字段 类型（book->16 picture->3 audio->4 video->5 resource->14）
 */
export function preview({type,...data}){
  switch (type) {
    case 16:
    case 1:
    data.type = 'book'
    break;
    case 3:
    data.type = 'picture'
    break;
    case 4:
    data.type = 'audio'
    break;
    case 5:
    data.type = 'video'
    break;
    case 14:
    data.type = 'resource'
    break;
    default:
    break;
  }
  return request_get('/api/books/preview', data)
}