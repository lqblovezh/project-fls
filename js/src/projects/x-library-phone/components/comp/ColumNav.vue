<script>
export default {
  props: {
    list: {},
    top: {
      default: '44px',
    },
    keyId: {
      default: 'id',
    },
  },
}
</script>


<template lang="pug">
.comp-column-nav-cate
  .col(:style="{top}")
    .ls-top.flex.f15.tc
      .item.active_border(
        v-for="item,index in list" 
        :key="item[keyId]"
        :class="{active:item.checked}"
        @click="$emit('itemClickHandler',item,index)"
      )
        .name( v-width="`${item.name}`")
        //- .name( v-width="`${item.name}(${item.number})`")
</template>
<style lang="stylus">
.comp-column-nav-cate
  >.col
    position fixed
    background #fff
    z-index 10
    >.ls-top
      width 7.5rem
      overflow scroll
      line-height 40px
      border-bottom 1px solid #ccc
      box-sizing border-box
      background #fff
      >.item
        flex none
        text-align center
        >.name
          margin 0px
</style>
