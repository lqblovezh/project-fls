<script>
import DetailCard from './comp/DetailCard'
import DetailNav from './comp/DetailNav'
import ReplyItem from './comp/ReplyItem'
import ReplyBtn from './comp/ReplyBtn'
import CirclePerson from './comp/CirclePerson'
import Reply from './comp/Reply'
import mixins from './mixins'
import { mapState } from 'vuex'

export default {
  components: { DetailCard, DetailNav, ReplyItem, ReplyBtn, Reply, CirclePerson },
  mixins: [mixins],
  asyncData({ store, route }) {
    store.dispatch('circle/getCircleDetailPageData', route.query)
  },
  computed: {
    ...mapState({
      detail: state => state.circle.detail,
      list: state => state.circle.detailList,
      person_list: state => state.circle.person_list
    }),
  },
  data() {
    return {
      type: '1', //1话题  2书评
      isAdsorb: false, //是否吸附到了顶部
      reply: {
        isOpen: false,
        type: '',
      },
    }
  },
  beforeDestroy() {
    this.clean()
  },
  methods: {
    sort(type) {
      console.log(type)
    },
    loadMore(cb) {
      console.log('load')
      if (this.type !== '圈友') {
        this.$store
          .dispatch('circle/getDetailList', {
            pageStart: this.list.length,
            type: this.type,
            ...this.$route.query,
          })
          .then(cb)
      } else {
        this.$store.dispatch('circle/getCirclePerson', {
          pageStart: this.person_list.length,
          id: this.$route.query.id
        }).then(cb)
      }
    },
    changeType(item) {
      this.clean()
      this.type = item.type
      if (this.type !== '圈友') {
        this.$store
          .dispatch('circle/getDetailList', {
            pageStart: 0,
            type: this.type,
            clean: true,
            ...this.$route.query,
          })
          .then(res => {
            setTimeout(() => {
              this.$refs.scroll.reset()
            }, 0)
          })
        } else {
          this.$store.dispatch('circle/getCirclePerson', { id: this.$route.query.id, clean: true })
        }
        

      // console.log(item)
    },
    addCircle() {
      console.log('addCircle')
      this.$addCircle(this.detail)
      // this.$refs.replyInp.focus()
    },
    goReply(type) {
      this.reply.isOpen = true
      this.reply.type = type
    },
    goDetail(item) {
      this.$go('/circle-reply-list', {
        id: this.$route.query.id,
        commentId: item.id,
        type: this.type,
      })
      localStorage.commentDetail = JSON.stringify(item)
      this.$store.state.circle.commentDetail = item
    },
    like(item) {
      this.$like(item)
    },
    async commitReply(data) {
      console.log(data)
      if (!this.$isLogin()) return
      await this.$service.circle.add({
        book_circle_id: this.$route.query.id,
        ...data,
      })
      this.reply.isOpen = false
      this.$store.dispatch('circle/getDetailList', {
        type: this.type,
        clean: true,
        ...this.$route.query,
      })
    },
    clean() {
      this.$store.state.circle.detailList = []
    },
    // 顶部吸附
    scrollHandler(e) {
      const target = e.target
      // console.log(target.scrollTop)
      let abs = target.scrollTop - 170
      const { nav } = this.$refs
      if (abs > 0) {
        if (!this.isAdsorb) {
          nav.classList.add('true')
          this.isAdsorb = true
        }
      } else {
        if (this.isAdsorb) {
          nav.classList.remove('true')
          this.isAdsorb = false
        }
      }
    },
  },
}
</script>

<template lang="pug">
  .page-circle-detail
    Head( name="书圈" type="dark")
    .wrapper(v-if="detail")
      ReplyBtn(
        @goReply="goReply"
      )
      Reply(
        v-if="reply.isOpen"
        :reply="reply"
        :detail="detail"
        @commit="commitReply"
      )
      //- .inp-reply  
        span dasda
        input( ref="replyInp")
      .ls 
        Scroll( 
          ref="scroll"
          @scroll="scrollHandler" 
          top="44px" 
          bottom="50px" 
          @loadMore="loadMore"
          :isAutoLoad="false"
        ) 
          DetailCard(
            @addCircle="addCircle"
            :detail="detail"
            :name="detail.name"
            :img="detail.img_src"
            :author="detail.author"
            :navType="type"
          )
          .util-circle-nav-top
            .wrap(ref="nav")
              DetailNav(:value="type" @sort="sort" @changeType="changeType" )
          .ls-content(v-if="type !== '圈友'")
            ReplyItem(
              v-for="item in list"
              :key="item.id"
              :item="item"
              @goDetail="goDetail(item)"
              @like="like(item)"
              @comment="goDetail"
            )
          .ls-content(v-else)
            CirclePerson(v-for="item in person_list" :item="item")
</template>
<style lang="stylus">
.page-circle-detail
  >.wrapper
    >.inp-reply
      position fixed
      background #fff
      bottom 0
.util-circle-nav-top
  height 45px
  >.wrap
    &.true
      position fixed
      top 43px
      left 0
      right 0
      height 45px
      z-index 12
</style>
