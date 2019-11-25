<script>
export default {
  props: {
    list: {},
    fixLen: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>
<template lang="pug">
.com-nav.flex.tc.ui-user-nav.nav-slide.pl15.f14.c_f_bg(:class="{len: fixLen}")
  .nav-item(v-for="item, index in list" :class="{'nav-item__active': item.checked}" @click="$emit('itemClickHandler', index)")
    p {{item.name}}
      span(v-if="item.num") ({{item.num}})
</template>
<style lang="stylus">
.com-nav
  height 45px
  line-height 45px
  .nav-item
    padding 0 15px
  &.len
    .nav-item__active
      p
        &:after
          width 30px
          left 50%
          transform translateX(-50%)
</style>
