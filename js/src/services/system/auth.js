//用户sys 管理员权限相关接口

import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
let toPath = pathToRegexp.compile('/system/api/manager/managers/:id');
let toPathRole = pathToRegexp.compile('/system/api/manager/roles/:id');

/**
 * 管理员角色列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.app_type_all  是否返回所有平台的角色(1为是 其他为否)
 */
export function listRole(data = {}) {
    return request_get('/system/api/manager/roles',data)
}

/**
 * 管理员列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 用户名（选填）
 * @param {String} data.nick_name - 昵称（选填）
 * @param {String} data.phone - 电话（选填）
 * @param {String} data.mail - 邮箱（选填）
 * @param {String} data.time_start - 开始时间（选填）
 * @param {String} data.time_end - 结束时间（选填）
 * @param {String} data.role - 角色ID（选填）
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * */
export function listManager(data = {}) {
    return request_get('/system/api/manager/managers',data);
}
/**
 * 管理员添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 用户名
 * @param {String} data.nick_name - 昵称
 * @param {String} data.phone - 电话
 * @param {String} data.mail - 邮箱
 * @param {String} data.reset_pass - 是否重置密码（1为是，0 为否）
 * @param {Array} data.roles - 属于的角色
 * */
export function addManager(data = {}) {
    return request_post('/system/api/manager/managers',data);
}

/**
 * 管理员修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name - 用户名
 * @param {String} data.nick_name - 昵称
 * @param {String} data.phone - 电话
 * @param {String} data.mail - 邮箱
 * @param {String} data.reset_pass - 是否重置密码（1为是，0 为否）
 * @param {Array} data.roles - 属于的角色
 * */
export function modifyManager({id,...data} = {}) {
    return request_put(toPath({id}),data);
}

/**
 * 管理员详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 用户ID
 * */
export function detailManager({id,...data} = {}) {
    return request_get(toPath({id}),data);
}

/**
 * 角色详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 角色ID
 * */
export function detailRole({id,...data} = {}) {
    if (id) {
        return request_get(toPathRole({id}),data).then(res => {

            let roleArr = {};
            if (res.status) {
                roleArr =  res.data.accesses;
                let role = {
                    allow_create: 0,
                    allow_view_all: 0,
                    allow_edit_all: 0,
                    allow_delete_all: 0,
                };

                return allJurisdiction().then(accesses => {
                    //log(accesses,321)
                    if (accesses.status) {
                        let accessesArr = accesses.data;
                        let arr = {};
                        for (let i in accessesArr) {
                            arr[accessesArr[i].id] = {...accessesArr[i],...role}
                            if(roleArr[accessesArr[i].id]) {
                                arr[accessesArr[i].id] = {...accessesArr[i],...roleArr[accessesArr[i].id]}
                            }
                        }
                        accesses.data = arr;
                        log(res,222)
                        return accesses
                    }
                })
            }
        });
    } else {
        return _allJurisdiction()
    }
}

/**
 * 所有权限列表
 * @return {Promise}
 * */
export function allJurisdiction() {
    return request_get('/system/api/manager/accesses')
}

/**
 * 所有权限列表--组装
 * @return {Promise}
 * */
export function _allJurisdiction() {
    return request_get('/system/api/manager/accesses').then(res => {
        if (res.status) {
            let role = {
                allow_create: 0,
                allow_view_all: 0,
                allow_edit_all: 0,
                allow_delete_all: 0,
            };
            let accessesArr = res.data;
            let arr  = {};
            for (let i in accessesArr) {
                arr[accessesArr[i].id] = {...accessesArr[i],...role}
            }
            res.data = arr;
            return res
        }
    });
}



