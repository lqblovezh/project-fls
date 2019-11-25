<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  computed: {
    isInline () {
      return this.$parent.inline
    },
    h () {
      return this.$parent.h
    }
  },
  methods: {}
}
</script>
<template lang="pug">
.ui-tab-item.tc(@click="$parent.$emit('input', name)" :class="{active: name === $parent.value}")
  p(:class="{ib: isInline}" :style="{height: h, 'line-height': h}") {{text}}
</template>
<style lang="stylus">
.ui-tab-item
  flex 1
  p
    margin 0
    padding 0
    position relative
    &:after
      content ''
      position absolute
      left 0
      bottom -4px
      width 100%
      height 4px
      background linear-gradient(to right, #F6D27E, #B1936A)
      transform scale(0)
      transition all .3s ease-in
  &.active
    p
      &:after
        transform scale(1)
</style>