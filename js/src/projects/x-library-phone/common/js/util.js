import * as commonServices from 'services/common'
import { getTask } from 'services/common'

import acceptConfig from './accept'
import Compressor from 'compressorjs'
import { Upload } from 'element-ui'
import qs from 'qs'
import urlJoin from 'url-join'

global.qs = qs
export let accept = acceptConfig

export function compress(files, { quality = 0.6 } = {}) {
  if (!files) return
  let arr = []
  if (Array.isArray(files)) {
    arr = files
  } else {
    arr.push(files)
  }

  let res = files.map(item => {
    return new Promise((resolve, reject) => {
      new Compressor(item, {
        quality,
        success(result) {
          resolve(result)
        },
        error(err) {
          reject(err)
        },
      })
    })
  })
  return Promise.all(res)
}

export function upload(files) {
  return Promise.all(files.map(item => commonServices.getTask(item)))
}

export async function compressAndUpload(files = []) {
  let img = []
  if (!files.length) return img
  this.$loading()
  let uploadRes = await this.$upload(files)
  console.log(uploadRes)
  uploadRes.forEach(item => {
    console.log(item)
    img.push(item.data.path)
  })
  setTimeout(() => {
    this.$closeLoading()
  }, 20)
  return img
}
// 里面的方法均会被this.$xxx 引用
export function go(path, query = {}, params = {}) {
  let obj = getRouteObj(path, query, params)
  this.$router.push(obj)
}
export function replace(path, query = {}, params = {}) {
  let obj = getRouteObj(path, query, params)
  this.$router.replace(obj)
}
function getRouteObj(path, query = {}, params = {}) {
  // console.log(process.env)
  let root = process.env.NODE_ENV === 'development' ? baseUrl : ''
  return {
    path: root + path,
    path: urlJoin(baseUrl, path),
    // 使用相对路径转跳, 无法从三级路由里面跳出来
    // path: path.match(/^\/(.*)/)[1],
    query,
    params,
  }
}

export function goBack() {
  let len = this.$store.state.historyRouteLength
  // 分享出去 historyRouteLength=1 , 返回home
  if (len < 2) {
    let { current } = this.$router.history
    if (
      (current && current.meta && current.meta.isFastLibrary) ||
      (current && current.query && current.query.type == 'simple')
    ) {
      this.$go('/db')
    } else {
      this.$go('/home')
    }
    // 第一次进入路由, len为1,
    // console.log('go home')
    // 一旦返回首页, 历史记录长度将无意义
    this.$store.state.historyRouteLength = 10000
    return
  } else {
    // console.log('go last')
    this.$router.go(-1)
  }
  if (len > 2) {
    this.$store.state.historyRouteLength = len - 2
  }
}

export function successLogin(res) {
  this.$Toast(res.message)
  this.$store.state.isLoginShow = false
  localStorage.token = res.data.token
  // location.reload() // 微信缓存不生效
  // 适合history 模式
  let new_search = ''
  const { origin, pathname, search, hash } = location
  if (!search) {
    new_search = '?t=' + Date.now()
  } else {
    new_search = search + '&t=' + Date.now()
  }
  location.href = origin + pathname + new_search + hash
}

export function getUserData() {
  let token = localStorage.token
  if (token) {
    this.$service.signin
      .getUserInfo()
      .then(res => {
        this.$loginBackHander(res.data)
      })
      .catch(err => {
        this.$loginErrorHander()
      })
  }
}

export function logOut() {
  this.$service.signin.loginOut()
  this.$loginErrorHander()
}

// 成功获取用户信息后处理
export function loginBackHander(res) {
  localStorage.token = res.token
  this.$store.state.user = res.user
  this.$closeLogin()
}

// 统一登录错误处理函数
export function loginErrorHander() {
  this.$store.state.user = null
  this.$store.state.isLoginShow = false
  localStorage.token = ''
  this.$go('/home')
}

// 统一未登录登陆处理! 一般弹出登录框
export function isLogin() {
  if (this.$user) return true
  this.$Toast('请登陆!')
  this.$openLogin()
  return false
}
// 统一未登录登陆处理! 一般弹出登录框
let num
export function like(item) {
  num = item.info_good_num
  if (!this.$isLogin()) return

  this.$service.circle.assist({ id: item.id }).then(res => {
    item.is_good = !item.is_good
    if (item.is_good) {
      item.info_good_num++
    } else {
      item.info_good_num--
    }
  })
}

export function getEventPath(event) {
  const path = event.path || (event.composedPath && event.composedPath())

  return path
}
export function getTarget(e, className = 'target') {
  let path = getEventPath(e)
  let curr = e.currentTarget
  for (const node of path) {
    if (node.classList.contains(className)) {
      return node
    }
    if (node === curr) return
  }
}

