<script>
import * as circleBookServices from 'services/x-read/circleBook'
import { mapMutations, mapState } from 'vuex'
import ReplayItem from './ReplayItem'
import Replay from './Replay'
import Ritem from './Ritem'
import Citem from './Citem'
export default {
  name: 'themeReplayLsit',
  components: { ReplayItem, Replay, Ritem, Citem },
  created() {
    //keep-alive 下使用created替代created
    this.init()
  },
  data() {
    return {
      query: {},
      list: [],
      page: {},
      isReplayVis: false,
      replayMsg: {},
      detail: null,
    }
  },
  computed: {
    ...mapState({
      circleThemeDetail: state => state.bookinfo.circleThemeDetail,
    }),
  },
  methods: {
    init() {
      this.query = this.$route.query
      this.getList()
      this.getDetail()
    },
    getDetail() {
      return circleBookServices
        .commentDetail({
          pageStart: 0,
          pageOffset: 10,
          id: this.query.id,
          type: 1, // 代表获取主题的详情,没有获取该主题的评论
        })
        .then(res => {
          this.detail = res.data
        })
    },
    getList(pageStart = 0, pageOffset = 10, isClean = false) {
      return circleBookServices
        .commentDetail({ pageStart, pageOffset, id: this.query.id })
        .then(res => {
          if (res.data.length === 0) {
            return true
          }
          this.list = this.list.concat(res.data)
          this.page = res.page
          return false
        })
    },
    loadMore(miniRefresh) {
      this.getList(this.list.length, 10)
        .then(res => {
          miniRefresh(res)
        })
        .catch(err => {
          miniRefresh(true) // true 为没有了
        })
    },
    refresh() {},
    commentIconClick() {},
    thumbsUp(item) {
      if (this.$noLoginToast()) return
      this.$showLoading('请等待')
      circleBookServices.assist({ id: item.id }).then(res => {
        item.info_good_num = item.info_good_num + res.data.status
        this.$closeLoading()
      })
    },
    replayClickHandler(type, item = {}) {
      if (this.$noLoginToast()) return
      // book_circle_id 如果发表主题, 那么是书圈id, 如果发表主题回复, 那么是主题id
      let book_circle_id, replay_user_id
      //评论主题(发表主题回复), 不需要对象的user_id
      book_circle_id = this.$route.query.id
      replay_user_id = item.user_id
      this.isReplayVis = true
      this.replayMsg = { book_circle_id, replay_user_id, type }
    },
    replayComplete() {
      this.isReplayVis = false
      this.getList(this.list.length, 10)
      this.getDetail()
    },
    isVideo(url) {
      return url.substring(url.lastIndexOf('.') + 1) === 'mp4'
    },
    thumbsupEmit() {},
  },
}
</script>


<template lang="pug">
.theme-replay-list(v-if="detail")
  Replay(name="评论" v-if="isReplayVis"  
    :replayMsg="replayMsg"
    @replayComplete="replayComplete"
    @back="isReplayVis = false")
  Head(name="评论")
  .theme-comment 
  Scroll(top='0.9' bottom="0"  @loadMore="loadMore" @refresh="refresh"   )
    .citem-wrap
      Citem(:i="detail"
        @replayClickHandler="replayClickHandler" 
        @thumbsup="thumbsUp")
    .comments
      Ritem(v-for="(item,index) in list" :key="item.id"
        @replayClickHandler="replayClickHandler"
        @thumbsup="thumbsUp"  
        :item="item" )

</template>


<style lang="stylus" scoped>
.citem-wrap
  padding 10px 5px
.comments
  padding 0 15px 0px 15px
</style>
