<script>
export default {
  props: {
    list: {},
  },
}
</script>


<template lang="pug">
.comp-column-second-nav
  .child.flex.pa 
    .citem(v-for="citem in list ") 
      .txt.active_border( 
        :class="{active:citem == 1}"
        v-width="'子类子类'"
      ) 
</template>
<style lang="stylus">
.comp-column-second-nav
  line-height 40px
  width 100%
  >.child
    left 0
    right 0
    width 7.5rem
    background #fff
    overflow scroll
    box-sizing border-box
    border-bottom 1px solid #ccc
    background #fff
    line-height 44px
    >.citem
      margin 0 5px
      text-align center
</style>
