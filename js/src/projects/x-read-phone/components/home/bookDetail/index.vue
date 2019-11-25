<script>
import { mapMutations, mapState } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as servicesAttach from 'services/x-read/attach'
import * as servicesCommon from 'services/common/member'
import Comment from './Comment'
import BookRelate from './BookRelate'
import { isWeixin } from '@/utils/util'
import { getQrcode } from 'services/common'

// import  * as bookServices  from 'services/x-read/bookInfo'

function getItmes() {
  const items = [
    { name: '电子书', icon: 'icon-book', type: 'Read', show: false, text: '' },
    { name: '听读', icon: 'icon-listen', type: 'Audio', show: false, text: '' },
    { name: '视读', icon: 'icon-see', type: 'Video', show: false, text: '' },
    { name: '资源', icon: 'icon-assets', type: 'Assets', show: false, text: '' },
    { name: '书友圈', icon: 'icon-friend', type: 'Circle', show: false, text: '' },
  ]
  return items
}

export default {
  components: { Comment, BookRelate },
  created() {
    this.init()
  },
  beforeRouteUpdate(to, form, next) {
    this.data = null
    // 初始化items ... 不优化的操作
    this.items = getItmes()
    next() // next 之后获得正确的query,然后给init使用
    this.init()
  },
  data() {
    return {
      query: {},
      items: getItmes(),
      all: null,
      content: {
        audios: [],
        books: [],
        pictures: [],
        videos: [],
      },
      rangeValue: 90,
      isGradeShow: false, // 评分框
      bookStars: 0,
      data: '',
    }
  },
  computed: {
    ...mapState({
      bookId: state => state.bookinfo.bookId,
      infos: state => {
        // 不能在里面用this
        return state.bookinfo.info.books_info
      },
      bookinfo: state => state.bookinfo.info,
      videos: state => state.bookinfo.videos,
      audios: state => state.bookinfo.audios,
      Ebooks: state => state.bookinfo.Ebooks,
      xList: state => state.bookinfo.xList,
    }),
    info() {
      if (this.query.from === 'theme') {
        return this.all
      } else {
        return this.infos
      }
    },
    isShowX() {
      if (!this.info.knowledge || this.info.knowledge.length === 0) {
        return false
      }
      return true
    },
    sortItems() {
      let t = []
      this.items.forEach(item => {
        if (item.topType) {
          t.unshift(item)
        } else {
          t.push(item)
        }
      })
      return t
    },
    starNum() {
      return Math.floor(this.rangeValue / 10)
    },
  },
  methods: {
    ...mapMutations([
      'setinfo',
      'setIsPlayerShow',
      'cleanDetail',
      'setbookId',
      'setvideos',
      'setaudios',
      'setEbooks',
    ]),
    init() {
      this.query = this.$route.query
      this.items.forEach(item => {
        if (item.type === this.query.inType) {
          this.$set(item, 'topType', true)
        } else {
          this.$set(item, 'topType', false)
        }
      })
      if (this.query.from === 'theme') {
        this.items[3] = null
        this.getThemeBookDetail(this.query)
      } else {
        this.setIsPlayerShow(false)
        this.setbookId(this.query.id)
        this.getInfo()
      }
      this.getStar() // 获得分数
    },
    getStar() {
      // 获得分数
      servicesAttach.getStar({ book_id: this.query.id }).then(res => {
        this.bookStars = res.data.score / 2
        this.rangeValue = res.data.score
      })
    },
    getThemeBookDetail() {
      //获取主题的所有内容
      bookinfoServices.getThemeBookDetail(this.query).then(res => (this.all = res.data))
    },
    getAccessCodes(data) {
      bookinfoServices.getAccessCode(data).then(res => {})
    },
    getInfo() {
      bookinfoServices.info(this.query).then(res => {
        this.setinfo(res.data)
        this.data = res.data
        // this.getAccessCodes({id:this.query.id , type:1})
        // 获得内容, 判断哪些该显示
        this.openContent(res.data.books_info.components)
        this.setItmesText(res.data.free_count)

        setTimeout(() => {
          // this.weixinShare()
        }, 500)
      })
    },
    setItmesText(free_count) {
      this.items.forEach(item => {
        switch (item.type) {
          case 'Read':
            if (!free_count.books) return
            item.text = `可试读${free_count.books}章`
            break
          case 'Audio':
            if (!free_count.audios) return
            item.text = `可试听${free_count.audios}音频`
            break
          case 'Video':
            if (!free_count.videos) return
            item.text = `可试看${free_count.videos}视频`
            break
          case 'Assets':
            if (!free_count.pictures) return
            item.text = `免费${free_count.pictures}个资源`
            break

          default:
            break
        }
      })
    },
    openContent(data) {
      this.items.forEach(i => {
        switch (i.type) {
          case 'Read':
            if (data.books && data.books.length) {
              i.show = true
            }
            break
          case 'Audio':
            if (data.audios && data.audios.length) {
              i.show = true
            }
            break
          case 'Video':
            if (data.videos && data.videos.length) {
              i.show = true
            }
            break
          case 'Assets':
            if (data.resources && data.resources.length) {
              i.show = true
            }
            break
          case 'Circle':
            // 状态1未开启 2开启  3锁定
            if (this.bookinfo.book_circle_status == 2) {
              i.show = true
            }
            break
        }
      })
    },
    up() {},
    go(i) {
      let type
      switch (i.icon) {
        case 'icon-listen':
          type = 'Audio'
          break
        case 'icon-see':
          type = 'Video'
          break
        case 'icon-book':
          type = 'Read'
          break
        case 'icon-assets':
          type = 'Assets'
          break
        case 'icon-friend':
          this.$go('/bookCircleList/comment', {
            type: 'circle',
            id: this.bookinfo.book_circle_id,
          })
          return
          break
      }
      if (this.query.from === 'theme') {
        this.$go('/home/themeBookMedia', { type, ...this.query })
      } else {
        this.$go('/bookMedia', { type, ...this.query })
      }
    },
    back() {
      //点击head返回触发
      this.cleanDetail()
    },
    weixinShare() {
      if (this.$isWeixin) {
        let user = this.$getUserInfo()
        let href = location.href
        if (user) {
          href = href + `&distributor=${user.id}`
        }
        const wxconfig = {
          title: this.info.name, // 分享标题
          desc: this.info.abs, // 分享描述
          link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.info.img_src,
        }

        wx.onMenuShareTimeline(wxconfig)
        wx.onMenuShareAppMessage(wxconfig)

        wx.updateAppMessageShareData(wxconfig, function(res) {
          //这里是回调函数
        })
        wx.updateTimelineShareData(wxconfig, function(res) {
          //这里是回调函数
        })
      }
    },
    distriubte() {
      let user = this.$getUserInfo()
      let href = location.href
      if (user) {
        href = href + `&distributor=${user.id}`
      }
      if (!this.$isWeixin) {
        // 获得img链接, 打开img
        getQrcode({ string: href }).then(res => {
          console.log(res)
          this.$openImg({
            src: res.data,
          })
        })
      }
    },
    goXkonw() {
      this.$go('/home/xknow', { id: this.query.id })
    },
    grade() {},
    gradeConfirm() {
      this.isGradeShow = false
      servicesAttach
        .add({
          book_id: this.query.id,
          score: this.starNum,
        })
        .then(_ => this.$Toast({ message: '评分成功' }))
        .catch(err => {
          this.$Toast({ message: err.message })
        })
    },
    gradeCancle() {
      this.isGradeShow = false
    },
  },
}
</script>

