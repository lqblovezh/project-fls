/*
* 知识点
* */
import {request_post,request_get,request_put,request_delete,request_file,request_progress} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

/**
 * 知识点修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyNowledges({id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/nowledges/:id');
  return request_put(toPath({id}),data).then(async (res) => {
      await resetStatus({id:data.pid,type:data.type})
      return res
  })
}

/**
 * 知识点删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteNowledges(data = {}) {
    return request_post(restUrl_publish+'/api/nowledges/delete',data).then(async (res) => {
        await resetStatus({id:data.pid,type:data.type})
        return res
    })
}

/**
 * 知识点新增
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 名称
 * @param {String} data.t_id - 主题ID
 * @param {String} data.group_id - 分组ID
 */
export function addNowledges(data = {}) {
    return request_post(restUrl_publish+'/api/nowledges',data).then(async (res) => {
        await resetStatus({id:data.pid,type:data.type})
        return res
    })
}

/**
 * 知识点置顶
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function upNowledges(data = {}) {
    return request_put(restUrl_publish+'/api/nowledges',data)
}

/**
 * 知识点分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({id,...data} = {}) {
  let toPathGroup = pathToRegexp.compile(restUrl_publish+'/api/nowledges/groups/:id');
  return request_put(toPathGroup({id}),data).then(async (res) => {
      await resetStatus({id:data.pid,type:data.type})
      return res
  })
}

/**
 * 知识点分组列表
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function listGroup(data = {}) {
    return request_get(restUrl_publish+'/api/nowledges/groups',data)
}

/**
 * 知识点分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup(data = {}) {
    return request_post(restUrl_publish+'/api/nowledges/groups/delete',data).then(async (res) => {
        await resetStatus({id:data.pid,type:data.type})
        return res
    })
}

/**
 * 知识点分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.id
 */
export function addGroup(data = {}) {
    return request_post(restUrl_publish+'/api/nowledges/groups',data).then(async (res) => {
        await resetStatus({id:data.pid,type:data.type})
        return res
    })
}

/**
 * 知识点图书列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * */
export function listNowledges ({id,...data} = {}) {
  let toPathBook = pathToRegexp.compile(restUrl_publish+'/api/nowledges/book/:id');
  return request_get(toPathBook({id}),data);
}

/**
 * 知识点锚点音频列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function audioNowledges({id,...data} = {}) {
  let toPathAudio = pathToRegexp.compile(restUrl_publish+'/api/nowledges/audio/:id');
  return request_get(toPathAudio({id}),data)
}

/**
 * 知识点锚点章节搜索详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * */
export function searchNowledges({id,...data} = {}) {
  let toPathSearch = pathToRegexp.compile(restUrl_publish+'/api/nowledges/book/catalogs/:id');
  return request_get(toPathSearch({id}),data)
}

/**
 * 知识点锚点视频列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function videoNowledges({id,...data} = {}) {
  let toPathVideo = pathToRegexp.compile(restUrl_publish+'/api/nowledges/video/:id');
  return request_get(toPathVideo({id}),data)
}

/**
 * 知识点锚点列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.type
 * @param {String} data.name
 */
export function NowledgesList({type,...data} = {}) {
    if (type == '章节锚点') {
        return searchNowledges(data)
    } else if (type == '音频锚点') {
        return audioNowledges(data);
    } else if (type == '视频锚点') {
        return videoNowledges(data)
    }
}

/**
 * 知识点列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.group_id
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function listKnowledge(data = {}) {
    return request_get(restUrl_publish+'/api/nowledges',data)
}

/**
 * 添加锚点
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.n_id - 主题或者图书的id
 * @param {String} data.c_id - 章节|内容|音频|视频(id)
 * @param {String} data.b_id - 章节|内容(书id)
 * @param {Array} data.name - 知识名称
 * @param {String} data.range - range前台json
 * @param {String} data.notes - 注释
 * @param {String} data.type - 章节锚点|内容锚点|音频锚点|视频锚点
 * @param {String} data.point - 选中知识点内容
 */
export function addAnchor(data = {}) {
    return request_post(restUrl_publish+'/api/nowledge_info',data).then(async (res) => {
        await resetStatus({id:data.pid,type:data.ptype})
        return res
    })
}

/**
 * 知识点锚点删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 知识点id
 */
export function delAnchor (data = {}) {
    return request_post(restUrl_publish+'/api/nowledge_info/delete', data).then(async (res) => {
        await resetStatus({id:data.pid,type:data.type})
        return res
    })
}

/**
 * 知识点一键挂载
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 主题ID
 */
export function mount(data = {}) {
    return request_post(restUrl_publish+'/api/nowledge_info/mount',data).then(res => {
        let mounts = JSON.parse(window.localStorage.getItem('mounts'))||[]
        let index = mounts.findIndex(item => item.tid === data.id)
        const arr = {
            tid: data.id,
            id: res.data.id
        }
        if(index>-1){
            mounts.splice(index,1)
        }
        mounts.push(arr)
        window.localStorage.setItem('mounts',JSON.stringify(mounts))
    })
}

/**
 * 知识点锚点列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 主题ID
 * @param {String} data.type - 锚点类型 (章节锚点|内容锚点|音频锚点|视频锚点)
 */
export function nowledge_info(data = {}) {
    return request_get(restUrl_publish+'/api/nowledge_info',data)
}

/**
 * 知识点一键挂载进度获取
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 主题ID
 */
export function mountSchedule({id,...data} = {},callback = () => {}) {
    let mounts = JSON.parse(window.localStorage.getItem('mounts'))||[]
    let mount = mounts.find(item => item.tid === id)
    if(!mount){
        return ''
    }
    let toPathMount = pathToRegexp.compile(restUrl_publish+'/api/nowledge_info/:id');
    return request_progress(toPathMount({id:mount.id}),callback)
}

/**
 * 知识点锚点列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 产品id
 */
export function nowledge_btn(data = {}) {
    return request_get(restUrl_publish+'/api/nowledge_button',data)
}

/**
 * 知识点修改重置审核状态
 * @param {*} data 
 * @param {Number} data.type - 产品所属类型
 * @param {String} data.id - 产品id
 */ 
function resetStatus({id,type}) {
  let toStatus = pathToRegexp.compile(restUrl_publish+'/api/nowledge_status/:id');
  return request_get(toStatus({id}),{type})
}