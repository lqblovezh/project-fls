import * as globalComponents from './comp'
import config from '../../config'
import Vue from 'vue'
import { Message, Loading, MessageBox } from 'element-ui'

let gc = {}

gc.install = function(Vue, options) {
  for (let i in globalComponents) {
    Vue.component(globalComponents[i].name || i, globalComponents[i])
  }
}

Vue.prototype.$config = config //全局配置文件
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = (
  payload = {
    message: '',
    errors: {},
  }
) => {
  let html = ''
  for (let key in payload.errors) {
    html += `<li class="group"><label>${key}:</label> <span>${
      payload.errors[key]
    }</span></li>`
  }
  MessageBox.alert(html, payload.message, {
    dangerouslyUseHTMLString: true,
    showConfirmButton: false,
  }).catch(() => {})
}
Vue.prototype.$message = (...options) => {
  options[0].duration = 1500
  options[0].showClose = true
  Message(...options)
}
Vue.prototype.$message.success = msg => {
  Message({
    message: msg,
    type: 'success',
    duration: 1500,
    showClose: true,
  })
}
Vue.prototype.$message.error = msg => {
  Message({
    message: msg,
    type: 'warning',
    duration: 1500,
    showClose: true,
  })
}
Vue.prototype.$message.warning = msg => {
  Message({
    message: msg,
    type: 'warning',
    duration: 1500,
    showClose: true,
  })
}

export default gc
