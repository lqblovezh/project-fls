<script></script>
<template lang="pug">
.page-help
  .help-body
    p.title.f15 帮助中心文本
    p.item.f14(v-for="item,index in 3") {{index+1}}.帮助内容帮助内容帮助内容帮助内容帮助内容帮助内容帮助内容帮助内容
  .help-btn
    button.linear-btn.c_f.f16(@click="$go('/help/detail')") 系统反馈
</template>
<style lang="stylus">
.page-help
  >.help-body
    padding 35px 33px 0
    >.title
      color #373944
    >.item
      color #676A7B
</style>