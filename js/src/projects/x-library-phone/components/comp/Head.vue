<script>
export default {
  props: {
    name: {
      default: '刑审智库',
    },
    type: {
      default: 'white',
    },
    isModel: {
      default: false,
    },
    isBack: {
      default: true,
    },
  },
  computed: {
    icon() {},
  },
  created () {
    console.log(global.history);
  },
  methods: {
    back() {
      this.$emit('back')
      if (!this.isModel) {
        this.$goBack()
      }
    },
  },
}
</script>


<template lang="pug">
.comp-head
  .wrapper(:class="type") 
    .left.tc.vt.ib(@click="back" :class='{"visibility":!isBack}')
      .icon(:class="'icon-left-arrow-'+type")
    .name.f17.tc.ib.vt {{name}}
  slot
</template>


<style lang="stylus">
.comp-head
  background-color #242631
  height 44px
  >.wrapper
    box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
    position fixed
    left 0
    right 0
    top 0
    height 44px
    line-height 44px
    z-index 14
    &.white
      background-color #fff
      color #000
    &.dark
      background-color #353439
      color #fff
    >div
      height 100%
    >.left
      width 1rem
      &.visibility
        visibility hidden
    >.name
      width 5.5rem
      max-height 1rem
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    >.right
      width 1rem
</style>
