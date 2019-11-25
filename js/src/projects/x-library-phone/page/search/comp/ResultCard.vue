<script>
export default {
  props: {
    name: {},
  },
}
</script>


<template lang="pug">
  .comp-search-result-card.line-single 
    .wrapper
      .name.f16 钟超等盗窃，隐瞒犯罪所得案 {{name}}
      .des.f14.c_6 ——如何适用掩饰、隐瞒犯罪所得罪的入罪数额标准
      .meta.f13.c_9
        .p  案例出处：刑事审判参考（总第104集）
        .p  time：2018-10-01
      .fire.pa.vm-all
        .icon.icon-fire
        span.c_error.f12 1520
</template>
<style lang="stylus">
.comp-search-result-card
  .wrapper
    line-height 28px
    padding 15px
    >.meta
      line-height 18px
    >.fire
      right 15px
      line-height 20px
      transform translateY(-20px)
      >.icon
        margin-right 8px
</style>
