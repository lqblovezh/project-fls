<script>
import ResultSection from './resultSection'
import { mapMutations, mapState } from 'vuex'
import { canRead } from '@/utils/util'

export default {
  components: { ResultSection },
  props: ['choose', 'readerAccessCode'],
  created() {},
  methods: {
    goReader(i) {
      // if (!canRead({ price: 100 })) return // 目前只判断登陆

      if (!this.$canRead()) return
      i.id = this.$route.query.id
      if (this.$route.query.from && this.$route.query.from == 'theme') {
        i.from = 'themeXknow'
      }
      i.clean = this.$route.query.clean
      this.$go('/reader', i)
    },
    openVideo(index) {
      if (!this.$canRead({ isBuy: false })) return
      this.$openVideo({ index, list: this.xInfo.videos })
    },
    openAudio(index) {
      if (!this.$canRead({ isBuy: false })) return
      this.$openAudio({ index, list: this.xInfo.audios })
    },
  },
  computed: {
    ...mapState({
      bookId: state => state.bookinfo.bookId,
      xList: state => state.bookinfo.xList,
      xInfo: state => state.bookinfo.xInfo,
    }),
  },
  watch: {
    choose() {},
  },
}
</script>

<template lang="pug">
.div
  .section(v-show="xInfo.chapters && xInfo.chapters.length > 0")
    ResultSection(name="相关章节")
      .chapter
        .item(v-for="i in xInfo.chapters" )
          .name.ell(@click="goReader(i)") {{i.name}}
          .line-single
    .line-part
  .section(v-show="xInfo.contents && xInfo.contents.length > 0")
    ResultSection(name="相关内容")
      .relate-content
        .item(v-for="i in xInfo.contents")
          .name(@click="goReader(i)") {{i.point || i.name}}
          .line-single
    .line-part
  .section(v-show="xInfo.audios && xInfo.audios.length > 0")
    ResultSection(name="相关音频")
      .audios-ls
        .item(v-for="(i, index) in xInfo.audios")
          .content( @click="openAudio(index)")
            .name.ell {{i.name}}
            .time
              //- .txt  20:22
              .icon
          .line-single
    .line-part
  .section(v-show="xInfo.videos && xInfo.videos.length > 0")
    ResultSection(name="相关视频")
      .relate-audio
        .item(v-for="(i,index) in xInfo.videos"   @click="openVideo(index)")
          img.img( v-lazy="i.img_src"   )
          .name.ell {{i.name}}
    .line-part

</template>

<style lang="stylus" scoped>
.audios-ls
  .item
    height 0.85rem
    line-height 0.85rem
    text-align left
    padding-left 0.4rem
    .content
      display flex
      height 100%
      justify-content space-between
      .name
        flex auto
        color #333
        font-size 14px
        .chapter
          margin-right 10px
      .time
        flex none
        width 1.3rem
        display flex
        .txt
          font-size 12px
          color #999999
        .icon
          flex auto
          background url('./img/audio.png') no-repeat right center
          background-size 0.38rem 0.32rem
.relate-audio
  display flex
  flex-wrap wrap
  .item
    width 3.3rem
    flex 0 0 auto
    .img
      width 100%
      height 1.93rem
    .name
      font-size 13px
      height 33px
      overflow hidden
      line-height 18px
      margin-bottom 0.3rem
      margin-top 0.1rem
      color #555
.chapter
  padding-left 0.4rem
  .item
    height 0.85rem
    line-height 0.85rem
    color #555
    font-size 0.28rem
    .time
      flex none
      width 1.3rem
      display flex
      .txt
        font-size 12px
        color #999999
      .icon
        flex auto
        background url('./img/audio.png') no-repeat right center
        background-size 0.38rem 0.32rem
    &:last-child
      .line-single
        display none
.relate-content
  .item
    padding-left 0.4rem
    .name
      padding 0.3rem 0
      font-size 0.28rem
      line-height 0.42rem
      color #555
    &:last-child
      .line-single
        display none
</style>
