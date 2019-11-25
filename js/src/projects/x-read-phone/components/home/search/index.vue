<script>
import * as dbiServices from 'services/x-read/dbi'
import * as homeServices from 'services/x-read/home'
export default {
  name: 'keySearch',
  created() {
    console.log('$suffix', this.$suffix)
    this.init()
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  data() {
    return {
      list: [],
      keywords: '',
      types: [
        { name: '书籍', type: '4', list: [], num: 0 },
        { name: '课件', type: '3', list: [], num: 0 },
        { name: '主题', type: '2', list: [], num: 0 },
      ],
      currTypeIndex: 0,
      cate_list: null,
    }
  },
  computed: {
    currType() {
      return this.types[this.currTypeIndex]
    },
    currList() {},
  },
  methods: {
    init() {
      this.keywords = this.$route.query.keywords

      //根据路由改变当前index
      let t = this.types.findIndex(item => {
        return item.type == this.$route.query.stype
      })
      if (t !== -1) {
        this.currTypeIndex = t
      }
      this.cleanData() // 数据重置为[]
      this.search(0, 10, true)
    },
    cleanData() {
      this.types.forEach(item => {
        item.list = []
      })
    },
    search(pageStart = 0, pageOffset = 10, isRset = false) {
      if (!this.keywords) return
      if (isRset) {
        this.currType.list = []
      }
      this.declare()
      return homeServices
        .search({
          pageStart,
          pageOffset,
          keywords: this.keywords,
          type: this.currType.type,
        })
        .then(res => {
          this.cate_list = res.data.cate_list
          if (res.data.length === 0) {
            return true
          } else {
            this.currType.list = this.currType.list.concat(res.data.list)
            return false
          }
        })
    },
    loadMoreBook(cb) {
      // 这里可能并不需要多个接口
      this.search(this.currType.list.length, 10).then(res => {
        cb(res)
      })
    },
    refreshBook(cb) {
      cb(true)
    },
    changeType(index) {
      this.currTypeIndex = index
      if (this.currType.list.length === 0) {
        this.search(0, 10, true)
      }
    },
    declare() {
      let eventOpts = null
      let addData = null
      let cb = msg => {}
      // let data = res.data
      let userId = null
      try {
        userId = JSON.parse(sessionStorage.userInfo).id
      } catch (error) {}

      eventOpts = {
        event_class: 'Search',
        event_type: '搜索',
        event_source: 'WEB', //默认为WEB
        event_operator: userId,
      }
      addData = {
        data: [
          {
            search_value: this.keywords,
          },
        ],
      }
      dbiServices.declare(eventOpts, addData, cb)
    },
    goBookDetail(i) {
      if (i.type == 3) {
        // 课件转跳
        this.$go('/home/Course', {
          id: i.id,
        })
        return
      }
      let inType = 'Read'
      this.$go('/bookDetail', { id: i.id, inType })
    },
    goTheme(i) {
      // 可以利用代码丑化去掉代码, 减少体积
      this.$go('/home/themeDetail', { id: i.id })
    },
    goSearch() {
      // 用于路由变化, 用路由钩子函数去查询, 这样保证查询参数和路由参数一致()
      // this.$go('/home/search', {
      //   keywords: this.keywords,
      //   stype: this.currType.type,
      // })
      this.$router.replace({
        path: '/home/search',
        query: {
          keywords: this.keywords,
        },
      })
      this.search(0, 10, true)
    },
    goBack() {
      this.$router.go(-1)
    },
    currNum(i) {
      let num = 0
      switch (i.name) {
        case '主题':
          num = this.cate_list.theme
          break
        case '书籍':
          num = this.cate_list.com_product
          break
        case '课件':
          num = this.cate_list.course_ware
          break
        default:
          break
      }

      return `(${num})`
    },
  },
}
</script>
<template lang="pug">
.box
  .title
    .goback(@click="goBack")  
    form.search(action="#",method='post' @submit.prevent="goSearch()")
      input.key(placeholder="书名,作者,关键字"  v-model="keywords" )
      input(type="submit" style="visibility:hidden;position:absolute;z-index:-1")
    .send(@click="goSearch()")  
      span 搜索
      .icons.icon-search
  .content
    .types(v-if="cate_list")
      .type-name(v-for="(i,index) in types" 
        @click="changeType(index)"
        :class="{true:currTypeIndex === index}" ) {{i.name}} {{currNum(i)}} 
    .div-sdasd(v-if="currType.list.length")
      .book(v-if="currType.name === '书籍'  ") 
        Scroll(top='2' bottom="0"  @loadMore="loadMoreBook" @refresh="refreshBook"   )
          .list(v-for="i in currType.list" :key="i.id") 
            div(@click="goBookDetail(i)") 
              NormalItem(:item="i" )
      .course(v-if="currType.name === '课件' ") 
        Scroll(top='2' bottom="0"  @loadMore="loadMoreBook" @refresh="refreshBook"   )
          .list(v-for="i in currType.list" @click="goBookDetail(i)"  :key="i.id") 
            NormalItem(:item="i")
      .theme(v-if="currType.name === '主题'") 
        Scroll(top='2' bottom="0"  @loadMore="loadMoreBook" @refresh="refreshBook"   )
          div(  v-for="i in currType.list" ) 
            div(@click="goTheme(i)") 
              NormalThemeItem(:item="i")
    .no-data(v-else)  没有搜索到{{currType.name}}
                  
</template>

<style lang="stylus" scoped>
.title
  display flex
  flex-direction center
  border-bottom 1px solid #e8e8e8
  padding 0.2rem 0.3rem
  justify-content center
  .goback
    width 10%
    display flex
    background url('../../my/userInfo/img/goBack.png') no-repeat left center
    background-size 0.4rem
  .search
    width 75%
    .key
      border-radius 5rem
      text-indent 0.4rem
      padding-left 0.55rem
      width 100%
      border 1px solid #ccc
      height 0.6rem
      color #333
      background #e8e8e8 url('../index/img/search.png') no-repeat 0.18rem 0.11rem
      background-size 0.3rem
  .send
    width 15%
    text-align right
    line-height 0.6rem
    color #3dbdff
.content
  .types
    display flex
    height 0.88rem
    line-height 0.88rem
    font-size 16px
    .type-name
      flex 1
      text-align center
      box-sizing border-box
      &.true
        color #14afff
        border-bottom 2px solid #14afff
  .item
    display flex
    border-bottom 1px solid #e8e8e8
    flex-direction center
    justify-content center
    padding 0.1rem 0.3rem
    .book_img
      width 20%
      padding 0.3rem
      display flex
      justify-content center
      img
        height 1rem
    .txt
      width 80%
      padding-left 0.25rem
      line-height 0.5rem
      color #333
.end
  text-align center
  color #666
  line-height 1rem
</style>
