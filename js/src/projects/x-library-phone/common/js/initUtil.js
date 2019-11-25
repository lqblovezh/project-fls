import * as utils from './util'
import * as directives from './directive'

export default function initGlobalMethod(Vue) {
  for (const key in utils) {
    if (utils.hasOwnProperty(key)) {
      Vue.prototype['$' + key] = utils[key]
    }
  }

  for (const key in directives) {
    if (directives.hasOwnProperty(key)) {
      Vue.directive(key, directives[key])
    }
  }
}
