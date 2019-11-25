<script>
export default {
  data(){
    return {
      disabled:true,
    }
  },
  created(){
  }
}
</script>

<template lang="pug">
.box
  el-tabs.dy_tabs()
    el-tab-pane(label="x-teach")
      .item
        span.name 每日签到
        span.other +
        el-input.width(size="small")
        span 积分
        el-switch.disabled(size="mini"  v-model="disabled" round type="primary" active-color="#44c3aa" active-text="启动" inactive-text="禁用")
      .item
        span.name 课程首次提问
        span.other +
        el-input.width(size="small")
        span 积分
        el-switch.disabled(size="mini" v-model="disabled" round type="primary" active-color="#44c3aa" active-text="启动" inactive-text="禁用")
      .item
        span.name 课程首次测试
        span.other +
        el-input.width(size="small")
        span 积分
        el-switch.disabled(size="mini" v-model="disabled" round type="primary" active-color="#44c3aa" active-text="启动" inactive-text="禁用")
      .item
        span.name 首次分享课程
        span.other +
        el-input.width(size="small")
        span 积分
        el-switch.disabled(size="mini" v-model="disabled" round type="primary" active-color="#44c3aa" active-text="启动" inactive-text="禁用")
      .item
        span.name 课程首次发布看法
        span.other +
        el-input.width(size="small")
        span 积分
        el-switch.disabled(size="mini" v-model="disabled" round type="primary" active-color="#44c3aa" active-text="启动" inactive-text="禁用")
      .item
        span.name 完成一课时
        span.other +
        el-input.width(size="small")
        span 积分
        el-switch.disabled(size="mini" v-model="disabled" round type="primary" active-color="#44c3aa" active-text="启动" inactive-text="禁用")
      .item
        span.name 购买课程
        span.other 10元 = 
        el-input.width(size="small")
        span 积分
        el-switch.disabled(size="mini" v-model="disabled" round type="primary" active-color="#44c3aa" active-text="启动" inactive-text="禁用")

    el-tab-pane(label="x-read")
      .item
        span.name 产品购买
        span.other 10元 = 
        el-input.width(size="small")
        span 积分
</template>


<style lang="stylus" scoped>
.box
  padding 20px
.dy_tabs
  padding 15px
  background #fff
  border-radius 5px
  height 100%
  .item
    display flex
    line-height 35px
    margin-bottom 20px
    .name 
      width 140px
    .width
      width 100px
      margin 0 20px
    .other 
      display inline-block
      width 60px
      text-align right
    .disabled
      margin 12px 30px 0 30px
</style>
