<script>
export default {
  props: ['currVal', 'screenList'],
  data() {
    return {}
  },
  methods: {
    select(item) {
      this.$emit('itemClickHandler', item)
    },
  },
}
</script>

<template lang="pug"> 
  .screen-panel-wrap 
    NormalMask 
      .content 
        .icon-close(@click="$emit('close')")
        .title 查看指定内容
        .ls 
          .item(v-for="item in screenList" :class="{curr:item[1] === currVal}" @click="select(item)") {{item[1]}}
        .line-single  
        .bottom(@click="$emit('timePick')")  
          .left 
            .icon-time-select 
            span.time 按日期查看
          .right 
            .icon-right-arrow  
</template>


<style lang="stylus">
.screen-panel-wrap
  .content
    position relative
    background #ffffff
    width 5.2rem
    border-radius 7px
    margin 0px auto
    margin-top 25vh
    font-size 16px
    color #666
    .icon-close
      position absolute
      right 0px
      width 30px
      height 30px
    .title
      color #555
      font-size 17px
      font-weight 600
      text-align center
      line-height 50px
      padding-top 10px
    .ls
      .item
        display inline-block
        width 50%
        text-align center
        height 40px
        line-height 40px
        &.curr
          color #14afff
    .bottom
      padding 0 15px
      display flex
      height 45px
      line-height 45px
      font-size 14px
      justify-content space-between
      .icon-time-select
        vertical-align middle
        margin-right 10px
</style>
