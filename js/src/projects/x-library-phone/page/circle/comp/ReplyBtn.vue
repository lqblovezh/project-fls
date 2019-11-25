<script>
export default {}
</script>


<template lang="pug">
  .comp-circle-reply-btn 
    .wrapper.c_f.f16
      //- 主题1，评论3
      .left.vm-all(@click="$emit('goReply',1)")
        .icon.icon-write
        span 发表话题
      .right.vm-all(@click="$emit('goReply',3)")
        .icon.icon-write2
        span 发表书评

</template>
<style lang="stylus">
.comp-circle-reply-btn
  position fixed
  bottom 0
  left 0
  right 0
  height 50px
  >.wrapper
    display flex
    justify-content space-around
    align-items stretch
    height 100%
    line-height 50px
    >div
      width 50%
      text-align center
      >.icon
        margin-right 20px
    >.left
      background-image linear-gradient(90deg, #F6D27E 0%, #B1936A 100%)
      box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
    >.right
      background-image linear-gradient(90deg, #F99381 0%, #F15A4A 100%)
      box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
</style>
