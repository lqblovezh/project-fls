import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import home from './modules/home'
import circle from './modules/circle'
import normal from './modules/normal'
import category from './modules/category'
import dbHome from './modules/db'
import advance from './modules/advance'
import filter from './modules/filter'
import * as utils from '@/common/js/util'

Vue.use(Vuex)
Vuex.Store.prototype.$util = utils
export function createStore() {
  return new Vuex.Store({
    state: () => ({
      user: null,
      config: {},
      title: 'lq',
      currBottom: '',
      isFooterShow: false,
      historyRouteLength: 0,
      isLoginShow: false,
      loginModalType: 'Phone',
    }),
    mutations: {
      SET_USER(state, data) {
        state.user = data
      },
      SET_CONFIG(state, data) {
        state.config = data
      }
    },
    actions: {
      init: ({ commit }, title) => {
        return
      },
    },
    modules: {
      search,
      home,
      normal,
      circle,
      category,
      advance,
      filter,
      dbHome,
    },
  })
}
