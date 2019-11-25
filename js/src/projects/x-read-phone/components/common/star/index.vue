<script>
export default {
  props: {
    num: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    fullNum() {
      return Math.floor(this.num)
    },
    half() {
      if (!this.num) return true

      return Number.isInteger(this.num) ? false : true
    },
  },
}
</script>

<template lang="pug">
.div
  .ls 
    .item.fullStar(v-for="i in fullNum")
    .item.halfStar( v-show="half")
</template>

<style lang="stylus" scoped>
.ls
  display flex
  height 0.5rem
  align-items center
  .item
    width 0.28rem
    height 0.28rem
    margin-right 2.5px
    &.fullStar
      background url('./img/fullStar.png')
      background-size 0.28rem 0.28rem
    &.halfStar
      background url('./img/halfStar.png')
      background-size 0.28rem 0.28rem
</style>