export function isCanRead(item = {}) {
  if (!this.$isLogin()) return false

  if (!this.$isFree(item)) return false
  // 价格啊, 是否购买的判断
  return true
}

export function isFree(item) {
  if (!(item.price * 1) || item.isBuy) {
    return true
  }
}

export function getImgCode() {
  return this.$service.signin.codeImage().then(res => {
    //console.log(res)
    this.valiData.code_img.img_src = res.data.code_img
    this.valiData.code_img.code_id_img = res.data.code_id
  })
}

export function openLogin() {
  this.$store.state.isLoginShow = true
  this.$store.state.loginModalType = 'Account'
}
export function closeLogin() {
  this.$store.state.isLoginShow = false
}
export function isLock(item) {
  // 1未开启 2开启 3锁定
  if (item.status == 1) {
    this.$Toast({
      message: '该书圈暂未开启',
    })
    return ture
  }
  if (item.status == 3) {
    this.$Toast({
      message: '该书圈已锁定, 无法进入',
    })
    return true
  }
}
export function isWeixin() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

export async function getWeixinConfig() {
  if (!isWeixin()) return
  try {
    let res = await commonServices.getWeixinConfig({
      client_url: location.href.split('#')[0],
    })
    wx.config({
      ...res.data,
      debug: false,
      jsApiList: [
        'scanQRCode',
        'updateTimelineShareData',
        'updateAppMessageShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone ',
      ],
    })
    wx.error(() => {
      console.error('微信调用失败')
    })
    wx.ready(() => {
      weixinShare()
    })
  } catch (error) {
    console.error('微信接口调用失败=>commonServices.getWeixinConfig')
  }
}

export function weixinShare({
  title,
  desc = '数字化，一体化，专业化，生态化，助你打造自己的数字出版生态圈',
  imgUrl,
} = {}) {
  if (!isWeixin()) return
  let href = location.href
  const wxconfig = {
    title: title || document.title || 'X-BOOK',
    desc, // 分享描述
    link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl:
      imgUrl ||
      location.origin + location.pathname + '/static/img/x-booklogo.png',
  }
  wx.onMenuShareTimeline(wxconfig)
  wx.onMenuShareAppMessage(wxconfig)
  wx.updateAppMessageShareData(wxconfig, function(res) {
    //这里是回调函数
  })
  wx.updateTimelineShareData(wxconfig, function(res) {
    //这里是回调函数
  })
}

export function unCheckedAll(data, id) {
  data.forEach(item => {
    if (item.id === id) {
      item.checked = true
    } else {
      item.checked = false
    }
  })
}

export function getExtension(str) {
  if (!str) return
  let res = str.match(/.*\.(.*)/)
  return res && res[1]
}

export function isVideo(str) {
  let extension = getExtension(str)
  if (!extension) return
  let arr = ['mp4', 'wma', 'mkv']
  // 所谓匹配, 就是目标字符串里面, 是否有匹配上正则的内容,
  // 正则若不加开头结尾限制, 就符串里面,是否是看该字有符合该正则的子串
  return new RegExp(extension, 'i').test(arr.join('-'))
}

export function isAudio(str) {
  let extension = getExtension(str)
  if (!extension) return
  let arr = ['mp3', 'flac', 'ape']
  return new RegExp(extension, 'i').test(arr.join('-'))
}

export function isPic(str) {
  let extension = getExtension(str)
  if (!extension) return
  let arr = ['jpg', 'png', 'jepg']
  return new RegExp(extension, 'i').test(arr.join('-'))
}

export function countCategory(cates) {}

export async function addCircle(item, addId = 'id') {
  if (!this.$isLogin()) return
  try {
    if (item.user_status) {
      await this.$service.circle.circleOut({ id: item.user_delete_id })
      item.user_status = false
    } else {
      let res = await this.$service.circle.join({ id: item[addId] })
      item.user_status = true
      item.user_delete_id = res.data.user_delete_id
    }
    this.$Toast('成功!')
  } catch (error) {
    console.log(error)
    this.$Toast(error.payload.errors[0])
  }
}

export function reconsitution(list, parent, idx) {
  let result = []
  list.forEach(item => {
    if (item.pid === parent) {
      result.push(item)
      item.level = idx
      if (!item.children) {
        item.children = reconsitution(list, item.id, idx + 1)
      }
    }
  })
  return result
}

export function isNumber(n) {
  return typeof n === 'number' && !isNaN(n)
}

export function isEmptyObj(obj) {
  for (let i in obj) {
    return false
  }
  return true
}