<script>
import * as services from 'services/x-read/bookInfo'
import ContentLeft from './ContentLeft'
import ContentRight from './ContentRight'
import VideoList from './VideoList'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as bookshelfServices from 'services/x-read/bookShelf'
import * as saleServices from 'services/x-read/mySale'
import { noLoginToast } from '@/utils/util'

export default {
  components: { ContentLeft, ContentRight, VideoList },
  created() {
    this.init()
  },
  data() {
    return {
      data: null,
      currTab: 0,
      query: {
        currTab: 0,
        itemIndex: false,
      },
    }
  },
  computed: {
    currMsg() {
      return this.data.books_info
    },
  },
  watch: {
    // 深度监听query, 保持url和query一致, 利用vue参数改变, 页面不刷新特性
    query: {
      handler() {
        // 这样会改变/home/mediaList页面的返回操作, 有需求的时候再打开
        // this.$go('/home/Course', this.query)
      },
      deep: true,
    },
  },
  methods: {
    init() {
      this.query = { ...this.query, ...this.$route.query }
      // 保持url一致, 使得分享的时候, 页面保持一致
      this.getData()
    },
    getData() {
      return services.getCourse(this.$route.query).then(res => {
        this.data = res.data
      })
    },
    // 为了防止在本页来回返回, 采用指定转跳的方式完成上一页
    back() {
      // this.$go(this.query.fromUrl)
      this.$router.go(-1)
    },
    tabClickHandler(index) {
      this.query.currTab = index
      // 点击视频, 返回组列表
      this.query.itemIndex = false
    },
    addBookShelf() {
      if (noLoginToast()) return
      // 加入阅读
      bookshelfServices.add({ book_id: this.query.id, type: 8 }).then(res => {
        this.$Toast('添加成功!')
      })
    },
    goBuy(data) {
      // pay_type支付方式1正常支付,2支付宝,3微信,4...
      saleServices
        .order({
          goods_id: this.$route.query.id,
          content: [data.id],
          type: 4, // 课件
          pay_type: 2,
          rf_url: location.href, // 购买完返回地址
        })
        .then(res => {
          location.href = res.data.url
          // let data = res.data
        })
    },
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.query = to.query
  //   next()
  // },
}
</script>

<template lang="pug">
.course-main(v-if="data")
  Head(@back="back" backUrl="no" )
  .detail-media
    .msg
      .img(@click=" " )
        img( :src="currMsg.img_src")
      .right
        .name {{currMsg.name}}
        .author
          //- span.shadow 作者:
          //- span.info {{currMsg.author}}
        span.btn(@click="addBookShelf") 加入阅读
  .line-single
  .tab
    .left( @click="tabClickHandler(0)"  :class="{curr: query.currTab == 0} ") 简介
    .right( @click="tabClickHandler(1)" :class="{curr: query.currTab == 1} "
      v-text="query.itemIndex === false ? '视频' : '返回'  "  )
  .line-part
  .content-left
    ContentLeft( v-show="query.currTab == 0" :info="data")
  .content-right
    //- undefined 不能是字符串的undefined
    ContentRight(
      v-show="query.itemIndex === false && query.currTab == 1  " :query="query"  :info="data.books_info")
  VideoList(
    v-if="query.itemIndex !== false"
    @goBuy="goBuy"
    :info="data.books_info"
    :data="data.books_info.components.videos[query.itemIndex]")
</template>

<style lang="stylus" scoped>
.course-main
  .tab
    display flex
    flex auto
    height 45px
    line-height 45px
    text-align center
    >div
      flex auto
      position relative
      &.curr
        color #14afff
        &::before
          content ' '
          position absolute
          width 14px
          height 2px
          background-color #14afff
          z-index 10
          left 50%
          transform translateX(-50%)
          bottom 2px
      &:first-child
        &::after
          content ' '
          position absolute
          width 1px
          height 12px
          background-color #14afff
          z-index 10
          right 0
          top 50%
          transform scaleX(0.5) translateY(-50%)
  .btn
    height 25px
    line-height 25px
    font-size 13px
    padding 0 15px
    width auto
    margin-top 24px
</style>
