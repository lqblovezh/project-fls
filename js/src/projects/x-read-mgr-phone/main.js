// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import './utils/rem.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import 'swiper/dist/css/swiper.css'
import store from './store'

import Footer from '@/components/common/footer'
import '@/components/common/loading'
import Head from '@/components/common/head'
import Scroll from '@/components/common/scorll'
import Nodata from '@/components/common/Nodata'
import IconZan from '@/components/common/icons/Zan'
import NormalItem from '@/components/common/normalItem'
import Star from '@/components/common/star'
import ContentTitle from '@/components/common/utils/contentTitle'
import DuringTime from '@/components/common/utils/DuringTime'

import VueLazyload from 'vue-lazyload'

import errpic from './assets/img/book.jpg'

import { openAudio, openVideo, audioPlay, audioPause } from './utils/util.js'

import './assets/css/common.styl' // 保证自己样式最后导入, 不被覆盖
import 'minirefresh/dist/debug/minirefresh.css'

import { Button, MessageBox, DatetimePicker } from 'mint-ui' // mint-ui 按需引入
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.prototype.$alert = MessageBox.alert

let u = navigator.userAgent
global.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
global.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

Vue.use(VueLazyload, {
  // loading:errpic,
  error: errpic
})

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  global.log = console.log
  global.dir = console.dir
} else {
  global.log = _ => ''
  global.dir = _ => ''
}

Vue.component('Footer', Footer)
Vue.component('Head', Head)
Vue.component('Scroll', Scroll)
// Vue.component('NormalItem',NormalItem)
// Vue.component('Star',Star)
Vue.component('ContentTitle', ContentTitle)
Vue.component('DuringTime', DuringTime)
// Vue.component('Nodata',Nodata)
Vue.component('IconZan', IconZan)

Vue.prototype.$go = function(url, query) {
  this.$router.push({ path: url, query })
}
Vue.prototype.$openAudio = openAudio
Vue.prototype.$openVideo = openVideo

Vue.prototype.$audioPlay = audioPlay
Vue.prototype.$audioPause = audioPause

/* eslint-disable no-new */

async function main() {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}

main()
