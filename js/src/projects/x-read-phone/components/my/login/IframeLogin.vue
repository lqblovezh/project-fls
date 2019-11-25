<script>
export default {
  props: ['src'],
}
</script>


<template lang="pug">
  div 
    .iframe-warp 
      iframe( :src="src")
</template>


<style lang="stylus" scoped>
.iframe-warp
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  z-index 10000
  iframe
    width 100%
    height 100%
    ::-webkit-scrollbar
      width 10px
      height 0
</style>
