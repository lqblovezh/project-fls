import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import config from '../../config'
let loginReg = pathToRegexp.compile('/common/api/auth/login/:type')
let infoReg = pathToRegexp.compile('/common/api/user/users/detail/:user_id')
let isLoginReg = pathToRegexp.compile('/api/auth/is_login/:type')

/**
 * 用户账号注册
 * @param  {Object} [data={}] [description]
 * @param  {Object} [data.phone] [手机号]
 * @param  {Object} [data.code_id] [验证码ID]
 * @param  {Object} [data.code_val] [验证码]
 * @param  {Object} [data.name] [用户名 ,不传则以手机号作为用户名]
 * @param  {Object} [data.nick_name] [昵称（姓名），不传则以用户名作为昵称]
 * @param  {Object} [data.pass] [密码 不传则随机生成]
 * @return {[Promise]}           [description]
 */
export function userReg(data = {}) {
  return request_post('/common/api/user/register', data)
}

/**
 * 用户账号登录
 * @param  {Object} data
 * @param  {Object} data.user_name
 * @param  {Object} data.user_pass
 * @return {[Promise]}           [description]
 */
export function userLogin(data = {}) {
  return request_post('/common/api/auth/login/user', data).then(res => {
    window.sessionStorage.setItem('token', res.data.token)
    window.localStorage.setItem('token', res.data.token)

    config.token = res.data.token
    return res
  })
}

/**
 * 手机号码登录
 * @param  {Object} data
 * @param {String} data.phone 手机号码
 * @param {String} data.code_id
 * @param {String} data.code_val
 */
export function phoneLogin(data = {}) {
  return request_post('/common/api/auth/login_by_phone/user', data).then(
    res => {
      window.sessionStorage.setItem('token', res.data.token)
      window.localStorage.setItem('token', res.data.token)

      //window.sessionStorage.setItem("userInfo",qs.stringify(res.data.user))
      config.token = res.data.token
      return res
    }
  )
}

/**
 * 生成第三方登录链接
 * @param  {Object} [data={}] [description]
 * @return {[Promise]}           [description]
 */
export function thirdLogin(data = {}) {
  //后台没有考虑路径有hash的情况,导致分享出去后登陆, token_id没有拼接正确
  let match = data.back_url.match(/.*(\?.*)#.*/)
  let str = match && match[1]
  if (str) {
    data.back_url = data.back_url.replace(str, '')
  }

  return request_post('/common/api/auth/third/link', data)
}

/**
 * 用户是否登录
 * @param  {Object}  [data={}] [description]
 * @return {Boolean}           [description]
 */
export function isLogin({ type = 'user' } = {}) {
  return request_get(isLoginReg({ type })).then(res => {
    config.token = res.data.token

    return res
  })
}

/**
 * 获取用于详细资料
 * @param  {Object} [data={}] [description]
 * @return {[Promise]}           [description]
 */
export function getUserInfo(data = {}) {
  return request_get('/common/api/user/users/detail', data)
}

/**
 * 修改当前用户密码
 * @param  {Object} [data={}] [description]
 * @param {String} data.old_pass 旧密码
 * @param {String} data.new_pass 新密码
 * @param {String} data.new_pass_confirm 新密码
 */
export function updatePwd(data = {}) {
  return request_post('/common/api/auth/pass', data)
}

/**
 * 找回密码（发送验证码）
 * @param  {Object} data [description]
 * @param  {String} data.phone 手机号码
 * @param  {String} data.code_id 图片验证码id
 * @param  {String} data.code_val 图片验证码值
 */
export function backPwdCode(data = {}) {
  return request_post('/common/api/user/pass_reset/send', data)
}

/**
 * 找回密码（重新设置密码）
 * @param {Object} data [description]
 * @param  {String} data.user_id 获取到的用户id
 * @param  {String} data.code_val 验证码
 * @param  {String} data.pass 新密码
 * @param  {String} data.pass_confirm 新密码
 */
export function setPwd(data = {}) {
  return request_post('/common/api/user/pass_reset/set', data)
}

/**
 * 用户退出登录
 * @return {[Promise]} [description]
 */
export function logout() {
  return request_get('/common/api/auth/logout')
}

/**
 * 生成/消除 pc端token
 */
export function createPCToken() {
  return request_post('/common/api/auth/token/pcclient')
}

/**
 * 修改当前用户资料 修改某个字段传谁就行
 * @param  {Object} [data={}] [description]
 * @return {[Promise]}        [description]
 * @param  {Object} [data.nick_name] [昵称]
 * @param  {Object} [data.phone] [手机号]
 * @param  {Object} [data.email] [邮箱]
 * @param  {Object} [data.picture] [头像（文件上传后得到的path）]
 * @param  {Object} [data.sex] [性别   男|女|保密]
 * @param  {Object} [data.address] [地址]
 * @param  {Object} [data.date_of_birth] [出版日期   2018-11-11]
 * @param  {Object} [data.education] [学历]
 * @param  {Object} [data.company] [单位]
 * @param  {Object} [data.duties] [职务]
 * @param  {Object} [data.summary] [简介]
 * @param  {Object} [data.roles] [管理角色]
 * @param  {Object} [data.positions] [会员角色]
 * @param  {Object} [data.pass] [密码]
 * @param  {Object} [data.name] [账户名]
 */
export function changeUserInfo(data = {}) {
  return request_put('/common/api/user/users/detail', data)
}

/**
 * 验证码-图片
 * @param {Object} data
 */
export function codeImage(data = {}) {
  let code = Math.random().toFixed(3)
  return request_get(`/common/api/captcha/image?code=${code}`)
}
/**
 * 验证码-校验
 * @param {Object} data
 * @param {String} data.code_id - 必选 验证码ID
 * @param {String} data.code_val - 必选 验证码内容
 */
export function codeCheck(data = {}) {
  return request_post('/common/api/captcha/check', data)
}

/**
 * 验证码-手机
 * @param {Object} data
 * @param {String} data.phone - 必选 手机号
 * @param {String} data.code_id_img - 图片id
 * @param {String} data.code_val_img - 图片值
 * @param {String} data.not_check_user_exist - 必选 是否不需要检查手机是否存在（注册时传1）
 */
export function codePhone(data = {}) {
  return request_post('/common/api/captcha/mobile', data)
}

/**
 * 申请成为老师
 * @param {Object} data
 * @param {String} data.education - 必选 学历
 * @param {String} data.sex - 性别
 * @param {String} data.email - 邮箱
 * @param {String} data.company - 必选 单位
 * @param {String} data.duties - 必选 职务
 * @param {String} data.summary - 必选 简介
 */
export function apply(data = {}) {
  return request_post('/api/user/teacher/apply', data)
}
