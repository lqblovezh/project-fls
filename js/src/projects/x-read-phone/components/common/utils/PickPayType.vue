<script>
import Head from '../head'
import store from '@/store'

export default {
  components: { Head },
  data() {
    return {
      list: [
        {
          name: '支付宝',
          icon: 'icon-alipay-large',
          type: '2',
          show: !this.$isWeixin,
        },
        {
          name: '微信',
          icon: 'icon-weixin-large',
          type: '3',
          show: this.$isWeixin,
        },
      ],
      isOpen: false,
      activeIndex: 0,
      price: '0',
    }
  },
  methods: {
    confirm() {
      this.res({ item: this.list[this.activeIndex], pay: true })
      this.isOpen = false
    },
    checkHandler(item, index) {
      this.activeIndex = index
    },
    open(res, rej) {
      // this.list[0].show = !this.$isWeixin && store.thirdConf.pay.alipay
      // this.list[1].show = this.$isWeixin && store.thirdConf.pay.wxpay
      this.res = res
      this.rej = rej
      this.isOpen = true
    },
    back() {
      this.isOpen = false
      this.res({ item: this.list[this.activeIndex], pay: false })
    },
  },
}
</script>


<template lang="pug">
div(v-if="isOpen") 
  .pay-wrap
    .my  
      Head( name="付款"  @back="back" backUrl="no")
    .line-part
    .pay-method 
      .tip 选择支付方式
      .ls 
        .item(v-for="item,index  in list" v-if="item.show" @click="checkHandler(item, index)" :key="item.icon") 
          .icon( :class="item.icon") 
          .name {{item.name}}
          .check(:class="index === activeIndex ? 'icon-check-true' : 'icon-check' ")
    .bottom-wrap       
      .bottom 
        .name 应付金额:     
        .price-color ￥  {{price}}   
        .confirm(@click="confirm")  
          .btn 确定
</template>
<style lang="stylus" scoped>
.pay-wrap
  z-index 1000
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background #fff
  .bottom-wrap
    z-index 1000
    position fixed
    right 0
    bottom 0
    left 0
    .bottom
      display flex
      height 50px
      line-height 50px
      padding 0 15px
      box-shadow 0px -4px 40px 0px rgba(8, 120, 178, 0.1)
      .name
        flex none
        width 45px
      .price-color
        flex auto
      .confirm
        .btn
          vertical-align middle
  .pay-method
    padding 0 15px
    .tip
      height 50px
      line-height 50px
      font-size 12px
      color #4d4d4d
    .ls
      .item
        display flex
        height 45px
        line-height 45px
        font-size 14px
        color #333
        >div
          height 100%
        .check
          width 25px
        .name
          flex auto
        .icon
          width 40px
          flex none
</style>
