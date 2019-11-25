<script>
export default {
  data() {
    return {
      list: [
        { name: '书圈管理', className: 'book-circle', url: '/circleList' },
        { name: '销售业绩', className: 'sale', url: '/saleAchieve' },
        { name: '分销查询', className: 'distribute', url: '/distribute' },
        { name: '产品数据', className: 'product-data', url: '/productData' }
        // {name:'统计分析', className:'statistics', url:'/statistics'},
      ]
    }
  }
}
</script>


<template lang="pug">
div
  .welcome
    .title 欢迎来到
    .sub X-Read运营管理平台！
  .line-single
  .ls 
    .item( @click="$go(i.url)"  v-for="i in list" ) 
      .content 
        .icon(:class="i.className")
        .text {{i.name}}
  .bottom ©2012-2018精灵天下



</template>


<style lang="stylus" scoped>
.bottom
  margin-top 80px
  color #bbb
  text-align center
  height 30px
  font-size 12px
.welcome
  height 2.3rem
  text-align center
  line-height 0.6rem
  margin-top 0.6rem
  .title
    font-size 21px
    color #444444
    font-weight 800
  .sub
    font-size 18px
    color #777
.ls
  .item
    width 50%
    display inline-block
    height 2.9rem
    text-align center
    color #666
    font-size 12px
    border-bottom 1px solid #e5e5e5
    box-sizing border-box
    &:nth-child(odd)
      border-right 1px solid #e5e5e5
    .content
      margin-top 0.6rem
      .icon
        height 65px
        width 65px
        display inline-block
.book-circle
  background url('./img/bookCircle.png') no-repeat center
  background-size 64px
.sale
  background url('./img/sale.png') no-repeat center
  background-size 64px
.distribute
  background url('./img/distribute.png') no-repeat center
  background-size 64px
.product-data
  background url('./img/productData.png') no-repeat center
  background-size 64px
.statistics
  background url('./img/statistics.png') no-repeat center
  background-size 64px
</style>
