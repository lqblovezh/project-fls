import {
  request_post,
  request_get,
  request_put,
  request_delete,
  getFullPath,
} from 'services/common/request'
import qs from 'qs'
import pathToRegexp from 'path-to-regexp'
import { listPicture } from '../picture/index.js'
import { listAudio } from '../audio/index.js'
import { listArticle } from '../article/index'
import { listVideo } from '../video/index.js'
import { listBooks } from '../book/index.js'
import { listContent } from '../content/index.js'
import { debrisList } from '../debris'
import { recomList } from '../recom'
import { getList as questionList} from '../question' 
import { listQrcodeResource as getList } from '../qrcode'
import { resourceList as seriesResource } from '../database'
import { listLibraries as ARList } from '../AR/index.js'
import { listLibraries as VRList } from '../VR/index.js'
import { getResource as listResource } from '../resource/resourcePub'
import { getResource as listPlanResource } from '../course/exercise'
import { addResListener, educeResListener, suance } from '../dbi'

/**
 * 新增图书库分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 分组名称
 */
export function addGroup(data = {}) {
  return request_post(restUrl_publish+'/api/digital_books/groups', data)
}

/**
 * 修改图书库分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({ id, ...data } = {}) {
  let toPathGroupModify = pathToRegexp.compile(restUrl_publish+'/api/digital_books/:id/groups')
  return request_put(toPathGroupModify({ id }), data)
}

/**
 * 删除图书库分组
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function deleteGroup({ id, ...data } = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/digital_books/groups/:id')
  return request_delete(toPathGroup({ id }), data)
}

/**
 * 图书库分组列表
 * @return {Promise}
 */
export function listGroup(data = {}) {
  return request_get(restUrl_publish+'/api/digital_books/groups', data)
}

/**
 * 图书库分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.old_group_id
 * @param {String} data.new_group_id
 * @param {Array} data.rel_id
 */
export function moveGroup(data = {}) {
  data.rel_id = data.id
  delete data.id
  return request_put(restUrl_publish+'/api/groups/digital_books', data)
}

/**
 * 图书详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function detailDigitalBook({ id, ...data } = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/digital_books/:id')
  return request_get(toPath({ id }), data)
}
/**
 * 图书删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteDigitalBook(data = {}) {
  return request_post(restUrl_publish+'/api/digital_books/delete', data)
}

/**
 * 图书添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称
 * @param {String} data.status - 发布状态
 * @param {String} data.author - 作者
 * @param {String} data.tag - 标签
 * @param {String} data.img - 封面
 * @param {String} data.abs - 简介
 * @param {Array} data.attributes - 元数据  [{key : '',value : ''}]
 * @param {Array} data.constitute - 内容仓库关联  [id :'',type : ''}]
 */
export function add(data = {}) {
  return request_post(restUrl_publish+'/api/digital_books', data).then(result => {
    const { _id, name, abs, author, tag, type_name } = result.data
    addResListener({
      res_id: _id,
      res_type: type_name,
      res_name: name,
      res_exp: abs,
      res_author: author,
      res_lables: [tag],
    })
    return result
  })
}

/**
 * 图书列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称
 * @param {String} data.author - 作者
 * @param {String} data.tag - 标签
 * @param {String} data.start_time - 开始时间
 * @param {String} data.end_time - 结束时间
 * @param {String} data.group_id
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function listDigitalBook(data = {}) {
  return request_get(restUrl_publish+'/api/digital_books', data)
}

/**
 * 图书修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name - 名称
 * @param {String} data.author - 作者
 * @param {String} data.tag - 标签
 * @param {String} data.img - 封面
 * @param {String} data.abs - 简介
 * @param {Array} data.attributes - 例 attributes = [ {key : '',value : ''},{key : '',value : ''}... ]
 * @param {Array} data.constitute  - 例 constitute = [ {id : '',type : ''},{id : '',type : ''}... ]
 */
export function modify({ id, ...data } = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/digital_books/:id')
  //   var del = [];
  //   var add = [];
  //   for (let i in constitute) {
  //     if (constitute[i].action == 'del') {
  //       del.push({
  //         tid : id,
  //         type : constitute[i].type,
  //         id : constitute[i].id
  //       });
  //     } else {
  //       add.push({
  //         type : constitute[i].type,
  //         id : constitute[i].id
  //       });
  //     }
  //   }
  //   if (del.length > 0) {
  //     removeConstitute(del);
  //   }
  //   data.constitute = add;
  return request_put(toPath({ id }), data)
}

