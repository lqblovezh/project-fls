<script>
export default {
  props: ['item'],
}
</script>

<template lang="pug">
.ls-themex
  .item
    .content
      .des.fix.ell
        .theme-name  {{item.books_name || item.name}}
        .time 日期: {{item.update_time}}
      .img
        img(:src="item.img_src")
        //- .tag   {{item.tag  }}
      .abs {{item.abs}}

    .line-part
    .anime

</template>
<style lang="stylus" scoped>
@keyframes theme
  0%
    height 150px
  100%
    height 0px
@keyframes img
  0%
    opacity  0
  100%
    opacity 1
.anime
  animation theme 1s ease-in-out
.ls-themex
  .content
    padding 0.3rem
    .name
      margin-top 0.24rem
      color #666
    .des
      height 0.4rem
      line-height 0.4rem
      .theme-name
        font-size 14px
        font-weight 700
        float left
        height 100%
      .time
        color #999
        float right
        height 100%
        font-size 12px
    .abs
      font-size 14px
      color #666
      line-height 22px
      padding 10px 0
    .img
      animation img 1s ease-in-out
      height 3rem
      position relative
      text-align center
      .tag
        position absolute
        left 0
        right 0
        bottom 0
        height 0.7rem
        background rgba(0, 0, 0, 0.5)
        margin auto
        color #fff
        font-size 15px
        line-height 0.7rem
        text-align center
      >img
        width 100%
        height 100%
</style>
