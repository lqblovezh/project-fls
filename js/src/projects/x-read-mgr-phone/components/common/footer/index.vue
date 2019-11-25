<script>
import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    setCurr(name) {
      let userInfo = null
      if (sessionStorage.userInfo) {
        userInfo = JSON.parse(sessionStorage.userInfo)
      }
      log(userInfo)
      switch (name) {
        case 'my':
          if (!userInfo) {
            name = 'login'
          }
          break
        case 'book':
          if (!userInfo) {
            name = 'login'
          }
          break
        default:
          break
      }
      this.setFooterCurr(name)
      this.$router.push({ path: `/${name}` })
    },
    play() {
      if (!this.currMedia.preview) return //没有播放列表不允许播放
      this.setFullScreenStatus(true) // 有footer不需要半屏显示
      this.setIsPlayerShow(true)

      // this.setIsPaused(!this.paused);
      // var node = document.querySelector("#audio")
      // var status = node.paused
      // this.setIsPaused(!status)
      if (!this.paused) {
        this.$audioPause()
      } else {
        this.$audioPlay()
      }
    },
    go() {},
    ...mapMutations([
      'setFooterCurr',
      'setIsPaused',
      'setIsPlayerShow',
      'setFullScreenStatus'
    ])
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      curr: state => state.footer.curr,
      // isPlay:state => state.footer.isPlay,
      paused: state => state.player.paused,
      audioPlayList: state => state.player.audioPlayList,
      currAudioIndex: state => state.player.currAudioIndex,
      isPlayerShow: state => state.isPlayerShow
    }),
    currMedia() {
      if (
        this.audioPlayList.length > 0 &&
        this.currAudioIndex !== null &&
        this.audioPlayList[this.currAudioIndex]
      ) {
        return (
          this.audioPlayList[this.currAudioIndex].content ||
          this.audioPlayList[this.currAudioIndex]
        )
      } else {
        return {}
      }
    }
  }
}
</script>
<template lang="pug">
.footer
  .content
    .main 
      .item( @click="setCurr('home')"  :class="{active:'home' == curr}" ) 
        .icon.icon-home( )
        .name.active 首页  
      .item( @click="setCurr('find')"  :class="{active:'find' == curr}" )  
        .icon.icon-find  
        .name 发现
      .play(@click="play" :class="{pause:!paused}" ) 
        .img(v-show="currMedia.img_src" :class="{anima:!paused}") 
          img(v-lazy="currMedia.img_src" )
      .item( @click="setCurr('book')"  :class="{active:'book' == curr}" )  
        .icon.icon-home  
        .name 书房  
      .item( @click="setCurr('my')"  :class="{active:'my' == curr}" )  
        .icon.icon-my  
        .name 我的  
</template>

<style lang="stylus" scoped>
@keyframes spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
.footer
  height 1.5rem
  width 100%
  background #fff
.content
  position fixed
  bottom 0px
  width 7.5rem
  background #fff
  z-index 99999
.main
  display flex
  // background red
  justify-content space-around
  // width 7.5rem
  height 1rem
  text-align center
  .play
    width 1rem
    height 1rem
    background #c0c0c0 url('./img/play.png') no-repeat center
    background-size 0.26rem 0.3rem
    border-radius 0.5rem
    margin-top -0.1rem
    overflow hidden
    position relative
    // background-color red
    z-index 5
    .img
      left 0
      right 0
      top 0
      bottom 0
      position absolute
      z-index -1
      opacity 0.2
      >img
        width 100%
        height 100%
      &.anima
        animation spin 15s linear infinite
    &.pause
      background #c0c0c0 url('./img/pause.png') no-repeat center
      background-size 0.26rem 0.3rem
  .item
    width 0.8rem
    // background green
    font-size 0.2rem
    display flex
    flex-flow column nowrap
    .name
      color #a6a6a6
    &.active
      .name
        color #14afff
    .icon
      height 0.65rem
    .icon-home
      background url('./img/home.png') no-repeat center
      background-size 0.42rem 0.42rem
    &.active
      .icon-home
        background url('./img/home-active.png') no-repeat center
        background-size 0.42rem 0.42rem
    .icon-find
      background url('./img/find.png') no-repeat center
      background-size 0.42rem 0.42rem
    &.active
      .icon-find
        background url('./img/find-active.png') no-repeat center
        background-size 0.42rem 0.42rem
    .icon-book
      background url('./img/book.png') no-repeat center
      background-size 0.42rem 0.42rem
    &.active
      .icon-book
        background url('./img/book-active.png') no-repeat center
        background-size 0.42rem 0.42rem
    .icon-my
      background url('./img/my.png') no-repeat center
      background-size 0.42rem 0.42rem
    &.active
      .icon-my
        background url('./img/my-active.png') no-repeat center
        background-size 0.42rem 0.42rem
</style>
