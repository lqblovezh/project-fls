import { Loading } from 'element-ui'
export default function init(Vue) {
  //loading
  let loadingInstance
  Vue.prototype.$loading = function({ background = 'rgba(0,0,0,0.8)' } = {}) {
    loadingInstance = Loading.service({ background })
  }
  Vue.prototype.$loadingClose = function() {
    loadingInstance.close()
  }
  //checkall
  Vue.prototype.$checkAll = function(e, name = 'inps') {
    // console.log(e)
    // console.log(this)
    this.$refs[name].forEach(item => {
      item.checked = e.target.checked
    })
  }
  Vue.prototype.$getChecked = function(name = 'inps') {
    return this.$refs[name].filter(item => {
      return item.checked
    })
  }
}
