<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    num: {
      type: Number,
      required: true
    },
    intro: {
      type: String,
      required: true
    }
  }
}
</script>
<template lang="pug">
.sub-item
  .sub-item__title {{title}}
  .sub-item__num
    span {{num}}
    |件
  .flex-between-center
    p {{intro}}
    p(:class="['icon-'+icon]")
</template>
<style lang="stylus">
.sub-item
  margin-bottom 15px
  width calc(calc(100% / 2) - 7.5px)
  padding 15px
  box-sizing border-box
  font-size 14px
  line-height 1
  background-color rgba(255,255,255,.4)
  border-radius 5px
  >.sub-item__num
    margin 10px 0
    font-size 10px
    span
      color #F15A4A
      font-size 14px
  >.flex-between-center
    font-size 12px
    >p
      &:first-child
        flex 1
      &:last-child
        margin-left 10px
</style>