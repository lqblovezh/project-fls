// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import config from './config'
import ElementUI from 'element-ui'
import vali from './util/vali'
import globalUtil from './util'
import TimePick from 'projects/x-publish-mgr/components/common/timePick'
import VaForm from 'projects/x-publish-mgr/components/common/VaForm'
import MetaData from 'projects/x-publish-mgr/components/common/metaData'
import Grounding from '@/components/wms/1-product/grounding'
import Icon from '@/components/common/Icon'
import { getChecked, checkAll, unCheck } from './util/dom'
import { platInfo } from 'services/x-publish/common'
import { isLogin } from 'services/common/manager'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/incon-fonts.css'
import './assets/css/el-reset.styl'
import './assets/css/commom.styl'
import './assets/css/reset.css'
import { addFavicon } from 'projects/common/util'
import { getTask } from 'services/common'

if (process.env.NODE_ENV === 'development') {
  global.log = console.log
  global.dir = console.dir
} else {
  global.log = _ => ''
  global.dir = _ => ''
}
Vue.config.productionTip = false
Vue.prototype.$config = config //全局配置文件
Vue.prototype.$getChecked = getChecked
Vue.prototype.$checkAll = checkAll
Vue.prototype.$unCheck = unCheck
Vue.use(globalUtil)
Vue.use(ElementUI)
Vue.use(vali)

Vue.component('TimePick', TimePick) //全局时间
Vue.component('VaForm', VaForm) //全局表单验证
Vue.component('Icon', Icon) //全局图标按钮
Vue.component('MetaData', MetaData) //全局元数据
Vue.component('Grounding', Grounding) //全局上架弹框

router.beforeEach(async (to, from, next) => {
  try {
    await isLogin().then(res => {
      sessionStorage.userFlag = 'true'
      Vue.prototype.$config.userInfo = res.data
    })
    if (!Vue.prototype.$config.plantInfo) {
      await platInfo().then(res => {
        const { application } = res.data
        Vue.prototype.$config.plantInfo = application
        let icon = application && application.icon_absolute
        addFavicon(icon)
      })
    }
    next()
  } catch (error) {
    console.log(error)
    // location.href = '../'
  }
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
  methods: {},
})

async function main() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  })
}

main()
