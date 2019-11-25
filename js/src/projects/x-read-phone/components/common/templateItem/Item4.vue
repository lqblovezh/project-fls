<script>
export default {
  props: ['data'],
  data: function() {
    return {}
  },
  methods: {
    itemClick(item) {
      this.$emit('itemClickHandler', item)
    },
  },
  computed: {
    first() {
      return this.data[0]
    },
    lastItmes() {
      return this.data.slice(1)
    },
  },
}
</script>
<template lang="pug">
  .temp-item4
    .ls 
      .item( @click="itemClick(first)")  
        .first
          .img 
            img(:src="first.img_src")
          .right   
            .title {{first.books_name}}
            .author  作者: {{ first.author}}
            .abs  {{first.abs}} 
    ImgList(@itemClick="itemClick" :list="lastItmes")
    




</template>
<style lang="stylus" scoped>
.temp-item4
  .ls
    .item
      &:last-child
        border none
      .first
        margin 15px 0
        padding 0 15px
        .img
          display inline-block
          width 2rem
          > img
            width 100%
            max-height 200px
        .right
          display inline-block
          width 4.7rem
          padding-left 15px
          .title
            color #333
            font-size 16px
            height 45px
            line-height 45px
          .author
            height 30px
            line-height 15px
            color #888
            font-size 13px
          .abs
            color #888
            font-size 12px
            line-height 15px
            letter-spacing 2px
            padding-bottom 10px
            word-break break-all
            max-height 60px
            overflow hidden
</style>
