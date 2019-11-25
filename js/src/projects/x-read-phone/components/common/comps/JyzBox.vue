<script>
export default {
  props: {
    name: {},
    icon: {},
  },
}
</script>


<template lang="pug">
.comp-jyz-box 
  .wrap 
    .head.c_og 
      .ib.vm-all.c_3.f16.f600
        .icons(:class="icon")
        .ib {{name}}
      .fr.vm-all.f14
        .ib more
        .icons.icon-more-og.tr     
    slot            
</template>


<style lang="stylus">
.comp-jyz-box
  >.wrap
    >.head
      height 50px
      line-height 50px
      border-bottom 1px solid #e7e7e7
      >div
        >.ib
          margin 0 10px
</style>
