import Mask from './Mask.vue'
import TimePick from './TimePick.vue'
import globalComps from './globalComps'
import PickPayType from './PickPayType'
import OpenImg from './OpenImg.vue'
import ReplayCommentPromise from './ReplayCommentPromise.vue'

export default function install(Vue) {
  Vue.component('NormalMask', Mask)
  initGlobalComps(Vue)
  initTimePick(Vue)
  initPickPayType(Vue)
  initOpenImg(Vue)
  initReplay(Vue)
}

/**
 *  通用组件追加挂载body上面
 * @param {} Vue
 * @param {*} VueCompvue组件
 * @return 返回组件实例
 */
function createCompInstacne(Vue, VueComp) {
  const Comp = Vue.extend(VueComp)
  const comp = new Comp({
    el: document.createElement('div'),
  })
  document.body.appendChild(comp.$el)
  return comp
}

/**
 * 创建prmoise
 * @return 返回prmose
 */
function createPromiseInstance() {
  let p, resolve, reject
  p = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { p, resolve, reject }
}

/**
 * 回复组件
 * @param {}} Vue
 */
function initReplay(Vue) {
  const comp = createCompInstacne(Vue, ReplayCommentPromise)
  Vue.prototype.$openReplay = function() {
    const { p, resolve, reject } = createPromiseInstance()
    comp.open(resolve, reject)
    return p
  }

  Vue.prototype.$closeReplay = function() {
    comp.close()
  }
}

/**
 * 注册全局组件
 */
function initGlobalComps(Vue) {
  for (const key in globalComps) {
    if (globalComps.hasOwnProperty(key)) {
      const item = globalComps[key]
      Vue.component(key, globalComps[key])
    }
  }
}

/**
 * 时间选择组件
 */
function initTimePick(Vue) {
  const fn = Vue.extend(TimePick)
  const instance = new fn({
    el: document.createElement('div'),
  })
  document.body.appendChild(instance.$el)
  Vue.prototype.$openTimePick = function({ type = 'date' } = {}) {
    let resolve, reject
    instance.type = type
    const p = new Promise((res, rej) => {
      resolve = res
      rej = rej
    })
    instance.open(resolve, reject)
    return p
  }
}

/**
 * 选择支付方式组件
 */
function initPickPayType(Vue) {
  const Comp = Vue.extend(PickPayType)
  const comp = new Comp({
    el: document.createElement('div'),
  })
  document.body.appendChild(comp.$el)
  Vue.prototype.$openPay = function({ price = '0.00' }) {
    comp.price = price
    let res, rej
    const p = new Promise((_res, _rej) => {
      res = _res
      rej = _rej
    })
    comp.open(res, rej)
    return p
  }
}

/**
 * 图片预览
 */
function initOpenImg(Vue) {
  const Comp = Vue.extend(OpenImg)
  const comp = new Comp({
    el: document.createElement('div'),
  })
  document.body.appendChild(comp.$el)
  Vue.prototype.$openImg = function({ src = null }) {
    comp.src = src
    let res, rej
    const p = new Promise((_res, _rej) => {
      res = _res
      rej = _rej
    })
    comp.open(res, rej)
    return p
  }
}
