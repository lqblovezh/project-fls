<script>
import echarts from 'echarts'
import * as statisticsServices from 'services/x-read/statistics'

export default {
  activated() {
    this.init()
  },
  data() {
    return {
      navList: [
        { name: '今天', num: 1 },
        { name: '本月', num: 2 },
        { name: '本年', num: 3 },
        { name: '总额', num: null }
      ],
      currIndex: 0
    }
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.chart)

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    changeNav(index) {
      this.currIndex = index
      this.getSales()
    },
    getSales() {
      return statisticsServices.bookSale({
        type:this.navList[this.currIndex].num
      }).then(res => {  
        log(res)
      })
    },
    getSalesAll() { },
  }
}
</script>


<template lang="pug">
div 
  Head(name="X-Read 业绩查询")
  .bg   
  .content 
    .nav 
      .item(v-for="(i,index) in navList" :class="{true:currIndex === index}" @click="changeNav(index)" ) {{i.name}}
    .line-part      
    .chart(ref="chart") 
    .ls 
      .row 
        .div.name  价格 
        .div.name.tcenter 数量 
        .div.tright.name 占比 
      .row(v-for="i in 6") 
        .div.name  电子书
        .div.tcenter 260
        .div.tright  50% 
    .more.main-color  更多数据请在电脑查看
    // .green.red 更多数据请在电脑查看 // 与类名谁在前面无关 ,而是样式谁在最后, 覆盖前面
</template>

<style lang="stylus" scoped>
.green
  color green
.red
  color red
.bg
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index -10
  background-color #fafafa
.content
  .ls
    padding 0.3rem
    color #000
    .row
      display flex
      justify-content space-around
      height 33px
      line-height 33px
      font-size 15px
      >div
        width 30%
      .tcenter
        color #888
      .tright
        color #888
      .name
        color #000
  .more
    font-size 15px
    text-align center
    border-top 1px solid #e5eef2
    height 63px
    vertical-align bottom
    line-height 63px
  .nav
    display flex
    justify-content space-around
    background #fff
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
.chart
  width 100%
  height 190px
  background #fafafa
</style>
