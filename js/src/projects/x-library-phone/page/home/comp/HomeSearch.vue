<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    search() {
      if (this.name) {
        this.$go('/search', { name: this.name })
      } else {
        this.$Toast({
          message: '请输入内容!',
        })
      }
    },
    goSearch() {
      this.$go('/search')
    },
  },

  /* v-model="name"
    @keyup.enter="search" */
}
</script>


<template lang="pug">
  .comp-home-search.c_f_bg
    .wrapper.vm-all.flex
      .scan.tc
        .icon.icon-scan
      .inp(@click="goSearch")
        .icon.icon-home-search
        input(
          placeholder="搜索标题、书名、文件名、案号"
        )
      //- .column.tc
      //-   .ib(@click="$go('/column')") 
      //-     .icon.icon-column
      //-     br
      //-     span.f12 栏目
</template>
<style lang="stylus">
.comp-home-search
  >.wrapper
    background #fff
    height 52px
    width 100%
    z-index 1111
    line-height 52px
    top 0
    position fixed
    >.scan
      width 1rem
    >.column
      width 0.8rem
      line-height 20px
      transform translateY(9px)
    >.inp
      width 6rem
      position relative
      .icon
        position absolute
        top 0
        bottom 0
        left 0
        width 30px
        height 30px
        margin auto
      input
        border 1px solid #fff
        background #F4F4F4
        border-radius 8px
        width 95%
        text-indent 25px
</style>
