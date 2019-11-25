import 'babel-polyfill'
import './rem.js'
import Vue from 'vue/dist/vue.js'
import qs from 'qs'
import * as readerService from 'services/common/reader'
import * as services from 'services/common'
import { addLinks, isPhone } from './utils'


let vm = new Vue({
  el: '#app',
  data: {
    name: 'li搜索',
    entity: null,
    type: null
  }
})
async function main() {
  let search = location.search
  let query = qs.parse(search, { ignoreQueryPrefix: true })
  services
    .commonPreview(query)
    .then(res => {
      sessionStorage.token = res.data.token
      try {
        document.querySelector('title').innerText = res.data.entity.name
      } catch (error) {
      }
      let type = res.data.entity_type
      vm.entity = res.data.entity // vue数据
      vm.type = type // 给vue设置type
      //5 视频
      switch (type) {
        case '5':
          initVideo()
          break
        case '4':
          initAudio()
          break
        case '1':
          initBook()
          break
        case '2':
          initArticle()
          break
        case '3':
          initPicture()
          break
        case '7':
          if(vm.entity.preview){
            location.href = vm.entity.preview
          }
         break
        default:
          break
      }
    })
    .catch(err => {
      throw err
    })

  // initBook()
  // initAudio()
  // initVideo()
}
main().then(_ => {
  document.querySelector('body').style.display = 'block'
})
function initPicture() {}
function initArticle() {}


async function initBook() {
  let node = document.querySelector('#reader')
  node.style.width = '100%'
  node.style.height = '850px'

  function formatParams(params) {
    //content_version = draft(内容仓库) | production（数字产品） |  release(分发版)
    params.version = params.content_version = 'draft'
    // params.access_code = this.access_code
    return params
  }
  let Reader3 = isPhone() ? reader3.Mobile : reader3.Desktop
  var reader = new Reader3({
    // imagePath: "http://xcloud.kf.gli.cn/pc/", // 内网
    // markBtnText: markBtn,
    copyEnabled: true,
    services: {
      // do_mark: this.do_mark,
      ...readerService
    },
    labelEnabled: false,
    bookmarkEnabled: false
    // searchEnabled: true,
  })
  reader.extraParams = {
    version: 'draft',
    content_version: 'draft',
    access_code: ''
  }

  reader.mount(document.querySelector('#reader'), {
    bookId: vm.entity.id
  })
}
function initVideo() {
  setTimeout(() => {
    let node = document.querySelector('#video')
    node.webkitRequestFullscreen()
  }, 0)

  // setFullscreen(node)
}
function initAudio() {}

export function isFullscreenEnabled() {
  return (
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled ||
    false
  )
}

export function setFullscreen(element) {
  var el = element instanceof HTMLElement ? element : document.documentElement
  var rfs =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen
  if (rfs) {
    rfs.call(el)
  } else if (window.ActiveXObject) {
    var ws = new ActiveXObject('WScript.Shell')
    ws && ws.SendKeys('{F11}')
  }
}
