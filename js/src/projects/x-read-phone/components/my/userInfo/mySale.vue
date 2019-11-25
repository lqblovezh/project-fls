<script>
import * as service from 'services/x-read/mySale'
export default {
  data() {
    return {
      list: [],
      reward_money: '',
      page: {
        offset: 10,
      },
    }
  },
  created() {
    this.getList()
    this.getCount()
  },
  methods: {
    getList(pageStart = 0, isClean = false) {
      return service
        .getList({
          pageStart,
          pageOffset: this.page.offset,
        })
        .then(res => {
          this.page = res.page
          if (isClean) {
            this.list = res.data
          } else {
            this.list.push(...res.data) // 有点违反不可变数据
          }
          if (this.list.length === res.page.total) {
            return true
          }
        })
    },
    getCount() {
      service.sum().then(res => {
        this.reward_money = res.data.reward_money
      })
    },
    go(url) {
      this.$router.push({ path: url })
    },
    loadMore(cb) {
      this.getList(this.list.length).then(cb)
    },
    refresh() {
      this.getList(0, true)
      this.getCount()
    },
  },
}
</script>

<template lang="pug">
  .box
    Head(name="我的分销" hide="true")    
    Scroll(top="0.9" @loadMore="loadMore" @refresh="refresh")
      div
        .banner
          .rule(@click='go("/rule")')
            img(src='./img/u_2009.png')
            span 分销规则
          .price {{reward_money}}
          yd-button.button(bgcolor='#fff' color='#3cb4ff' shape='circle' @click.native='go("/cash")') 点击提现
        .ls
          .item(v-for='item in list')
            img.tx(:src='item.picture' v-if="item.picture" )
            img.tx(src='./img/userImg.png' v-else )
            .txt
              div.d1
                span.name {{item.user_nick}}
                span.bookname {{item.goods_info.name}}
              div.d2
                span.name {{item.pay_time.substr(0,10)}} 购买
                span.bookname.r2 ￥{{item.money}}
            .getprice.r2  ￥{{item.reward_money}}


    //- div
      .banner
          .rule(@click='go("/rule")')
            img(src='./img/u_2009.png')
            span 分销规则
          .price {{reward_money}}
          yd-button.button(bgcolor='#fff' color='#3cb4ff' shape='circle' @click.native='go("/cash")') 点击提现
      dl
        dd(v-for='item in list')
          img.tx(:src='item.picture' v-if="item.picture" )
          img.tx(src='./img/userImg.png' v-else )
          .txt
            div.d1
              span.name {{item.user_nick}}
              span.bookname {{item.goods_info.name}}
            div.d2
              span.name {{item.pay_time.substr(0,10)}} 购买
              span.bookname.r2 ￥{{item.money}}
          .getprice.r2  ￥{{item.reward_money}}
</template>

<style lang="stylus" scoped>
.box
  height 100vh
  overflow scroll
.goBack
  width 0.35rem
  margin-left 0.1rem
.banner
  height 3.5rem
  width 100%
  color #fff
  text-align center
  background url('./img/userInfoBg.png') no-repeat
  background-size 100% 100%
  padding 0.3rem
  .rule
    text-align right
    line-height 0.35rem
    img
      width 0.35rem
      margin-right 0.1rem
  .price
    font-size 0.72rem
    padding 0.4rem 0
  .button
    font-size 0.28rem
    padding 0.05rem 0.4rem
.ls
  padding 0 15px
.item
  padding 0.3rem 0
  border-bottom 1px solid #e8e8e8
  overflow hidden
  .tx
    width 13%
    border-radius 5rem
    margin-right 3%
  img
    float left
  .txt
    float left
    width 70%
    div
      font-size 0.26rem
      span
        display inline-block
        overflow hidde
        line-height 0.5rem
      .name
        width 50%
      .bookname
        width 50%
    div.d2
      font-size 0.24rem
      .name
        color #999
    div.d1
      font-size 0.26rem
  .getprice
    float left
    width 10%
    line-height 1rem
  .r2
    color #e8554d
::-webkit-scrollbar
  width 0px
</style>
