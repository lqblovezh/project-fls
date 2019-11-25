<script>
import Item from './item'
import ReplayItem from './ReplayItem'
import Replay from './Replay'
import ScreenPanel from './ScreenPanel'
import { imgCompress } from '@/utils/util.js'
import * as circleBookServices from 'services/x-read/circleBook'
import * as common from 'services/x-publish/common'
import { mapMutations, mapState } from 'vuex'
import { noLoginToast } from '@/utils/util'
import dayjs from 'dayjs'

export default {
  name: 'comment',
  components: { Item, ReplayItem, Replay, ScreenPanel },
  created() {
    this.init()
  },
  data() {
    return {
      query: {},
      detail: null,
      commentList: [],
      page: {},
      currentComment: null, // 当前评论
      replayMsg: null, // 回复的相关信息
      isReplayVis: false,
      isScreenVis: false,
      currScreenVal: '',
      screenList: '',
      screenQuery: {},
      screenQueryTime: {},
      pickerTime: '',
    }
  },
  computed: {
    ...mapState({
      circleThemeDetail: state => state.bookinfo.circleThemeDetail,
    }),
  },
  methods: {
    ...mapMutations(['setCircleThemeDetail']),
    init() {
      this.commentList = []
      this.query = this.$route.query
      this.getDetail()
      this.getComment()
      this.getScreenList()
    },
    getDetail() {
      circleBookServices.detail(this.query).then(res => {
        this.detail = res.data
      })
    },
    getComment(pageStart = 0, pageOffset = 10, isClean = false) {
      return circleBookServices
        .comments({
          pageStart,
          pageOffset,
          ...this.query,
          ...this.screenQuery,
          ...this.screenQueryTime,
        })
        .then(res => {
          this.page = res.page

          if (isClean) {
            this.commentList = res.data
            return false
          }
          this.commentList.push(...res.data)
          if (res.data.length !== 0) {
            return false // 还有数据,  用于loadMore调用判断
          }
          return true // 全部数据已获取
        })
    },
    getScreenList() {
      circleBookServices.getScreenList().then(res => {
        this.screenList = res.data
      })
    },
    loadMore(miniRefresh) {
      let start = this.page.start + this.page.offset
      this.getComment(start, this.page.offset)
        .then(res => {
          miniRefresh(res)
        })
        .catch(err => {
          miniRefresh(true) // true 为没有了
        })
    },
    refresh() {},
    //  评论
    commentIconClick(obj, currentComment) {
      this.replayMsg = obj
      this.isReplayVis = true
      // 用于动态追加内容
      this.currentComment = currentComment
    },
    //点赞
    thumbsUp(item) {
      if (this.$noLoginToast()) return
      this.$showLoading('请等待')
      circleBookServices.assist({ id: item.id }).then(res => {
        item.info_good_num = item.info_good_num + res.data.status
        this.$closeLoading()
      })
    },
    //发表主题
    commentTheme(type) {
      if (this.$noLoginToast()) return
      this.replayMsg = { type, book_circle_id: this.query.id }
      this.isReplayVis = true
    },
    //筛选
    screen() {
      this.isScreenVis = true
    },
    //评论更多
    replayMore(item) {
      this.setCircleThemeDetail(item)
      this.$go('/bookCircleList/themeReplayLsit', { id: item.id })
    },
    // 回复成功的回调函数
    replayComplete() {
      this.isReplayVis = false
      if (this.replayMsg.type == 1) {
        this.getComment(this.commentList.length, 10)
      } else {
        circleBookServices.commentDetail({ id: this.replayMsg.book_circle_id }).then(res => {
          this.$set(this.currentComment.res_info, 'res', res.data)
          this.currentComment.res_info.total = res.page.total
        })
      }
    },
    screenSelect(item) {
      this.screenQuery = item[0]
      this.currScreenVal = item[1]
      this.getComment(0, 10, true)
      this.isScreenVis = false
    },
    async timePick() {
      this.timeType = 'start_time'
      this.$Toast({ message: '请选择开始时间' })
      await this.$openTimePick().then(res => {
        const time = dayjs(res).format('YYYY-MM-DD')
        this.screenQueryTime.start_time = time + ' 00:00:00'
      })
      await new Promise((res, rej) => {
        setTimeout(res, 400)
      })
      this.$Toast({ message: '请选择结束时间' })
      await this.$openTimePick().then(res => {
        const time = dayjs(res).format('YYYY-MM-DD')
        this.screenQueryTime.end_time = time + ' 23:59:59'
      })
      this.getComment(0, 10, true)
      this.isScreenVis = false
    },
    timePickEnd() {},
    confirm(date) {
    },
    visEssence() {
      this.screenQuery.essence_type = !this.screenQuery.essence_type
      this.getComment(0, 10, true)
    },
  },
}
</script>

<template lang="pug">
.div( v-if="detail" )
  .picktime 
    .name
  ScreenPanel(
    v-if="screenList"
    v-show="isScreenVis "
    :currVal="currScreenVal"
    :screenList="screenList"
    @timePick="timePick"
    @close="isScreenVis = false"
    @itemClickHandler="screenSelect")
  Replay(name="评论" v-if="isReplayVis"  
    :replayMsg="replayMsg"
    @replayComplete="replayComplete"
    @back="isReplayVis = false")
  Head(:name="detail.name")
  Scroll(top='0.9' bottom="0"  @loadMore="loadMore" @refresh="refresh"   )
    .main
      .top
        Item(type="detail" :item="detail"  )
      .line-single
      .oper
        .comment(@click="commentTheme(1)")
          img(src="./img/comment.png")
          span 发表
        .essence(@click="visEssence")
          .icon-essence
          span 精华
      .line-part
      .comment.commentList()
        ContentTitle( name="全部主题" :num="page.total")
          .select(@click='screen')  筛选
        .ls(v-if="commentList.length" )
          .item(v-for="i in commentList" :key="i.id")
            ReplayItem(:i="i"  @replayMore="replayMore"
              @commentIconClick="commentIconClick"
              @thumbsup="thumbsUp")
        .no-data(v-else) 暂无数据 

</template>

<style lang="stylus" scoped>
.icon-essence
  margin-right 10px
.picktime, .commentList
  .ls
    >.item
      border-bottom 1px solid #ddd
.preview-img
  .imgs-wrap
    padding 0.2rem
    .ls
      display flex
      margin 0.2rem 0
      overflow scroll
      .item
        height 2.15rem
        position relative
        &:last-child
          .check
            right 0.08rem
          >img
            margin-right 0
        .check
          width 23px
          height 23px
          background url('./img/pic-check.png') no-repeat
          background-size 23px
          position absolute
          right 0.28rem
          top 0.08rem
          &.true
            background url('./img/pic-check-true.png') no-repeat
            background-size 23px
        >img
          height 100%
          width auto
          margin-right 0.2rem
.select
  background url('./img/select.png') no-repeat left
  background-size 0.28rem
  padding-left 0.35rem
  font-size 0.3rem
  line-height 0.5rem
  height 0.45rem
  width 1rem
  color #14afff
.oper
  display flex
  color #333
  font-size 14px
  height 0.85rem
  line-height 0.85rem
  >div
    flex 1 1 auto
    text-align center
    &:first-child
      position relative
      &::after
        content ' '
        position absolute
        width 1px
        height 0.27rem
        background #999
        right 0
        top 50%
        transform translate(0, -50%) scaleX(0.5)
    >img
      width 0.28rem
      height 0.32rem
      vertical-align middle
      margin 0 10px
      margin-top -0.05rem
</style>
