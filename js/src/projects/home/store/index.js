import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      Info: null ,
    }),
    actions: {
      init: ({ commit }, title) => {
        return new Promise(resolve => {
          setTimeout(() => {
            commit('setTitle', title)
            resolve()
          }, 1000)
        })
      },
    },
    mutations: {
      setTitle(state, title) {
        state.title = title
      },
    },
    modules: {
    },
  })
}
