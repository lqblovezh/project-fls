
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  // 在 searchHead 里面操作
  asyncData({ store, route }) {
    // if (!route.query || !route.query.name) return Promise.resolve()
    return store.dispatch('search/searchData', {
      isHistory: true,
      isCate: true,
      ...route.query,
    })
  },
  computed: {
    ...mapState({
      cates: state => state.search.cates,
      cateSecond: state => state.search.cateSecond,
      searchId: state => state.search.searchId,
      list: state => state.search.list,
      resPage: state => state.search.resPage,
      columnKeys: state => state.category.columnKeys
    }),
  },
  async mounted() {
    // beforeMount里面才有 dataPromise
    // 如果发现, 没有id , 那么就replace, clean data, 重新请求,

    await this.dataPromise
    // console.log(this.searchId)
    this.getFilterKeys(this.$route.query.pid)

    const { pid, cid } = this.$route.query
    if (pid && cid) return
    this.$replace('/search-normal', {
      ...this.$route.query,
      ...this.searchId,
    })
  },
  data () {
    return {
      isFilter: false,
      params: {},
      page: {
        pageStart: 0,
        pageOffset: 20
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.clean()
    next()
    this.search()
    // ...
  },
  beforeDestroy() {
    this.clean()
  },
  methods: {
    ...mapMutations('search', ['SET_LIST']),
    ...mapActions('category', ['getColumnKeys']),
    openPanel () {
      this.$refs.panel.open()
    },
    select(item, cb) {
      if (item === 'select') {
        return
      } else {
        const { type, sort } = item
        this.$replace('/search-normal', {
          ...this.$route.query,
          order: item,
        })
        // cb()
      }
    },
    search() {
      // this.$router.go(-1)
      // console.log('search  data')
      this.$store.dispatch('search/searchData', this.$route.query)
      this.getFilterKeys()
    },
    loadMore(cb) {
      if (this.isFilter) {
        this.loadMoreArticle(cb)
        return
      }
      this.$store
        .dispatch('search/searchFinalData', {
          pageStart: this.list.length,
          ...this.$route.query,
        })
        .then(cb)
    },
    async navItemClickHandler(item) {
      console.log(item)
      let cid = await this.$store.dispatch('search/getSecond', item)
      this.$replace('/search-normal', {
        ...this.$route.query,
        pid: item.id,
        cid,
      })
      this.resetState()
      // 查找子类, 得到子类的cid, 然后查找
      this.$unCheckedAll(this.cates, item.id)
    },
    navCitemClickHandler(item) {
      console.log(item)
      // this.$unCheckedAll(this.cateSecond, item.id)
      this.resetState()
      this.$replace('/search-normal', {
        ...this.$route.query,
        cid: item.id,
      })
    },
    nameChangeHandler(name) {
      this.$replace('/search-normal', {
        ...this.$route.query,
        name,
      })
    },
    goDetail(item) {
      this.$go('/column-detail', {
        id: item.book_info.product_id,
        name: this.$route.query.name,
      })
    },
    curr(e) {
      console.log(e)
    },
    clean() {
      this.$store.state.search.list = []
    },
    getFilterKeys (pid) {
      if (!pid && !this.$route.query.pid) {
        return
      }
      return this.getColumnKeys({
        id: pid || this.$route.query.pid
      })
    },
    async loadMoreArticle (cb = () => {}) {
      try {
        const res = await this.$service.search.search({
          ...this.$route.query,
          ...this.page,
          ...this.params
        })
        this.SET_LIST([...JSON.parse(JSON.stringify(this.list)), ...res.data])
        this.page.pageStart = this.list.length
        cb(this.list.length === res.page.total)
      } catch(e) {
        console.warn(e.toString())
      }
    },
    getColumn (params) {
      this.isFilter = true
      this.params = params
      console.log(params)
      // 点击筛选时，重置数据为空
      this.SET_LIST([])
      this.loadMoreArticle()
    },
    // 切换tab时，重置查询状态
    resetState () {
      this.isFilter = false
      this.params = {}
      this.page.pageStart = 0
    }
  },
}
</script>


<template lang="pug">
.page-search-normal
  ColumnRightSelect(ref="panel" :list="columnKeys" @getColumn="getColumn")
  .all-bg
  .wrapper
    SearchHead(
      @nameChangeHandler="nameChangeHandler"
    )
    .result.c_f_bg
      .col 
        .ls-top
          ColumNav(
            @itemClickHandler="navItemClickHandler"
            :list="cates"
          )
        .ls-second
          ColumNav(
            @itemClickHandler="navCitemClickHandler"
            :list="cateSecond"
            top="88px"
          )
        ColumnSortBy(
          @select="select"
          @openPanel="openPanel"
          top="136px"
          height="30px"
        )
    .content
      .main(v-if="list.length")
        ResultCount(top="170px" :num="resPage.total")
        Scroll(top="188px" @loadMore="loadMore")
          .ls(@click="curr")
            ResultCard( 
              v-for="item,index in list"
              @click.native="goDetail(item)"
              :key="item.name"
              :status="item.book_info.components['效力状态']"
              :name="item.book_info.name"
              :fire="item.book_info.hot"
              :des="item.book_info.components.副标题"
              :time="item.book_info.components.发布时间"
              :keyword="$route.query.name"
              :number="item.book_info.components.案例编号"
              :taoxi="item.book_info.components.所属套系"
              :volume="item.book_info.components.所属卷册"
            )
      NoData(v-else)
</template>
<style lang="stylus">

.page-search-normal
  >.wrapper
    >.result
      margin-bottom 40px
      >.col
        top 44px
        position fixed
        background #fff
        z-index 10
        height 110px
        >.ls-top
          width 7.5rem
        >.ls-second
          width 7.5rem
    >.content
      margin-top 200px
</style>