<template lang="pug">
.div(v-if="info.name && data")
  Head( :name="info.name" @back="back")
  .main
    .detail
      .msg
        .img
          img( :src="info.img_src" :key="info.img_src")
        .right
          .name {{info.name}}
          .star()
            Star( @click.native="isGradeShow = true" :num="bookStars")
          .share(v-if="!$isWeixin" @click="distriubte") 分享
          .author
            span.shadow 作者:
            span.info {{info.author}}
          //- .time
          //-   span.shadow 出版时间：
          //-   span.info 2017-7
          //- .isbn
          //-   span.shadow ISBN：
          //-   span.info 9787544288910
      .media()
        .ls
          .item(v-for="i in sortItems " @click="go(i)" v-if="i.show")
            .content
              .name( :class="i.icon" ) {{i.name}}
              .right {{i.text}}
            .line-single
    .xbook(@click="goXkonw" v-if="isShowX && !query.from" ) X一下
    .line-part
    .preview
      ContentTitle(name="内容简介")
      .content.fix
        .txt.word.wordHidden(v-text="info.abs")
    //- .preview
      ContentTitle(name="编辑推荐")
      .content.fix
        .txt(v-text="info.abs")
    Comment(:id="$route.query.id" :msg="data.book_comment")
    BookRelate
  .picker-wrap(v-if="isGradeShow")
    .picker
      .star(@click="grade")
        Star(  :num="starNum/2")
      .range-wrap
        Range(v-model="rangeValue"
          :min="10"
          :max="100")
      .btns
        .btn(@click="gradeCancle") 取消
        .btn(@click="gradeConfirm") 确定
