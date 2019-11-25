<script>
import * as service from 'services/x-read/userCenter'
import * as circleBookServices from 'services/x-read/circleBook'

export default {
  data() {
    return {
      page: {
        // pageoffset设置成不需要自己传入,而是使用统一的值, 避免多处更改
        offset: 10,
      },
      list: [],
      query: {},
      isCommentVis: false,
    }
  },
  created() {
    this.getList(0, true)
  },
  methods: {
    getList(pageStart = 0, isClean = false) {
      return service
        .reply({
          pageStart: this.list.length,
          pageOffset: this.page.offset,
          ...this.query,
        })
        .then(res => {
          if (isClean) {
            this.list = res.data
            console.log(this.list)
          } else {
            this.list = [...this.list, ...res.data]
          }
          // 判断总数据量是否等于total来判断是否加载完
          if (this.list.length === res.page.total) {
            return true
          }
        })

      // servers
      //   .reply({ pageStart: this.pageSize * (this.page - 1), pageOffset: this.pageSize })
      //   .then(res => {
      //     this.list = [...this.list, ...res.data]
      //     if (this.list.length < this.pageSize || res.data.length <= 0) {
      //       /* 所有数据加载完毕 */
      //       this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone')
      //       return
      //     }
      //     /* 单次请求数据完毕 */
      //     this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad')
      //     this.page++
      //   })
    },
    go(url) {
      this.$router.push({ path: url })
    },
    replayClickHandler(item) {
      console.log(item)
      console.log('object')
      // this.$openReplay()
      this.curr = item
      this.isCommentVis = true
    },
    loadMore(cb) {
      this.getList(this.list.length).then(cb)
    },
    commit(data) {
      console.log(data)
      let obj = {
        type: 2,
        book_circle_id: this.curr.book_circle_id,
        replay_user_id: this.curr.user_id,
        book_circle_comment_id: this.curr.id,
      }

      circleBookServices
        .add({
          ...obj,
          value: data.text,
          // img: [...img, ...videoPath],
        })
        .then(res => {
          this.isCommentVis = false
          this.$Toast({ message: '操作成功!' })
        })
        .catch(({ message }) => {
          this.$Toast({ message })
        })
    },
    refresh(cb) {},
  },
}
</script>

<template lang='pug'>
.box
  //- 涉及到失败, 不好用promise的组件方式
  ReplayComment(v-if="isCommentVis" @commit="commit" @back="isCommentVis=false")
  Head(name='我的回复' hide="true")
  div.zw
  div.main(v-if="list.length")
      Scroll(@loadMore="loadMore" @refresh="refresh")
        .list(v-for=' (item,index) in list')
          //- .title
            div
              img(:src='item.user_picture_absolute')
            div
              p {{item.nick_name}}
              p.time {{item.create_time}}
          .msg  {{item.value}}
          .backmsg {{item.circle_common_value}}
          .write
            span {{item.theme_circle_common}}
            span.button(@click="replayClickHandler(item)")
                img(src='./img/write.png')
                i 回复

  div.tabbar(slot="tabbar")
</template>


<style lang='stylus' scoped>
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
      padding 0 0.35rem
      .title
        overflow hidden
        padding 0.4rem 0 0.2rem 0
        div
          float left
          line-height 0.4rem
          img
            width 0.8rem
            height 0.8rem
            margin-right 0.2rem
            border-radius 50%
          .time
            color #777
            font-size 0.24rem
      .msg
        line-height 0.4rem
        color #666
        padding-bottom 0.2rem
      .backmsg
        border 1px solid #a0bdcf
        padding 0.2rem 0.3rem
        line-height 0.5rem
        color #a0bdcf
      .write
        color #666
        line-height 1rem
        border-bottom 1px solid #eee
        .button
          float right
          color #3cb4ff
          img
            width 0.3rem
            float left
            margin 0.32rem 0.2rem 0 0
  ::-webkit-scrollbar
    width 0px
</style>
