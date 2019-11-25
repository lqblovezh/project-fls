<script>
export default {
  props: {
    name: {},
    path: {},
    query: {},
    rname: {
      default: '更多',
    },
    isArrow: {
      default: true,
    },
    icon: {
      default: 'more',
    },
    leftIcon: {
      default: null,
    },
  },
  methods: {
    go() {
      console.log(this.rname);
      if(this.rname=='目录'){
        // 这里只要不是目录都跳转路由 
        this.$emit('toggleLeftPanel')
        return
      }
      this.$emit('more')
      if (!this.path) return
      this.$go(this.path, this.query)
    },
   
  },
}
</script>


<template lang="pug">
  .comp-home-topic-title(@click="$emit('click-event')")
    .flex.vm-list
      div
        .name.f16.f600
          .ib.icon(:class="['icon-' + leftIcon,!leftIcon?'vt-line':'']")
          span {{name}}
        slot
      .more.flex-ac(@click.stop="go")
        span.f14.c_6.ellipsis(v-if="rname && name!='法规类别'") {{rname}}
        .icon( :class="'icon-' + icon" v-if="icon")
    
</template>


<style lang="stylus">
.comp-home-topic-title
  line-height 30px
  .flex
    justify-content space-between
    .name
      >.vt-line
        width 4px
        height 30px
        background #c99c5e
        border-radius 2px
      >.icon
        height 30px
        margin-right 12px
    >.more
      max-width 100%
      // overflow hidden
      // white-space nowrap
      // text-overflow ellipsis
      >span
        margin-right 10px
        display inline-block
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
      .icon
        background-position right
</style>
