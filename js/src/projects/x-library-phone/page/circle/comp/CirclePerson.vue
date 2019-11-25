<script>
export default {
  props: {
    item: {}
  }
}
</script>
<template lang="pug">
.comp-circle-person.flex
  img(:src="item.picture_absolute||item.picture")
  .person-info
    .person-info__nickname {{ item.nick_name }}
    .person-info__summary.ellipsis-2.f12 简介：{{ item.summary }}
</template>
<style lang="stylus">
.comp-circle-person
  padding 15px
  align-items center
  border-bottom 1px solid #EEE
  >img
    width 40px
    height 40px
  >.person-info
    flex 1
    margin 0 30px
    >.person-info__nickname
      color #333
      margin-bottom 10px
    >.person-info__summary
      color #666
</style>