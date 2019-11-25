<script>
import { mapState } from 'vuex'
import DetailColumn from './comp/DetailColumn'
import BookLeftPanel from './comp/BookLeftPanel'
import TabContainer from '@/components/tab/container'
import Program from './comp/Program'
import TabItem from '@/components/tab/item'

export default {
  components: { BookLeftPanel, DetailColumn, TabContainer, TabItem, Program },
  asyncData({ store, route }) {
    return store.dispatch('category/getItemDetail', route.query)
  },
  created() {
    // console.log(this.$store)
    this.type = this.$route.query.name
  },
  data() {
    return {
      activeName2: 'first', // video 选项卡控制字段
      type: '',
      showLeftPanel: false,
      selected: 'info',
      list: [],
    }
  },
  beforeDestroy() {
    this.$store.state.category.itemDetail = ''
  },
  computed: {
    ...mapState('category', {
      item: state => state.itemDetail,
      meta: state => state.meta,
    }),
    priceNum() {
      if (this.meta.price == 0) {
        return '免费'
      } else {
        return `¥ ${this.meta.price} 元`
      }
    },
    btnText() {
      if (this.$isFree(this.meta)) {
        return this.item.type == 8 ? '全部播放' : '点击，继续阅读全文'
      } else {
        return `支付 ${this.meta.price} 元，${
          this.item.type == 8 ? '查看全部' : '阅读全文'
        }`
      }
    },
    videoText() {
      if (this.$isFree(this.meta)) {
        return '点击，继续播放'
      } else {
        return `支付 ${this.meta.price} 元，开始播放`
      }
    },
    keyword() {
      return this.meta.keyword ? this.meta.keyword.split(';') : []
    },
    detailColumn() {
      return [
        { key: '专辑简介', value: this.meta.专辑简介 },
        { key: '专业类别', value: this.meta.专业类别 },
        { key: '内容原作者', value: this.meta.内容原作者 },
        { key: '出版时间', value: this.meta.出版时间 },
        { key: '案件类别', value: this.meta.案件类别 },
        { key: '关联资源', value: this.meta.品类维度编号, more: true },
      ]
    },
  },
  beforeRouteLeave(to, from, next) {
    next()
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == '/') {
    }
    next()
  },
  methods: {
    createOrder() {
      const obj = {},
        temp = {
          goods_id: this.item.product_id,
          name: this.item.name,
          price: this.item.price,
          type: this.item.type,
        }
      obj[this.$user.id] = temp
      window.localStorage.setItem('cart', JSON.stringify(obj))
    },
    keyClickHandler(e) {
      let node = this.$getTarget(e)
      if (node) {
        this.goNormal({ keyword: node.innerText })
      }
    },
    async goRead() {
      /*
      if (!this.$isCanRead(this.meta)) return
      if (!this.$isCanRead()) return
      */
      if (!this.$isLogin()) return
      let price = parseFloat(this.meta.price)
      if (!this.$isFree(this.meta)) {
        this.createOrder()
        this.$go('/order', { redirect_url: window.location.href })
        return
      }
      if (this.item.type == 8) {
        this.selected = 'program'
        this.$refs.program.playAll()
        return
      }
      const { read_product: product_id, read_book: book_id } = this.meta
      let res = await this.$service.category.getAccessCode({
        id: this.item.id,
      })
      localStorage.access_code = res.data
      this.$go('/reader', { product_id, book_id })
    },
    back() {
      console.log('click back')
      this.$route.query.state === 'wailian'
        ? this.$go('/')
        : this.$router.go(-1)
    },
    addCircle() {
      console.log(this.item.type)
      this.$addCircle({ id: this.item.book_circle_id })
    },
    async addBook() {
      if (!this.$isLogin()) return
      try {
        await this.$service.bookShelf.add({
          book_id: this.item.product_id,
          type: this.item.type,
        })
        this.$Toast('加入成功')
      } catch (err) {
        this.$Toast(err.message)
      }
    },
    async toggleLeftPanel() {
      this.showLeftPanel = !this.showLeftPanel
      let res = await this.$service.category.getAccessCode({
        id: this.item.id,
      })
      localStorage.access_code = res.data
      let extraParams = {
        version: 'release',
        content_version: 'release',
        access_code: localStorage.getItem('access_code'),
        product_id: this.meta.read_product,
        release_id: this.meta.read_product,
      }
      this.$readerService
        .get_catalogs(
          {
            bookId: this.meta.read_book,
            chapterId: '',
          },
          { extraParams }
        )
        .then(res => {
          this.list = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }, // 选项卡
  },
  watch: {
    selected(val, old) {
      this.selected = val
    },
  },
}
</script>

<template lang="pug">
.div
  BookLeftPanel(v-model="showLeftPanel" :catalogsList="list")
  .page-column-detail.c_f_bg(v-if="item&&item.type==8")
    Head(:name="$route.query.name" type="dark" @back="back" :isModel="true")
    .top
      .img
        img(:src="meta.封面" width="100" height="117")
      .toptext
        span(class="h1") {{meta.标题}}
        br
        span(class="h3") 专辑演播者：{{meta.专辑演播者}}
        br
        span(class="h3") 内容原作者：{{meta.专辑责任者}}
        br
        span(class="h3") 上传时间：{{meta.create_time}}
        br
        span(class="h4" v-text="priceNum")
    TabContainer(v-model="selected")
      TabItem(text="简介" name="info")
      TabItem(:text="`节目(${meta.resource&&meta.resource.length})`" name="program")
    .pageInfo(v-show="selected=='info'")
      DetailColumn(v-for="item in detailColumn" :item="item" :meta="meta")
    .pageInfo(v-show="selected=='program'")
      Program(:resource="meta.resource" ref="program")
  // 课程影音
  .page-column-detail.c_f_bg(v-if="item&&item.type==6&&meta")
    Head(:name="$route.query.name" type="dark" @back="back" :isModel="true")    
    .top
      .img
        img(:src="meta.封面" )
      .toptext
        span(v-if="meta.书名" class="h1") {{meta.书名}} {{meta.其他题名}}
        br(v-if="meta.分辑号")
        span(v-if="meta.分辑号" class="h3") 分辑号：{{meta.分辑号}}
        br(v-if="meta.副标题")
        span(v-if="meta.副标题" class="h3") {{meta.副标题}}
        br(v-if="meta.卷册号")
        span(v-if="meta.卷册号" class="h3") 卷册号：{{meta.卷册号}}
        br(v-if="meta.作者&&meta.责任方式")
        span(v-if="meta.作者&&meta.责任方式" class="h3") {{meta.作者}} {{meta.责任方式}}
        br(v-if="meta.出版日期")
        span(v-if="meta.出版日期" class="h3") 出版日期:{{meta.出版日期}} 版次: {{meta.版次}}
        span(v-if="meta['书号/刊号']" class="h3") 书号: {{meta['书号/刊号']}}
        br
        span(class="h4" v-text="priceNum") 
        img(src="../../common/img/add-circle.png" class="addCircle" @click="addCircle" width="100" height="41")
    .page-item(v-if="meta.内容简介")
      TopicTitle(name="内容简介" rname="" icon="false")
      p(class="nrjj") {{meta.内容简介}}
    .page-item
      TopicTitle(name="作者介绍" rname="" icon="false")
        .author-info.flex-between-center
          //- @TODO 作者图片地址未传入
          img(src="")
          p {{meta.作者}}
    .page-item
      TopicTitle(name="章节目录"  rname="目录" icon="more" @toggleLeftPanel="toggleLeftPanel")
    .page-item
      TopicTitle(name="专业类别" rname="" icon="false")
        .author-info.flex-between-center.zylb
          p {{meta['专业类别']}}
    .page-item(v-if="keyword.length")
      TopicTitle(name="关键词" rname="更多"  icon="more" path="/column-keys" :query="{id: $route.query.id}")
      .ls-btn
        .box
          .target.ib(
            v-for="key,index in keyword"
            :key="index"
          )
            HideText(:text="key")
    .page-item(v-if="meta.关联资源")
      TopicTitle(name="关联资源" rname="更多"  icon="more")
  .btns(v-if="item&&item.type")
    mt-button(size="normal" class="addBtn" @click="addBook" ) 加入书房
    mt-button(size="normal" class="shopBtn" @click="goRead" v-text="btnText")
</template>
<style lang="stylus" scoped>
.page-column-detail
  padding-bottom 47px
  >>> .ui-tab-container
    box-shadow 1px -2px 10px 5px #ddd
.mint-button
  width 33.3%
  border-radius 2px
  bottom 0px
  height 47px
  position fixed
  font-size 16px
  letter-spacing -0.39px
.shopBtn
  margin-left 33.3%
  width 66.6%
  color #FFFFFF
  background-color #F15A4A
.addBtn
  color #FFFFFF
  background-image linear-gradient(-90deg, #B1936A 0%, #F6D27E 100%)
.page-item
  padding 10px 10px
  &:not(:last-child)
    border-bottom 1px solid #EEE
  >.ls-btn
    >.box
      max-height 68px
      margin-top 15px
      overflow hidden
.addCircle
  display inline
  float right
span
  width 100%
.comp-home-topic-title
  line-height 1.5em
  .flex >.more
    white-space inherit
    >span
      display initial
.h1
  font-family PingFangSC-Medium
  font-size 16px
  color #FFFFFF
  margin-left 3%
  display inline-block
  margin-top 0%
  letter-spacing -0.39px
.h2
  font-family PingFangSC-Regular
  color #FFFFFF
  font-size 16px
  display block
  margin-left 8%
  letter-spacing -0.39px
.h3
  font-family PingFangSC-Regular
  color #FFFFFF
  margin-left 3%
  opacity 0.6
  display inline-block
  margin-top 0%
  letter-spacing -0.29px
  font-size 12px
.h4
  color #F6D27E
  margin-left 3%
  font-size 14px
.page-column-detail>.top
  position relative
  height 194px
  width 100%
  background-image url('../../common/img/book-bg.png')
  background-size 100% 100%
  background-repeat no-repeat
  overflow hidden
  >img
    position absolute
    margin-left 67%
    margin-top 3%
  >.img>img
    margin-top 20%
    width 100px
    height 112px
    margin-left 8%
    object-fit cover
  >.img
    float left
  >.toptext
    margin-left 119px
    max-width 64%
    height 160px
    margin-top 17px
.nrjj
  opacity 0.9
  font-family PingFangSC-Regular
  font-size 12px
  color #676A7B
  letter-spacing 0.14px
.zylb
  font-size 14px
  text-indent 15px
  color #676A78
</style>
