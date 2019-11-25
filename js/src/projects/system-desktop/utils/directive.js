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
