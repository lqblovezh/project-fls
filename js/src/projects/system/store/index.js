import Vue from 'vue'
import Vuex from 'vuex'

import * as service from 'services/system/press'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: () => ({
      title: 'untitle'
    }),
    actions: {
      init: ({ commit }, title) =>  {
       //return service.getList({}).then(data => commit('setTitle', JSON.stringify(data)))
        return new Promise((resolve) => {
          setTimeout(() => {
            commit('setTitle', title)
            resolve()
          }, 1000)
        })
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
