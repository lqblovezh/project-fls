import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import config from './config'
import ElementUI from 'element-ui'
import Pages from '@/components/Pages.vue'
import Btn from '@/components/Btn.vue'
import init from './appinit'
import TimePick from '@/components/TimePick'
import Dy from '@/components/dy'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/common.styl'
import './assets/css/el-reset.styl'
import './assets/css/icon.css'
import './assets/css/menu-icon.css'
import { delay } from 'core-js'

// 服务端渲染会用到log
global.log = console.log
global.dir = console.dir

Vue.prototype.$config = config
Vue.component('Pages', Pages)
Vue.component('Btn', Btn)
Vue.component('TimePick', TimePick) //全局时间
Vue.component('Dy', Dy)
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
