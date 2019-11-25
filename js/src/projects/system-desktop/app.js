import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createStore } from './store'
import { createRouter } from './router'
import { Message } from 'element-ui'
import { getRouteObj } from './utils/util'
import './theme/index.css'
import './utils/css/common.styl'
import './utils/css/icon-fonts.css'
import 'swiper/dist/css/swiper.css'
import vali from './utils/vali'
import progress from 'projects/x-publish-mgr/util/progress'
import initGlobalMethod from './utils/initUtil'
import VueLazyload from 'vue-lazyload'
import objectFitImages from 'object-fit-images'
import gc from './components/common'

Vue.use(gc)
Vue.use(initGlobalMethod)
Vue.use(progress) //进度插件
Vue.use(vali)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  listenEvents: ['scroll'],
})
if (process.env.NODE_ENV === 'development') {
  global.echo = console.log
  global.print = console.dir
}
export function createApp() {
  const store = createStore()
  const router = createRouter()
  router.beforeEach((to, from, next) => {
    globalRouterHandler({ to, from, next })
  })
  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })
  return { app, store, router }
}

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options
    if (asyncData) {
      console.log('asyncData true')
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      objectFitImages(false, {
        watchMQ: true,
      })
    })
  },
})

function globalRouterHandler({ to, from, next }) {
  if (to.matched && to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (global.sessionStorage) {
      if (!sessionStorage.getItem('token')) {
        Message({ message: '请先登录!', type: 'warning', showClose: true })
        next(getRouteObj('/home'))
      } else {
        next()
      }
    } else if (global.apitoken) {
      next()
    } else {
      Message({ message: '请先登录!', type: 'warning', showClose: true })
      next(getRouteObj('/home'))
    }
  } else {
    next()
  }
}
