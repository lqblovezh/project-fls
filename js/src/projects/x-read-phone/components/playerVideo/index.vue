<script>
import { mapState , mapMutations } from 'vuex';

export default {
  methods:{
    ...mapMutations([
      'setIsPlayerVideoShow','setCurrVideoIndex'
    ]),
    close(){
      this.setIsPlayerVideoShow(false);
      this.setIsPlayerVideoShow(false);
      this.$refs.video.pause()
    },
    
    currPlay(index){ // 点击列表播放
      this.setCurrVideoIndex(index);
      setTimeout(() => {
        document.querySelector("#video").play()
      }, 20);
    },
  },
  computed:{
    ...mapState({
      isPlayerVideoShow: state => state.player.isPlayerVideoShow,
      currVideoIndex: state => state.player.currVideoIndex,
      videoPlayList: state => state.player.videoPlayList,
      videos: state => state.bookinfo.videos,
    }),
    currMedia(){
      if( this.videoPlayList.length > 0  &&this.currVideoIndex !== null  && this.videoPlayList[this.currVideoIndex]){
        return this.videoPlayList[this.currVideoIndex].content || this.videoPlayList[this.currVideoIndex]
      }else {
        return {}
      }
      
    }
  },
  watch:{
    isPlayerVideoShow(){
      if(this.isPlayerVideoShow){
        document.querySelector('html').classList.add('overflow-hide')
      }else {
        document.querySelector('html').classList.remove('overflow-hide')
      }
    }
  }
}
</script>
<template lang="pug">
.div(v-if="videoPlayList && videoPlayList.length > 0 ") 
  .main() 
    .video 
      .close(@click="close")
      video(ref="video" id="video" :src="currMedia.preview" 
        controlsList="nodownload"
        preload='auto'
        webkit-playsinline='true' 
        playsinline='true'
        x-webkit-airplay='true' 
        x5-video-player-type='h5' 
        x5-video-player-fullscreen='true'
        x5-video-ignore-metadata='true' 
         controls)  
    .ls(if="videoPlayList && videoPlayList.length > 0") 
      .item(v-for="(i,index) in videoPlayList") 
        .content 
          .name( @click="currPlay(index)" ) {{i.name}}

</template>

<style lang="stylus" scoped>
.div
  position fixed 
  top 0
  right 0
  bottom 0
  left 0
  z-index 200
  background rgba(0,0,0,0.3)
  .main
    .close
      width 30px
      height 30px
      background url(./img/close.png) no-repeat center
      background-size 22px
      position absolute
      right 0.4rem
      margin-top -0.8rem
    .video 
      width 100%
      margin-top 3rem
      background #000
      video
        width 100%
.ls
  background #999
  font-size 16px
  padding 0.3rem
  max-height 4.7rem
  overflow scroll
  .item
    margin-top 0.2rem
  
</style>
