<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
      default: 0
    },
    time: {
      type: String,
      require: true,
    },
    orderInfo: {
      type: Object,
      required: true
    }
},
     methods: {
     async goRead (item) {
      try {
        let res = await this.$service.category.getAccessCode({
          product_id:item.goods_infos.components.read_product,
          book_id:item.goods_infos.components.read_book
        })
        localStorage.access_code = res.data
        this.$go('/reader', {
          product_id:item.goods_infos.components.read_product,
          book_id:item.goods_infos.components.read_book
        })
      } catch(e) {
        console.log(e)
      }
    },
  }
  }
</script>
<template lang="pug">
.comp-record
  .record-wrap(@click="goRead(orderInfo)")
    .record-head
      p.f15.ellipsis {{ orderInfo.goods_infos.name}}
      p.f12.c_gray1 订单号：{{ orderInfo.order_id }}
    .record-body.flex-between-center
      p.c_gray1.f12 时间：{{ time }}
      p.price.f14 金额：￥
        span.f18 {{ price }}
</template>
<style lang="stylus">
.comp-record
  padding 0 15px
  margin-bottom 15px
  p
    margin 0
    padding 0
  >.record-wrap
    padding 11px 16px 17px 17px
    position relative
    box-shadow 0 3px 5px rgba(0,0,0,.1), 0 -1px 5px rgba(0,0,0,.1)
    &:before
      content ''
      position absolute
      left -5px
      top 0
      display inline-block
      height 100%
      width 10px
      border-radius 5px
      background linear-gradient(to right, #F6D27E, #B1936A)
      // background radial-gradient(#B1936A, #F6D27E)
      z-index 1
    &:after
      content ''
      position absolute
      left 0
      top 0
      display inline-block
      height 100%
      width 5px
      background-color #FFF
      z-index 1
    >.record-head
      padding-bottom 10px
      border-bottom 2px solid #F0F2FE
      p
        line-height 2
        &:first-child
          font-weight bold
          flex 1
        // &:last-child
        //   width 100px
    >.record-body
      margin-top 15px
      >.price
        color #676A7B
        span
          color #F15A4A
</style>