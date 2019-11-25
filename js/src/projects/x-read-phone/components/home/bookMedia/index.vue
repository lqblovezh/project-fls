<script>
import Audio from './audio'
import Video from './video'
import Read from './read'
import Assets from './Assets'
import { mapState, mapMutations } from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as bookshelfServices from 'services/x-read/bookShelf'
import * as saleServices from 'services/x-read/mySale'
import * as dbiServices from 'services/x-read/dbi'
import * as servicesAttach from 'services/x-read/attach'

import mediaTypeConfing from './mediaTypeConfing'
import { noLoginToast, payTypeConfig } from '@/utils/util'
import Sales from '@/mixins/sales'

export default {
  name: 'bookMedia',
  mixins: [Sales],
  components: { Audio, Video, Read, Assets },
  created() {
    this.init()
    console.log(this.$isWeixin)
  },
  data() {
    return {
      vis: true,
      currType: null, // query.type
      contentType: null, // 获取content时 , 传过去的type 音1 视频2, 电子书3
      chapters: null, // 得到的chapter的列表
      query: {},
      checkedItemsObj: {},
      data: {
        own_num: 0, // 拥有数量
        state: false, // 是否点赞
        praise_count: 0, // 点赞数量
      },
      infoData: null, // 主体信息
      payType: payTypeConfig(),
    }
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
    }),
    currMsg() {
      if (this.query.type === 'Read') {
        if (!this.infoData.books_info.components.books) return {}
        return {
          name: this.infoData.books_info.components.books[0].name,
          author: this.infoData.books_info.components.books[0].author,
          img_src: this.infoData.books_info.components.books[0].constitute_img_src,
        }
      } else {
        return {
          name: this.infoData.books_info.name,
          author: this.infoData.books_info.author,
          img_src: this.infoData.books_info.img_src,
        }
      }
    },
    checkedItems() {
      let arr = []
      Object.values(this.checkedItemsObj).forEach(item => {
        if (item) {
          arr.push(item)
        }
      })
      return arr
    },
    totalPrice() {
      // return total
      return '￥' + this.totalPriceNumber
    },
    totalPriceNumber() {
      let total = 0
      this.checkedItems.forEach(item => {
        if (item && item.price) {
          total += item.price * 1000
        }
      })
      return total / 1000
    },
    lsShelf() {
      // return this.infoData.book_shelf[this.query.type]
      // 书房只加书
      return this.infoData.book_shelf.Read
    },
    shelfText() {
      return this.lsShelf ? '已加入书房' : '加入书房'
    },
    currComp() {
      return this.currType
    },
    showText() {
      const type = this.query.type
      if (!(this.currObj.mediaPrice * 1)) {
        return type === 'Read' ? '立即阅读' : '播放'
      } else if (this.data.is_all_buy) {
        return type === 'Read' ? '立即阅读' : '播放'
      } else {
        return '购买'
      }
    },
    isFreeOrBought() {
      if (!(this.currObj.mediaPrice * 1) || this.data.is_all_buy) {
        return true
      }
    },
    isFreeSome() {
      if (!this.chapters || !this.chapters[0]) {
        return false
      }
      if (!this.chapters[0].price || !(this.chapters[0].price * 1)) {
        return true
      }
    },
  },
  methods: {
    ...mapMutations(['setIsPlayerShow', 'setIsPlayerShow', 'setIsLoginShow']),
    async init() {
      this.currType = this.$route.query.type
      this.query = this.$route.query
      this.contentType = mediaTypeConfing[this.query.type].type
      const res = await this.getInfo()
      this.infoData = res.data
      this.getContents()
      this.getPraise()
    },

    //获取点赞数量
    getPraise() {
      servicesAttach
        .getPraise({
          book_id: this.query.id,
          type: this.contentType,
        })
        .then(res => {
          // 如果这个接口先于getContents得到结果, getContents将会覆盖data
          // 尽可能的使用解构赋值
          // 扩展运算符似乎是浅合并
          this.data = { ...this.data, ...res.data }
        })
    },
    getContents() {
      bookinfoServices
        .getMedia({
          id: this.query.id,
          type: this.contentType,
        })
        .then(res => {
          this.chapters = res.data.chapters
          if (this.chapters.length === 0) {
            this.vis = false
          }
          const { own_num, is_all_buy } = res.data
          // 如果直接用this.data = { own_num, is_all_buy } , 将会覆盖原来的对象, 导致新加入的字段没有监听
          // this.data = { own_num, is_all_buy }
          this.data = { ...this.data, own_num, is_all_buy }
        })
    },
    back() {
      this.setIsPlayerShow(false)
    },
    //点赞
    up(e) {
      if (this.$noLoginToast()) return

      let node = e.target
      servicesAttach
        .praise({
          book_id: this.query.id,
          type: this.contentType,
        })
        .then(res => {
          this.getPraise()
        })
      // dir(node)
      // if (node.className.indexOf('true') != -1) {
      //   node.classList.remove('true')
      // } else {
      //   node.classList.add('true')
      // }
    },
    like(e) {
      if (this.$noLoginToast()) return

      let type = mediaTypeConfing[this.query.type].type
      // 加入书房
      bookshelfServices.add({ book_id: this.query.id, type: 3 }).then(res => {
        if (e) {
          let node = e.target
          node.classList.add('true')
        }
      })
    },
    checkeItem(item) {
      if (this.checkedItemsObj[item.id]) {
        this.$set(this.checkedItemsObj, item.id, null) // 新增属性必须$set
      } else {
        this.$set(this.checkedItemsObj, item.id, item)
      }
    },
    checkeAll(type) {
      const data = {} //初始全不选
      let arr = []
      let nodesTrue = document.querySelectorAll('.price-common .check.true')
      let nodes = document.querySelectorAll('.price-common .check')
      if (this.checkedItems.length !== nodes.length) {
        // 部分选中, 没选的情况下, 全部选择
        this.chapters.forEach(i => {
          if (!i.isBuy && i.price * 1 != 0) {
            data[i.id] = i
            arr.push(i.id)
          }
        })
      }
      this.checkedItemsObj = data
    },

    payChapters() {
      if (noLoginToast()) return
      // 是不是已拥有,最后需要后台去判断 , 不然前台可以随意改
      let content = this.checkedItems.map(item => item.id)
      if (content.length === 0) {
        this.$Toast({
          message: '请选中!',
          duration: 1000,
        })
        return
      }
      if (!this.totalPriceNumber) {
        this.$Toast({
          message: '所选内容免费 !',
          duration: 1000,
        })
        return
      }
      this.goPay({ content })
    },
    createPay() {
      // this.goReader()
      // return
      if (noLoginToast()) return
      if (this.isFreeOrBought) {
        // 立即阅读 免费阅读
        const type = this.query.type
        if (type == 'Read') {
          this.goReader()
        } else {
          this.$refs.currChildCom.openFirst()
        }
        return
      }
      // this.payChapters()
      this.goPay()
    },
    goReader() {
      try {
        let { book_id, product_id } = this.chapters[0]
        this.$go('/reader', { ...this.query, book_id, product_id })
      } catch (error) {
        throw new Error('章节不存在!')
      }
    },
    bookImgClick() {
      if (noLoginToast()) return
      if (this.query.type != 'Read') {
        return
      }
      if (this.isFreeOrBought) {
        this.goReader()
        return
      }
      if (this.isFreeSome) {
        this.goReader()
      }
    },
    changePayType() {
      return
      this.$openPay({ price: this.totalPrice })
        .then(({ item, pay }) => {
          this.payType = item
          if (pay) {
            this.payChapters()
          }
        })
        .catch(rej => {})
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
.div(v-if="infoData")
  Head( :name="currMsg.name" @back="back")
  .detail-media
      .msg
        .img(@click="bookImgClick" )
          img( :src="currMsg.img_src")
        .right
          .name {{currMsg.name}}
          .author
            span.shadow 作者:
            span.info {{currMsg.author}}
          .price-common
            .curr-price ￥{{currObj.mediaPrice}}
  .line-single
  .oper-media()
    .up(@click="up" :class="data.state ? 'true': false ")  {{data.praise_count}}
    .buy(@click='createPay' v-text="showText")
    .like(@click="like" :class="{true:lsShelf}" ) {{shelfText}}
  .line-part
  .msg-price.all.pay-type(v-if="chapters && !data.is_all_buy")
    .pay
      .totals
        span.num 总数: {{chapters.length}}   
        span 拥有:
        span.price-color {{data.own_num}}
      .right(@click="changePayType"  v-if="!currObj.isAllBuyOrFree")
        span.name 支付方式:
        span.name2  {{payType.name}}
        .icon( :class="payType.icon" )
  //- keep-alive是多余的, 这个页面不会存在切换
  component( v-if="chapters"
    :is="currComp"
    ref="currChildCom"
    :totalPrice="totalPrice"
    :data="data"
    :list="chapters"
    :checkedItemsObj="checkedItemsObj"
    :checkedItems="checkedItems"
    :currObj="currObj"
    @payChapters="payChapters"
    @buyItem="checkeItem"
    @buyAll="checkeAll")
</template>

<style lang="stylus">
.pay-type
  padding 0 0.3rem
.oper-media
  display flex
  height 0.92rem
  line-height 0.97rem
  >div
    flex none
    color #888
    width 33.3333%
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
    background url('./img/like.png ') no-repeat 0.35rem center
    background-size 16px
    text-indent 20px
    &.true
      background url('./img/like-true.png ') no-repeat 0.35rem center
      background-size 16px
</style>
