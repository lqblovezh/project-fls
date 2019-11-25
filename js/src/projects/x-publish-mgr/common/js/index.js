import * as globalComponents from './comp'
import { Message, Loading, MessageBox } from 'element-ui'
import {
  getChecked,
  checkAll,
  ImageSize,
  ImageSizeCropper,
} from '@/util/domUtil'
import { getTask } from 'services/common'
import Vue from 'vue'

let gc = {}

gc.install = function(Vue, options) {
  for (let i in globalComponents) {
    Vue.component(globalComponents[i].name || i, globalComponents[i])
  }
}

const duration = 500

Vue.prototype.$message = (...options) => {
  options[0].duration = duration
  options[0].showClose = true
  Message(...options)
}
Vue.prototype.$message.success = msg => {
  Message({
    message: msg,
    type: 'success',
    duration,
    showClose: true,
  })
}
Vue.prototype.$message.error = msg => {
  Message({
    message: msg,
    type: 'error',
    duration,
    showClose: true,
  })
}
Vue.prototype.$message.warning = msg => {
  Message({
    message: msg,
    type: 'warning',
    duration,
    showClose: true,
  })
}
if (process.env.NODE_ENV === 'development') {
  global.log = console.log
  global.dir = console.dir
} else {
  global.log = _ => ''
  global.dir = _ => ''
}
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$config = config //全局配置文件
Vue.prototype.$getChecked = getChecked //选择checkbox
Vue.prototype.$checkAll = checkAll //全选
Vue.prototype.$ImageSize = ImageSize //图片大小限制
Vue.prototype.$ImageSizeCropper = ImageSizeCropper //图片大小限制并裁剪
Vue.prototype.$upload = function(file, data = {}, cb) {
  return getTask(file, data, cb)
}

export default gc
