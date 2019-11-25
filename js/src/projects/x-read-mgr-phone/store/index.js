import Vue from 'vue'
import Vuex from 'vuex'
import footer from './modules/footer'
import player from './modules/player'
import home from './modules/home'
import bookinfo from './modules/bookinfo'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    footer,player ,home,bookinfo
  },
  state:{
    isFooterShow:true,
    userInfo:null,
    commentSingleDetail:null , // 单条评论
  },
  mutations:{
    changeFooterStatus(state , data){
      state.isFooterShow = data ;
    },
    setUserInfo(state ,data){
      state.userInfo = data
    },
    setCommentSingleDetail(state , data){
      state.commentSingleDetail = data
    }
  }
})
