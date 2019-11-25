<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'

export default {
  data() {
    return {
      id: this.$route.query.id || '8ca8dcc1da77478683727dd8d4e46478',
    }
  },
  computed: {
    ...mapState({
      config: state => state.thirdConf,
      info: state => state.bookinfo.info.books_info,
    }),
  },
  created() {
    this.cleanDetail()
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$dialog.loading.open('加载中...')
      bookinfoServices.info({ id: this.id }).then(res => {
        this.setinfo(res.data)
        this.$dialog.loading.close()
      })
    },
    itemClick(item) {
      this.$go('/bookDetail', { id: this.id, isFast: true })
    },
    ...mapMutations(['setinfo', 'cleanDetail']),
  },
  filters: {
    textFilter(text) {
      if (text && text.length > 85) {
        return text.substring(0, 85) + '...'
      }
      return text
    },
  },
}
</script>

<template lang="pug">
.fastHome
  .top
    .img-box
      img(:src='info.img_src')
    .name {{info.name}}
    .author {{info.author}}
    .exp {{info.abs|textFilter}}
    .button(@click="itemClick")
      span.icon-book
      span 进入详情
  .producer
    p.f12 出品方：{{config.publisher&&config.publisher.name}}
</template>

<style lang="stylus" scoped>
.fastHome
  text-align center
  .top
    min-height calc(100vh - 3em)
  .img-box
    padding-top 3em
    img
      width 3.78rem
      height 5.16rem
      // background-color #c0f8f7
      box-shadow 0px 12px 25px 0px rgba(6, 91, 164, 0.28)
      border-radius 0.1rem
      object-fit contain
      // border 1px solid red
  .name
    margin-top 0.8rem
    color #333333
    font-size 0.42rem
    line-height 0.6rem
  .author
    margin-top 0.25rem
    color #888888
    font-size 0.26rem
  .exp
    margin-top 0.2rem
    color #555
    padding 0 0.6rem
    font-size 0.26rem
    line-height 0.42rem
  .button
    width 2.2rem
    height 0.54rem
    line-height @height
    background-color #14afff
    border-radius 0.25rem
    margin 0 auto
    margin-top 0.55rem
    font-size 0.26rem
    color #fff
    .icon-book
      margin-right 0.14rem
      display inline-block
      vertical-align middle
      width 0.26rem
      height 0.25rem
      background url('./img/read.png') no-repeat center
      background-size contain
  .producer
    height 3em
    line-height @height
    bottom 0
    width 100%
    color #999999
    background-position center
    p
      margin 0
</style>
