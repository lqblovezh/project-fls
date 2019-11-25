<script>
export default {
  props: {
    value: {}
  },
  methods: {
    selectType (type) {

    }
  }
}
</script>
<template lang="pug">
.comp-sort-nav.flex.f14
  .sort-left.tc(@click="sortType('default')") 默认
  .sort-center.flex(@click="sortType('hot')") 热度
    .ib.icon-sort
  .sort-right.flex(@click="sortType('joinTime')") 加入时间
    .ib.icon-sort
</template>
<style lang="stylus">
.comp-sort-nav
  height 44px
  align-items center
  color #676a7b
  >div
    flex 1
    justify-content center
    align-items center
    >.ib
      margin-left 10px
</style>