</template>

<style lang="stylus" scoped>
.picker-wrap
  position fixed
  background rgba(0, 0, 0, 0.5)
  height 100%
  width 100%
  bottom 0
  z-index 100
  .picker
    background #fff
    height 4.5rem
    position absolute
    top 50%
    width 80%
    left 50%
    transform translate(-50%, -50%)
    border-radius 8px
    .star
      margin-left 35%
      margin-top 40px
    .range-wrap
      padding 30px
    .num
      text-align center
    .btns
      text-align center
      margin-top 10px
      .btn
        margin 0 15px
      &:last-child
        color red
.xbook
  width 100%
  height 0.7rem
  background url('./img/x.png') no-repeat 45% center
  background-size 0.38rem
  text-align center
  line-height 0.75rem
  text-indent 1rem
.txt
  color #666666
  font-size 0.28rem
  line-height 0.4rem
  text-indent 0.5rem
.wordHidden
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 3
.content
  padding 0.3rem
.media
  margin-top 0.3rem
  .ls
    .item
      height 0.93rem
      .content
        display flex
        justify-content space-between
        padding 0px
        height 100%
        line-height 0.93rem
        .name
          color #333333
          padding-left 0.6rem
          font-size 0.28rem
          &.icon-listen
            background url('./img/listen.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
          &.icon-see
            background url('./img/see.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
          &.icon-book
            background url('./img/book.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
          &.icon-friend
            background url('./img/firend.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
          &.icon-assets
            background url('./img/assets.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
        .right
          padding-right 0.4rem
          font-size 0.24rem
          color #999999
          background url('../bookMall/img/more.png') no-repeat right
          background-size 0.13rem 0.22rem
.comment
  .content
    .ls
      .item
        margin-top 0.3rem
        display flex
        .head
          width 0.65rem
          height 0.65rem
          border-radius 50%
          flex 0 0 auto
        .right
          margin-left 10px
          .txt
            text-indent 0px
            margin-bottom 0.2rem
          .name
            height 0.65rem
            line-height 0.65rem
            color rgba(8, 71, 102, 0.8)
            .up
              float right
              font-size 0.22rem
              padding-left 0.4rem
              background url('./img/up.png') no-repeat left
              background-size 0.26rem 0.28rem
              &.isUp
                background url('./img/upIs.png') no-repeat left
                background-size 0.26rem 0.28rem
.relate
  .content
    overflow scroll
    .ls
      display flex
      .item
        flex 0 0 auto
        margin-right 0.35rem
        width 1.78rem
        img
          width 1.78rem
          height 2.46rem
        .name
          font-size 0.26rem
          color #555555
          height 0.6rem
          line-height 0.6rem
.preview
  .content
    .more
      background url('./img/more.png') no-repeat right center
      background-size 0.25rem 0.2rem
      text-align right
      padding-right 0.4rem
      font-size 0.24rem
      float right
      height 0.4rem
      line-height 0.4rem
.detail
  padding 0.3rem
  .msg
    display flex
    justify-content space-between
    .img
      >img
        width 1.92rem
        height 2.65rem
        box-shadow 2px 3px 15px 0px rgba(6, 91, 164, 0.22)
        border-radius 0.08rem
    .right
      margin-left 0.56rem
      width 4.3rem
      >div
        margin 0 0.1rem
        font-size 0.24rem
        line-height 0.4rem
        margin-right 0px
      .star
        width 50%
      .share
        display inline
        color #14afff
        padding-right 0.45rem
        height 0.28rem
        background url('./img/share.png') no-repeat right
        background-size 0.28rem 0.28rem
        font-size 0.22rem
        line-height 0.28rem
        float right
      .info
        color #666666
        margin-left 5px
      .name
        font-size 0.34rem
        line-height 0.4rem
        margin-top 0
        color #333333
</style>
