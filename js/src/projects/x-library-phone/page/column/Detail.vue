<script>
import { mapState } from 'vuex'
import MetaData from './comp/MetaData'
export default {
  components: { MetaData },
  asyncData({ store, route }) {
    return store.dispatch('category/getItemDetail', route.query)
  },
  created() {
    this.type = this.$route.query.name
  },
  data() {
    return {
      type: '',
    }
  },
  beforeDestroy() {
    this.$store.state.category.itemDetail = null
  },
  computed: {
    ...mapState({
      item: state => state.category.itemDetail,
      meta: state => state.category.itemDetail.components,
    }),
    btnText() {
      if (this.meta&&this.$isFree(this.meta)) {
        return '阅读全文'
      } else {
        if(this.meta){
          return `支付 ${this.meta.price} 元，阅读全文`
        }
      }
    },
    btnText2() {
      if (this.$isFree(this.meta)) {
        return '点击，下载文书格式'
      } else {
        return `支付 ${this.meta.price} 元，下载文书格式`
      }
    },
    keyword() {
      if(this.meta){
        return this.meta.keyword ? this.meta.keyword.split(';') : []
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to, 'to')
    next()
  },
  beforeRouteEnter (to, from, next) {
    // console.log(from, 'from')
    if (from.path == '/') {
      // console.log('change ----------')
      // window.sessionStorage.setItem('list', [1,2,3])
    }
    next()
  },
  methods: {
    createOrder () {
      const obj = {},
            temp = {
              goods_id: this.item.product_id,
              name: this.item.name,
              price: this.item.price,
              type: this.item.type
            }
      obj[this.$user.id] = temp
      window.localStorage.setItem('cart', JSON.stringify(obj))
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
        this.$go('/order', {redirect_url: window.location.href})
        return
      } 
      const { read_product: product_id, read_book: book_id } = this.meta
      let res = await this.$service.category.getAccessCode({ id: this.item.id })
      localStorage.access_code = res.data
      this.$go('/reader', { product_id, book_id })
    },
    
    goDown () {
      console.log('下载!')
      if (!this.$isLogin()) return
      let price = parseFloat(this.meta.price)
      if (!this.$isFree(this.meta)) {
        this.createOrder()
        this.$go('/order', {redirect_url: window.location.href})
        return
      }

      // 下载资源
      location.href=this.meta.资源地址
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
    goNormal(data) {
      this.$go('/normal-list', data)
    },
    keyClickHandler(e) {
      let node = this.$getTarget(e)
      if (node) {
        this.goNormal({ keyword: node.innerText })
      }
    },
    back() {
      console.log('click back')
      this.$route.query.state === 'wailian' ? this.$go('/') : this.$router.go(-1)
    },
  },
  filters: {
    brackets (val) {
      return `【${val}】`
    }
  }
}
</script>

<template lang="pug">
  .page-column-detail.c_f_bg
    Head(:name="$route.query.name" type="dark" @back="back" :isModel="true")
    .wrapper(v-if="item")
      .des.fix(v-if="meta") 
        .name.f16.f600
          span.c_orange2.ib(v-if="item.components.type==1") {{ meta.案例编号 }} 
          |{{meta.name}}
        .abs.c_3.f14(v-if="meta.副标题") —— {{meta.副标题}}
        .meta
          MetaData( :type="$route.query.name" :meta="meta" )
        .add.icon.icon-add-book(@click="addBook")
      .page-item(v-if="meta&&meta.keyword")
        TopicTitle(name="关键词" rname="更多"  icon="more" path="/column-keys" :query="{id: $route.query.id}")
        .ls-btn
          .box(@click="keyClickHandler")
            .target.ib(
              v-for="key,index in keyword"
              :key="index"
            )
              HideText( :text="key")
      .page-item.limit(v-if="meta&&meta.法规类别")
        TopicTitle(name="法规类别"  rname=""  icon="false")
        p {{meta.法规类别}}
      .page-item.sycj(v-if="meta&&meta.资源说明")
        TopicTitle(name="资源说明" rname="" icon="false")
        p {{meta.资源说明}}
      .page-item.sycj(v-if="meta&&meta.适用场景")
        TopicTitle(name="适用场景" rname="" icon="false")
        p {{meta.适用场景}}
      .page-item.sycj(v-if="meta&&meta.流程类别")
        TopicTitle(name="流程类别" rname="" icon="false")
        p {{meta.流程类别}}
      .page-item.limit(v-if="meta&&meta.专业类别")
        TopicTitle(name="专业类别" rname="" icon="false")
        p {{meta.专业类别}}
      .page-item(v-if="meta&&meta.关联法规")
        TopicTitle(name="关联法规" rname="点击查看" icon="more" path="/column-rules" :query="{id: $route.query.id, laws: meta.关联法规}")
      .page-item(v-if="meta&&meta.关联资源") 
        TopicTitle(name="关联资源" rname="点击查看" icon="more" path="/column-resource" :query="{id: $route.query.id, laws: meta.关联资源}")
        //- .other {{meta.案件类别}}
        //- .other(@click="goNormal({laws:meta.关联法规})") {{meta.关联法规}}
      .page-item
        //- TopicTitle(name="预览" rname="" :icon="false")
        .read.tl(v-if="item&&item.components&&item.components.preview")
          .text(v-html="item.components.preview")
        .tc
          .btn-pay-read(@click="goRead" v-text="btnText" )
          .btn-pay-read(@click="goDown" class="PayDown" v-text="btnText2" v-if="item.type==7")
</template>
<style lang="stylus">
.page-column-detail
  >.wrapper
    padding 15px
    box-sizing border-box
    >.des
      line-height 30px
      position relative
      border-bottom 1px solid #eee
      padding-bottom 10px
      margin-bottom 15px
      >.name
        span
          margin-right 5px
      >.abs
        line-height 24px
        margin 5px 0
      >.meta
        line-height 18px
        color #A6AAC1
      >.add
        transform: translateY(0px);
        position relative
        float right
    >.limit
      max-width 100%
      overflow hidden
      // display inline-block
      text-overflow ellipsis
      white-space inherit
      >p
        font-size 12px
        color #A6AAC1
        text-indent 10px
    >.page-item
      padding 4px 0px
      &:not(:last-child)
        border-bottom 1px solid #EEE
      img
        max-width 100%
      >.ls-btn
        >.box
          max-height 68px
          margin-top 6px
          overflow hidden
      >.text
        >.name
          line-height 53px
        >.val
          line-height 20px
      >.read
        margin-top 30px
        >.text
          font-size 14px
          p[type=chapter]
            font-size 16px
            font-weight bold
      >.other
        font-size 16px
        color #666
        padding-left 15px
      >.tc
        >.PayDown
            margin-top 10px
.sycj
  >p
    font-size 12px
    color #A6AAC1
    text-indent 10px
</style>
