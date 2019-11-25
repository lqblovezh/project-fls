import * as util from './util'

export default function(Vue) {
  for (const key in util) {
    if (util.hasOwnProperty(key)) {
      Vue.prototype['$' + key] = util[key]
      // console.log(Vue.prototype['$' + key])
    }
  }
}
