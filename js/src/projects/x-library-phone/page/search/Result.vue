<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import tabSelect from '@/mixins/tabSelect'
export default {
  mixins: [tabSelect],
  // 在 searchHead 里面操作
  asyncData({ store, route }) {
    return store.dispatch('search/getList', {
      isHistory: true,
      cate: true,
      ...route.query,
    })
  },
  computed: {
    ...mapState({
      searchId: state => state.search.searchId,
      list: state => state.search.list,
      resPage: state => state.search.resPage,
    }),
    name () {
      return this.cates.filter(c => c.checked)[0].name
    }
  },
  async mounted() {
    // beforeMount里面才有 dataPromise
    // 如果发现, 没有id , 那么就replace, clean data, 重新请求,
  },
  data () {
    return {
      page: {
        pageStart: 0,
        pageOffset: 20
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.clean()
    this.getList(to.query)
    next()
    // this.search()
    // ...
  },
  beforeDestroy() {
    this.clean()
  },
  methods: {
    ...mapMutations('search', ['SET_LIST']),
    ...mapActions('category', ['getColumnKeys']),
    ...mapActions('search', ['updateSecondTabs', 'getList', 'searchFinalData']),
    async openPanel () {
      const {
        pid,
        cid
      } = this.$route.query
      await this.$store.dispatch('filter/getList', { id: pid, category_filter: cid })
      this.$refs.panel.open()
    },
    select(order) {
      this.order = order
      this.queryArticleList(true).then(this.$refs.scroll.backHandler).catch(e => console.log(e))
    },
    search() {
      this.$store.dispatch('search/getList', this.$route.query)
    },
    loadMore(cb) {
      this.queryArticleList().then(this.$refs.scroll.backHandler).catch(e => console.log(e))
    },
    async navItemClickHandler(item) {
      try {
        const cid = await this.getIdOfUpdateTab(item)
        this.$replace('/search/result', {
          ...this.$route.query,
          pid: item.id,
          cid,
        })
      } catch(e) {
        console.warn(e.toString())
      }
    },
    navCitemClickHandler(item) {
      this.toggleSelectItem(this.cateSecond, item) && this.resetState()
      this.$replace('/search/result', {
        ...this.$route.query,
        cid: item.id,
      })
    },
    nameChangeHandler(name) {
      this.$replace('/search/result', {
        ...this.$route.query,
        name,
      })
    },
    goDetail(item) {
      console.log(item);
      if(item.book_info.components.type==6||item.book_info.components.type==8){
        this.$go('/column-bookproduct', {
        id: item.book_info.product_id,
        name: this.$route.query.name,
      })
      }else{
        this.$go('/column-detail', {
          id: item.book_info.product_id,
          name: this.$route.query.name,
        })
      }
    },
    curr(e) {
      console.log(e)
    },
    clean() {
      this.SET_LIST([])
    },
    async queryArticleList (clean = false) {
      return this.searchFinalData({
        ...this.$route.query,
        ...this.params,
        order: this.order,
        clean,
        pageStart: clean ? 0 : this.list.length
      })
    },
    getColumn (params) {
      this.setFilterParams(params)
      this.queryArticleList(true).then(this.$refs.scroll.backHandler).catch(e => console.log(e))
    },
  },
}
</script>
<template lang="pug">
.page-result
  ColumnRightSelect(ref="panel" @getColumn="getColumn")
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
      ResultCount(top="170px" :typeResult='list' :num="resPage.total" :name="name")
      Scroll(top="188px" @loadMore="loadMore" ref="scroll")
        .ls(@click="curr")
          ResultCard( 
            v-for="item,index in list"
            @click.native="goDetail(item)"
            :key="item.name"
            :type="item.book_info.components.base_type || item.book_info.components.type"
            :status="item.book_info.components['效力状态']"
            :name="item.book_info.name"
            :credit="item.book_info.components.资源出处"
            :fire="item.book_info.hot"
            :des="item.book_info.components.副标题"
            :time="item.book_info.components.发布时间"
            :keyword="$route.query.name"
            :number="item.book_info.components.案例编号"
            :taoxi="item.book_info.components.所属套系"
            :volume="item.book_info.components.所属卷册"
            :cpts="item.book_info.components"
          )
    NoData(v-else)
</template>
<style lang="stylus"></style>