/**
 * 加急审核
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 需要加急审核的图书id
 */
export function urgentDigitalBook(data = {}) {
  return request_put(restUrl_publish+'/api/digital_books/urgent', data)
}

/**
 * 分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要加急审核的图书id
 * @param {String} data.platforms -  //类型：String  可有字段  备注：分发平台，X-READ => 1 ，微信公众平台 => 2 ，微博 => 3
 */
export function issuance({ id, ...data } = {}) {
  let toPathIssuance = pathToRegexp.compile(restUrl_publish+'/api/digital_books/:id/issuance')
  return request_put(toPathIssuance({ id })).then(res => {
    suance({
      id,
      info: res.data,
    })
    return res
  })
}

/**
 * 移出图书内容
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.data - 例如 data.data = [ {tid : '',id : '',type : ''},{tid : '',id : '',type : ''}... ]
 */

export function removeConstitute(data = {}) {
  return request_put(restUrl_publish+'/api/digital_books/constitute', data)
}

/**
 * 同步
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 需要同步的图书id
 */
export function synchronization({ id, ...data } = {}) {
  let toPathSynchronization = pathToRegexp.compile(restUrl_publish+'/api/digital_books/:id/sync')
  return request_get(toPathSynchronization({ id }))
}

/**
 * 调序
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.t_id - 图书id
 * @param {String} data.type - 内容分类
 * @param {String} data.up_down - 上调还是下调(up/down)
 * @param {String} data._id - 资源id(内容id)
 * @param {String} data.number - 当前排序
 */
export function reordering(data = {}) {
  return request_put(restUrl_publish+'/api/digital_books/sort', data)
}

/**
 * 置顶
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.t_id - 图书id
 * @param {String} data.type - 内容分类
 * @param {String} data.product_id - 资源id(内容id)
 * @param {String} data.number - 当前排序
 */
export function stick(data = {}) {
  return request_put(restUrl_publish+'/api/digital_books/top', data)
}

/**
 * 知识点锚点列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 知识点id
 * @param {String} data.type - 章节锚点|内容锚点|音频锚点|视频锚点
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function listAnchor(data = {}) {
  return request_get(restUrl_publish+'/api/nowledge_info', data)
}

/**
 * 知识点锚点删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 知识点id
 */
export function delAnchor(data = {}) {
  return request_post(restUrl_publish+'/api/nowledge_info/delete', data)
}

/**
 * 图书库详情添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type - 1->阅读 2->文章 3->图片 4->音频 5->视频 6->3D内容 7->VR 8->AR  22-> 资源中的关联数据 19 -> 课程中的计划资源 9 —> 碎片资源 20->套系产品
 * @param {String} data.name
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function _addBooks({ type, ...data } = (data = {})) {
  log(type, data)
  switch (type) {
    case '1':
      return listBooks(data)
      break
    case '2':
      return listArticle(data)
      break
    case '3':
      return listPicture(data)
      break
    case '4':
      return listAudio(data)
      break
    case '5':
      return listVideo(data)
      break
    case '6':
      return listContent(data)
      break
    case '8':
      return ARList(data)
      break
    case '7':
      return VRList(data)
      break
    case '9':
      return debrisList(data)
      break
    case '10':
      return recomList(data)
      break
    case '22':
      return listResource(data)
      break
    case '19':
      return listPlanResource(data)
      break
    case '25':
      return listQrcodeResource(data)
      break
    case '20-1':
    case '20-2':
    case '20-3':
    case '20-4':
    case '20-6':
    case '20-7':
      return seriesResource({ type, ...data })
			break
		case '31':
			return questionList(data)
			break
    default:
      return listBooks(data)
      break
  }
}

/**
 * 推送文章库分发
 * @return {Promise}
 * @param {Object} data
 * @param {String} data._id
 */
export function distribute({ id, ...data } = {}) {
  let toPathDistribute = pathToRegexp.compile(restUrl_publish+'/api/digital_books/:id/issuance')
  return request_put(toPathDistribute({ id }), data).then(res => {
    suance({
      id,
      info: res.data,
    })
  })
}

/**
 * 数字图书导出
 * @return {Promise}
 * @param {Object} deta
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.group_id
 * @param {Array} data.id
 */
export function educe(data = {}) {
  educeResListener({
    res_url: getFullPath(
      '/publish/books/export' + qs.stringify(data, { addQueryPrefix: true })
    ),
  })
  return request_get('publish/books/export', data)
}

/**
 * 数字图书导入
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
