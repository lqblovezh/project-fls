<script>
export default {
  props: {
    name: {
      default: '案例指导',
    },
    num: {},
    des: {
      default: '案例权威',
    },
    img: {},
    icon: {
      default: 'case',
    },
    type: {
      default: 'normal', // dark
    },
  },
}
</script>

<template lang="pug">
  .comp-home-menu-item.ib(:class="type")
    .wrapper 
      .title.f14.f800 {{name}}
      .flex.f12(:class="type")
        .des 
          .num
            span 
              span.c_error {{num}} 
              span.unit 件
          .txt(v-if="des").ellipsis-2 {{des}} 
        img(:src="img")
</template>
<style lang="stylus">
.comp-home-menu-item
  overflow hidden
  width 3.2rem
  height 115px
  background #fff
  border-radius 4px
  padding 10px 10px 10px 15px
  box-sizing border-box
  box-shadow 0 3px 12px 2px rgba(132, 136, 153, 0.22)
  &.dark
    background rgba(255, 255, 255, 0.22)
    color #fff
  >.wrapper
    height 100%
    >.title
      line-height 20px
    >.flex
      position relative
      margin-top 5px
      justify-content space-between
      &.normal
        color #999
      >img
        position absolute
        top -20px
        right 0
        margin-left 0.5ex
        max-width 30px
        max-height 39px
        object-fit contain
      >.des
        width 120px
        line-height 14px
        >.num
          height 25px
        >.txt
          max-height 45px
</style>
