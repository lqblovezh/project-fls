<script>
// 电子书
export default {
  props: ['data'],
  methods: {
    itemClick(item, type) {
      this.$emit('itemClickHandler', item)
    },
  },
}
</script>


<template lang="pug">
div
  .temp-item5 
    //- ImgList(@itemClick="itemClick" :list="data")
    .item(v-for="item in data" @click="$emit('itemClickHandler', item)")  
      .img 
        img(:src="item.img_src") 
      .title.ell {{item.books_name}} 
      .author.ell  作者: {{ item.author}}
  //- .line   
    .bg 
    .bom 
</template>

<style lang="stylus" scoped>
.line  
  position absolute
  z-index -1
  height 20px
  width 100%
  box-shadow 0px 10px 20px #f1f1f1
  margin-top 2.55rem
  .bg 
    width 100%
    height 11px
    background #eaeaea
.temp-item5
  margin-top 10px
  display flex
  overflow auto
  .item
    width 33.33%
    background transparent
    padding-left 15px
    img
      height 2.65rem
      width 1.92rem
    .title
      text-align left 
      margin-top 20px
      color #555
      font-size 14px
      line-height 26px
    .author
      text-align left 
      font-size 12px
      color #888
      line-height 18px
      margin-bottom 10px
</style>
