<script>
import Citem from './Citem'
import Ritem from './Ritem'
import { mapMutations, mapState } from 'vuex'
export default {
  props: ['i'],
  components: { Citem, Ritem },
  data() {
    return {}
  },
  computed: {
    list() {
      return this.i.res_info.res
    },
  },
  methods: {
    replayClickHandler(type, item = {}) {
      console.log(item)
      // return
      if (this.$noLoginToast()) return
      // book_circle_id 如果发表主题, 那么是书圈id, 如果发表主题回复, 那么是主题id
      let book_circle_id, replay_user_id, book_circle_comment_id
      if (type === 1) {
        //发表主题
        // book_circle_id = this.query.id
      } else if (type === 2) {
        //评论主题(发表主题回复)
        book_circle_id = this.i.id
        // replay_user_id = this.currentComment.user_id
        //对 主题回复 的 评论
        replay_user_id = item.user_id
        book_circle_comment_id = item.book_circle_comment_id
      }
      let obj = {
        type,
        book_circle_id,
        replay_user_id,
        book_circle_comment_id,
      }
      this.$emit('commentIconClick', obj, this.i)
    },
    isVideo(url) {
      return url.substring(url.lastIndexOf('.') + 1) === 'mp4'
    },
    thumbsupEmit(item) {
      this.$emit('thumbsup', item)
    },
    goMore(item) {
      this.$emit('replayMore', this.i)
    },
  },
}
</script>

<template lang="pug">
.div
  Citem(:i="i" 
    @goMore="goMore"
    @replayClickHandler="replayClickHandler" 
    @thumbsup="thumbsupEmit"  )
  .line-single(v-if="i.res_info")
  ul.comments(v-if="i.res_info")
    Ritem(:item="item" 
      v-if="index < 3"
      v-for="(item, index) in list" :key="item.id"
      @replayClickHandler="replayClickHandler"
      @thumbsup="thumbsupEmit" )
    .replay-more( v-if="i.res_info.total > 3" @click="$emit('replayMore' , i )   ") 更多 
            
</template>


<style lang="stylus" scoped>
.replay-more
  text-align center
  color #14afff
  font-size 12px
  height 0.6rem
  line-height 0.6rem
.div
  padding 0.3rem
  padding-bottom 0
</style>
