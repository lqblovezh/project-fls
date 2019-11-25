import store from '@/store'
import ImageCompressor from 'image-compressor.js';

export function imgCompress(file,{}){
  return Promise((res,rej)=>{
    new ImageCompressor(file,{
      quality: .8,
      convertSize:1500000, //2m
      success(result){
        res(result)
      },
      error(e){
        rej(e)
      }
    })
  })
}


export function openAudio({ index , list }){
  store.commit('setIsPlayerShow', true)
  store.commit('setCurrAudioIndex', index)
  store.commit('setAudioPlayList', list)
  audioPlay();
}

export function openVideo({ index , list }){
  store.commit('setCurrVideoIndex', index)
  store.commit('setIsPlayerVideoShow', true)
  store.commit('setVideoPlayList', list)
  videoPlay()
  // store.setCurrVideoIndex(index)
  // store.setIsPlayerVideoShow(true)
  // store.setVideoPlayList(this.videos)
}

export function goReader(data){

}

export function goBook(data){

}

export function audioPlay(){
  setTimeout(() => {
    document.querySelector('#audio').play()
    // this.$refs.audio.play()
  }, 20);
  store.commit('setIsPaused',false)
}

export function videoPlay(){
  setTimeout(() => {
    let node = document.querySelector('#video');
    node.play()
    // this.$refs.audio.play()
    setFullscreen(node)
  }, 20);
  store.commit('setIsPaused',false)
}

export function audioPause(){
  setTimeout(() => {
    document.querySelector('#audio').pause();
    // this.$refs.audio.play()
  }, 20);
  store.commit('setIsPaused',true)
}



export function isFullscreenEnabled(){
  return document.fullscreenEnabled       ||
          document.mozFullScreenEnabled    ||
          document.webkitFullscreenEnabled ||
          document.msFullscreenEnabled || false;
}

export function setFullscreen(element) {
  var el = element instanceof HTMLElement ? element : document.documentElement;
  var rfs = el.requestFullscreen       || 
            el.webkitRequestFullscreen || 
            el.mozRequestFullScreen    || 
            el.msRequestFullscreen;
  if (rfs) {
      rfs.call(el);
  } else if (window.ActiveXObject) {
      var ws = new ActiveXObject("WScript.Shell");
      ws && ws.SendKeys("{F11}");
  }
}



