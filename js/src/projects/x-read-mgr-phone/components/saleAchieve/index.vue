<script>
import echarts from 'echarts'
import * as statisticsServices from 'services/x-read/statistics'
import conf from './config'
export default {
  activated() {
    this.init()
  },
  data() {
    return {
      navList: [
        { name: '今天', num: 'day' },
        { name: '本月', num: 'month' },
        { name: '本年', num: 'year' },
        { name: '总额', num: 'count' }
      ],
      currIndex: 0,
      resData: null,

    }
  },
  computed: {
    transChartData() { // 得到转换后的chart所需数据
      let data = []
      if (this.resData) {
        let currData = this.resData[this.navList[this.currIndex].num]
        function calcRatio(val, total) {
          let p
          if(total == 0){
            p = "0"
          }else {
            p = (val / total).toFixed(4)*100
          }
          return p+"%"
        }
        Object.keys(currData).forEach(key => {
          let cname = conf[key]
          if (cname) {
            data.push({
              name: cname,
              ename: key,
              value: currData[key],
              ratio: calcRatio(currData[key] , currData.count)
            })
          }
        })
      }
      return data
    }

  },
  methods: {
    init() {

      this.getSales()
    },
    changeNav(index) {
      this.currIndex = index
      this.initChart()
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.chart)
      let opts = {
        title: {
          text: '今日销售额',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.transChartData.map(item => item.name)
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.transChartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 指定图表的配置项和数据
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opts)
    },
    getSales() {
      function toChartData(data) {
        let _data = {}

        return _data
      }
      return statisticsServices.bookSaleAchievement().then(res => {
        this.resData = res.data
        this.initChart()
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
        .div.name  
        .div.name.tcenter 金额(元)
        .div.tright.name 占比 
      .row(v-for="i in transChartData" :key="i.name") 
        .div.name  {{i.name}}
        .div.tcenter {{i.value}}
        .div.tright  {{i.ratio}}
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
  height 250px
  background #fafafa
</style>
