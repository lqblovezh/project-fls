<script>
import { mapState, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import { canRead } from '@/utils/util.js'
import * as dbiServices from 'services/x-read/dbi'
import { mediaMixin } from './mixins.js'
export default {
  mixins: [mediaMixin],
  created() {
    this.init()
  },
  data() {
    return {
      access_code: '',
    }
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
    }),
    selectNumber() {
      let i = 1
      Object.values(this.checkedItemsObj).forEach(item => {
        if (item) {
          i++
        }
      })
      return Object.values(this.checkedItemsObj).length
    },
  },
  methods: {
    ...mapMutations(['setIsPlayerShow']),
    init() {
      this.query = this.$route.query
    },
    goReader(i) {
      if (!this.$canRead(i)) return
      i.chapter_root = i.index // i.id 需要被覆盖
      const {
        id,
        from,
        book_id,
        chapter_id,
        product_id,
        range,
        chapter_root,
        clean,
      } = i
      this.$go('/reader', {
        from,
        book_id,
        chapter_id,
        product_id,
        range,
        chapter_root,
        clean,
        ...this.query,
      })
    },
    isBuyOrFree(item) {
      return item.isBuy || item.price * 1 == 0
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
.div(v-show="!fullScreen || !isPlayerShow")
  .msg-price.all(v-if="!currObj.isAllBuyOrFree")
    .oper-my
      .totals
        span.choosen 已选择 {{checkedItems.length}} 章
        span.curr-price 总计:
        span.price-color {{totalPrice}}
      .buy
        .send-btn.pay-btn( @click="$emit('payChapters')" ) 分章购买
        //- .price-common
          .curr-price(v-text="totalPrice")
          .err ￥58
        .check(@click=" $emit('buyAll'  ) " :class="{true:checkedItems.length}"  )
  .ls( v-if="list.length "  )
    .item(v-for="(i,index) in list" :key="i.id" )
      .line-single
      .content
        .name.ell( @click="goReader(i)" )
          span.chapter 第{{index+1}}章
          span {{i.chapter_name}}
        .price-common.item(v-if="!isBuyOrFree(i)")
          .curr-price(v-if="i.price*1") ￥{{i.price}}
          //- .err ￥58
          .check( 
            @click="$emit('buyItem',i)"
            :class="{true: checkedItemsObj[i.id] != null}" )
        .owning-ui(v-else) 已拥有    
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
.ls
  .item
    height 0.85rem
    line-height 0.85rem
    text-align left
    .content
      display flex
      height 100%
      justify-content space-between
      .name
        flex auto
        color #333333
        font-size 0.28rem
        width 3.5rem
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
      .icon-free
        flex none
        width 0.8rem
        height 100%
        background url('./img/free.png') no-repeat right center
        background-size 0.52rem 0.32rem
</style>
