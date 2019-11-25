<script>
import ReplyItem from './comp/ReplyItem'
import Reply from './comp/Reply'
import CommentItem from './comp/CommentItem'
import ReplyInput from './comp/ReplyInput'
import mixins from './mixins'
import { mapState } from 'vuex'
export default {
  components: {
    ReplyItem,
    Reply,
    CommentItem,
    ReplyInput,
  },
  mixins: [mixins],
  asyncData({ store, route }) {
    return store.dispatch('circle/getCommentList', {
      id: route.query.commentId,
      clean: true,
    })
  },
  mounted() {
    // 注意, 把主数据放在localStorage, 
    this.commentDetail = JSON.parse(localStorage.commentDetail)
    this.setReplyParams()
    this.tempCommentId = this.$route.query.commentId
    this.tempUserId = this.commentDetail.user_id
  },
  beforeDestroy() {
    this.$store.state.circle.commentList = []
  },
  data() {
    return {
      tempCommentId: '',
      tempUserId: '',
      commentDetail: {},
    }
  },
  computed: {
    ...mapState({
      list: state => state.circle.commentList,
    }),
  },
  methods: {
    loadMore(end) {
      this.$store
        .dispatch('circle/getCommentList', {
          pageStart: this.list.length,
          id: this.$route.query.commentId,
        })
        .then(end)
        .catch(err => end(true))
    },
    topicReply(item) {
      console.log(item)
      this.replyChild(item)
    },
    replyChild(item) {
      console.log(item)
      if (item.id != this.tempCommentId) {
        this.$refs.replyInp.clean()
      }
      this.setReplyParams(item.id, item.user_id)
      this.$refs.replyInp.focus()
    },
    blurHandler() {
      console.log('blurHandler')
      // this.setReplyParams()
    },
    setReplyParams(commentId, userId) {
      this.tempCommentId = commentId || this.$route.query.commentId
      this.tempUserId = userId || this.commentDetail.user_id
    },
    like(item) {
      this.$like(item)
    },
    comment(item) {
      console.log(item)
    },
    async commit(data, cleanCb) {
      if (!this.$isLogin()) return
      await this.$service.circle.add({
        type: 2, 
        book_circle_comment_id: this.$route.query.commentId,
        book_circle_id: this.$route.query.id,
        replay_user_id: this.tempUserId,
        ...data,
      })
      this.$Toast('评论成功!')
      this.loadMore(_ => {})
      this.$refs.replyInp.clean()
    },
  },
}
</script>


<template lang="pug">
.page-circle-reply-list
  Head()
  ReplyInput(
    ref="replyInp" 
    @commit="commit"  
    @blur="blurHandler"
  )
  .wrapper   
    .mian
      Scroll(
        top="45px" 
        @loadMore="loadMore"
      )
        .reply-list
          ReplyItem(
            @like="like(commentDetail)"
            @goDetail="topicReply(commentDetail)"
            :item="commentDetail"
          )
        .child(v-if="list.length")
          CommentItem(
            v-for="item in list"
            :item="item"
            @reply="replyChild(item)"
            @like="like(item)"
          )
</template>
<style lang="stylus">
.page-circle-reply-list
  >.wrapper
    >.mian
      .reply-list
        box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
</style>
