<script>
import * as statisticsServices from 'services/x-read/statistics'
import dayjs from 'dayjs'
import dateMixin from '@/mixins/date'

export default {
  activated() {
    this.init()
  },
  mixins: [dateMixin],
  data() {
    return {
      list: [],
      navList: [
        { name: '今天', num: 1 },
        { name: '一周', num: 7 },
        { name: '本月', num: 30 },
        { name: '自定义', num: null }
      ],
      screenList: [
        { name: '全部', type: null },
        { name: '只看图书', type: 1 },
        { name: '只看主题', type: 2 }
      ],
      screenListShow: false, // 控制筛选内容
      currIndex: 0, // navList
      currScreenListIndex: 0 //screenList
      // timeDuring:3,// 可以重置默认的时间段
    }
  },
  computed: {
    calcTop() {
      if (this.navList[this.currIndex].num) {
        return '3'
      } else {
        return '3.6'
      }
    },
    params() {
      return {
        type: this.screenList[this.currScreenListIndex].type
      }
    }
  },
  methods: {
    init() {
      this.list = []
      this.refresh()
    },
    getList(pageStart = 0, pageOffset = 10) {
      let params = {
        pageStart,
        pageOffset,
        ...this.searchParams,
        ...this.params
      }
      return statisticsServices.getList(params).then(res => {
        if (res.data.length === 0) {
          return true
        } else {
          this.list = this.list.concat(res.data)
          return false
        }
      })
    },

    changeNav(index) {
      this.currIndex = index
      this.refresh()
    },
    changeScreen(index) {
      this.currScreenListIndex = index
      this.screenListShow = false
      this.refresh()
    },
    screen() {
      //筛选
      this.screenListShow = !this.screenListShow
    },

    refresh(pageStart = 0, pageOffset = 10) {
      let params = {
        pageStart,
        pageOffset,
        ...this.searchParams,
        ...this.params
      }
      statisticsServices.getList(params).then(res => {
        this.list = res.data
      })
    },
    loadMore(scroll) {
      this.getList(this.list.length, 10).then(res => {
        scroll(res)
      })
    }
  }
}
</script>

<template lang="pug">
div
  .plugs
  Head(name="X-Read 业绩查询")
  .content
    .nav
      .item(v-for="(i,index) in navList" :class="{true:currIndex === index}" @click="changeNav(index)" ) {{i.name}}
    DuringTime(
      v-if="!this.navList[this.currIndex].num"
      :time="time"
      @openStartTime="openStartTime"
      @openEndTime="openEndTime"
      @timePickConfirm="timePickConfirm")
    .line-part
    .content-title
      ContentTitle()
        div(slot="title")
          span 全部
          // span.title-price （合计：100，01.00元）
        div.right
          .text-icon.screen.main-color(@click="screen") 筛选
          .screen-content(v-show="screenListShow")
            .screen-item(v-for="(i,index) in screenList" :class="{true:index === currScreenListIndex}" @click="changeScreen(index)" ) {{i.name}}
    .scroll-wrap
      Scroll(:top="calcTop" @refresh="refresh"  @loadMore="loadMore" )
        .table-wrap
          table.table
            tr.title
              td 商品名称
              td 类型
              td 销量
              td 销售额(￥)
            tr(v-for="i in list" :key="i.id" @click="$go('/productData/detail' , {id:i.book_id} )")
              td()
                div {{i.book_name}}
              td
                div {{i.type_name}}
              td
                div {{i.sale_value}}
              td
                div {{i.sale_money}}
</template>

<style lang="stylus" scoped>
.table-wrap
  padding 0.3rem
  .table
    width 100%
    tr
      height 1rem
      border-bottom 1px solid #e7e7e7
      color #333333
      &.title
        font-weight 800
      td
        min-width 1.3rem
        max-width 2.5rem
        padding 0.3rem 0
.main-list
  padding 0.3rem
  .row
    display flex
    justify-content space-around
    border-bottom 1px solid #e7e7e7
    font-size 14px
    >div
      color #333333
      width 30%
      padding 0.35rem 0
      display flex
      align-items center
    &.title
      font-weight 600
      border-bottom none
.screen-content
  width
.content-title
  .title-price
    color #e8554d
    font-size 14px
  .right
    position relative
    .screen-content
      position absolute
      right 0rem
      margin-top 0.45rem
      padding 0 0.3rem
      width 80px
      border 1px solid rgba(54, 187, 255, 0.39)
      box-shadow 0px 0px 10px 0px rgba(52, 181, 255, 0.43)
      text-align center
      z-index 1000
      background #fff
      font-size 13px
      .screen-item
        height 45px
        line-height 45px
        z-index 10
        color #5d5d5d
        &.true
          color #15afff
      &::after
        content ' '
        right 10px
        position absolute
        top -0.19rem
        width 15px
        height 15px
        border 1px solid rgba(54, 187, 255, 0.39)
        border-right-color #fff
        border-bottom-color #fff
        background #fff
        transform rotate(45deg)
        // width 14.5px
        // height 7.5px
        // background url('./img/triangle.png') no-repeat
        // background-size 14.5px 7.5px
.nav
  display flex
  justify-content space-around
  background #fff
  position relative
  .item
    width 60px
    flex none
    height 44px
    line-height 44px
    text-align center
    font-size 15px
    &.true
      color #14afff
      border-bottom 2px solid #14afff
</style>
