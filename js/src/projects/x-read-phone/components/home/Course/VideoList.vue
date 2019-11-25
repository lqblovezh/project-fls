<script>
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as bookshelfServices from 'services/x-read/bookShelf'
import * as saleServices from 'services/x-read/mySale'

export default {
  props: ['data'],
  methods: {
    openVideo(item, index) {
      if (!this.$canRead(this.data)) return
      this.$openVideo({ list: this.data.children, index })
    },
    goBuy() {

      this.$emit('goBuy', this.data)
      
    },
  },
}
</script>

<template lang="pug">
  div
    .msg 
      .name 
        span.cn {{data.name}}
        span.right 
          span.buy.send-btn(@click="goBuy") 购买 
          span.price-color ￥{{data.price}}
      .line-single          
      .author 
        .left 
          span.des 主讲人: 
          span.val {{data.speaker}}
        //- span.right 试看 

    .ls-video(v-if="data")
      .item(v-for="(i,index) in data.children"  :key="i.id")
        .line-single
        .content
          .left( @click="openVideo( i, index)")
            img.book(:src="i.img_src")
            img.play(src="../../../assets/img/play.png")
          .right
            .name.ell
              span  {{i.name}}
              span
            .preview {{i.abs}}
            //- .fun
            //-   .time
            //-   .price-common.item(@click="$emit('buyItem',i)" )
            //-     .curr-price(v-if="i.price") ￥{{i.price}}
            //-     //- .err ￥58
            //-     .check(:class="{true: checkedItemsObj[i.id] != null}" )
</template>

<style lang="stylus" scoped>
.msg
  padding 0 15px
  .name, .author
    display flex
    justify-content space-between
    height 42px
    line-height 42px
    color #333
    font-size 15px
  .name
    .right
      .buy
        display inline-block
        margin-right 10px
      .p
        font-size 14px
  .author
    .left
      font-size 13px
      .des
        color #666666
      .val
        color #333
.ls-video
  padding 0 15px
</style>
