<script>
import * as servers from 'services/x-read/mySale';
export default {
  data() {
    return {
      partshow: true,
      info: { account: '', name: '', Bank: '', type: '2' },
      money: {},
    }
  },
  methods: {
    changedemo(e) {
      this.partshow = e === 2 ? true : false;
      this.info = { account: '', name: '', Bank: '', type: e };
    },
    extract() {
      if (this.money.reward_money) {
        servers.cashs(this.info).then(res => {
          if (res.status) {
            this.$dialog.toast({
              mes: '提现成功',
              timeout: 1500,
              icon: 'success'
            });
          } else {
            this.$dialog.toast({
              mes: '提现失败',
              timeout: 1500,
              icon: 'error'
            });
          }
        })
      } else {
        this.$dialog.toast({
          mes: '提现金额小于0',
          timeout: 1500,
          icon: 'error'
        });
      }
    },
    getMoney() {
      servers.sum().then(res => {

        this.money = res.data;
      })
      servers.rule().then(res => {

      })
    }
  },
  created() {
    this.getMoney()
  }

}
</script>

<template lang='pug'>
    yd-layout
        yd-navbar.navbar(slot="navbar" title="现金提成" fontsize='.35rem' color='#000')
          router-link(to='/my' slot='left')
             img.goBack(src='./img/goBack.png')
        div.main
            yd-infinitescroll
              div(slot='list')
                yd-flexbox.pay
                  yd-flexbox-item
                    .item(@click='changedemo(2)') 
                        p(v-if='partshow')
                          img(src='./img/alipayhover.png')
                        p(v-else)
                          img(src='./img/alipay.png')
                        p.txt 支付宝
                  yd-flexbox-item
                    .item(@click='changedemo(1)')
                        p(v-if='partshow')
                          img(src='./img/pay.png')
                        p(v-else)
                          img(src='./img/payhover.png')
                        p.txt 银行转账
                  yd-flexbox-item(v-if="0")
                    .item(click='changedemo(3)')
                      p(v-if='partshow')
                        img(src='./img/wx.png')
                      p(v-else)
                        img(src='./img/wxhover.png')
                      p.txt 微信支付
                .part(v-show="partshow")
                    .number 
                      p.txt 请输入提现支付宝账号：
                      p 
                        input(type='text' v-model="info.account")
                      p.info(style='color:#ccc') 请确保您提现的账号输入正确 
                    .number
                      p.txt 请输入支付宝名称：
                      p 
                        input(type='text' v-model="info.name")
                .part(v-show="!partshow")
                    .number
                      p.txt 输入银行卡卡号：
                      p 
                        input(type='text' v-model="info.account")
                    .number 
                      p.txt 输入开户所在行：
                      p 
                        input(type='text' v-model="info.Bank")
                    .number 
                      p.txt 输入持卡人姓名：
                      p 
                        input(type='text' v-model="info.name")
                .price 
                  p 提现金额: 
                    span {{money.reward_money}}
                  p 提现手续费:
                    span {{money.service_money}}
                  p
                    input(type='checkbox' style='margin-right:0.1rem' :checked='true')
                    i(style='font-size:0.26rem;color:#3cb4ff;') 我已查看并同意 《XXXXXXXXXXXXXXXX》                   
        div.tabbar(slot="tabbar")

          .lside(@click='extract') 确定
          .rside(@click="$router.go(-1)") 返回
</template>


<style lang='stylus' scoped>
.navbar
  margin-bottom 0.2rem
.goBack
  width 0.35rem
  margin-left 0.1rem
.main
  background #fff
  padding 0 0.3rem
  color #333
  .pay
    text-align center
    padding 0.25rem 0
    img
      width 0.65rem
    .txt
      line-height 0.6rem
  .part
    display, .number
      p.txt
        line-height 1rem
      input
        border 1px solid #ddf3fc
        height 0.65rem
        width 100%
        text-indent 0.1rem
      .info
        margin 0.3rem 0
.price
  color #999
  line-height 0.8rem
  span
    color #e8554d
.tabbar
  position fixed
  width 100%
  bottom 0
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
</style>
