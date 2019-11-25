
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  created(){
    // new Promise()
    // window.addEventListener("beforeunload", function (event) {
    //   log(321)
    // });
    // log(22222222, localStorage.getItem('localAudios'))

    // window.addEventListener("beforeunload", function (e) {
    //   // localStorage.setItem('lastAudioPlayList' , JSON.stringify(this.audioPlayList) )
    //   log('2222222222222222222222222222222222')
    //   e.preventDefault()

    //   localStorage.setItem('localAudios' , JSON.stringify(this.audioPlayList))
      
    // });
  },
  computed:{
  }
}
</script>
<template lang="pug">
#app 
  keep-alive( :exclude="/Reader/")
    router-view() 
  // Footer(v-show="isFooterShow && !isPlayerShow" )  // 有播放器不显示
</template>

<style lang="stylus">
body 
  font-size 0.3rem
// #app 
//   height 100%
.audio-footer 
  height  3.2rem
  background #fff
</style>