/**
 * 角色修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.exp
 * @param {Object} data.accesses
 * @example
 * data.accesses = {
 *      "dfa71d58-7c57-4cc5-8508-5458cf5c2e8f": {                //类型：Object  必有字段  备注：权限
 *          "allow_create":1,                //类型：Number  必有字段  备注：允许新建
 *         "allow_view_all":1,                //类型：Number  必有字段  备注：允许查看所有
 *           "allow_view_group":1,                //类型：Number  必有字段  备注：允许查看同组的
 *          "allow_view_own":1,                //类型：Number  必有字段  备注：允许查看自己的
 *           "allow_edit_all":1,                //类型：Number  必有字段  备注：允许编辑所有的
 *          "allow_edit_group":1,                //类型：Number  必有字段  备注：允许同组的
 *          "allow_edit_own":1,                //类型：Number  必有字段  备注：允许编辑自己的
 *        "allow_delete_all":1,                //类型：Number  必有字段  备注：允许删除所有的
 *       "allow_delete_group":1,                //类型：Number  必有字段  备注：允许删除同组的
 *      "allow_delete_own":1                //类型：Number  必有字段  备注：允许自己的
 *      }...
 * }
 * */
export function role({id,...data} = {}) {
    log(data)
    if(id){
        return request_put(toPathRole({id}),data)
    }
    return request_post('/system/api/manager/roles',data)
}
// export function modifyRole({id,...data} = {}) {
//     return request_put(toPathRole({id}),data);
// }

/**
 * 角色添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.exp
 * @param {Object} data.accesses
 * @example
 * data.accesses = {
 *      "dfa71d58-7c57-4cc5-8508-5458cf5c2e8f": {                //类型：Object  必有字段  备注：权限
 *          "allow_create":1,                //类型：Number  必有字段  备注：允许新建
 *         "allow_view_all":1,                //类型：Number  必有字段  备注：允许查看所有
 *           "allow_view_group":1,                //类型：Number  必有字段  备注：允许查看同组的
 *          "allow_view_own":1,                //类型：Number  必有字段  备注：允许查看自己的
 *           "allow_edit_all":1,                //类型：Number  必有字段  备注：允许编辑所有的
 *          "allow_edit_group":1,                //类型：Number  必有字段  备注：允许同组的
 *          "allow_edit_own":1,                //类型：Number  必有字段  备注：允许编辑自己的
 *        "allow_delete_all":1,                //类型：Number  必有字段  备注：允许删除所有的
 *       "allow_delete_group":1,                //类型：Number  必有字段  备注：允许删除同组的
 *      "allow_delete_own":1                //类型：Number  必有字段  备注：允许自己的
 *      }...
 * }
 * */
export function addRole(data = {}) {
    return request_post('/system/api/manager/roles',data);
}

/**
 * 管理员删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 * */
export function deleteManager(data = {}) {
    console.log(data)
    return request_post('/system/api/manager/managers/delete',data);
}

/**
 * 角色删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 * */
export function deleteRole(data = {}) {
    return request_post('/system/api/manager/roles/delete',data);
}

/**
 * 管理员日志
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 用户名（选填）
 * @param {String} data.nick_name - 昵称（选填）
 * @param {String} data.client_ip - IP
 * @param {String} data.time_start - 开始时间（选填）
 * @param {String} data.time_end - 结束时间（选填）
 * @param {String} data.role - 角色ID（选填）
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * */
export function logManager(data = {}) {
    return request_get('/system/api/manager/logs',data);
}

/**
 * 用户登录
 */
export function login(data={}){
   return request_post('/system/api/auth/login/manager',data)
}

export function isLogin() {
  return request_get('/system/api/auth/is_login/manager')
}

export function loginOut (data = {}) {
	return request_post('/system/api/auth/logout', data)
}

/**
 * 修改密码
 * @return {Promise}
 * @param {Object} data - 传入对象
 * @param {Object} data.old_pass - 旧密码（必传）
 * @param {Object} data.new_pass - 新密码（必传）
 * @param {Object} data.new_pass_confirm - 新密码确认（必传）
 */
export function changePass(data = {}) {
  return request_put('/system/api/auth/pass', data).then(res => {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('userInfo')
    config.token = null
    return res
  })
}