<script>
import { mapState, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import { canRead, setFullscreen, isFullscreenEnabled, getOwningMedia } from '@/utils/util.js'

import { mediaMixin } from './mixins.js'
export default {
  mixins: [mediaMixin],
  created() {
    this.init()
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
      currAudioIndex: state => state.player.currAudioIndex,
      audioPlayList: state => state.player.audioPlayList,
    }),
  },
  methods: {
    ...mapMutations([
      'setIsPlayerVideoShow',
      'setCurrVideoIndex',
      'setVideoPlayList',
      'setIsPlayerShow',
      'setCurrAudioIndex',
      'setAudioPlayList',
      'setIsPaused',
      'setFullScreenStatus',
    ]),
    init() {
      this.query = this.$route.query
    },
    openFirst() {
      if (this.list.audios.length) {
        this.openAudio(0, this.list.audios[0])
        return
      }
      if (this.list.videos.length) {
        this.openVideo(0, this.list.videos[0])
        return
      }
    },
    openVideo(index, item) {
      if (!this.$canRead(item)) return

      this.$openVideo({ index, list: this.list.videos })
    },
    openAudio(index, item) {
      if (!this.$canRead(item)) return

      this.$openAudio({ index, list: this.list.audios })
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
.div
  ResultSection(name="视频" :hide="true" v-if="list.videos.length") 
    .ls-video.ls
      .item(v-for="(i,index) in list.videos" )
        .line-single
        .content
          .left( @click="openVideo(index, i)")
            img.book(v-lazy="i.img_src")
            img.play(src="./img/play.png")
          .right
            .name.ell
              span  {{i.name}}
              span 
            .preview {{i.abs}}
  ResultSection(name="音频" :hide="true" v-if="list.audios.length")             
    .ls-audio.ls
      .item(v-for="(i,index) in list.audios"  )
        .line-single
        .content
          .name.ell( @click="openAudio(index , i)")
            //- span.chapter 第一章
            span {{i.name}}
            // span {{i.content.name}}
          .time
            .icon-free(v-show="!i.price")
            .txt
            .icon(v-show="true")
  ResultSection(name="图片" :hide="true" v-if="list.pictures.length" )             
    .ls-img.ls 
      img.item( v-for="item in list.pictures" :src="item.preview_path")     
</template>

<style lang="stylus" scoped>
.ls
  padding 0 0.3rem
.ls-img
  display flex
  flex-flow row wrap
  justify-content space-between
  align-items center
  .item
    width 45%
    height 100%
    margin-top 15px
</style>
