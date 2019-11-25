<script>
import * as commonServices from 'services/x-publish/common'
import * as services from 'services/x-read/sale'
import echarts from 'echarts'
import RunningTime from 'projects/common/runningTime'

export default {
	components: {
		RunningTime
	},
  data() {
    return {
      seriverTime: '', //系统时间
      timmer: null, //时间定时器
      yesterdayData: '',
      dialogVisible: false,
      runDayData: { days: '', book_num: '' },
      update: {
        user_value: 0,
        browse_value: 0,
        share_value: 0,
        sale_value: 0,
        sale_bution: 0,
        read_value: 0,
      },
      rules: {
        user_value: [
          {
            required: true,
            message: '请填写预期新增用户数',
            trigger: 'change',
          },
        ],
        browse_value: [
          { required: true, message: '请填写预期PV数', trigger: 'change' },
        ],
        share_value: [
          { required: true, message: '请填写预期分享数', trigger: 'change' },
        ],
        sale_value: [
          { required: true, message: '请填写预期销售数', trigger: 'change' },
        ],
        sale_bution: [
          { required: true, message: '请填写预期分销数', trigger: 'change' },
        ],
        read_value: [
          { required: true, message: '请填写预期阅读数', trigger: 'change' },
        ],
      },
      chooseDate: ['2018-06-01', '2018-06-30'],
      chooseDate2: ['0', '0'],
      type: '',
      activeName: 'first',
      color: ['#2ca2fa', '#1ABFAE', '#FFB53C', '#E96E5D'],
      plantInfo: this.$config.plantInfo,
    }
  },
  computed: {},
  created() {
    this.getTotal()
    this.draw()
    this.draw2()
  },
  methods: {
    getTotal() {
      services.statistics().then(res => {
				log(res)
				this.seriverTime = res.data.now_time
        this.yesterdayData = Object.entries(res.data.yester)
        this.runDayData = res.data.count
        this.yesterdayData.map(v => {
          switch (v[0]) {
            case 'browse_value':
              v[0] = '昨日访问'
              break
            case 'share_value':
              v[0] = '昨日分享'
              break
            case 'sale_money':
              v[0] = '昨日销售'
              break
            case 'distribute_money':
              v[0] = '昨日分销'
              break
            default:
              v[0] = '未知'
          }
        })
      })
    },
    draw(data) {
      services.expected(this.update).then(res => {
        let data = {}
        services.statistics().then(d => {
          let max
          let x1
          let x2
          data.expect = Object.values(d.data.Expect)
          data.month = Object.values(d.data.month)
          x1 = Math.max(...data.expect)
          x2 = Math.max(...data.month)
          x1 >= x2 ? (max = x1) : (max = x2)
          log(max)
          setTimeout(_ => {
            let dom = echarts.init(this.$refs.charts)
            dom.setOption({
              tooltip: {},
              legend: {
                data: ['预期', '实际'],
                left: 0,
              },
              radar: {
                name: {
                  textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5],
                  },
                },
                indicator: [
                  { name: '新增用户', max },
                  { name: '分享数', max },
                  { name: '购买次数', max },
                  { name: 'PV数', max },
                  { name: '阅读次数', max },
                  { name: '分销次数', max },
                ],
              },
              series: [
                {
                  name: '预期 vs 实际',
                  type: 'radar',
                  // areaStyle: {normal: {}},
                  data: [
                    {
                      value: data.expect,
                      name: '预期',
                    },
                    {
                      value: data.month,
                      name: '实际',
                    },
                  ],
                },
              ],
            })
          }, 10)
        })
        this.dialogVisible = false
      })
    },
    draw2(type = 'browse') {
      this.type = type
      services
        .trend({
          type: this.type,
          start_time: this.chooseDate2[0],
          end_time: this.chooseDate2[1],
        })
        .then(res => {
          let data = res.data || []
          let d = { value: [], date: [], money: [], bution: [] }
          data.forEach(v => {
            d.date.push(v.date)
            d.value.push(v.value)
          })
          setTimeout(_ => {
            let dom = echarts.init(this.$refs.charts2)
            dom.setOption({
              xAxis: {
                type: 'category',
                data: d.date || ['test', 'test2'],
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: d.value || ['1212', '21'],
                  type: 'line',
                  smooth: true,
                },
              ],
            })
          }, 10)
        })
    },
    setting() {
      this.dialogVisible = true
    },
  },
}
</script>


