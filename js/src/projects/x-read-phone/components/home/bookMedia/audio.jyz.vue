<script>
import { mapState, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import { canRead, getOwningMedia } from '@/utils/util.js'
import { mediaMixin } from './mixins.js'
export default {
  mixins: [mediaMixin],
  created() {
    this.init()
  },
  data() {
    return {
      // buyAudios:{
      // }
    }
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
      currAudioIndex: state => state.player.currAudioIndex,
      audioPlayList: state => state.player.audioPlayList,
    }),
    currMedia() {
      if (this.audioPlayList && this.audioPlayList[this.currAudioIndex]) {
        return this.audioPlayList[this.currAudioIndex]
      }
      return {}
    },
  },
  methods: {
    ...mapMutations([
      'setIsPlayerShow',
      'setCurrAudioIndex',
      'setBuyAudios',
      'setBuyAudiosAll',
      'setAudioPlayList',
      'setIsPaused',
      'setFullScreenStatus',
    ]),
    init() {
      this.query = this.$route.query
      this.setFullScreenStatus(true)
    },
    openAudio(index, item) {
      if (!this.$canRead(item)) return

      // 如果书买了, 那么没买, 那么免费的会排除他, 这里的index就变了
      // 得到能够播放的音频以及改变后的index
      let t = getOwningMedia(this.list)
      let i = t.findIndex(c => item.id == c.id)
      this.$openAudio({index:i, list:t})
    },
    bookImgClick() {
      if (!this.list[0]) return
      // 待优化: 判断当前id和播放书的id
      if (this.list[this.currAudioIndex]) {
        // 当前index存在,就走idnex,不存在就
        this.openAudio(this.currAudioIndex)
      } else {
        this.openAudio(0)
      }
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
.div(v-show="!fullScreen || !isPlayerShow")
  .msg-price.all
    .line-single
    .oper-my
      .totals
        span 已选择 {{checkedItems.length}} 首
        span.curr-price 总计:
        span.price-color {{totalPrice}}
      .buy
        .send-btn.pay-btn( @click="$emit('payChapters')" ) 栏目购买
        .price-common
        .check(@click=" $emit('buyAll') " :class="{true:checkedItems.length}")
  .ls-audio
    .item(v-for="(i,index) in list" :key="i.id"  )
      .line-single
      .content
        .name.ell( @click="openAudio(index , i)")
          //- span.chapter 栏目一
          span {{i.name}}
          //- span {{i.content.name}}
        .time
          .txt
          .icon-free(v-show="!i.price")
          .icon(v-show="currMedia.id == i.id")
        .price-common.item( @click="$emit('buyItem',i)" )
          .curr-price( v-show="i.price * 1" ) ￥{{i.price}}
          .check( :class="{true:checkedItemsObj[i.id] != null  }" )
</template>

<style lang="stylus" scoped>
.price-common.item
  .curr-price
    font-size 13px
  .err
    font-size 12px
  .check
    display inline
.div
  padding 0 0.3rem
</style>
