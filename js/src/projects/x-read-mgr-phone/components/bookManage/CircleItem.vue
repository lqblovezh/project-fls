<script>
export default {
  props: {
    type: {
      type: String,
      default: 'list'
    },
    // 1未开启 2开启 3锁定
    item: Object,
    page: Object,
  },
  data() {
    return {
      startPos: {},
    }
  },
  methods: {
    touchstartHandler(e) {
      log(e.changedTouches[0].pageX, 'start')
      this.startPos.x = e.changedTouches[0].pageX
      this.startPos.y = e.changedTouches[0].pageY
    },
    touchcancleHandler(e) {
    },
    touchmoveHandler(e) {
      let node = e.currentTarget
      let val = e.changedTouches[0].pageX - this.startPos.x
      let y = e.changedTouches[0].pageY - this.startPos.y
      if(Math.abs(y) - Math.abs(val) > 20 ){ //说明是上下滑动, 此时不触发x
        return
      }
      if (Math.abs(val) > 20) {
        // node.style.transform = `translateX(${val}px)`
        node.style.transition = `transform ease 0.3s`
        if (val < 0) {
          node.style.transform = `translateX(-1.6rem)`
        } else {
          node.style.transform = `translateX(0px)`
        }
      }
    },
    touchendHandler(e) {
      // let node = e.currentTarget
      // let val = e.changedTouches[0].pageX - this.startPos.x
      // log(val, 'end')
      // node.style.transition = `transform ease 0.3s`
      // if (val < 0) {
      //   node.style.transform = `translateX(-1.6rem)`
      // } else {
      //   node.style.transform = `translateX(0px)`
      // }
      // this.startPos.x = null
    },
  }

}
</script>

<template lang="pug">
.main-wrap(
  @touchcancle = "touchcancleHandler"
  @touchmove = "touchmoveHandler"
  @touchend = "touchendHandler"
  @touchstart = "touchstartHandler") 
  .main() 
    .top  
      .left 
        .img(@click="$emit('detail')") 
          img( v-lazy="item.img_src")
      .right
        .title.ell(@click="$emit('detail')") {{item.book_name}}
        .list(v-show="type == 'list'") 
          .author()  
            .span.ell 作者：{{item.author}}
            //- .span.ell 作者：是枝裕和 已加入
          .theme
            .name 
              |共有
              span.num {{item.theme_number}}
              |个主题
            .add.true(   v-if="false" @click="$emit('addQuan',item)" )
        .detail(v-show="type == 'detail'")  
          .author.time
            .span.ell 开始日期：{{item.create_time}}
            .span.ell 开始日期：{{item.update_time}}
          .calc  
            .total 
              span 共有  
              span.main-color(v-if="type == 'detail'")   {{page.total}}  
              span 主题，
              span 成员：
              span.main-color {{item.member}}
              span 人  

          // .icons(v-show="type == 'detail'")  
          //   .icon.listen  
          //   .icon.book  
          //   .icon.see  
    .line-single(v-show="type == 'list'")           
    .bottom( v-show="type == 'list' ") 
      .time 
        span 参与成员：
        span.main-color {{item.member}}
        span 人
      .circle-btn(:class="{primary:item.status === 2,danger:item.status !== 2 }")  {{item.type_name}}
  .aside( @click="$emit('lock', item)" :class="{danger:item.status === 2}") 
    span.txt(v-show="item.status == 1") 开启
    span.txt(v-show="item.status == 2") 锁定
    span.txt(v-show="item.status == 3") 开启
</template>

<style lang="stylus" scoped>
.main-wrap
  display flex
  width 9.1rem // 必须给容器的宽度,因为自动变宽的最大限度是最大宽度
  overflow auto
  &::-webkit-scrollbar
    display none
  .aside
    overflow scroll
    width 1.6rem
    flex none
    background #14afff
    color #fff
    text-align center
    font-size 16px
    line-height 2.8rem
    &.danger
      background #ff6b7a
      color #fff
.circle-btn
  height 21px
  font-size 12px
  line-height 21px
  border-radius 10px
  padding 0 15px
  display inline-block
  &.primary
    border 1px solid #14afff
    color #14afff
  &.danger
    border 1px solid #ff6b7a
    color #ff6b7a
.main
  padding 0.3rem
  padding-bottom 0
  width 6.9rem
  flex none
.num
  color #14afff
.bottom
  display flex
  font-size 0.22rem
  color #666
  height 0.67rem
  line-height 0.67rem
  justify-content space-between
  align-items center
.top
  display flex
  padding-bottom 0.3rem
  overflow scroll
  .aside
    width 1.6rem
    flex none
  .right
    padding-left 0.23rem
    width 4rem
    flex none
    overflow hidden
    .title
      font-size 0.32rem
      height 0.4rem
      text-indent 1rem
      background url('./img/quan.png') no-repeat left center
      background-size 0.7rem 0.34rem
      line-height 0.45rem
    .icons
      display flex
      align-items center
      .icon
        width 0.5rem
        height 0.5rem
        margin 0 3px
        &.listen
          background url('./img/listen.png') no-repeat left
          background-size 0.38rem 0.34rem
        &.listen
          background url('./img/listen.png') no-repeat left
          background-size 0.38rem 0.34rem
        &.book
          background url('./img/Ebook.png') no-repeat left
          background-size 0.38rem 0.34rem
        &.see
          background url('./img/see.png') no-repeat left
          background-size 0.38rem 0.34rem
    .author
      font-size 0.24rem
      color #999
      padding 0.1rem 0
      &.time
        color #666
      .span
        height 0.35rem
        line-height 0.35rem
    .calc
      .total
        color #666
        font-size 12px
        margin-top 10px
    .theme
      font-size 0.28rem
      color #333333
      display flex
      justify-content space-between
      line-height 0.43rem
      .add
        width 1.32rem
        height 0.38rem
        background url('./img/add.png') no-repeat left center
        background-size 100%
        &.true
          background url('./img/add-true.png') no-repeat left center
          background-size 100%
  .left
    width 1.66rem
    height 1.66rem
    flex none
    .img
      text-align center
      border-radius 50%
      overflow hidden
      border 2px solid #14afff
      box-sizing border-box
      height 100%
      >img
        width 1.22rem
        height 1.66rem
</style>
