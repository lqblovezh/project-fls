<script>
export default {
  props:["list", 'mediaType']
}
</script>
<template lang="pug">
.div 
  .list
    .item(v-for='item in list' @click="$emit('itemClick', item , mediaType)")
      img(v-lazy="item.img_src") 
      .name.ell {{item.books_name || item.name}}
      .author.ell  
        span 
        span {{item.author}}
</template>

<style lang="stylus" scoped>
.list
  display flex 
  margin 0 0.3rem
  margin-top 0.3rem
  justify-content left
  overflow scroll
  .item 
    flex  none 
    margin-right .5rem
    max-width 1.98rem
    &:last-child
      margin-right 0
    .name 
      font-size 0.28rem
      color #555555
      height 0.55rem
      line-height 0.6rem
    .author
      color #888888
      height 0.45rem
      line-height 0.3rem
      font-size 0.24rem
    >img 
      width 1.93rem
      height 2.69rem
</style>
