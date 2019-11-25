<script>
export default {
  props: {
    progress: {
      default: '30%'
    }
  }
}
</script>
<template lang="pug">
.comp-book
  .book-wrap.flex
    .book-left
      img(src="./img/test.jpg")
    .book-right.ml15
      .book-tags.f12.lh17 3个书签
      h4 《忏悔录》
      .book-context.f12.c_gray1.lh17 2015年第3集·总第104集
      .book-intro.lh17.f12.c_gray1 开始于2018年2月12日，最新更新于今日00:01
      .book-progress.f14.flex 当前进度：
        .ui-progress.flex
          .ui-progress__outer
            .ui-progress__inner(:style="{width: progress}")
            .ui-progress__outer-num.f12.c_f(:style="{left: progress}") {{progress}}
          .ui-progress__num.f12 100%
  .line
</template>
<style lang="stylus">
.comp-book
  padding 15px 15px 0
  .lh17
    line-height 17px
  >.line
    margin-left -15px
    margin-right -15px
  >.book-wrap
    margin-bottom 15px
    >.book-left
      img
        width 102px
        height 100%
        border-radius 5px
    >.book-right
      flex 1
      position relative
      >.book-tags
        position absolute
        right 0
        top 0
        padding 2px 7px
        color #F15A4A
        border 1px solid #F15A4A
        border-radius 999px
      >h4
        margin 0
        margin-bottom 8px
        line-height 24px
      >.book-context
        margin-bottom 8px
      >.book-intro
        margin-bottom 19px
      >.book-progress
        color #676A7B
        >.ui-progress
          flex 1
          align-items center
          .ui-progress__outer
            position relative
            flex 1
            margin-right 13px
            height 4px
            border 1px solid #A6AAC1
            border-radius 999px
            background-color #F0F2FE
            >.ui-progress__inner
              position relative
              width 10%
              height 100%
              background-color #A6AAC1
              transition all 0.3s ease-in
              &:after
                content ''
                display inline-block
                position absolute
                right 0
                bottom 0
                width 1px
                height 10px
                background-color #A6AAC1
            >.ui-progress__outer-num
              position absolute
              left 10%
              bottom 10px
              padding 2px 5px
              background-color #A6AAC1
              transform translateX(-50%)
              border-radius 3px
</style>