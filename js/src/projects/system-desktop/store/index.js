import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import personal from './modules/personal'
Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      Info: null,
      loginDialog: false,
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
      setLoginDialog(state, type) {
        state.loginDialog = type
      },
    },
    modules: {
      home,
      personal,
    },
  })
}
