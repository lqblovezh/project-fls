<script></script>
<template lang="pug">
.page-wrap
  Head(type="dark" name="帮助中心")
  router-view
</template>
<style lang="stylus">
.page-wrap
  .help-btn
    position fixed
    padding 0 15px
    width 100%
    bottom 35px
    box-sizing border-box
    button
      width 100%
      height 40px
      line-height 40px
      border none
      outline none
      border-radius 999px
</style>