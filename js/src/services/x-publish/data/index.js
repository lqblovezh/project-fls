import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
let variant = pathToRegexp.compile(restUrl_publish+'/api/variant/:id');

/**
 * 修改简繁字体
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.simp
 * @param {Array} data.trad
 */
export function modifyFont ({id,...data} = {}) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/simp/:id');
    const del = {
        id : []
    };
    const add = [];
    for (let i in data.trad) {
        if (data.trad[i].action == 'del') {
            del.id.push(data.trad[i].id);
        } else {
            add.push(data.trad[i].trad);
        }
    }
    if (del.id.length > 0) {
        return _delFont(del).then(res => {
            if (res.status) {
                data.trad = add;
                return request_put(toPath({id}),data);
            }
        })
    } else {
        data.trad = add;
        return request_put(toPath({id}),data);
    }
}
/**
 * 删除单个简繁字体
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 数组格式
 */
export function _delFont (data = {}) {
    return request_post(restUrl_publish+'/api/simp/id/delete',data);
}


/**
 * 删除简繁字体
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 数组格式
 */
export function deleteFont (data = {}) {
    return request_post(restUrl_publish+'/api/simp/delete',data);
}
/**
 * 添加简繁字体
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.simp - 简体字
 * @param {Array} data.trad - 繁体字(数组)
 */
export function addFont(data = {}) {
    return request_post(restUrl_publish+'/api/simp',data);
}
/**
 * 获取简繁字体列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.simp - 搜索时简体文字 选填
 * @param {String} data.start_time - 开始时间 选填
 * @param {String} data.end_time - 结束时间 选填
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function listFont(data = {}) {
    return request_get(restUrl_publish+'/api/simp',data);
}
/**
 * 获取简繁字体详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - （必须）
 */
export function detailFont({id,...data} = {} ) {
  let toPath = pathToRegexp.compile(restUrl_publish+'/api/simp/:id');
  return request_get(toPath({id}),data);
}

/**
 * 删除别称
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 数组类型（必须）
 */
export function deleteNickName(data = {} ) {
    return request_post(restUrl_publish+'/api/nickname/delete',data);
}
/**
 * 获取别称列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 官方称谓 选填
 * @param {String} data.tags - 标签 选填
 * @param {String} data.start_time - 开始时间 选填
 * @param {String} data.end_time - 开始时间 选填
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function listNickName(data = {}) {
    return request_get(restUrl_publish+'/api/nickname',data);
}

/**
 * 获取别称详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必传
 */
export function detailNickName({id,...data} = {}) {
  let nickname = pathToRegexp.compile(restUrl_publish+'/api/nickname/:id');
  return request_get(nickname({id}),data);
}

/**
 * 添加别称
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 官方称谓
 * @param {Array} data.nick - 别称
 * @param {String} data.tags - 标签
 */
export function addNickName(data = {}) {
    return request_post(restUrl_publish+'/api/nickname',data);
}

/**
 * 删除单个别称
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 数组类型（必须）
 */
export function _delNickName(data = {} ) {
    return request_post(restUrl_publish+'/api/nickname/id/delete',data);
}

/**
 * 修改别称
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必传
 * @param {String} data.name - 官方称谓
 * @param {Array} data.nick - 别称
 * @param {String} data.tags - 标签
 */
export function modifyNickName({
    id,
    ...data
} = {}) {
  let nickname = pathToRegexp.compile(restUrl_publish+'/api/nickname/:id');
    const del = {
        id : []
    };
    const add = [];
    for (let i in data.nick) {
        if (data.nick[i].action == 'del') {
            del.id.push(data.nick[i].id);
        } else {
            add.push(data.nick[i].nick);
        }
    }
    if (del.id.length > 0) {
        return _delNickName(del).then(res => {
            if (res.status) {
                data.nick = add;
                return request_put(nickname({id}),data);
            }
        })
    } else {
        data.nick = add;
        return request_put(nickname({id}),data);
    }



}

/**
 * 修改异体字
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 必传
 * @param {Array} data.fonts - 异体字文件路径
 * @param {String} data.img
 * @param {String} data.simp - 简体字
 */
export function modifyVariant({
    id,
    ...data
} = {}) {
    return request_put(variant({id}),data);
}

/**
 * 删除异体字
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id - 必传
 */
export function deleteVariant(data = {}) {
    return request_post(restUrl_publish+'/api/variant/delete',data);
}

/**
 * 异体字列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.simp
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function listVariant(data = {}) {
    return request_get(restUrl_publish+'/api/variant',data);
}

/**
 * 异体字详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function detailVariant({id,...data} = {}) {
    return request_get(variant({id}),data);
}

/**
 * 新增异体字
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.simp - 简体字
 * @param {Array} data.fonts - 异体字文件储存路径
 * @param {String} data.img - 预览图片路径
 * @param {String} data.xc_variant - 对应html标签
 * @param {String} data.code - 异体字对应编码
 */
export function addVariant(data = {}) {
    return request_post(restUrl_publish+'/api/variant',data);
}

/**
 * 编辑异体字
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function editVariant({id,...data} = {}) {
    return request_put(variant({id}),data);
}
