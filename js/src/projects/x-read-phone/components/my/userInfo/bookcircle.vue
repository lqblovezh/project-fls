<script>
import * as service from 'services/x-read/userCenter'
import * as serviceCircle from 'services/x-read/circleBook'
export default {
  data() {
    return {
      page: {
        offset: 10,
      },
      pageSize: 4,
      list: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList(pageStart = 0, pageOffset = 10, isClean = false) {
      return service.circle({ pageStart, pageOffset }).then(res => {
        this.page = res.page
        if (isClean) {
          this.list = res.data
        } else {
          this.list = [...this.list, ...res.data]
        }
        if (this.list.length == res.page.total) {
          return true
        }
      })
    },
    loadMore(load) {
      this.getList(this.list.length).then(load)
    },
    refresh() {},
    go(url) {
      this.$router.push({ path: url })
    },
    delCircle(item, index) {
      serviceCircle.circleOut({ id: [item.user_delete_id] }).then(res => {
        this.list.splice(index, 1)
      })
    },
    touchStartHandler(e) {
      this.pageXStart = e.changedTouches[0].pageX
      this.pageYStart = e.changedTouches[0].pageY
    },
    touchEndHandler(e) {
      this.pageXEnd = e.changedTouches[0].pageX
      this.pageYEnd = e.changedTouches[0].pageY
      const substractX = this.pageXEnd - this.pageXStart
      const substractY = this.pageYEnd - this.pageYStart
      if (Math.abs(substractX) > 20 && Math.abs(substractY) < 60) {
        if (substractX > 0) {
          //右滑
          e.currentTarget.classList.remove('move-left')
          e.currentTarget.classList.add('move-right')
        } else {
          e.currentTarget.classList.remove('move-right')
          e.currentTarget.classList.add('move-left')
        }
      }
      console.dir(e.currentTarget)
    },
  },
}
</script>

<template lang='pug'>
.box
  Head(name="我的书圈" hide="true")
  div.main(v-if="list.length")
    Scroll(top='0.9'  @loadMore="loadMore" @refresh="refresh")
      .list(v-for='(item, index) in list'
        :key="item.id"
        )
        .item-circle-wrap
          .item(
              @touchstart="touchStartHandler"
              @touchend="touchEndHandler"
            )
            .left(@click="go('/bookCircleList/comment?id='+item.id)")
              .ctn
                .lside
                    img(:src='item.img_src' alt='#')
                .rside
                    h3
                        span.bookcircle 书圈
                        span(v-text='item.book_name')
                    .main
                        p 作者：{{item.author}}
                    div
                      span 共有
                      span.color  {{item.theme_number}}
                      span  个主题
              .bottom
                  p
                    span 开始 {{item.create_time}}
                    span.newtime 最新 {{item.update_time}}
            .right(@click="delCircle(item, index)")  退出
        .line-part

</template>


<style lang='stylus' scoped>
.item-circle-wrap
  overflow hidden
.item
  display flex
  width 9rem
  transition transform 0.3s ease-in-out
  &.move-left
    transform translateX(-1.5rem)
  &.move-right
    transform translateX(0rem)
  .left
    width 7.5rem
    flex none
  .right
    width 1.5rem
    flex none
    background-color #ff6b7a
    text-align center
    color #fff
    font-size 16px
    letter-spacing 2px
    line-height 140px
.box
  height 100vh
  overflow scroll
.zw
  border-bottom 0.22rem solid #e5eef2
.goBack
  width 0.35rem
  margin-left 0.1rem
.main
  .list
    font-size 0.28rem
    .ctn
      padding 0 0.35rem
      padding-bottom 0.25rem
      overflow hidden
      width 100%
      padding-top 15px
      .lside
        border-radius 1.77rem
        border 2px solid #43bfff
        width 1.77rem
        height 1.77rem
        overflow hidden
        text-align center
        float left
        margin-right 0.26rem
        img
          height 1.77rem
      .rside
        float left
        h3
          color #333
          font-size 0.32rem
          line-height 0.5rem
          .bookcircle
            font-size 0.24rem
            background #3cbad3
            color rgba(255, 255, 255, 0.8)
            font-weight normal
            padding 0.05rem 0.1rem
            border-radius 5px
            margin-right 0.3rem
        .main
          color #999
          font-size 0.24rem
          padding 0.1rem 0
          line-height 0.4rem
        .color
          color #43bfff
    .bottom
      padding 0 15px
      p
        font-size 12px
        border-top 1px solid #eee
        line-height 30px
        height 30px
        color #999
      .newtime
        float right
</style>
