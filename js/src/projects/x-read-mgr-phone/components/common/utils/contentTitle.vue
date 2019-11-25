<script>
export default {
  props: ['name', 'url', 'query', 'num'],
  methods: {
    go() {
      if (!this.url) return 
      this.$router.push({ path: this.url, query: this.query })
    }
  }
  // .content-title 最为组件,顶层不是能通用的.div, 会被他的父组件样式索影响
}
</script>

<template lang="pug">
.content-title
  .nav
    .kuai
    .name(@click="go") 
      slot(name="title")
      span(v-if="name") {{name}} 
      span.count(v-if="num") ({{num}})
    .more(v-if="url" @click="go")
      .name 更多
    .right-icon
      slot

  .line-single  
</template>

<style lang="stylus" scoped>
.line-single
  margin 0 0.3rem
.count
  color #666
  font-size 0.26rem
.nav
  display flex
  height 0.9rem
  align-items center
  padding-right 0.3rem
  // background url('./img/zs.png') no-repeat left
  // background-size 0.06rem 0.32rem
  vertical-align middle
  .kuai
    width 0.06rem
    height 0.32rem
    background #14afff
    margin-right 0.24rem
    flex none
    opacity 0.6
  .name
    font-size #333333
    flex 1 1 auto
    font-size 0.32rem
    height 0.6rem
    line-height 0.65rem
  .more
    width 0.9rem
    .name
      font-size 0.28rem
      background url('./img/more.png') no-repeat right center
      background-size 0.12rem 0.24rem
      color #666666
</style>
