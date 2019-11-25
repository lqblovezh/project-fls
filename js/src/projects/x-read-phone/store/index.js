import Vue from 'vue'
import Vuex from 'vuex'
import footer from './modules/footer'
import player from './modules/player'
import home from './modules/home'
import bookinfo from './modules/bookinfo'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    footer,
    player,
    home,
    bookinfo,
  },
  state: {
    isFooterShow: true,
    userInfo: null,
    isLoginShow: false, // 登录显示
    isBook: false, // 是否是书房
    historyList: [],
    historyLen: 0,
    isLoginBack: false,
    thirdConf: {},
    isAppShow: true, // 是否显示隐藏#app (一般用于当有全屏遮罩的时候,不让底层滑动)
  },
  mutations: {
    changeIsAppShow(state, data) {
      state.isAppShow = data
    },
    changeIsLoginBack(state, data) {
      state.isLoginBack = data
    },
    changeFooterStatus(state, data) {
      state.isFooterShow = data
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setIsLoginShow(state, data) {
      state.isLoginShow = data
    },
    setIsBook(state, data) {
      state.isBook = data
    },
    setThirdConf(state, data) {
      state.thirdConf = data
    },
    changeHistoryLen(state, data) {
      let t = state.historyLen + data
      if (t < 0) {
        t = 0
      }
      state.historyLen = t
    },
    pushHistory(state, { path, query, full }) {
      if (/^\/(home|find|my)$/.test(path)) {
        state.historyList = [{ path, query, full }]
      } else if (/^\/login$/.test(path)) {
        // 只有书房的登陆, 是路由模式的登陆, 特殊处理
        state.historyList = [{ path: '/book', query, full: location.href.split('#')[0] + '#/book' }]
      } else {
        state.historyList.push({ path, query, full })
      }
    },
    popHistory(state, data) {
      state
    },
  },
  plugins: [createPersistedState()],
})
