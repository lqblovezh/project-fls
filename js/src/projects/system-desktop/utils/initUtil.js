import * as utils from './util'

export default function initGlobalMethod(Vue) {
  for (const key in utils) {
    if (utils.hasOwnProperty(key)) {
      Vue.prototype['$' + key] = utils[key]
    }
  }
}
