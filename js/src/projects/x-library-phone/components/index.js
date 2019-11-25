import comps, { funComp } from './comps'
// import { Message, MessageBox } from 'element-ui'
import { Toast } from 'mint-ui'

let gbFunObj

export function installGlobalComponents(Vue) {
  for (const comp in comps) {
    if (comps.hasOwnProperty(comp)) {
      const item = comps[comp]
      if (item.name) {
        Vue.use(item)
        // Vue.component(item.name, item)
      } else {
        Vue.component(comp, item)
      }
    }
  }
  addMethods(Vue)
  addFunComp(Vue)
}
function addMethods(Vue) {
  Vue.prototype.$Toast = Toast
  // Vue.prototype.$prompt = MessageBox.prompt
  // Vue.prototype.$confirm = MessageBox.confirm
  // Vue.prototype.$alert = MessageBox.alert
}

function getCompConstructor(Vue) {
  if (global.localStorage) {
    let funObj = {}
    for (const name in funComp) {
      if (funComp.hasOwnProperty(name)) {
        //console.log('fun comp', name)
        let CompContructor = Vue.extend(funComp[name])

        funObj[name] = new CompContructor({
          el: document.createElement('div'),
        })
        document.body.appendChild(funObj[name].$el)
      }
    }
    gbFunObj = funObj
  }
}

function addFunComp(Vue) {
  getCompConstructor(Vue)
  console.log('funObj', gbFunObj)
  Vue.prototype.$loading = loading
  Vue.prototype.$closeLoading = closeLoading
  Vue.prototype.$openTime = openTime
}

function openReplyDialog({ ...opt }) {
  let resolve, reject
  let promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  gbFunObj.ReplayDialog.open({ resolve, reject, ...opt })
  return promise
}

function loading({ ...opt }) {
  gbFunObj.Loading.open()
}
function closeLoading({ ...opt }) {
  gbFunObj.Loading.close()
}

function openTime(data) {
  let resolve, reject
  let promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  gbFunObj.TimePick.open({ resolve, reject, ...data })
  return promise
}
