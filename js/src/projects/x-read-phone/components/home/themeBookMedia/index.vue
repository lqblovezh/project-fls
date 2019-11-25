<script>
import Audio from './audio'
import Video from './video'
import Read from './read'
import { mapState, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'

export default {
  components: { Audio, Video, Read },
  created() {
    this.init()
  },
  data() {
    return {
      currType: null, // Read  Video Audio
      query: {},
      all: null,
    }
  },
  computed: {
    ...mapState({
      info: state => state.bookinfo.info.books_info,
      allinfo: state => state.bookinfo.info,
      isPlayerShow: state => state.player.isPlayerShow,
      bookId: state => state.bookinfo.bookId,
      bookinfo: state => state.bookinfo,

      Ebooks: state => state.bookinfo.Ebooks,
      videos: state => state.bookinfo.videos,
      audios: state => state.bookinfo.audios,

      buyChapters: state => state.bookinfo.buyChapters,
      buyAudios: state => state.bookinfo.buyAudios,
      buyVideos: state => state.bookinfo.buyVideos,
    }),
    totalPrice() {
      let total = 0
      Object.values(this.currBuys).forEach(item => {
        if (item) {
          total += item.price * 1000
        }
      })
      // return total
      return '￥' + total / 1000
    },
    totalChecked() {
      if (!this.currBuys) return

      let arr = Object.values(this.currBuys)
      for (const item of arr) {
        if (item) {
          return true
        }
      }
      return false
    },
    currComp() {
      return this.currType
    },
    currBuys() {
      // 有点意思了
      switch (this.query.type) {
        case 'Video':
          return this.buyVideos
          break
        case 'Read':
          return this.buyChapters
          break
        case 'Audio':
          return this.buyAudios
          break
        default:
          return {}
          break
      }
    },
    currSetBuysAll() {
      switch (this.query.type) {
        case 'Video':
          return this.setBuyVideosAll
          break
        case 'Read':
          return this.setBuyChaptersAll
          break
        case 'Audio':
          return this.setBuyAudiosAll
          break
        default:
          return () => {}
          break
      }
    },
    currSetBuys() {
      switch (this.query.type) {
        case 'Video':
          return this.setBuyVideos
          break
        case 'Read':
          return this.setBuyChapters
          break
        case 'Audio':
          return this.setBuyAudios
          break
        default:
          return () => {}
          break
      }
    },
    currList() {
      switch (this.query.type) {
        case 'Video':
          return this.videos
          break
        case 'Read':
          return this.Ebooks
          break
        case 'Audio':
          return this.audios
          break
        default:
          return []
          break
      }
    },

    datas() {
      switch (this.currType) {
        case 'Read':
          return this.all.content.books
          break
        case 'Audio':
          return this.all.content.audios
          break
        case 'Video':
          return this.all.content.videos
          break

        default:
          break
      }
    },
  },
  methods: {
    ...mapMutations([
      'setinfo',
      'setIsPlayerShow',
      'setIsPlayerShow',
      'setbookId',
      'setvideos',
      'setaudios',
      'setEbooks',
      'setBuyChapters',
      'setBuyAudios',
      'setBuyVideos',
      'setBuyChaptersAll',
      'setBuyAudiosAll',
      'setBuyVideosAll',
    ]),
    init() {
      this.currType = this.$route.query.type
      this.query = this.$route.query
      // this.setbookId(this.query.id)
      // this.getInfo();

      this.getThemeBookDetail(this.query)
    },
    getThemeBookDetail() {
      //获取主题的所有内容
      bookinfoServices.getThemeBookDetail(this.query).then(res => {
        this.all = res.data
        sessionStorage.access_code = res.data.content.access_code
      })
    },
    getInfo() {
      bookinfoServices.info(this.query).then(res => {
        this.setinfo(res.data)
        // this.getAccessCodes({id:this.query.id , type:1})
      })
    },
    getContents() {},
    getEbooks() {
      bookinfoServices.getMedia({ ...this.query, type: 3 }).then(res => {
        this.setEbooks(res.data)
      })
    },
    getaudios() {
      bookinfoServices.getMedia({ ...this.query, type: 1 }).then(res => {
        this.setaudios(res.data.chapters)
      })
    },
    back() {
      this.setIsPlayerShow(false)
    },
    up(e) {
      let node = e.target
      dir(node)
      if (node.className.indexOf('true') != -1) {
        node.classList.remove('true')
      } else {
        node.classList.add('true')
      }
    },
    like(e) {
      this.up(e)
    },
    buyItem(item, type) {
      this.currSetBuys(item)
    },
    buyAll(type) {
      const data = {} //初始全不选

      let nodes = document.querySelectorAll('.price-common.item .check.true')

      if (nodes.length !== this.currList.length) {
        // 部分选中, 没选的情况下, 全部选择
        this.currList.forEach(i => {
          data[i.id] = i
        })
      }
      this.currSetBuysAll(data)
      return
    },
    bookImgClick() {
      this.$refs.currChildCom.bookImgClick()
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
.div(v-if="all")  
  Head( :name="all.name" @back="back")
  .detail
    .msg
      .img(@click="bookImgClick" ) 
        img( v-lazy="all.img_src")
      .right 
        .name {{all.name}}
        .author 
          span.shadow 作者:
          span.info {{all.author}}
        //- .obj(v-for="i in all.attributes") 
          span.shadow {{i.key}}：
          span.info {{i.value}}
  .line-part
  keep-alive 
    component(is="Read" 
      :datas="datas"
      ref="currChildCom"
      :buys="currBuys"
      :totalPrice="totalPrice"
      :totalChecked="totalChecked"
      @buyItem="buyItem" 
      @buyAll="buyAll") 
</template>

<style lang="stylus" scoped>
.oper
  display flex
  height 0.92rem
  line-height 0.97rem
  >div
    flex none
    color #888
    width 33.333333333333%
    flex-grow 1
    text-align center
  .buy
    background #14afff
    color #fff
  .up
    background url('./img/up.png ') no-repeat 0.8rem center
    background-size 16px
    text-indent 20px
    &.true
      background url('./img/up-true.png ') no-repeat 0.8rem center
      background-size 16px
  .like
    background url('./img/like.png ') no-repeat 0.8rem center
    background-size 16px
    text-indent 20px
    &.true
      background url('./img/like-true.png ') no-repeat 0.8rem center
      background-size 16px
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
      .price-common
        line-height 1rem
      .info
        color #666666
        margin-left 5px
      .name
        font-size 0.34rem
        line-height 0.4rem
        margin-top 0
        color #333333
        margin-bottom 0.4rem
</style>
