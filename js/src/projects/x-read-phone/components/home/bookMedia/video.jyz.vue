<script>
import { mapState, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import { canRead, setFullscreen, isFullscreenEnabled , getOwningMedia } from '@/utils/util.js'

import { mediaMixin } from './mixins.js'
export default {
  mixins: [mediaMixin],
  created() {
    this.init()
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
      videos: state => state.bookinfo.videos,
    }),
  },
  methods: {
    ...mapMutations([
      'setIsPlayerVideoShow',
      'setCurrVideoIndex',
      'setVideoPlayList',
    ]),
    init() {
      this.query = this.$route.query
    },
    openVideo(index, item) {
      if (!this.$canRead(item)) return

      // isPlayerVideoShow:state => state.player.isPlayerVideoShow,
      // 待优化 是否自动下一视频
      this.setCurrVideoIndex(index)
      this.setIsPlayerVideoShow(true)
      // 判断list中 isBuy 或者 price 有的item
      let t = getOwningMedia(this.list) // 得到已有的, 统一逻辑出处, 方便以后改
      this.setVideoPlayList(t)
      // alert(this.isFullscreenEnabled())
      setTimeout(() => {
        let node = document.querySelector('#video')
        node.play()
        setFullscreen(node)
      }, 20)
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
.div
  .msg-price.all
    .oper-my
      .totals
        span 已选择 {{checkedItems.length}} 首
        span.curr-price 总计:
        span.price-color {{totalPrice}}
      .buy
        .send-btn.pay-btn( @click="$emit('payChapters')" ) 栏目购买
        .check(@click=" $emit('buyAll' ) " :class="{true:checkedItems.length}"  )
  .ls-video(v-if="list.length")
    .item(v-for="(i,index) in list" )
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
          .fun
            .time
            .price-common.item(@click="$emit('buyItem',i)" )
              .curr-price(v-if="i.price") ￥{{i.price}}
              //- .err ￥58
              .check(:class="{true: checkedItemsObj[i.id] != null}" )
</template>

<style lang="stylus" scoped>
.div
  padding 0 0.3rem

.price-common
  .curr-price
    font-size 0.26rem
  .err
    font-size 0.24rem
  .check
    display inline
</style>
