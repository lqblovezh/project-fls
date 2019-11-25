import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import config from './config'
import ElementUI, { Loading } from 'element-ui'
import Pages from '@/components/Pages.vue'
import Btn from '@/components/Btn.vue'
import init from './appinit'
import TimePick from '@/components/TimePick'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/common.styl'
import './assets/css/el-reset.styl'
import './assets/css/icon.css'
import './assets/css/menu-icon.css'

// 服务端渲染会用到log
if (process.env.NODE_ENV === 'development') {
  global.log = console.log
  global.dir = console.dir
} else {
  global.log = _ => ''
  global.dir = _ => ''
}
Vue.prototype.$config = config
Vue.component('Pages', Pages)
Vue.component('Btn', Btn)
// 全局时间
Vue.component('TimePick', TimePick)

Vue.use(ElementUI)
Vue.use(init)
export function createApp() {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })
  return { app, store, router }
}
