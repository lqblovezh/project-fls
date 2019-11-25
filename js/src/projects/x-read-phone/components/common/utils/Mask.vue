<script>
export default {
  props: {
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
}
</script>

<template lang="pug"> 
  .mask-wrap(:style="{zIndex}") 
    slot 
</template>


<style lang="stylus" scoped>
.mask-wrap
  position fixed
  background-color rgba(0, 0, 0, 0.6)
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
</style>
