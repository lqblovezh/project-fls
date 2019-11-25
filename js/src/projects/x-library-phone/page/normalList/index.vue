<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  asyncData({ store, route }) {
    const {
      list_type
    } = route.query
    return store.dispatch('normal/init', { clean: true, isKey: list_type === 'advance_keyword',...route.query })
  },
  mounted() {
    // const URL = decodeURIComponent(location.href)
    const {
      list_type,
      laws,
      keyword
    } = this.$route.query
    this.list_type = list_type
    let formData = this.$route.query.formData
    if (formData) {
      formData = JSON.parse(formData)
      this.keyword = [formData.key].concat(formData.appendKeys).filter(i => i.type == 'title')
      console.log(this.keyword)

    }
    if (laws) {
      this.pageName = '关联法规'
    }
    if (keyword || list_type === 'advance_keyword') {
      this.pageName = '关键词'
    }
  },
  beforeDestroy() {
    this.clean()
  },
  computed: {
    ...mapState({
      cates: state => state.normal.cates,
      cateSecond: state => state.normal.cateSecond,
      list: state => state.normal.list,
      resPage: state => state.normal.resPage,
    }),
    name () {
      return this.cates.filter(c => c.checked)[0].name
    }
  },
  data () {
    return {
      isFilter: false,
      params: {},
      order: {},
      list_type: null,
      pageName: '刑审智库',
      keyword: ''
    }
  },
  methods: {
    ...mapActions('normal', ['getList', 'getSecond']),
    clean() {
      this.$store.state.normal.list = []
    },
    loadMore(end) {
      const category_id = this.cateSecond.filter(i => i.checked)[0].id
      // end 是回调函数  end(true), 表示没有数据了(返回空数组), false, 表示
      this.$store
        .dispatch('normal/getList', {
          pageStart: this.list.length,
          category_id,
          ...this.order,
          ...this.params,
          ...this.$route.query
        })
        .then(end)
        .catch(err => end(true))
    },
    goDetail(item) {
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
    search(data) {
      console.log(data)
    },
    select(order) {
      let item = this.getSelectedItem()
      this.order = order
      item && this.getList({ clean: true, category_id: item.id, order, ...this.params, ...this.$route.query })
    },
    getSelectedItem (top=false) {
      return top ? this.cates.filter(c => c.checked)[0] : this.cateSecond.filter(cate => cate.checked)[0]
    },
    async navItemClickHandler (item ,idx) {
      const selectItem = this.getSelectedItem(true)
      if (item.id === selectItem.id) {
        return
      }
      this.toggleItemActive(item, true)
      await this.getSecond({pid: item.id})
      // 更新一级列表时同步更新数据列表
      this.$replace('/normal-list', {
        ...this.$route.query,
        pid: item.id,
        cid: this.cateSecond[0].id
      })
      await this.getList({ clean: true, category_id: this.cateSecond[0].id, ...this.$route.query })
    },
    async navCitemClickHandler (item, idx) {
     const selectItem = this.getSelectedItem()
      if (item.id === selectItem.id) {
        return
      }
      this.toggleItemActive(item, false)
      this.$replace('/normal-list', {
        ...this.$route.query,
        cid: item.id,
      })
      await this.getList({ clean: true, category_id: item.id, ...this.$route.query })
    },
    toggleItemActive (item, top) {
      this.resetState()
      let checkedItem = top ? this.cates.filter(cate => cate.checked)[0] : this.cateSecond.filter(cate => cate.checked)[0]
      this.$set(checkedItem, 'checked', false)
      this.$set(item, 'checked', true)
    },
    async openPanel () {
      const p = this.getSelectedItem(true),
            c = this.getSelectedItem()
      if (!p || !c) {
        return
      }
      await this.$store.dispatch('filter/getList', { id: p.id, category_filter: c.id })
      this.$refs.panel.open()
    },
    getColumn (params) {
      this.isFilter = true
      this.params = params
      let item = this.getSelectedItem()
      // 点击筛选时，重置数据为空
      item && this.getList({ clean: true, category_id: item.id, ...this.params, ...this.$route.query })
    },
    resetState () {
      this.isFilter = false
      this.params = {}
      this.order = {}
    }
  },
}
</script>


<template lang="pug">
  .page-book-circle
    Head(:name="pageName")
    ColumnRightSelect(ref="panel" @getColumn="getColumn")
    .wrapper
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
      .content( v-if="list.length" )
        ResultCount(top="180px" :list="list" :type="list" :num="resPage.total" :name="name")
        Scroll( 
          top="200px"
          bottom="0px"
          @loadMore="loadMore"
        )
          .ls
            ResultCard( 
              v-for="item,index in list"
              :key="item.name"
              @click.native="goDetail(item)"
              :name="item.name"
              :keyword="keyword"
              :type="item.book_info.components.base_type || item.book_info.components.type"
              :fire="item.book_info.hot"
              :des="item.book_info.components.副标题"
              :time="item.book_info.components.发布时间"
              :cpts="item.book_info.components"
              :number="item.book_info.components.案例编号"
            )
      NoData(v-else)
</template>


<style lang="stylus">
</style>
