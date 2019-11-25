<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  asyncData({ store, route }) {
    return store.dispatch('category/getColumnSecondPageData', {
      clean: true,
      ...route.query,
    })
  },
  computed: {
    ...mapState({
      columnSecond: state => state.category.columnSecond,
      columnResource: state => state.category.columnResource,
      resPage: state => state.category.resPage,
    }),
  },
  data() {
    return {
      params: {},
      order: {},
      page: {
        pageStart: 0,
        pageOffset: 20,
      },
    }
  },
  beforeRouteUpdate(to, from, next) {
    // ...
    this.clean()
    // console.log('beforeRouteUpdate')
    next()
    this.$unCheckedAll(this.columnSecond, to.query.cid)
    this.$store.dispatch('category/getColumnResource', {
      category_id: to.query.cid,
      clean: true,
      ...to.query,
    })
  },
  beforeDestroy() {
    this.clean()
  },
  methods: {
    ...mapMutations('category', ['set_column_resource']),
    ...mapActions('filter', ['getList']),
    ...mapActions('category', ['getColumnResource']),
    async openPanel() {
      const item = this.columnSecond.filter(i => i.checked)[0]
      console.log(item)
      if (item) {
        await this.getList({
          id: this.$route.query.id,
          category_filter: item.id,
        })
        this.$refs.panel.open()
        console.log(item)
      }
    },
    select(item) {
      this.order = item
      this.getArticleList(true)
        .then(this.$refs.scroll.backHandler)
        .catch(e => console.log(e))
      // cb() 执行图标反向旋转, 一般在请求成功后执行,
      // 不想考虑那么完美了, 直接执行
    },
    async navItemClickHandler(item) {
      const { path, query } = this.$route
      this.resetState()
      // 如果query没有的字段,不会监听到变化
      this.$replace('/column-nav', { ...query, cid: item.id })
    },
    loadMore(cb) {
      this.getArticleList()
        .then(cb)
        .catch(e => console.log(e))
    },
    getArticleList(clean = false) {
      return this.getColumnResource({
        ...this.$route.query,
        ...this.params,
        order: this.order,
        clean,
        pageStart: clean ? 0 : this.columnResource.length,
        category_id: this.$route.query.cid || this.columnSecond[0].id,
      })
    },
    goDetail(item) {
      console.log(item.book_info.components.type)
      if (
        item.book_info.components.type == 6 ||
        item.book_info.components.type == 8
      ) {
        this.$go('/column-bookproduct', {
          id: item.book_info.product_id,
          name: this.$route.query.name,
        })
        return
      }
      if (item.book_info.components.type != 6) {
        this.$go('/column-detail', {
          id: item.book_info.product_id,
          name: this.$route.query.name,
        })
      }
    },
    clean() {
      this.$store.state.category.columnResource = []
    },
    async loadMoreColumn(cb = () => {}) {
      let category_id = !this.$route.query.cid
        ? this.columnSecond[0].id
        : this.$route.query.cid
      try {
        const res = await this.$service.category.getColumnResource({
          category_id,
          ...this.$route.query,
          ...this.params,
          ...this.page,
        })
        this.set_column_resource([...this.columnResource, ...res.data])
        this.total = this.total ? this.total : res.page.total
        this.page.pageStart = this.columnResource.length
        cb(this.columnResource.length === res.page.total)
      } catch (e) {
        console.warn(e.toString())
      }
    },
    getColumn(params) {
      this.params = params
      this.getArticleList(true)
        .then(this.$refs.scroll.backHandler)
        .catch(e => console.log(e))
    },
    // 切换tab时，重置查询状态
    resetState() {
      this.params = {}
      this.order = {}
    },
  },
}
</script>

<template lang="pug">
  .page-column-nav(v-if="columnSecond.length")
    ColumnRightSelect(ref="panel"  @getColumn="getColumn")
    Head(:name="$route.query.name")
    .select
    .nav
      ColumNav(
        @itemClickHandler="navItemClickHandler"
        :list="columnSecond"
      )
    ColumnSortBy(
      @select="select"
      @openPanel="openPanel"
      top="93px"
    )
    .content
      .scroll(v-if="columnResource.length")
        ResultCount(top="125px" :num="resPage.total")
        Scroll(
          ref="scroll"
          top="145px"
          @loadMore="loadMore"
        )
          .ls
            ResultCard(
              v-if="item.book_info.components.type!=6&&item.book_info.components.type!=8"
              v-for="item,index in columnResource"
              :key="item.name"
              @click.native="goDetail(item)"
              :type="item.book_info.components.base_type || item.book_info.components.type"
              :name="item.name"
              :author="item.book_info.components.作者"
              :fire="item.book_info.hot"
              :status="item.book_info.components.效力状态"
              :des="item.book_info.components.副标题"
              :publicationTime="item.book_info.components.发表时间"
              :time="item.book_info.components.发布时间"
              :credit="item.book_info.components.资源出处"
              :number="item.book_info.components.案例编号"
              :cpts="item.book_info.components"
            )
            ResultCardBook(
              v-if="item.book_info.components.type==6"
              v-for="item,index in columnResource"
              :key="item.name"
              @click.native="goDetail(item)"
              :type="item.book_info.components.base_type || item.book_info.components.type"
              :name="item.name"
              :bookImg="item.book_info.components.封面"
              :price="item.book_info.price"
              :fire="item.book_info.hot"
              :cbrq="item.book_info.components.出版日期"
              :bc="item.book_info.components.版次"
              :des="item.book_info.components.副标题"
              :author="item.book_info.components.作者"
              :jch="item.book_info.components.卷册号"
              :cpts="item.book_info.components"
            )
            ResultCardBook(
              v-if="item.book_info.components.type==8"
              v-for="item,index in columnResource"
              :key="item.name"
              @click.native="goDetail(item)"
              :type="item.book_info.components.base_type || item.book_info.components.type"
              :name="item.name"
              :videoTime="item.book_info.components.create_time"
              :person="item.book_info.components.专辑责任者"
              :bookImg="item.book_info.components.封面"
              :price="item.book_info.price"
              :fire="item.book_info.hot"
              :player="item.book_info.components.专辑演播者"
              :cpts="item.book_info.components"
            )
      NoData(v-else)
</template>
<style lang="stylus">
.page-column-nav
  >.select
    background #fff
    position fixed
    top 0px
    left 0
    right 0
    z-index 5
    height 100px
  >.nav
    position fixed
    top 46px
    z-index 10
  >.content
    margin-top 100px
</style>
