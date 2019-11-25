import vue from 'vue'

import LoadingComponent from './loading'
import Confirm from './Confirm'
import Toast from './Toast'

const LoadingConstructor = vue.extend(LoadingComponent)
const ConfirmConstructor = vue.extend(Confirm)

const ToastConstructor = vue.extend(Toast)

// loading
const loadingDom = new LoadingConstructor({
  el: document.createElement('div'),
  data() {
    return {
      show: false,
    }
  },
})
document.body.appendChild(loadingDom.$el)
function showLoading(text) {
  loadingDom.show = true
  text && (loadingDom.text = text)
}
function closeLoading() {
  loadingDom.show = false
}
vue.prototype.$showLoading = showLoading
vue.prototype.$closeLoading = closeLoading

// confirm
const confirmDom = new ConfirmConstructor({
  el: document.createElement('div'),
  data() {
    return {
      show: false,
    }
  },
})
document.body.appendChild(confirmDom.$el)
vue.prototype.$confirm = function(text) {
  confirmDom.show = true
  confirmDom.text = text
  return confirmDom.wait()
}

// toast
const toastDom = new ToastConstructor({
  el: document.createElement('div'),
  data() {
    return {
      show: false,
    }
  },
})

document.body.appendChild(toastDom.$el)


// message
