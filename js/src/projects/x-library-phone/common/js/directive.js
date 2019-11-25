import Validator, { regexs, camelCase } from './validator'
const validator = new Validator()


let blurHandler
export const vali = {
  bind(el, binding, vnode, oldVnode) {
    const data = binding.value
    blurHandler = function(e) {
      const inpVal = e.target.value
      valiInp(inpVal, data)
    }
    el.onblur = blurHandler
  },
  inserted(el, binding, vnode, oldVnode) {},
  update(el, binding, vnode, oldVnode) {},
  componentUpdated(el, binding, vnode, oldVnode) {},
  unbind(el, binding, vnode, oldVnode) {},
}

export const width = {
  bind(el, binding, vnode, oldVnode) {
    const data = binding.value
    el.innerText = data
    let len = chkstrlen(data)
    el.style.width = len * 10 + 'px'
  },
  inserted(el, binding, vnode, oldVnode) {},
  update(el, binding, vnode, oldVnode) {},
  componentUpdated(el, binding, vnode, oldVnode) {},
  unbind(el, binding, vnode, oldVnode) {},
}

function chkstrlen(str) {
  var strlen = 0
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255)
      //如果是汉字，则字符串长度加2
      strlen += 2
    else {
      strlen += 0.7
    }
  }
  return strlen
}

export const src = {
  bind(el, binding, vnode, oldVnode) {
    const data = binding.value
    let other = './static/img/book_default.png'
    el.setAttribute('src', data || other)
  },
  inserted(el, binding, vnode, oldVnode) {},
  update(el, binding, vnode, oldVnode) {},
  componentUpdated(el, binding, vnode, oldVnode) {},
  unbind(el, binding, vnode, oldVnode) {},
}
export const srcFile = {
  bind(el, binding, vnode, oldVnode) {
    const data = binding.value
    let other = URL.createObjectURL(data)
    el.setAttribute('src', other)
  },
  inserted(el, binding, vnode, oldVnode) {},
  update(el, binding, vnode, oldVnode) {},
  componentUpdated(el, binding, vnode, oldVnode) {},
  unbind(el, binding, vnode, oldVnode) {},
}

export function valiInp(inpVal, data) {
  if (!data.rules) return
  let isPass = true
  data.rules.split('|').forEach(item => {
    if (/\(.*\)/.test(item)) {
      let [p, method, params] = regexs.rule.exec(item)
      if (!validator[camelCase(method)](inpVal, params)) {
        isPass = false
      }
    } else {
      if (!validator[camelCase(item)](inpVal)) {
        isPass = false
      }
    }
  })
  data.isError = !isPass
}

// let order = {
//   type: 'hot', //'time'
//   val: 'desc',
// }
