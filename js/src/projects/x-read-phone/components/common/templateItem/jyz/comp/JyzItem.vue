<script>
export default {
  props: {
    name: {
      default:
        '蒙代尔：中美及欧元区中美及欧元区应合中美及欧元区应合中美及欧元区应合应合',
    },
    time: {},
    type: {
      default: 'active',
    },
    imgSrc: {},
    picNmae: {},
    des: {},
  },
}
</script>


<template lang="pug">
div 
  .comp-jyz-item-article(v-if="type === 'active'")
    .ib.fl
      .text.c_og.f12.tc 文章
    .title.ib.f14.c_3
      .name.ell {{name}}
      .time(v-if="time") {{time}}
    .des.c_f5_bg.c_3(v-if="des") {{des}}
  .comp-jyz-item-pic.ib(v-if="type === 'pic'")
    img(:src="imgSrc")
    .name.c_3.f13.ellipsis-3 {{picNmae}}
</template>
<style lang="stylus">
.comp-jyz-item-article
  margin-bottom 16px    
  >.ib
    &:first-child
      margin-right 10px
      margin-top 10px
      >.text
        background-color #fffbf1
        border-radius 6px 0px 6px 0px
        border solid 2px #f0e8d7
        width 36px
        height 20px
        line-height 19px
  .title
    width 5.9rem
    line-height 38px
    >.time 
      line-height 20px
  >.des
    line-height 23px
    width 6.8rem
    padding 10px
    margin 0 auto
    border-radius 14px
.comp-jyz-item-pic
  >img
    width 100%
  >.name
    line-height 20px
</style>
