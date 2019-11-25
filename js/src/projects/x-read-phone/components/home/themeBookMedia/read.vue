<script>
import { mapState, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import { canRead } from '@/utils/util.js'
export default {
  props: ['totalPrice', 'totalChecked', 'currBuys'],
  created() {
    this.init()
  },
  data() {
    return {
      access_code: '',
      cdata: null,
    }
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
      Ebooks: state => state.bookinfo.Ebooks,
      buyChapters: state => state.bookinfo.buyChapters,
    }),
    datas() {
      return this.cdata.content
    },
  },
  methods: {
    ...mapMutations(['setIsPlayerShow', 'setEbooks']),
    init() {
      this.query = this.$route.query
      // sessionStorage.setItem('access_code',this.datas.access_code)
      this.getThemeBookDetail()
    },
    getEbooks() {
      bookinfoServices.getMedia({ ...this.query, type: 3 }).then(res => {
        this.setEbooks(res.data.chapters)
        this.access_code = res.data.access_code
      })
    },
    getThemeBookDetail() {
      //获取主题的所有内容
      bookinfoServices.getThemeBookDetail(this.query).then(res => (this.cdata = res.data))
    },
    goReader(i) {
      if (!this.$canRead(this.query)) return
      const { book_id, chapter_id } = i
      let product_id = this.query.product_id
      // i.access_code = this.access_code
      this.$go('/reader', {
        id: this.$route.query.id,
        book_id,
        chapter_id,
        product_id,
        from: 'theme',
      })
    },
    bookImgClick() {
      let i = this.datas.chapters[0]
      if (!i) return
      this.goReader(i)
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
div(v-if="cdata")
  .div(v-show="!fullScreen || !isPlayerShow")
    .msg-price.all
      .line-single
    .ls
      .item(v-for="(i,index) in datas.chapters" )
        .line-single
        .content
          .name.ell( @click="goReader(i)" )
            span.chapter 第{{index+1}}章
            span {{i.chapter_name}}
</template>

<style lang="stylus" scoped>
.price-common.item
  .curr-price
    font-size 13px
  .err
    font-size 12px
  .check
    display inline
.div
  padding 0 0.3rem
.ls
  .item
    height 0.85rem
    line-height 0.85rem
    text-align left
    .content
      display flex
      height 100%
      justify-content space-between
      .name
        flex auto
        color #333333
        font-size 0.28rem
        .chapter
          margin-right 10px
      .time
        flex none
        width 1.3rem
        display flex
        .txt
          font-size 12px
          color #999999
        .icon
          flex auto
          background url('./img/audio.png') no-repeat right center
          background-size 0.38rem 0.32rem
      .icon-free
        flex none
        width 0.8rem
        height 100%
        background url('./img/free.png') no-repeat right center
        background-size 0.52rem 0.32rem
</style>
