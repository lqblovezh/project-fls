import { getTask } from 'services/system/home'
import { ImageSize as Image } from 'projects/x-publish-mgr/util/domUtil'

// 里面的方法均会被this.$xxx 引用
export function getRouteObj(path, query = {}, params = {}) {
  // console.log(process.env.NODE_ENV)
  let root = process.env.NODE_ENV === 'development' ? baseUrl : ''
  return {
    path: root + path,
    // 使用相对路径转跳, 无法从三级路由里面跳出来
    // path: path.match(/^\/(.*)/)[1],
    query,
    params,
  }
}
export function go(path, query = {}, params = {}) {
  let obj = getRouteObj(path, query, params)
  this.$router.push(obj)
}
// 里面的方法均会被this.$xxx 引用
export function replace(path, query = {}, params = {}) {
  let obj = getRouteObj(path, query, params)

  this.$router.replace(obj)
}
// 里面的方法均会被this.$xxx 引用
export function tianKenPercentage(str) {
  if (!str) {
    return 0
  }
  console.log(str)
  return str.replace('%', '') * 1
}

export async function globalUpdateFile(file) {
  let loading = this.$loading({
    text: '正在上传',
    background: 'rgba(0, 0, 0, 0.8)',
  })
  let res
  try {
    res = await getTask(file)
  } catch (error) {
    loading.close()
    return {}
  }
  loading.close()
  return res.data
}

export function openLogin() {
  this.$store.state.loginDialogCurrKey = 'login'
  this.$store.state.isLoginDialog = true
}
export function openRegister() {
  this.$store.state.loginDialogCurrKey = 'register'
  this.$store.state.isLoginDialog = true
}
export function openPwdDialog() {
  this.$store.state.loginDialogCurrKey = 'pwdback'
  this.$store.state.isLoginDialog = true
}

// 成功获取用户信息后处理
export function loginBackHander(res) {
  this.$store.state.user = res.user
  this.$store.state.isLoginDialog = false
  localStorage.token = res.token
  this.$mergeCart()
  this.$messageStatus()
}

// 登录后的操作
export function loginSuccess(res) {
  localStorage.token = res.token
  location.reload()
}

// 合并本地和服务器的购物车
export async function mergeCart() {
  // 上传本地cart
  let cartList = this.$store.getters.cartList
  if (cartList.length) {
    let ids = cartList.map(item => item.id)
    await this.$service.cart.add({ ids })
  }
  // 请求服务端cart
  this.$service.cart.getCart().then(res => {
    res.data.forEach(item => {
      const { id, course_name: name, abs, price, img } = item.course_info

      let cartObj = { id, name, abs, price, img, checked: true }
      this.$set(this.$store.state.cart, cartObj.id, cartObj)
    })
  })
}
export async function messageStatus() {
  //console.log('1235666666666')
  this.$service.userCenter.messageStatus().then(res => {
    //console.log(res)
    let num = 0
    res.data.forEach(item => (num += item.total))
    this.$store.state.userCenter.totalMessageNum = num
    //console.log('num', num)
  })
}

// 统一登录错误处理函数
export function loginErrorHander() {
  this.$store.state.user = null
  this.$store.state.isLoginDialog = false
  localStorage.token = null
}
// 统一未登录登陆处理! 一般弹出登录框
export function isUser() {
  if (this.$user) return true
  this.$message.error('请登陆!')
  return false
}

export function getExtension(str) {
  if (!str) return
  let res = str.match(/.*\.(.*)/)
  //console.log(res && res[1])
  return res && res[1]
}
export function isVideo(str) {
  let extension = getExtension(str)
  if (!extension) return
  let arr = ['mp4', 'wma', 'mkv']
  // 所谓匹配, 就是目标字符串, 是否拥有该正则的子串
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

export function price(price) {
  if (price * 1) {
    return '￥' + price
  }
  return '免费'
}

export function ImageSize({
  interval = 0.2,
  ratio = 1.6,
  file = null,
  MinWidth = null,
  MinHeight = null,
} = {}) {
  return Image({
    interval,
    ratio,
    file,
    MinWidth,
    MinHeight,
  })
}
