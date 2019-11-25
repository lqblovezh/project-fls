<script>
export default {
  props: {
    parent: null,
    name: {},
    fire: {},
    des: {},
    jch: {},
    keyword: {},
    price: 0,
    cpts: {},
    status: {},
    number: {}, // 第1090号..
    player: {},
    person: {},
    author: null,
    abs: null,
    videoTime:null,
    cbrq:null,
    bc:null,
    bookImg: '',
    chapters: null,
    content: null,
    from: null,
  },
  data() {
    return {
      chapterList: [],
    }
  },
  created() {},
  computed: {
    priceNum() {
      if (this.price == 0) {
        return '免费'
      } else {
        return `¥ ${this.price} 元`
      }
    },
  },
  methods: {},
  filters: {
    filterText(data, keyword) {
      let index = data.indexOf(keyword)
      if (index > -1) {
        let text = data.substring(index, index + 50)
        if (text.length >= 47) {
          return text + '...'
        }
        return data.substring(index, index + 50)
      }
      return data
    },
  },
}
</script>

<template lang="pug">
  .comp-search-result-card.line-single(:class="{invalid: status === 'N'}")
    .wrapper
      .img
        img(:src="bookImg")
      .name.f16
        HighLigth(:text="name" :keyword="keyword")
      .des(v-if="des")
        HighLigth(:text="des" :keyword="keyword")
      .jch(v-if="jch")
        span {{jch}}
      .jch(v-if="cbrq")
        span 出版日期：{{cbrq}} 版次：{{bc}}
      .from(v-if="player")
        span {{'演播者：'+player}}
      .from(v-if="person")
        span {{'内容原作者：'+person}}
      .from(v-if="videoTime")
        span {{'创建时间：'+ videoTime}}
      .author(v-if="author")
        span {{author}} {{cpts.责任方式}}
      .price
        span(v-text="priceNum")
      .fire.pa.vm-all(v-if="fire")
        .icon.icon-fire
        span.c_error.f12 {{fire}}
</template>
<style lang="stylus">
.comp-search-result-card
  position relative
  &.invalid
    color #A6AAC1
    .invalid-flag
      position absolute
      top 0
      width 56.6px
      height 28.2px
      overflow hidden
      transform-origin top center
      transform translateX(-50%) rotate(-45deg)
      background-color #A6AAC1
      >.invalid-body
        margin-top 10px
  .wrapper
    line-height 22px
    padding 10px 15px
    overflow hidden
    .img
      padding-right 15px
      float left
      >img
        height 103px
        width 95px
    .author
      font-family PingFangSC-Regular
      color #A6AAC1
      font-size 12px
      letter-spacing -0.29px
    .price
      font-family PingFangSC-Regular
      color red
      font-size 14px
      margin-left 30%
      letter-spacing -0.29px
    .content
      color #888
      font-size 0.24rem
      line-height 1.8em
      margin-top 0.1rem
    .from
      margin-top 0.15rem
      font-size 0.24rem
      color #999
      line-height 10px
    .chapters
      background #eaeaeb
      margin-top 10px
      padding-left 10px
      position relative
      // padding-bottom 30px
    .name
      color #242631
      font-size 16px
      font-family PingFangSC-Medium
    .des
      color #676A7B
      font-size 14px
      font-family PingFangSC-Regular
      letter-spacing -0.39px
    .jch
      font-family PingFangSC-Regular
      color #A6AAC1
      font-size 12px
      letter-spacing -0.29px
    .more
      position absolute
      bottom 0
      background #ddd
      left 0
      right 0
      text-align center
      color #8a8a8a
    .abs
      line-height 16px
      color #a6aac1
      font-size 14px
    >.source
      color #A6AAC1
    >.meta
      line-height 18px
    >.fire
      right 15px
      line-height 20px
      transform translateY(-20px)
      >.icon
        margin-right 8px
</style>
