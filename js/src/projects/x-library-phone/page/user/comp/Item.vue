<script>
export default {
  props: ['name', 'label', 'path'],
  methods: {
    goIn () {
      if (!this.$user) {
        this.$openLogin()
        return
      }
      this.$go(this.path)
    }
  }
}
</script>
<template lang="pug">
.comp-item(@click="goIn")
  p.icon
    span(:class="['icon-'+name]")
  .comp-item__name.f14
    p {{label}}
    .icon.icon-left-arrow-dark.rt180
</template>
<style lang="stylus">
.comp-item
  display flex
  height 1.2rem
  align-items center
  justify-content space-between
  padding 0 22px
  >.icon
    margin 0
    margin-right 16px
    >span
      display inline-block
  >.comp-item__name
    display flex
    flex 1
    height 100%
    justify-content space-between
    align-items center
    border-bottom 1px solid #9B9B9B
</style>