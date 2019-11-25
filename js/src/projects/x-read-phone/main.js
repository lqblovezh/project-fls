import './assets/css'
import './utils/rem.js'
import '@/components/common/loading'
import Vue from 'vue'
import App from './App'
import router from './router'
import installComps from '@/components/common'
import comps from '@/components/common/utils'
import config from './config'
import store from './store'
import YDUI from 'vue-ydui'

import { noLoginToast, canRead, hideLoginPage, isWeixin } from './utils/util'
import * as utils from './utils/util'
import VueLazyload from 'vue-lazyload'
import url_parse from 'url-parse'
import { Toast, Picker, Range } from 'mint-ui'
import errpic from './assets/img/book.jpg'
import * as commonServices from 'services/x-read/common'
import { getUserInfo } from 'services/common/member'
import * as normalServices from 'services/common/normal'
// import { addFavicon } from 'projects/common/util'

import {
  openAudio,
  openVideo,
  audioPlay,
  audioPause,
  getLength,
  getWeixinConfig,
} from './utils/util.js'
import 'default-passive-events' //remove warnings message  Added non-passive event listener to a
import { footerStatus } from '@/assets/js/config'

let u = navigator.userAgent
global.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
global.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

Vue.use(installComps)
Vue.use(VueLazyload, {
  error: errpic,
})
Vue.use(comps)
Vue.prototype.$url_parse = url_parse
Vue.prototype.$noLoginToast = noLoginToast
Vue.prototype.$canRead = canRead
Vue.prototype.$config = config
Vue.prototype.$suffix = __SUFFIX__
Vue.prototype.$utils = utils

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  global.log = console.log
  global.dir = console.dir
} else {
  global.log = _ => ''
  global.dir = _ => ''
}

Vue.use(YDUI)

Vue.prototype.$go = function(url, query) {
  this.$router.push({ path: url, query })
}
Vue.prototype.$openAudio = openAudio
Vue.prototype.$openVideo = openVideo
Vue.prototype.$hideLoginPage = hideLoginPage
Vue.prototype.$audioPlay = audioPlay
Vue.prototype.$audioPause = audioPause
Vue.prototype.$Toast = Toast
Vue.prototype.$getUserInfo = () => JSON.parse(sessionStorage.userInfo || null)
Vue.prototype.$historyLen = 0

Vue.prototype.$isVideo = function(url) {
  return url.substring(url.lastIndexOf('.') + 1) === 'mp4'
}

Vue.prototype.$isWeixin = isWeixin()

// 动态计算元素的长度
Vue.directive('width', {
  inserted(el) {
    let str = el.innerText
    let len = getLength(str)
    el.style.width = len * 12 + 'px'
  },
})

if (localStorage.token) {
  if (!sessionStorage.token) {
    sessionStorage.token = localStorage.token
  }
  getUserInfo().then(res => {
    store.commit('setUserInfo', res.data.user)
    sessionStorage.userInfo = JSON.stringify(res.data.user)
  })
}

async function main() {
  if (isWeixin()) {
    try {
      getWeixinConfig()
    } catch (error) {
      console.error('获取微信接口失败')
    }
  }
  normalServices.thirdConf().then(res => {
    console.log(res)
    store.commit('setThirdConf', res.data)
  })

  //F5刷新的时候,重新获取了js文件, app_id 重置了!
  // 因此要创建之前, 获取app_id
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  })
}

hidePreLoad()
function hidePreLoad() {
  let node = document.querySelector('.my-pre-mask')
  node.classList.add('load-hide')
  setTimeout(() => {
    node.style.display = 'none'
  }, 600)
}
store.commit('changeIsAppShow', true) // 防止意外的隐藏, 导致持续的不可显示
store.commit('changeHistoryLen', -1000) // 初始化计算历史len
store.commit('changeIsLoginBack', false) // 初始化返回falg

router.beforeEach(async (to, from, next) => {
  const token_id = to.query.token_id
  if (token_id) {
    sessionStorage.token = token_id
    localStorage.token = token_id
    store.commit('changeIsLoginBack', true) // 初始化返回falg
    await getUserInfo().then(
      res => {
        sessionStorage.userInfo = JSON.stringify(res.data.user)
        store.commit('setUserInfo', res.data.user)
        store.commit('setIsLoginShow', false)
      },
      err => {
        sessionStorage.token = ''
        sessionStorage.userInfo = ''
        store.commit('setUserInfo', '')
      }
    )
  }

  store.commit('setFooterCurr', to.path)
  if (footerStatus[to.path]) {
    store.commit('changeFooterStatus', true)
  } else {
    store.commit('changeFooterStatus', false)
  }
  next()
  // next 之后, 才能获得正确的location.href
  store.commit('pushHistory', { ...to, full: location.href })
  store.commit('changeHistoryLen', 1)
  if (token_id) {
    // 删除当前路由token_id
    const { token_id: ctoken, ...myquery } = to.query
    router.replace({
      path: to.path,
      query: myquery,
    })
  } else {
    utils.weixinShare()
  }
})
main()
