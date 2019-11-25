
<script>
export default {
  props: {
    name: {},
    img: {},
    abs: {},
    time: {},
    author: {},
  },
}
</script>
<template lang="pug">
  .comp-home-card
    .wrapper.vt-all.flex.c_f_bg
      img(
        :src="img"
      )
      .ib 
        .name.vt.f500.f16(style="font-weight:600") {{name}}
        .time.f12.c_9 
          span 更新: 
          span {{ time}}
        .time.f12.c_9
          span 作者:  
          span {{ author}}
        .des.f12.c_6.ellipsis-2 {{abs}}
</template>
<style lang="stylus">
.icon-add-circle
  margin-top 2%
  background-size 95px 35px
  width 85px
  height 30px
.comp-home-card
  padding  15px 0
  >.wrapper
    padding 15px 0
    border-radius 4px
    box-shadow 0 2px 8px 2px rgba(132, 136, 153, 0.2)
    >img
      width 110px
      border-radius 4px
      height 90px
    >.ib
      padding 5px
      line-height 25px
      max-width 4.7rem
      >.des
        line-height 20px
        margin-left -100px
        margin-top 8%
</style>
