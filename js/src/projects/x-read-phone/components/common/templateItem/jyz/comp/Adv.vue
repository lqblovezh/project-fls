<script>
export default {
  props: {
    src: {},
  },
}
</script>

<template lang="pug">
.page-adv
  .img
    img(
      :src="src"
    )
  .line-part 
</template>


<style lang="stylus">
.page-adv
  >.img
    position relative
    padding 10px
    >img
      width 100%
    &::before
      content '广告'
      position absolute
      top 19px
      width 45px
      height 18px
      line-height 18px
      background-color rgba(154, 154, 154, 0.5)
      color #fff
      text-align center
</style>
