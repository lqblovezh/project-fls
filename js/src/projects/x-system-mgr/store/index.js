import Vue from 'vue'
import Vuex from 'vuex'

import * as service from 'services/system/press'
import {menu} from 'services/common/menu'
Vue.use(Vuex)
export function createStore () {
  return new Vuex.Store({
    state: () => ({
			title: 'untitle',
			url:'' // 没有权限时的跳转页面
    }),
    actions: {
      init: ({ commit }, title) =>  {
        return service.getList({}).then(data => commit('setTitle', JSON.stringify(data))).catch(console.error)
      }
    },
    mutations: {
      setTitle (state, title) {
        state.title = title
        return state
      }
    },
  })
}
