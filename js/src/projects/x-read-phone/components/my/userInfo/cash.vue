<script>
import * as servers from 'services/x-read/mySale';
export default {
  data() {
    return {
      page: 1,
      pageSize: 8,
      list: [],
      reward_money: '',
      total_money: ''
    }
  },
  methods: {
    go(url) {
      this.$router.push({ path: url })
    },
    getList() {
      servers.sum().then(res => {
        this.reward_money = res.data.reward_money;
        this.total_money = res.data.total_money;
      })
      servers.cashsHistory({ pageStart: this.pageSize * (this.page - 1), pageOffset: this.pageSize }).then(res => {
        this.list = [...this.list, ...res.data];

      })
    }
  },
  created() {
    this.getList();
  }
}
</script>

<template lang='pug'>
    .box
        div.top(slot="navbar")
           .lside
             p {{total_money}}
             p.txt 累计提成
           .rside 
             p {{reward_money}}
             p.txt 剩余金额
        
        yd-infinitescroll(:callback="getList" ref="infinitescroll" )
          div.main(slot='list')
            .list(v-for='item,index in list')
              .lside 
                p 订单编号：{{item.id}}
                p {{item.pay_type==2?'支付宝':'银行卡'}} {{item.pay_info.name}}
              .middle
                p {{item.create_time}}
              .rside 
                p 提现金额
                p(style='color:#d52a2a') ￥{{item.reward_money}}
        div.tabbar(slot="tabbar")
          .lside(@click="go('/extract')") 确定
          .rside(onclick='history.back(-1)') 返回
</template>


<style lang='stylus' scoped>
.box
  height 100vh
  overflow scroll
  .top
    position fixed
    width 100%
    >div
      height 1.6rem
      background rgba(60, 180, 255, 0.9)
      display inline-block
      width 50%
      color #fff
      padding 0.35rem 0
      font-size 0.4rem
      text-align center
      line-height 0.5rem
    .lside
      border-right 1px solid #9cd9ff
    .rside
      border-left 1px solid #9cd9ff
    .txt
      color rgba(255, 255, 255, 0.7)
      font-family '宋体'
      font-size 0.26rem
  .main
    padding 0 0.3rem
    height 10rem
    margin-top 1.6rem
    overflow scroll
    .list
      color #333
      font-size 0.26rem
      padding 0.4rem 0
      line-height 0.45rem
      overflow hidden
      border-bottom 1px solid #eee
      .lside
        float left
        width 59%
      .middle
        float left
        width 25%
      .rside
        float right
        width 16%
  .tabbar
    position fixed
    width 100%
    bottom 0
    background #fff
    >div
      line-height 1rem
      color #fff
      text-align center
      width 50%
    .lside
      float left
      background-color rgb(60, 180, 255)
    .rside
      float right
      color rgb(60, 180, 255)
::-webkit-scrollbar
  width 0px
</style>
