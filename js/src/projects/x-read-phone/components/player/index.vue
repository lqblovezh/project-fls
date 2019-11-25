<script>
import { mapMutations, mapState } from 'vuex'
import * as audioServices from 'services/x-read/audioInfo'
import { footerStatus } from '@/assets/js/config.js'
export default {
  // 修改未购卖的不让加入列表, 以及主题
  data() {
    return {
      duration: 0,
      currentTime: 0,
      moveX: 0,
      currPlayTypeIndex: 0, // 播放模式
      playTypes: null,
      playHistory: [], // 记录播放历史,用于播放上一首
    }
  },
  created() {
    this.playTypes = [
      { name: 'circulation', fn: this.playCirculation },
      { name: 'order', fn: this.playOrder },
      { name: 'single', fn: this.playSingle },
      { name: 'random', fn: this.playRandom },
    ]
  },
  mounted() {},
  computed: {
    ...mapState({
      paused: state => state.player.paused,
      fullScreen: state => state.player.fullScreen,
      isPlayerShow: state => state.player.isPlayerShow,
      currAudioIndex: state => {
        // if(state.player.currAudioIndex){
        return state.player.currAudioIndex
        // }else {
        //   if(localStorage.getItem('lastCurrAudioIndex')){
        //     return JSON.parse(localStorage.getItem('lastCurrAudioIndex'))
        //   }else {
        //     return null
        //   }
        // }
      },
      audioPlayList: state => {
        // let list = localStorage.getItem('lastAudioPlayList')
        // if(state.player.audioPlayList.length > 0){
        return state.player.audioPlayList
      },
      endTime() {
        return this.formate(this.duration)
      },
      curAudioId: state => {
        return state.player.audioPlayList[state.player.currAudioIndex].id
      },
    }),
    currPlayTypeObj() {
      if (this.playTypes) {
        return this.playTypes[this.currPlayTypeIndex]
      }
    },
    currentPercent() {
      let movePercent = 0
      if (this.moveX) movePercent = this.moveX / this.$refs.line.clientWidth
      let precent = 100 * (this.currentTime / this.duration + movePercent)
      if (precent < 0) {
        precent = 0
      } else if (precent > 100) {
        precent = 100
      }
      return precent
    },
    $currentPercent() {
      return this.currentPercent + '%'
    },
    currMedia() {
      if (
        this.audioPlayList.length > 0 &&
        this.currAudioIndex !== null &&
        this.audioPlayList[this.currAudioIndex]
      ) {
        // return this.audioPlayList[this.currAudioIndex].content || this.audioPlayList[this.currAudioIndex];
        return this.audioPlayList[this.currAudioIndex]
      } else {
        return {}
      }
    },
  },
  watch: {
    curAudioId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.addToList(this.currAudioIndex)
      }
    },
  },
  methods: {
    ...mapMutations(['setIsPaused', 'setFullScreenStatus', 'setIsPlayerShow', 'setCurrAudioIndex']),
    addToList(curindex) {
      audioServices
        .addAudioList(this.audioPlayList[curindex])
        .then(res => {})
        .catch(e => log(e.toString()))
    },
    play() {
      var status = this.$refs.audio.paused
      this.setIsPaused(!status)
      if (!status) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
    },
    next() {
      if (this.audioPlayList.length === 1) {
        // 如果只有一首, 就一直单曲播放
        if (this.currPlayTypeObj.name == 'order') {
          // 顺序播放时停止播放
        } else {
          this.playSingle()
        }
        return
      }
      // let lastPlayIndex = this.currAudioIndex; // 记录上一首
      this.currPlayTypeObj.fn() // 不是初始化时调用, 不会报引用错
      this.setIsPaused(false)
    },
    // 随机播放
    playRandom(flag = false) {
      // toFixed后变成了字符串
      let r = (Math.random() * (this.audioPlayList.length - 1)).toFixed(0) * 1
      if (r == this.currAudioIndex) {
        this.playRandom(false)
      } else {
        this.setCurrAudioIndex(r)
        setTimeout(() => {
          this.$refs.audio.play()
        }, 20)
      }
    },
    // 单曲播放
    playSingle() {
      this.currentTime = 0
      setTimeout(() => {
        this.$refs.audio.play()
      }, 20)
    },
    // 顺序循环播放下一首
    playCirculation() {
      if (this.currAudioIndex === this.audioPlayList.length - 1) {
        this.setCurrAudioIndex(0)
      } else {
        this.setCurrAudioIndex(this.currAudioIndex + 1)
      }
      setTimeout(() => {
        this.$refs.audio.play()
      }, 20)
    },
    // 顺序播放下一首
    playOrder() {
      if (this.currAudioIndex === this.audioPlayList.length - 1) {
        // this.setCurrAudioIndex(0)
        return
      }
      this.setCurrAudioIndex(this.currAudioIndex + 1)
      setTimeout(() => {
        this.$refs.audio.play()
      }, 20)
    },

    prev() {
      setTimeout(() => {
        this.$refs.audio.play()
      }, 20)

      if (this.currAudioIndex !== 0) {
        this.setCurrAudioIndex(this.currAudioIndex - 1)
        return
      }
      this.setCurrAudioIndex(this.audioPlayList.length - 1)
    },
    sizeChange() {
      // 如果有footer的页面, 直接设置隐藏
      if (footerStatus[this.$route.path]) {
        this.back()
      } else {
        this.setFullScreenStatus(!this.fullScreen)
      }
    },
    loadedmetadata(e) {
      let node = e.target
      this.duration = node.duration
    },
    timeupdate(e) {
      // dir(e.target)
      let node = e.target
      // this.setIsPaused(true) // 不能在里面用这个方法
      this.currentTime = node.currentTime
    },
    pointTouchstart(e) {
      let node = e.target
      this.posX = e.changedTouches[0].pageX
    },
    pointTouchmove(e) {
      this.moveX = e.changedTouches[0].pageX - this.posX
    },
    pointTouchend(e) {
      let node = this.$refs.audio
      let currentTime = this.currentPercent / 100 * node.duration

      this.currentTime = currentTime
      node.currentTime = currentTime
      this.moveX = 0
    },
    formate(time) {
      // toFixed 有四舍五入
      let min = Math.floor(time / 60)
      let sec = Math.floor(time % 60)
      if (sec < 10) {
        sec = '0' + sec
      }
      if (min < 10) {
        min = '0' + min
      }
      return min + ':' + sec
    },
    back() {
      this.setIsPlayerShow(false)
    },
    changePlayType() {
      if (this.currPlayTypeIndex === this.playTypes.length - 1) {
        this.currPlayTypeIndex = 0
      } else {
        this.currPlayTypeIndex++
      }
    },
  },

  mounted() {
    // 不应该每次mounted时播放歌曲,而是应该watch当前资源是否变化,变化后才播放
    // this.audio = this.$refs.audio;
    // this.audio.play();
  },
}
</script>

