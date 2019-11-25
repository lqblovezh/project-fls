<script>
export default {
  props: {
    h: {
      type: String,
      default: '40px'
    },
    inline: {
      type: Boolean,
      default: false
    },
    value: {}
  }
}
</script>
<template lang="pug">
.ui-tab-container.flex-between.center.f14(:style="{height: h}")
  slot
</template>
<style lang="stylus">
.ui-tab-container
  margin-bottom 4px
</style>