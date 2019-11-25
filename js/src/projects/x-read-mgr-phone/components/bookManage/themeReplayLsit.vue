<script>
import { mapMutations, mapState } from 'vuex'
import ReplayItem from './ReplayItem'
import * as circleCommentServices from 'services/x-read/circleComment'
import * as circleBookServices from 'services/x-read/circleBook'
import * as circleThemeServices from 'services/x-read/circleTheme'

export default {
  name: 'themeReplayLsit',
  components: { ReplayItem },
  created() {
    //keep-alive 下使用activated替代created
  },
  activated() {
    this.init()
  },
  data() {
    return {
      query: {},
      list: [],
      page: {}
    }
  },
  computed: {
    ...mapState({
      commentSingleDetail: state => state.commentSingleDetail
    })
  },
  methods: {
    init() {
      this.query = this.$route.query
      this.refresh()
    },
    getList(pageStart = 0, pageOffset = 10, isClean = false) {
      return circleCommentServices
        .getList({ pageStart, pageOffset, id: this.query.id })
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
    refresh(pageStart = 0, pageOffset = 10) {
      return circleCommentServices.getList({
        pageStart,
        pageOffset,
        id: this.query.id
      }).then(res => {
        this.list = res.data
        this.page = res.page
      })
    },
    commentIconClick() { },
    thumbsUp(item) {
      log(22)
      circleCommentServices.assist({ id: item.id }).then(res => {
        // 0
        // this.getComment(0 , )
        item.info_good_num = item.info_good_num + 1
      })
    },
    oper(e, item, index) {
      // 对主题的操作
      let className = e.target.className
      if (className.indexOf('del') > 0) {
        // confirm弹出
        this.$confirm('是否删除该评论?')
          .then(res => {
            circleCommentServices.del({ id: item.id }).then(res => {
              // 删除该条记录
              // 向下获取的时候,起始应该是当前数组的当船
              // this.commentList.splice(index , 1)
              // 小于10条的时候查询查询,
              if (this.list.length > 10) {
                this.list.splice(index, 1)
              } else {
                this.refresh(0, 10)
              }
            })
          })
          .catch(err => { })
      } else if (className.indexOf('shield') > 0) {
        //屏蔽
        circleCommentServices.modify({ id: item.id, status: 1 })
      } else if (className.indexOf('baned') > 0) {
        // 禁言
        circleThemeServices.userModify({ id: item.user_id, status: 2 })
      } else if (className.indexOf('open') > 0) {
        // 开启
        circleCommentServices.modify({ id: item.id, status: 2 })
      }
    }
  }
}
</script>


<template lang="pug">
.replaylist 
  Head(name="评论")
  Scroll(top='0.9'   @loadMore="loadMore" @refresh="refresh"   )
    .ReplayItem
      ReplayItem(:i="commentSingleDetail")
    .line-part  
    .title 
      ContentTitle( name="全部主题" :num="page.total")
    .comments
      div(v-for="(item,index) in list" :key="item.id" )
        .item
          .left 
            img(v-lazy="item.user_picture ")
          .right 
            .name 
              .author {{item.nick_name}}
              //- .author-type  专家
            .time {{item.create_time}}
            .img-wrap.replay
              .imgs(v-if="item.img_src && item.img_src.length > 0")
                .img(v-for="items in item.img_src") 
                  img(v-lazy="items")
            .content {{item.value}}
            .rightIcon( @click="thumbsUp(item)"  ) 
              // IconZan( type="up") {{item.info_good_num}}
        .relay-content
          .replay-bottom(@click.stop="oper($event,item , index)")
            .wrap.shield  
              .text-icon.shield.true 屏蔽
            .wrap.over  
              .text-icon.baned.true 禁言
            .wrap.del   
              .text-icon.del.true 删除       
          .line-single      

</template>


<style lang="stylus" scoped>
.replay-bottom
  display flex
  .wrap
    flex auto
    text-align center
    padding 15px 0
.replay-more
  text-align center
  color #14afff
  font-size 12px
  height 0.6rem
  line-height 0.6rem
.replaylist
  // padding 0.3rem
  // padding-bottom 0
.comments
  padding-left 0.3rem
  .item
    padding-top 0.3rem
    &:last-child
      border none
  .rightIcon
    position absolute
    right 0
    top 0
.icons
  display flex
  height 0.55rem
  margin-top 0.1rem
  justify-content space-between
  width 100%
  .leftIcons
    display flex
  .rightIcon
    float right
.item
  display flex
  .left
    flex none
    width 0.74rem
    height 0.74rem
    overflow hidden
    border-radius 50%
    >img
      width 100%
      height 100%
  .right
    padding-left 0.2rem
    flex 1 1 0.7rem
    position relative
    .img-wrap
      &.replay
        .imgs
          width 5.4rem
      .imgs
        display flex
        overflow scroll
        width 6rem
        .img
          margin-right 10px
          height 2.2rem
          >img
            height 100%
            width auto
    .name
      font-size 0.28rem
      display flex
      .author
        color rgba(8, 71, 102, 0.8)
        height 0.36rem
        line-height 0.36rem
        padding-right 0.2rem
    .time
      color #999
      font-size 0.24rem
      margin 0.1rem 0rem
    .content
      color #333
      line-height 0.35rem
      margin 0.15rem 0
      word-break break-all
</style>