<template lang="pug">
.div(v-if="audioPlayList.length >0 && currAudioIndex !== null && audioPlayList[currAudioIndex] "  )
    audio(ref="audio" id="audio" preload="auto" webkit-playsinline playsinline
      @loadedmetadata="loadedmetadata"
      @timeupdate="timeupdate"
      @ended="next"
      :src="currMedia.preview")
    .main(v-if="fullScreen")
      .title {{currMedia.name }}
      .pic
        .bacImg
          img(:src="currMedia.img_src")
        .back( @click="back")
        .share( @click=" ")
        .img
          img(:src="currMedia.img_src")
          .name {{currMedia.name }}
    .footer
      .down(@click="back" v-show="!fullScreen")
      .line(ref="line")
        .wrap
          .point(:style="{left:$currentPercent}"
            @touchstart="pointTouchstart"
            @touchmove="pointTouchmove"
            @touchend="pointTouchend"
          )
          .active(:style="{width:$currentPercent}")
        .time
          .start-time(v-text="formate(currentTime)")
          .end-time(v-text="endTime")
      .time
        .curr
        .end
      .content
        .small( @click='sizeChange' :class="{grow:!fullScreen}" )
        .prev( @click='prev' )
        .play( @click="play" :class="{pause:!paused}")
        .next( @click="next")
        .mulu(@click="changePlayType" :class="currPlayTypeObj.name")
