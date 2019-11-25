<script>
export default {
  props: ['item'],
}
</script>


<template lang="pug">
  .item-wrap
    .left 
      img(:src="item.user_picture_absolute")
    .right
      .user 
        .name {{item.nick_name}}
        .up(@click="$emit('up',item)") 
          .icon-up 
          .val {{item.book_thumbs}}
      .text {{item.text}}     
</template>


<style lang="stylus" scoped>
.item-wrap
  display flex
  justify-content space-between
  padding 15px
  .right
    flex auto
    .user
      height 40px
      line-height 40px
      font-size 13px
      display flex
      justify-content space-between
      color rgba(8, 71, 102, 0.8)
    .text
      font-size 16px
      word-break break-all
      word-wrap break-word
    .up
      display flex
      font-size 12px
      color #999
      .icon-up
        height 100%
        width 25px
  .left
    width 70px
    flex none
    >img
      width 45px
      height 45px
      border-radius 50%
</style>
