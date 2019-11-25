import Vue from 'Vue'

export default {
  state: {
    bookId: null,
    info: {
      books_info:{
        attributes:[]
      }
    },

    videos: [],
    audios: [],
    Ebooks: [],
    
    xList: null,
    xInfo: {},

    buyAudios:{},//价格计算,选中项目
    buyChapters:{},//价格计算,选中项目
    buyVideos:{},//价格计算,选中项目

  },
  mutations: {
    setinfo(state, data) {
      state.info = data
    },
    setbookId(state, data) {
      state.bookId = data
    },
    setvideos(state, data) {
      state.videos = data
    },
    setaudios(state, data) {
      state.audios = data
    },
    setEbooks(state, data) {
      state.Ebooks = data
    },
    setxList(state, res) {
      state.xList = res.data
    },
    setxInfo(state, res) {
      state.xInfo = res.data
    },
    setBuyAudios(state,  i){
      if(state.buyAudios[i.id]  ){
        state.buyAudios[i.id] = null
        // Vue.set(state.buyAudios, [i.id] , null ) // 当在对象上添加新属性时 , 一定要这么处理
        // Vue.set(state.buyAudios, i.id , null )
      }else {
        // state.buyAudios[i.id] = null
        state.buyAudios = {...state.buyAudios , [i.id]:i  }    // 黑人问号?????    
        // Vue.set(state.buyAudios, [i.id] , i ) // 当在对象上添加新属性时 , 一定要这么处理
        // this.buyAudios[i.id] = i ;
      }
    },
    setBuyVideos(state,  i){
      if(state.buyVideos[i.id]  ){
        state.buyVideos[i.id] = null
      }else {
        state.buyVideos = {...state.buyVideos , [i.id]:i  }    // 黑人问号?????    
      }
    },
    setBuyChapters(state,  i){
      log(i.id)
      if(state.buyChapters[i.id]  ){
        state.buyChapters[i.id] = null
      }else {
        state.buyChapters = {...state.buyChapters , [i.id]:i  }    // 黑人问号?????    
      }
      log(state.buyChapters)
    },

    setBuyAudiosAll(state,  data){
      state.buyAudios = data 
    },
    setBuyChaptersAll(state,  data){
      state.buyChapters = data 
    },
    setBuyVideosAll(state,  data){
      state.buyVideos = data 
    },


  },
  actions: {},
  getters: {},
}
