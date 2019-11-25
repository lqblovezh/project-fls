import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import {listBooks,detailBooks} from '../book/index';
import {listAudio,detailAudio} from '../audio/index';
import {listVideo,detailVideo} from '../video/index';
import {listPicture,detailPicture} from '../picture/index';
import {listContent,detailContent} from '../content/index';
import {listLibraries,detailLibraries} from '../libraries/index';
import {listDigitalBook,detailDigitalBook} from '../digitalbooks/index';
import {getList as productList} from '../product/index';
import {addResListener,suance} from '../dbi'
import pathToRegexp from 'path-to-regexp';

/**
 * 主题库添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称
 * @param {String} data.type - 类型
 * @param {String} data.img - 封面
 * @param {String} data.abs - 简介
 * @param {String} data.tag - 标签
 * @param {Array} data.attributes - 元数据 [{key:'',value:''},...]
 * @param {Array} data.constitute - 内容仓库关联  [{id : '',type : ''},...] type 1数字。2文章。3图片。4音频。5视频。63D。7H5。8ARVR，
 */
export function addTheme (data = {}) {
    return request_post(restUrl_publish+'/api/themes',data).then(result => {
      const {
        id,
        name,
        type_name,
        abs,
        tag,
      }=result.data
      addResListener({
        res_id:id,
        res_type:type_name,
        res_name:name,
        res_exp:abs,
        res_lables:[tag],
      })
      return result
    });
}

/**
 * 主题库修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name - 名称
 * @param {String} data.type - 类型
 * @param {String} data.img - 封面
 * @param {String} data.abs - 简介
 * @param {String} data.tag - 标签
 * @param {Array} data.attributes - 元数据 [{key:'',value:''},...]
 * @param {Array} data.constitute - 内容仓库关联  [{id : '',type : ''},...] type 1数字。2文章。3图片。4音频。5视频。63D。7H5。8ARVR，
 */
export function modifyTheme({id,...data}= {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/themes/:id');
  return request_put(toPath({id}),data);
}

/**
 * 主题库列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.type
 * @param {String} data.status
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id
 */
export function ListTheme( data = {}) {
    return request_get(restUrl_publish+'/api/themes',data);
}

/**
 * 主题库删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function del( data = {}) {
    return request_post(restUrl_publish+'/api/themes/delete',data);
}

/**
 * 主题库分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.status
 */
export function modifyGroup( {id,...data} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/themes/groups/:id');
  return request_put(toPathGroup({id}),data);
}

/**
 * 主题库分组列表
 * @return {Promise}
 */
export function listGroup( data = {}) {
    return request_get(restUrl_publish+'/api/themes/groups',data);
}

/**
 * 主题库分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup( data = {}) {
    return request_post(restUrl_publish+'/api/themes/groups/delete',data);
}

/**
 * 主题库分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup( data = {}) {
    return request_post(restUrl_publish+'/api/themes/groups',data);
}

/**
 * 主题库分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.new_group_id
 * @param {String} data.old_group_id
 * @param {Array} data.id
 */
export function moveGroup( data = {}) {
    return request_put(restUrl_publish+'/api/themes/groups',data);
}

/**
 * 主题库详情移出图书信息
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.data - 例子 data =[ {tid : '',id : '',type : ''}... ]
 * @param {String} data.data.tid
 * @param {String} data.data.type
 * @param {String} data.data.id
 */
export function deleteThemeBook( data = {}) {
    return request_post(restUrl_publish+'/api/themes/book_remove',data);
}

/**
 * 主题单条详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.data.id
 */
export function detailTheme( {id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/themes/:id');
  return request_get(toPath({id}),data);
}

/**
 * 主题库分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.type - 分发平台，X-READ => 0 ，微信公众平台 => 1 ，微博 =>2
 */
export function audits( data = {}) {
    return request_put(restUrl_publish+'/api/themes/issuance',data).then(res=>{
        suance({
          id:data.id,
          info:res.data
				})
				return res
    });
}

/**
 * 主题库加急
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.data.id
 */
export function detailUrgent( data = {}) {
    return request_put(restUrl_publish+'/api/themes/urgent',data);
}
/**
 * 主题获取图书备份详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function backups ({id,...data} = {}) {
  let toPathBook = pathToRegexp.compile(restUrl_publish+'/api/themes/book/:id');
  return request_get(toPathBook({id}),data);
}

/**
 * 主题库详情添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type - 类型 ： 默认 book->图书   audio->音频  video->视频  3d->3D内容  ar->AR和VR内容  product->产品
 * @param {String} data.name
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function _themeAdd({type = 'book',...data} ={}) {
    if (type == 'book') {
        return listBooks(data)
    } else if (type == 'audio') {
        return listAudio(data);
    } else if (type == 'video') {
        return listVideo(data);
    } else if (type == '3d') {
        return listContent(data);
    } else if (type == 'ar') {
        return listLibraries(data);
    } else if (type == 'product') {
        return listDigitalBook(data);
    }else if(type == 'release'){
        return productList(data)
    }
}

/**
 * 主题库详情添加详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.c_id
 * @param {String} data.type - 类型 ： 默认book->1 pic->3 audio->4  video->5  3d->6  ar->8 product->10 release->13
 */
export function _themeDetail({type = 1,c_id,...data} ={}) {
    if (type == 1) {
        if (c_id) {
          return backups(data);
        } else {
          return detailBooks(data)
        }
    } else if (type == 3) {
        return detailPicture(data)
    } else if (type == 4) {
        return detailAudio(data);
    } else if (type == 5) {
        return detailVideo(data);
    } else if (type == 6) { 
        return detailContent(data);
    } else if (type == 8) {
        return detailLibraries(data);
    } else if (type ==10) {
        return detailDigitalBook(data);
    } else if (type ==13) {
        // TODO:返回 return detailDigitalBook(data);
    } else if(type == 31){
			return 
		} 
}
