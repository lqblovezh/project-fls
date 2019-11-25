<script>
import * as bookinfoServices from 'services/x-read/bookInfo'
import Citem from './Citem'
export default {
  components: { Citem },
  props: ['id', 'msg'],
  created() {
    this.getCommentList()
    // this.commentList = this.msg.res
  },
  data() {
    return {
      isCommentVis: false,
      commentList: [],
      mode: '', // mor== 更多列表
      page: {
        offset: 10,
      },
    }
  },
  methods: {
    goComment() {
      if (this.$noLoginToast()) return
      this.isCommentVis = true
    },
    getCommentList(pageStart = 0, pageOffset = 10, isClean = false) {
      return bookinfoServices
        .getBookComment({ pageStart, pageOffset, book_id: this.id })
        .then(res => {
          this.page = res.page
          if (isClean) {
            this.commentList = res.data
          } else {
            this.commentList = [...this.commentList, ...res.data]
          }
          if (this.commentList.length === res.page.total) {
            return true
          }
        })
    },
    commit(data) {
      bookinfoServices.bookComment({ book_id: this.id, ...data }).then(res => {
        this.isCommentVis = false
        if (this.mode) {
          // 可能会根据不同mode做不一样的请求, 在mode:more 下, 可能是追加
          this.getCommentList(0, 10, true)
        } else {
          this.getCommentList(0, 10, true)
        }
        this.$Toast({ message: '评论成功!' })
      })
    },
    upBook(item) {
      bookinfoServices.bookCommentUp({ id: item.id }).then(res => {
        item.book_thumbs = res.data
      })
    },
    moreBack() {
      this.mode = ''
    },
    loadMore(load) {
      this.getCommentList(this.commentList.length, 10).then(load)
    },
  },
}
</script>


<template lang="pug">
  div.detail-comment
    ReplayComment(v-if="isCommentVis" @commit="commit" @back="isCommentVis=false")  
    ContentTitle(name="评论")  
      .comment(@click="goComment") 
    .conetnt(v-if="commentList.length")   
      .ls 
        .item(v-for="item,index in commentList" v-if="index < 3 " :key="item.id"  ) 
          Citem(:item="item" @up="upBook")
      .more(@click="mode = 'more'" v-if="commentList.length > 3") 查看更多  
    .else(v-else) 暂无评论    
    .more-scroll(v-if="mode==='more'") 
      Head(@back="moreBack" name="评论" backUrl="no")
      Scroll(top="0.9" bottom="1" @loadMore="loadMore")
          .item(v-for="item,index in commentList" :key="item.id"  ) 
            Citem(:item="item" @up="upBook" @loadMore="loadMore")
</template> 


<style lang="stylus" scoped>
.more-scroll
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 1500
  background #fff
.else, .more
  text-align center
  color #666
  line-height 30px
  font-size 12px
.comment
  height 40px
  width 60px
  padding 0 10px
  background url('./img/comment.png') no-repeat center
  background-size 50px 16px
</style>
