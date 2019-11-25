<script>
export default {
  props: {
    checked: {
      default: false,
    },
  },
}
</script>

<template lang="pug">
  .comp-checked-wrapper.vm
    .ib(v-if="checked") 
      .icon-check
    .ib(v-if="!checked")
      .no-check
</template>

<style lang="stylus">
.comp-checked-wrapper
  display inline-block
  >.ib
    width 14px
    height 14px
    >.no-check
      display inline-block
      width 11px
      height 11px
      border-radius 50%
      border 1px solid #E8E8E8
</style>
