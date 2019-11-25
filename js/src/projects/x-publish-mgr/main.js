// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import  '@/assets/js/polyfill.min'
// import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import progress from './util/progress'
import vali from './util/vali'
import gc from '@/common/js'
import './util/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './common/stylus/themeReset.styl'
import './common/stylus/app.styl'
import './common/stylus/special.styl'
import './assets/css/menu-icon.css'
import './assets/css/incon-fonts.css'
import VueLazyload from 'vue-lazyload'
import defaultImage from './common/image/default.png'
import { platInfo } from 'services/x-publish/common'
import { isLogin } from 'services/common/manager'
import { addFavicon } from 'projects/common/util'

Vue.config.productionTip = false
Vue.use(gc)
Vue.use(progress) //进度插件
Vue.use(vali) //验证插件
Vue.use(VueLazyload, {
  error: defaultImage,
  loading: defaultImage,
})

// 用于关闭全局input输入时的默认提示
Vue.mixin({
  data() {
    return {
      searchQuery: {},
    }
  },
  mounted() {
    this.$nextTick(() => {
      let node = document.querySelectorAll('input')
      node.forEach(item => {
        item.setAttribute('autocomplete', 'off')
      })
    })
  },
})

router.beforeEach(async (to, from, next) => {
  try {
    await isLogin().then(res => {
      Vue.prototype.$config.userInfo = res.data
    })
    await platInfo({ id: 'current' }).then(res => {
      const { application, publisher, use_eCommerce } = res.data
      Vue.prototype.$config.plantInfo = application
      Vue.prototype.$config.plantInfos = publisher.apps
      Vue.prototype.$config.isShowRetailers = use_eCommerce || false
      let icon = application && application.icon_absolute
      addFavicon(icon)
    })
    next()
  } catch (error) {
    // location.href = '../'
  }
})

async function main() {
  global.publishVue = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  })
}

main()
