<script>
export default {
  props: ['info', 'query'],
  methods: {
    itemClickHandler(item, index) {
      this.$set(this.query,'itemIndex', index )
    },
  },
}
</script>


<template lang="pug">
.course-video 
  ContentTitle(name="内容简介")
  .ls 
    .item(v-for="(item, index) in info.components.videos" 
      @click="itemClickHandler(item , index)" :key="item.id") 
      .content
        .icon 
        .text.ell {{item.name}}
        .price 
          span.num(v-if="!item.isBuy") ￥{{item.price}}
          span.buy(v-if="item.isBuy") 已购买
      .line-single(v-if="index != (info.components.videos.length - 1)") 
</template>

<style lang="stylus" scoped>
.course-video
  .ls
    padding 0 15px
    .item
      .content
        height 40px
        line-height 40px
        font-size 14px
        color #333
        display flex
        .icon
          width 30px
          background url('./img/icon_video.png') no-repeat 0px center
          background-size 19px 14px
        .price
          width 50px
          .num
            color #ed6460
          .buy
            color #999
        .text
          width 5.4rem
</style>
