import store from '@/store'
import ImageCompressor from 'image-compressor.js'
import { Toast } from 'mint-ui'
import * as commonServices from 'services/common'
import * as audioServices from 'services/x-read/audioInfo'

export function imgCompress(file, {}) {
  return Promise((res, rej) => {
    new ImageCompressor(file, {
      quality: 0.8,
      convertSize: 1500000, //2m
      success(result) {
        res(result)
      },
      error(e) {
        rej(e)
      },
    })
  })
}

export function getHistoryLastAudio() {
  audioServices
    .getAudioList()
    .then(res => {
      if (res.status) {
        addAudioWhenLogin({ index: 0, list: [res.data] })
      }
    })
    .catch(e => log(e.toString()))
}

export function hideLoginPage() {
  if (this.isBook) {
    this.$go('/book')
    this.setIsBook(false)
  } else {
    this.$emit('hide')
  }
}

export function openAudio({ index, list }) {
  store.commit('setIsPlayerShow', true)
  store.commit('setCurrAudioIndex', index)
  store.commit('setAudioPlayList', list)
  audioPlay()
}
export function addAudioWhenLogin({ index, list }) {
  store.commit('setCurrAudioIndex', index)
  store.commit('setAudioPlayList', list)
}

export function openVideo({ index, list }) {
  store.commit('setCurrVideoIndex', index)
  store.commit('setIsPlayerVideoShow', true)
  store.commit('setVideoPlayList', list)
  videoPlay()
  // store.setCurrVideoIndex(index)
  // store.setIsPlayerVideoShow(true)
  // store.setVideoPlayList(this.videos)
}

export function goReader(data) {}

export function goBook(data) {}

export function audioPlay() {
  setTimeout(() => {
    document.querySelector('#audio').play()
    // this.$refs.audio.play()
  }, 20)
  store.commit('setIsPaused', false)
}

export function videoPlay() {
  setTimeout(() => {
    let node = document.querySelector('#video')
    node.play()
    // this.$refs.audio.play()
    setFullscreen(node)
  }, 20)
  store.commit('setIsPaused', false)
}

export function audioPause() {
  setTimeout(() => {
    document.querySelector('#audio').pause()
    // this.$refs.audio.play()
  }, 20)
  store.commit('setIsPaused', true)
}

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

/**
 * 计算字符串字节长度
 * @param {*} str
 */
export function getLength(str) {
  let len = 0
  for (let i = 0, lens = str.length; i < lens; i++) {
    let code = str.charCodeAt(i)
    if (code >= 0 && code <= 128) {
      len++
    } else {
      len = len + 2
    }
  }
  return len
}

// 获取用户信息
export function getLocalUserInfo() {
  return JSON.parse(sessionStorage.userInfo || null)
}

export function chapterIsBuy(item = {}, onlyBuy) {
  // 已拥有 或者 价格不存在 或者 价格为0
  if (onlyBuy) {
    // 只判断isBuy
    if (item.isBuy) {
      return true
    }
    return false
  }
  if (item.isBuy || !item.price || item.price * 1 == 0) {
    return true
  }
  return false
}

export function themeIsBuy(item = {}, onlyBuy) {
  // 已拥有 或者 价格不存在 或者 价格为0
  if (onlyBuy) {
    // 只判断isBuy
    if (item.isBuy) {
      return true
    }
    return false
  }
  if (item.isBuy || !item.theme_price || item.theme_price * 1 == 0) {
    return true
  }
  return false
}

export function noLoginToast() {
  if (!getLocalUserInfo()) {
    // Toast({
    //   message: '请先登陆!',
    //   duration: 1500,
    // })
    store.commit('setIsLoginShow', true)
    return true
  }
}

export function getOwningMedia(list) {
  let t = []
  list.forEach(item => {
    if (chapterIsBuy(item)) {
      t.push(item)
    }
  })
  return t
}

export function canRead(item, onlyBuy) {
  // return true
  let userInfo = getLocalUserInfo()
  if (userInfo) {
    if (!chapterIsBuy(item, onlyBuy)) {
      Toast({
        message: '请先购买!',
        position: 'middle',
        duration: 1500,
      })
      return false
    }
  } else {
    // Toast({
    //   message: '请先登陆!',
    //   position: 'middle',
    //   duration: 1500,
    // })
    store.commit('setIsLoginShow', true)
    return false
  }
  return true
}

export function isWeixin() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

export function getWeixinConfig() {
  if (isWeixin()) {
    return commonServices
      .getWeixinConfig({ client_url: location.href.split('#')[0] })
      .then(res => {
        wx.config({
          ...res.data,
          debug: false,
          jsApiList: [
            'scanQRCode',
            'updateTimelineShareData',
            'updateAppMessageShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone ',
          ],
        })
        wx.error(() => {
          console.error('微信调用失败')
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
        wx.ready(() => {
          weixinShare()
        })
      })
  }
}

export function weixinShare({
  title,
  desc = '数字化，一体化，专业化，生态化，助你打造自己的数字出版生态圈',
  imgUrl,
} = {}) {
  if (!isWeixin()) return
  // if (this.$isWeixin) {
  // }
  // let user = this.$getUserInfo()
  // let user = this.$getUserInfo()
  let href = location.href
  // if (user) {
  //   if (location.hash.indexOf('?') > 0) {
  //     href = href + `&distributor=${user.id}`
  //   } else {
  //     href = href + `?&distributor=${user.id}`
  //   }
  // }
  const wxconfig = {
    title: title || document.title || 'X-BOOK',
    desc, // 分享描述
    link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl:
      imgUrl ||
      location.origin + location.pathname + '/static/img/x-booklogo.png',
  }
  wx.onMenuShareTimeline(wxconfig)
  wx.onMenuShareAppMessage(wxconfig)
  wx.updateAppMessageShareData(wxconfig, function(res) {
    //这里是回调函数
  })
  wx.updateTimelineShareData(wxconfig, function(res) {
    //这里是回调函数
  })
}

export function payTypeConfig() {
  const cfg = {
    weixin: {
      name: '微信',
      icon: 'icon-weixin-large',
      type: '3',
    },
    alipay: {
      name: '支付宝',
      icon: 'icon-alipay-large',
      type: '2',
    },
  }
  if (isWeixin()) {
    return cfg['weixin']
  } else {
    return cfg['alipay']
  }
}
