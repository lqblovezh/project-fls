<script>
import * as statisticsServices from 'services/x-read/statistics'
import echarts from 'echarts'
import dayjs from 'dayjs'
import dateMixin from '@/mixins/date'

export default {
  mixins: [dateMixin],
  activated() {
    this.init()
  },
  data() {
    return {
      list: [],
      navList: [
        { name: '近7天', num: 7 },
        { name: '近15日', num: 15 },
        { name: '近30日', num: 30 },
        { name: '自定义', num: null }
      ],
      currIndex: 0, // 顶部nav

      screenList: [{ name: '只看图书' }, { name: '只看主题' }, { name: '只看课件' }],
      screenListShow: false, // 控制筛选内容
      currScreenListIndex: 0,

      chartTypes: [
        { name: '浏览数', type: 'browse' },
        { name: '分享数', type: 'share' },
        { name: '销售次数', type: 'sale' },
        { name: '销售金额', type: '' },
        { name: '分销数', type: '' }
      ],
      currChartTypesIndex: 0
    }
  },
  computed: {
    params() {
      return {
        // time:this.navList[this.currIndex].num ,
        txt: this.chartTypes[this.currChartTypesIndex].name,
        type: this.chartTypes[this.currChartTypesIndex].type
      }
    },
    calcTop() {
      return this.navList[this.currIndex].num ? '2' : '2.6'
    },
  },
  methods: {
    init() {
      // this.initChart();
      this.getDetail()
      this.orderRefresh()
    },
    changeNav(index) {
      this.currIndex = index
      this.getDetail()
      this.orderRefresh()
    },
    changeChartTypes(index) {
      this.currChartTypesIndex = index
      this.getDetail()
    },
    getOrders(pageStart = 0, pageOffset = 10) {
      return statisticsServices.getOrders({
        id: [this.$route.query.id],
        pageStart,
        pageOffset,
        ...this.searchParams
      }).then(res => {
        if(res.data.length !== 0){
          this.list = [...this.list, ...res.data]
          return false 
        }
        return true 
      })
    },
    loadMore(scroll){
      this.getOrders(this.list.length, 10).then(res => {
        log(scroll)
        scroll(res)
      })
    },
    orderRefresh(pageStart = 0, pageOffset = 10) {
      statisticsServices.getOrders({
        id: [this.$route.query.id],
        pageStart,
        pageOffset,
        ...this.searchParams
      }).then(res => {
        this.list = res.data
      })
    },
    screen() {
      //筛选
      this.screenListShow = !this.screenListShow
    },
    changeScreen(index) {
      this.currScreenListIndex = index
      this.screenListShow = false
    },
    refresh() {
      // 这个方法包裹用来处理mixins的复用性 // 时间确定按钮点击触发事件
      this.getDetail()
      this.orderRefresh()
    },
    getDetail() {
      let query = this.$route.query
      let obj = {
        id: query.id,
        ...this.params,
        ...this.searchParams
        // type: 'browse',
        // txt: '浏览数',
        // time: 30,
      }
      log(this.searchParams)
      statisticsServices.detail(obj).then(res => {
        this.initChart(res.data)
      })
    },
    initChart(data) {
      let _data = data[0]
      let option = {
        xAxis: {
          type: 'category',
          data: _data.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: _data.map(item => item.value),
            type: 'line',
            smooth: true
          }
          // { 多根线
          //   data: [0, 932, 901, 934, 1290, 1330, 1320],
          //   type: 'line',
          //   smooth: true
          // },
        ]
      }
      var myChart = echarts.init(this.$refs.chart)
      myChart.setOption(option)
    }
  }
}
</script>

<template lang="pug">
div 
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
    Scroll(:top="calcTop" @refresh="refresh"  @loadMore="loadMore" )  
      .line-part
      .chart-types
        ContentTitle(name="趋势分析") 
        .types 
          .item( :class="{true:index === currChartTypesIndex}" v-for="(i,index) in chartTypes" @click="changeChartTypes(index)") {{i.name}}
      .chart(ref="chart")
      .line-part 
      .content-title
        ContentTitle() 
          div(slot="title") 
            span 销售详情
            // span.title-price （合计：10000元）
          // div.right   
          //   .text-icon.screen.main-color(@click="screen") 筛选
          //   .screen-content(v-show="screenListShow")
          //     .screen-item(v-for="(i,index) in screenList" :class="{true:index === currScreenListIndex}" @click="changeScreen(index)" ) {{i.name}}
        // .main-list 
        //   .row.title 
        //     div 商品名称
        //     div 类型
        //     div 销量
        //     div 销售额(￥)
        //   .row.content(v-for="i in 20") 
        //     div 忏悔率忏悔率
        //     div 主题
        //     div 10
        //     div 256.00
      .table-wrap  
        table.table 
          tr.title 
            td 订单号
            td 用户名
            td 分销者
          tr(v-for="i in list")  
            td  
              .order 
                .num.ell {{i.id}}
                .time 订单时间：
                div.time 2018-02-10 22:55:20
            td 
              div {{i.user_nick}}
            td 
              div {{i.distributor_user_nick}}


</template>

<style lang="stylus" scoped>
.chart-types
  .types
    display flex
    justify-content space-around
    text-align center
    font-size 14px
    .item
      flex auto
      height 30px
      line-height 30px
      &.true
        color #15afff
.chart
  height 300px
  margin-left 10px
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
        max-width 2.5rem
        padding 0.3rem 0
        .order
          font-size 15px
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