</template>

<style lang="stylus" scoped>
.main
  background #fff
  position absolute
  bottom 0
  top 0
  right 0
  left 0
  z-index 100
  .title
    height 0.9rem
    text-align center
    line-height 0.9rem
    font-size 0.34rem
    color #333
    box-shadow 2px 3px 8px 0px rgba(0, 0, 0, 0.04)
  .pic
    text-align center
    position absolute
    left 0
    right 0
    top 0.9rem
    bottom 3rem
    overflow hidden
    .back, .share
      width 0.54rem
      height 0.54rem
      border 50%
      position absolute
      top 0.4rem
    .share
      right 0.3rem
      background-image url('./img/share.png')
      background-size 100%
    .back
      left 0.3rem
      background-image url('./img/back.png')
      background-size 100%
    .bacImg
      position absolute
      filter blur(5px)
      opacity 0.3
      z-index 0
      left 0
      right 0
      background rgba(255, 255, 255, 0.3)
      height 7rem
      // overflow-y hidden
      >img
        width 100%
    .img
      display block
      padding-top 1.3rem
      >img
        border 3px solid #fff
        width 3.9rem
        height 5.2rem
        border-radius 8px
      .name
        color #4a576a
        margin-top 0.8rem
.footer
  padding 0.3rem
  position fixed
  bottom 0
  left 0
  right 0
  z-index 111
  background #fff
  .down
    position absolute
    bottom 0.15rem
    background url('./img/back.png') no-repeat center
    background-size 0.3rem
    width 0.4rem
    height 0.4rem
    transform rotate(-90deg)
  .line
    position relative
    .time
      color #14afff
      font-size 12px
      display flex
      justify-content space-between
      height 0.7rem
      line-height 1rem
    .wrap
      width 100%
      height 0.04rem
      background #e2e2e2
      position relative
      .active
        position absolute
        left 0
        top 0
        bottom 0
        width 0
        background #14afff
        z-index 5
      .point
        width 15px
        height 15px
        position absolute
        background url('./img/point.png') no-repeat center
        background-size 13px 13px
        top 0
        transform translate(-10%, -50%)
        // z-index 6
        // left 0%
  .content
    display flex
    justify-content space-around
    height 1.5rem
    align-items center
    >div
      width 1rem
      height 1rem
    .small
      background url('./img/shrink.png') no-repeat left center
      background-size 0.36rem 0.36rem
      &.grow
        background url('./img/grow.png') no-repeat left center
        background-size 0.36rem 0.36rem
    .prev
      background url('./img/prev-active.png') no-repeat center
      background-size 0.4rem 0.4rem
    .play
      background url('./img/play.png') no-repeat center
      background-size 1.38rem 1.38rem
      width 1.38rem
      height 1.38rem
      &.pause
        background url('./img/pause.png') no-repeat center
        background-size 1.38rem 1.38rem
    .next
      background url('./img/next-active.png') no-repeat center
      background-size 0.4rem 0.4rem
    .order
      background url('./img/mulu.png') no-repeat right center
      background-size 0.36rem 0.36rem
    .random
      background url('./img/random.png') no-repeat right center
      background-size 0.36rem 0.36rem
    .single
      background url('./img/single.png') no-repeat right center
      background-size 0.36rem 0.36rem
    .circulation
      background url('./img/circulation.png') no-repeat right center
      background-size 0.36rem 0.36rem
</style>
