<script>
export default {
  props: ['value'],
  mounted () {

  },
  methods: {

  }
}
</script>
<template lang="pug">
.com-top-nav.flex-between.tc.ui-user-nav
  .nav-item(:class="{'nav-topitem__active': value==='unafford'}" @click="$emit('input', 'unafford')")
    p 未购买
  .nav-item(:class="{'nav-topitem__active': value==='afford'}" @click="$emit('input', 'afford')")
    p 已购买
</template>
<style lang="stylus">
.com-top-nav
  height 45px
  line-height 45px
  >.nav-item
    position relative
    flex 1
    &.nav-topitem__active
      &:after
        content ''
        display block
        position absolute
        left 0
        bottom 0
        width 100%
        height 4px
        background linear-gradient(to right, #F6D27E, #B1936A)
</style>
