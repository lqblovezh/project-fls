<script>
export default {
  props: {
    name: {},
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    more() {
      this.$emit('more')
      this.isOpen = !this.isOpen
    },
  },
}
</script>


<template lang="pug">
  .comp-search-title.after_bd
    .content.before_vt(@click="more")
      .name {{name}}
      .right 
        .icon.icon-left-arrow-white.rt180
</template>


<style lang="stylus">
.comp-search-title
  position relative
  >.content
    display flex
    padding-top 12px
    padding-bottom 12px
    justify-content space-between
    &.before_vt
      &::before
        left -12px
    >.right
      >.rt180, >.rt90
        transition all 0.3s ease-in-out
</style>
