<script>
// import popoverMessage from '../../components/popoverMessage'
  export default {
    // components: {popoverMessage},
    data(){
      return {}
    }

  }
</script>

<template lang="pug">
.content-wrap
  router-view
//- <div class="mainRight">
//-   <popoverMessage text="确定删除吗"></popoverMessage>
//- </div>
</template>

<style lang="stylus" scoped>
  .title-wrap
    background #ECECEC
    height 46px
    .title
      padding-left 20px
      border-bottom 1px solid #ccc
    .titleText
      font-size 14px
      color #333
      line-height 46px
      position relative
      .title_line:before
        content ""
        position absolute
        width 3px
        height 20px
        left 0
        top 15px
        background #44c3aa
        z-index 10
</style>
