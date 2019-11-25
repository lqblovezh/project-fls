export default {
  state:{
    curr:'home',
    paused:true , //是否暂停
    fullScreen: true , // 全屏和收起
    isPlayerShow: false , 
    
    isPlayerVideoShow: false , // 视频播放器

    audioPlayList:[],
    currAudioIndex:null, 

    videoPlayList:[],
    currVideoIndex:null, //当前视频播放的index
  },
  mutations:{
    setFooterCurr(state,data){
      state.curr = data 
    },
    setIsPaused(state,data){
      state.paused = data 
    },
    setFullScreenStatus(state,data){
      state.fullScreen = data 
    },
    setIsPlayerShow(state , data){
      state.isPlayerShow = data ;
    },
    setIsPlayerVideoShow(state , data){
      state.isPlayerVideoShow = data ;
    },

    setCurrAudioIndex(state , data){
      state.currAudioIndex = data ;
    },
    setAudioPlayList(state , data){
      state.audioPlayList = data ;
    },

    setVideoPlayList(state , data){
      state.videoPlayList = data ;
    },
    setCurrVideoIndex(state , data){
      state.currVideoIndex = data ;
    }
  },
  actions:{},
  getters:{},
}