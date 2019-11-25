<script>
// 电子书
export default {
  props: ['data'],
  methods: {
    itemClick(item, type) {
      this.$emit('itemClickHandler', item)
    },
  },
}
</script>


<template lang="pug">
  .temp-item3
    ImgList(@itemClick="itemClick" :list="data")
</template>

<style lang="stylus" scoped>
.temp-item3
  .ls
    display flex
    flex 1 1 auto
    .item
      img
        width 100%
</style>
