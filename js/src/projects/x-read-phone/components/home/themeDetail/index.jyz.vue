<script>
import ContentTitle from '../index/contentTitle'
import HomeSwiper from '../index/homeSwiper'
import ThemeSwiper from '../index/themeSwiper'
import * as homeServices from 'services/x-read/home'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as bookshelfServices from 'services/x-read/bookShelf'
import * as saleServices from 'services/x-read/mySale'
import * as dbiServices from 'services/x-read/dbi'
import * as servicesAttach from 'services/x-read/attach'

import { canRead, noLoginToast } from '@/utils/util.js'

export default {
  components: { ContentTitle, HomeSwiper, ThemeSwiper },
  created() {
    this.init()
  },
  data() {
    return {
      query: {},
      item: {},
      detail: null,
      payType: {
        name: '支付宝',
        icon: 'icon-alipay-large',
        type: '2',
      },
    }
  },
  computed: {
    info() {
      return this.detail.books_info
    },
    audios() {
      return this.detail.books_info.components.audios
    },
    books() {
      return this.detail.books_info.components.books
    },
    videos() {
      return this.detail.books_info.components.videos
    },
  },
  methods: {
    init() {
      this.query = this.$route.query
      this.getDetail()
    },
    getDetail() {
      homeServices.themeDetail(this.query).then(res => {
        this.detail = res.data
        this.$store.state.bookinfo.info = this.detail
      })
    },
    itemClick(item) {
      let myobj = {
        // 用于判断是否已经购买
        price: this.detail.price,
        isBuy: this.detail.isBuy || false,
        type: 'Read',
      }
      this.$go('/home/themeBookMedia', {
        book_id: item.book_id,
        from: 'theme',
        product_id: item.product_id,
        price: this.detail.price,
        ...this.query,
        ...myobj,
      })
    },
    createPay() {
      const query = {
        goods_id: this.query.id,
        type: 6,
        pay_type: this.payType.type,
        rf_url: location.href,
        distributor: this.query.distributor,
      }
      saleServices
        .order(query)
        .then(res => {
          location.href = res.data.url
        })
        .catch(err => {
          this.$Toast({ message: err.message })
        })
    },
    openAudio(index, item) {
      if (!this.$canRead(this.detail)) return
      this.$openAudio({ index, list: this.audios })
    },
    openVideo(index, item) {
      if (!this.$canRead(this.detail)) return
      this.$openVideo({ index, list: this.videos })
    },
    goXkonw() {
      if (!this.detail.books_info.knowledge || this.detail.books_info.knowledge.length === 0) {
        this.$Toast({
          message: '该产品没有设置内容标注!',
        })
        return
      }
      this.$go('/home/xknow', { id: this.query.id, clean: true, from: 'theme' })
    },
    addBookShelft() {
      if (noLoginToast()) return
      let type = 6
      bookshelfServices.add({ book_id: this.query.id, type }).then(res => {
        this.$Toast({ message: '添加成功!' })
      })
    },
    changePayType() {
      this.$openPay({ price: this.detail.theme_price })
        .then(({ item, pay }) => {
          this.payType = item
          if (pay) {
            this.createPay()
          }
        })
        .catch(rej => {})
    },
  },
}
</script>


<template lang="pug">
//- 整个加判断, 避免出现各种的undefined引用错误
.div(v-if="detail")
  Head(name="主题")
  .detail
    .content
      .img
        img(v-lazy="info.img_src")
        .abs   {{info.tag}}
    .text
      .val {{info.abs}}
      .line-single
    .price
      .name
        span.theme 主题合集定价
        span.price-color ￥{{detail.theme_price}}
      .send-btn(@click="addBookShelft") 加入阅读
      .method(@click="changePayType")
        span 支付方式
        .icon( :class="payType.icon")
      .buy.price-color(@click="createPay") 立即购买
    .xbook(@click="goXkonw") X一下
    .line-part
      //- 这里做判断, 防止没有内容的显示出来
      .col(v-if="books && books.length > 0")
        .section.listen-section
          ContentTitle( name="书籍" )
          //- ImgList( v-if="item.tmp == '普通模版'" )
          ImgList(  @itemClick="itemClick" :mediaType="item.type"   :list="books")
      .col(v-if="audios && audios.length > 0")
        .section.listen-section
          ContentTitle( name="音频"  )
          //- ImgList( v-if="item.tmp == '普通模版'" )
           .audios-ls
          .audios-ls
            .item(v-for="(i, index) in audios")
              .content( @click="openAudio(index, i)")
                .name.ell {{i.name}}
                .time
                  .txt
                  .icon
              .line-single
      .col(v-if="videos && videos.length > 0")
        .section.video-section
          ContentTitle( name="视频" )
          //- ImgList( v-if="item.tmp == '普通模版'" )
          .relate-audio
            .item(v-for="(i,index) in videos"   @click="openVideo(index, i )")
              img.img( v-lazy="i.img_src"   )
              .name {{i.name}}
</template>


<style lang="stylus" scoped>
.audios-ls
  padding-right 0.3rem
.relate-audio
  padding 0 0.3rem
  overflow scroll
  .item
    flex none
    margin-right 15px
.detail
  .price
    display flex
    justify-content space-between
    padding 0 0.3rem
    >div
      font-size 13px
      height 0.8rem
      line-height 0.8rem
    .name
      color #666
      .theme
        padding-right 0.3rem
    .method
      .icon
        margin-left 5px
    .buy
      font-size 13px
      padding-left 0.2rem
    .send-btn
      height 25px
      line-height 25px
      margin-top 7px
      font-size 12px
  .text
    margin 0.3rem
    margin-bottom 0
    font-size 14px
    color #666
    word-break break-all
    line-height 22px
    .val
      margin-bottom 0.2rem
  .content
    // padding 0.3rem
    .des
      height 0.4rem
      line-height 0.4rem
      .theme-name
        font-size 14px
        font-weight 700
        float left
        height 100%
      .time
        color #999
        float right
        height 100%
        font-size 12px
    .img
      height 3rem
      position relative
      text-align center
      .abs
        position absolute
        left 0
        right 0
        bottom 0
        height 0.7rem
        background rgba(0, 0, 0, 0.5)
        margin auto
        color #fff
        font-size 15px
        line-height 0.7rem
        text-align left
        padding-left 0.3rem
      >img
        width 100%
        height 100%
</style>
