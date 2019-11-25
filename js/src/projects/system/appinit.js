import { Loading } from 'element-ui'
import { ImageSize } from 'projects/x-publish-mgr/util/domUtil'
import { globalUpdateFile } from 'projects/system-desktop/utils/util'
import ImageCropper from 'projects/x-publish-mgr/components/common/ImageCropper'
export default function init(Vue) {
  Vue.prototype.$checkAll = function(e, name = 'inps') {
    this.$refs[name].forEach(item => {
      item.checked = e.target.checked
    })
  }
  Vue.prototype.$getChecked = function(name = 'inps') {
    return this.$refs[name].filter(item => {
      return item.checked
    })
  }

  Vue.prototype.$ImageSize = ImageSize
  Vue.prototype.$globalUpdateFile = globalUpdateFile
  Vue.prototype.$loading = Loading.service
  Vue.component('ImageCropper', ImageCropper)
}
