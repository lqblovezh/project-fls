<script>
export default {
  props: ['data'],
  data: function() {
    return {}
  },
}
</script>
<template lang="pug">
  .temp-item3 
    .ls 
      .item(v-for="item in data" @click="$emit('itemClickHandler', item)")  
        .title {{item.books_name}}
        .img 
          img(:src="item.img_src")
        .author  作者: {{ item.author}}
        .abs  {{item.abs}} 



</template>
<style lang="stylus" scoped>
.temp-item3
  padding 0 15px
  padding-bottom 20px
  .ls
    .item
      border-bottom 1px solid #e7e7e7
      &:last-child
        border none
      .title
        color #333
        font-size 16px
        height 45px
        line-height 45px
      .img > img
        width 100%
        max-height 200px
      .author
        height 35px
        line-height 35px
        color #084766
        font-size 13px
      .abs
        color #888
        font-size 12px
        line-height 15px
        letter-spacing 2px
        padding-bottom 10px
</style>
