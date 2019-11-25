<script>
export default {
  data () {
    return {
      options: {
        goods_id: '',
        type: 9,
        pay_type: 2
      },
      goods: {},
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      try {
        // console.log(JSON.parse(window.localStorage.getItem('cart')))
        const cart = (this.$user && JSON.parse(window.localStorage.getItem('cart'))[this.$user.id]) || {}
        this.goods = cart
        this.options.goods_id = cart.goods_id
        this.options.rf_url = `${this.$route.query.redirect_url}&state=wailian`
      } catch(e) {
        console.warn(e.toString)
      }
    },
    addToBookself () {
      return this.$service.bookShelf.add({
        book_id: this.goods.goods_id,
        type: this.goods.type,
      })
    },
    async payOrder () {
      try {
        await this.addToBookself()
        const { data } = await this.$service.order.addOrder(this.options)
        window.location.href = data.url
        // window.location.href = 'https://www.baidu.com'
      } catch(e) {
        this.$Toast(e.payload.errors[0] || '订单添加失败，请稍后再试')
      }
    }
  }
}
</script>
<template lang="pug">
.page-order
  Head(name="订单支付" type="dark")
  section.order-info
    p.title 商品信息
    .order-item.flex
      .icon-good-default(style="background-size:100px 80px;width:100px")
      .order-item__detail.flex
        .order-item__name.f16.ellipsis-2 {{ goods.name }}
        //- .order-item__intro.f12 {{ good.components["副标题"] }}
        .order-item__price.f14 价格：
          span.f18 ￥{{ parseFloat(goods.price).toFixed(2) }}
  .line-order
  section.pay-method
    p.title 付款方式
    .pay-item.flex
      .pay-item__left.flex
        .ib.icon-alipay-small
        span.f14 支付宝支付
      .item-radio
        input(type="radio" name="payMethod" value="2" v-model="options.pay_type")
    .pay-item.flex
      .pay-item__left.flex
        .ib.icon-weixin-small
        span.f14 微信支付
      .item-radio
        input(type="radio" name="payMethod" value="3" v-model="options.pay_type")
  .line-order
  section.afford.f14
    p 总价：
      span.f18 ￥{{ goods.price }}
    button.linear-btn.btn-reset.c_f.f16(@click="payOrder") 立即付款
</template>
<style lang="stylus">
.item-radio
  input[type="radio"]
    position relative
    width 15px
    height 15px
    border 1px solid #ccc
    &:before
      content ''
      display inline-block
      position absolute
      height 15px
      width 15px
      left 0
      top 0
      background-color #FFF
      border-radius 50%
      border 1px solid #ccc
      box-sizing border-box
  input[type="radio"]:checked
    &:before
      background-color #3496e1
      border 3px solid #FFF
      box-shadow 0 0 0 1px #ccc
.page-order
  >section
    padding 0 15px
    >.title
      margin 15px 0 0 0
      padding 0
      position relative
      padding-left 15px
      line-height 1
      &:after
        content ''
        display inline-block
        position absolute
        left 0
        top 0
        height 100%
        width 4px
        background linear-gradient(to bottom, #F6D27E, #B1936A)
    >button
      width 100%
      height 35px
      border-radius 5px
  >.line-order
    height 4px
    background-color #f3f2f2
  >.order-info
    >p
      margin-bottom 15px
    >.order-item
      padding-bottom 20px
      >.order-item__detail
        flex 1
        flex-direction column
        justify-content space-between
        margin-left 20px
        >.order-item__name
          color #444
          line-height 24px
        >.order-item__intro
          color gray
        >.order-item__price
          color #666
          >span
            color #ff9306
  >.pay-method
    >.pay-item
      height 50px
      align-items center
      justify-content space-between
      >.pay-item__left
        align-items center
        >span
          margin-left 10px
  >.afford
    margin-top 20px
    span
      color #ff9306
</style>