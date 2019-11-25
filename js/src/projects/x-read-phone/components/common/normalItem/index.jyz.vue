<script>
export default {
  props: ['item'],
}
</script>

<template lang="pug">
.div
  .item
    .book
      img( v-lazy="item.img_src")
    .msg
      .name.ell {{item.name || item.books_name}}
      .author.ell
        //- span 作者: {{item.author}}
        //- span [美]
      .preview {{item.abs}}
  .line-single

</template>
<style lang="stylus" scoped>
.div
  width 100%
  padding 15px
  padding-bottom 0
.item
  display flex
  width 6.9rem
  .book
    flex none
    width 1.44rem
    height 2.08rem
    >img
      width 1.44rem
      height 2.08rem
  .msg
    flex 1 0 auto
    padding 0.22rem 0.3rem
    padding-right 0px
    width 3rem
    .name
      color #333333
      font-size 0.3rem
      height 0.32rem
      line-height 0.32rem
    .author
      color #888888
      font-size 0.24rem
      height 0.4rem
      line-height 0.4rem
      margin 0.2rem 0
    .preview
      max-width 100%
      color #666666
      font-size 0.26rem
      height 0.7rem
      line-height 0.36rem
      word-wrap break-word
      overflow hidden
</style>
