//首页设置
import {
  request_post,
  request_get,
  request_put,
  request_delete,
  request_file,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile('/system/api/setting/:id')
/**
 * 获取首页设置信息
 */
export function getInfo() {
  return request_get('/system/api/setting/get_set_list', {
    pageStart: 0,
    pageOffset: 100,
  }).then(res => {
    let data = {
      loginInfo: {},
      contact: {},
      outlink: [],
      ewm: [],
    }
    res.data.forEach(e => {
      if (e.name == 'info') {
        data.loginInfo[e.key] = e
      } else if (e.name == 'contact') {
        data.contact[e.key] = e
      } else if (e.name == 'outlink') {
        data.outlink.push(e)
      } else if (e.name == 'ewm') {
        data.ewm.push(e)
      }
      // del({id:e.id})
    })
    if (!Object.values(data.loginInfo).length < 3) {
      data.loginInfo.title = data.loginInfo.title || {
        name: 'info',
        key: 'title',
        value: '',
        type: 1,
      }
      data.loginInfo.ico = data.loginInfo.ico || {
        name: 'info',
        key: 'ico',
        value: '',
        type: 2,
      }
      data.loginInfo.logo = data.loginInfo.logo || {
        name: 'info',
        key: 'logo',
        value: '',
        type: 2,
      }
      data.loginInfo.banner = data.loginInfo.banner || {
        name: 'info',
        key: 'banner',
        value: '',
        type: 2,
      }
    }
    if (!Object.values(data.contact).length < 3) {
      data.contact.phone = data.contact.phone || {
        name: 'contact',
        key: 'phone',
        value: '',
        type: 1,
      }
      data.contact.qq = data.contact.qq || {
        name: 'contact',
        key: 'qq',
        value: '',
        type: 1,
      }
      data.contact.email = data.contact.email || {
        name: 'contact',
        key: 'email',
        value: '',
        type: 1,
      }
    }
    return data
  })
}
/**
 * 添加 or 修改
 * @param {Object} data
 * @param {String} data.name  标题
 * @param {String} data.key   键
 * @param {String} data.value  值
 * @param {String} data.type 显示类型 1 标识文字 2 标识图片
 */
export async function save(data) {
  if (data['id']) {
    return request_put(toPath({ id: data['id'] }), data)
  } else {
    if (data['key']) {
      return await request_post('/system/api/setting/add', data)
    }
  }
}
/**
 *删除
 *@param {Object} Data
 *@param {String} Data.id
 */
export function del(data) {
  return request_delete(toPath(data), data)
}

/**
 * 分片上传文件
 * @return {Promise}
 * @param {Object} file - 文件
 * @param {Object} data
 * @param {String} data.size - 每片的大小
 * @param {Function} callback - 获取任务进度函数，可以不传，必须分片模式下
 */
export function getTask(file, data = {}, callback) {
  console.log('分片', file.size)

  if (file.size >= 1024 * 1024) {
    console.log('分片')
    data.is_chunk = true
    // 清除上次任务缓存
    return request_post(`/api/files/upload_task?r=${Math.random(5)}`)
      .then(res => {
        if (res.status) {
          data.task_id = res.data.task_id
          return request_file('/api/files/upload', { file, data }, callback)
        } else {
          throw new Error(res.messages)
        }
      })
      .catch(err => {
        throw new Error('上传失败')
      })
  } else {
    data.is_chunk = false
    return request_file('/api/files/upload', { file, data })
  }
}

/**
 * 登录
 */

export function sendInfo(data) {
  return request_post('/system/api/app_manager/login', data)
}

/**
 * 首页list
 */
export function getList(data) {
  return request_get('/system/api/home/works')
}
/**
 * 首页合作单位
 */
export function getPartner(data = {}) {
  return request_get('/system/api/home/demo_demo', data)
}
/**
 * 检查用户是否登录
 */
export function isLogin(data = {}) {
  return request_get('/system/api/app_manager/is_login')
}

/**
 * 获取token
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function getClientToken() {
  return request_post('/system/api/app_manager/token/pcclient')
}

/**
 * 出版社管理员退出登录
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function loginOut() {
  return request_post('/system/api/app_manager/logout')
}

/**
 * 获取制作权限
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function accessible(data) {
  return request_get('/system/api/fast_app_cation',data)
}