<template lang="pug">
.mainRight
  .headGuide
    .logo
      img(:src="plantInfo?plantInfo.logo_absolute:''", alt="alt")
    .guide
      h2 {{plantInfo?plantInfo.name:''}}
      p {{plantInfo?plantInfo.exp:''}}
      RunningTime(:currentTime='seriverTime' v-if='seriverTime')
          span 服务器当前时间：
  .content
    .top
      .lside
        .title
          .text 昨日统计
        dl
          div(v-for='item,index in yesterdayData')
            dd(:style="{borderColor:color[index],color:color[index]}") {{item[1]}}
            dt {{item[0]}}
      .rside
        .title
          .text(v-html="`您已累计运营 <span style='color:#1ABFAE'> ${this.runDayData.days} </span>天 , 拥有 <span style='color:#1ABFAE'> ${this.runDayData.book_num} </span> 个 资源`")
        .box
          .totalMoney
            .icon
              img(src="./iconx.png")
              p 累计收益
            .text {{runDayData.sale}}
    .bottom
      .lside
        .title
          .btn
            .text.active 运营雷达图
          //.date
            el-date-picker(type="daterange" range-separator="至"  v-model="chooseDate" value-format ='yyyy-MM-dd')
        .draw(ref="charts")
        .setting
          el-button(type="primary" plain @click="setting") 设置预计
      .rside
        .title
          .btn
            .text(@click="draw2('browse')" :class="type=='browse'? 'active':null" ) 访问趋势图
            .text(@click="draw2('sale')"  :class="type=='sale'? 'active':null" )  销售趋势图
          // .text 访问趋势图
          .date
            el-date-picker(type="daterange" start-placeholder="选择开始时间" end-placeholder="选择结束时间" value-format ='yyyy-MM-dd' range-separator="至"  v-model="chooseDate2" @change="draw2(type)")
        .draw(ref="charts2")
  el-dialog.dialog( width="500px" :visible.sync="dialogVisible")
      el-tabs(v-model="activeName" type="card" )
        el-tab-pane(label="详情" name="first" )
          el-form(:model="update" status-icon :rules="rules" ref="ruleForm" label-width="100px")
            el-form-item(label="新增用户" prop="user_value")
              el-input(v-model="update.user_value" auto-complete="off")
            el-form-item(label="分销次数" prop="sale_bution")
              el-input(v-model="update.sale_bution" auto-complete="off")
            el-form-item(label="阅读次数" prop="read_value")
              el-input(v-model="update.read_value" auto-complete="off")
            el-form-item(label="PV数" prop="browse_value")
              el-input(v-model="update.browse_value" auto-complete="off")
            el-form-item(label="购买次数" prop="sale_value")
              el-input(v-model="update.sale_value" auto-complete="off")
            el-form-item(label="分享次数" prop="share_value")
              el-input(v-model="update.share_value" auto-complete="off")
      span(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible = false" size='small') 取消
        el-button(type="primary" @click="draw" size='small') 确定
</template>
<style lang="stylus" scoped>
.headGuide
  padding 20px
  width 1600px
  .logo
    width 78px
    height 44px
    display inline-block
    margin-right 10px
    text-align center
    img
      max-width 100%
      max-height 100%
  .guide
    display inline-block
    h2
      padding-bottom 10px
      font-weight bold
      font-size 17px
      color #444
    p
      font-size 14px
      line-height 24px
      color #777
.content
  height 80vh
  .top
    padding-top 2px
    display flex
    height 255px
    justify-content space-between
    margin-bottom 20px
    .title
      border-bottom 1px solid #e8e8e8
      padding 14px 0
      .text
        border-left 3px solid #44c3aa
        text-indent 8px
    .lside
      padding 0 17px
      background #fff
      width 67%
      dl
        display flex
        justify-content space-around
        padding 22px 45px
        text-align center
        color #666
        dd
          border 6px solid #2ca2fa
          border-radius 210px
          width 120px
          line-height 120px
          font-weight bold
          font-size 20px
          margin-bottom 10px
    .rside
      flex-grow 1
      margin-left 15px
      padding 0 17px
      background #fff
      .box
        padding 20px
        .totalMoney
          display flex
          height 170px
          text-align center
          .icon
            background-color #eee
            flex-grow 1
            img
              margin 40px 0 10px 0
          .text
            flex-grow 2
            line-height 170px
            text-align left
            font-size 30px
            color #FFB53C
  .bottom
    display flex
    height 510px
    &>div
      background #fff
      padding 15px 20px
      .draw
        height 350px
        margin-bottom 20px
    .title
      display flex
      justify-content space-between
      .btn
        .text
          display inline-block
          padding 8px 10px
          margin-bottom 20px
          font-size 16px, background-color #eee
          color #666
          &:hover
            cursor pointer
        .active
          color #fff
          background-color #44c3aa
    .lside
      width 600px
    .rside
      flex-grow 1
      margin-left 20px
</style>
