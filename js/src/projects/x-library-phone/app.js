import './common/css'

import Vue from 'vue'
// import drag from 'v-drag'
import { sync } from 'vuex-router-sync'
import { mapState } from 'vuex'
import { Toast, Actionsheet, Button, MessageBox, DatetimePicker } from 'mint-ui'
import service from 'services/x-library/front'
import *  as readerService  from 'services/common/reader'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { installGlobalComponents } from './components'
import initUtil from './common/js/initUtil'

Vue.use(installGlobalComponents)
Vue.use(initUtil)
Vue.prototype.$service = service
Vue.prototype.$readerService = readerService
Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox
Vue.component(Button.name, Button)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(DatetimePicker.name, DatetimePicker)

Vue.filter('formateTime', value => {
  return value.match(/\d{4}-\d{2}-\d{2}/gi)[0]||value
})

export function createApp() {
  const store = createStore()
  const router = createRouter()
  router.beforeEach((to, from, next) => {
    globalRouterHandler({ to, from, store, next })
  })
  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })
  // 保持对$suer的便捷引用 , 这里是不行的,
  // 因为store.state.user, 一旦重新赋值, 引用就会变化,
  // Vue.prototype.$user = store.state.user
  return { app, store, router }
}

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      })
    }
  },
  computed: {
    ...mapState({
      $user: state => state.user,
    }),
  },
})

// 全局路由钩子, 全写这里面
function globalRouterHandler({ to, from, store, next }) {
  // 历史 +1 , 避免分享链接出去无法返回, 放在第一行, 覆盖登陆返回情况
  store.state.historyRouteLength++

  // 判断三方登陆返回
  let token = to.query.token_id
  if (token && global.localStorage) {
    localStorage.token = token
    history.go(-2)
    return
  }

  // 控制底部变色
  let res = to.path.match(/.*(home|find|circle|user)$/)
  if (res) {
    store.state.currBottom = res[1]
    store.state.isFooterShow = true
  } else {
    store.state.isFooterShow = false
  }
  next()

  // 设置微信分享当前页,next 后执行
  if (global.localStorage) {
    Vue.prototype.$weixinShare()
  }
}

// 离开浏览器前做些什么...
if (global.localStorage) {
  global.onbeforeunload = function(e) {
    console.log('leave')
    // e.returnValue = '确定离开当前页面吗？'
  }
}
