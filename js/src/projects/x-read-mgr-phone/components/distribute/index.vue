<script>
import echarts from 'echarts'
import dayjs from 'dayjs'
import dateMixin from '@/mixins/date'
import * as distributionServices from 'services/x-read/distribution'

export default {
  mixins: [dateMixin],
  activated() {
    this.init()
  },
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
        { name: '已结算', type: 1 },
        { name: '未结算', type: 0 },
        { name: '全部', type: null }
      ],
      screenListShow: false, // 控制筛选内容
      currIndex: 0,
      currScreenListIndex: 0,
      timeDuring: null
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
      this.getList()
    },
    getList(pageStart = 0, pageOffset = 10) {
      let params = {
        pageStart,
        pageOffset,
        ...this.searchParams,
        ...this.params
      }
      return distributionServices.getList(params).then(res => {
        if (res.data.length === 0) {
          return true
        } else {
          this.list = [...this.list, ...res.data]
          return false
        }
      })
    },
    changeNav(index) {
      this.currIndex = index
      this.refresh()
    },
    screen() {
      //筛选
      this.screenListShow = !this.screenListShow
    },
    changeScreen(index) {
      this.currScreenListIndex = index
      this.screenListShow = false
      this.refresh()
    },
    refresh() {
      let params = {
        pageStart: 0,
        pageOffset: 10,
        ...this.params,
        ...this.searchParams
      }
      distributionServices.getList(params).then(res => {
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
  Head(name="X-Read 业绩查询")
  .content 
    .time-nav 
      .item(v-for="(i,index) in navList" :class="{true:currIndex === index}" @click="changeNav(index)" ) {{i.name}}
    DuringTime(
      v-if="!this.navList[this.currIndex].num"
      :time="time"
      @openStartTime="openStartTime"
      @openEndTime="openEndTime"
      @timePickConfirm="timePickConfirm") 
    .line-part 
    .chart(ref="chart")
    .line-part 
    .content-title
      ContentTitle() 
        div(slot="title") 
          span 销售详情
          // span.title-price （合计：10000元）
        div.right   
          .text-icon.screen.main-color(@click="screen") 筛选
          .screen-content(v-show="screenListShow")
            .screen-item(v-for="(i,index) in screenList" :class="{true:index === currScreenListIndex}" @click="changeScreen(index)" ) {{i.name}}
    Scroll(:top="calcTop" @refresh="refresh"  @loadMore="loadMore" )  
      .table-wrap  
        table.table 
          tr.title 
            td 订单号
            td 奖励金额
            td 分销者
          tr(v-for="i in list" key="i.id")  
            td.order-wrap  
              .order 
                .num.ell {{i.order_id}}
                .time 订单时间：
                div.time {{i.pay_time}}
            td 
              div {{i.user_nick}}
            td 
              div {{i.distributor_info.distributor_nick}}


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
        min-width 0.7rem
        max-width 3.5rem
        padding 0.3rem 0
        &.order-wrap
          max-width 2.3rem
        .order
          font-size 15px
          max-width 100%
          display inline-block
          .time
            font-size 13px
            color #999
            margin 10px 0
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
.during
  height 30px
  background #fbfaef
  line-height 30px
  text-align center
  color #d6b177
</style>
