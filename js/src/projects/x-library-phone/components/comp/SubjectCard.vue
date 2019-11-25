<script>
export default {
  props: {
    icon: {},
    title: {},
    num: {},
    intro: {},
    img: {},
  },
  computed: {
    newIntro () {
      return this.intro && this.intro.length > 40 ? this.intro.slice(0, 40) : this.intro
    }
  }
}
</script>
<template lang="pug">
.sub-item.c_f
  .sub-item__title {{title}} 
  .num
    span
      span.c_price.f13 {{num}} 
      span.f12 件
  .des.flex
    .abs.ib.dd {{newIntro}} 
    img(v-src="img")
</template>
<style lang="stylus">
.sub-item
  margin-bottom 15px
  width calc(50% - 7.5px)
  height 145px
  padding 15px
  box-sizing border-box
  font-size 14px
  line-height 1
  background rgba(255, 255, 255, 0.22)
  box-shadow 0 3px 12px 2px rgba(132, 136, 153, 0.22)
  border-radius 5px
  >.sub-item__title
    text-align left
    font-size 14px
    font-weight 800
  >.num
    line-height 36px
    height 36px
  >.des
    font-size 12px
    line-height 14px
    position relative
    >.dd 
      max-height 71px
      overflow hidden
      text-overflow hidden
    >img
      width 40px
      height 40px
      position absolute
      object-fit contain
      right 0
      top -46px
</style>
