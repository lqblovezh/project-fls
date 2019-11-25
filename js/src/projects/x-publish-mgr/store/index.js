import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userInfo: null ,
    collapse: false,
    authority: null,
    menuDefaultHeight: "0px",
    xDataVisible: false,
  },
  mutations:{
    updateUser(state,userInfo){
      state.userInfo = userInfo
    },
    updateCollapse(state,collapse){
      state.collapse = collapse
    },
    updateAuthority(state,authority){
      state.authority = authority
    },
    openXData(state,xDataVisible){
      state.xDataVisible=true
    },
    closeXData(state,xDataVisible){
      state.xDataVisible=false
    }
  }
})
