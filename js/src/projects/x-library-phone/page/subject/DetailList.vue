<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    return store.dispatch('category/getSubjectDetailList', {
      clean: true,
      ...route.query,
    })
  },
  computed: {
    ...mapState({
      list: state => state.category.subjectDetailList,
      resPage: state => state.category.resPage,
    }),
  },
  data () {
    return {
      order: {},
      params: {}
    }
  },
  methods: {
    select(order) {
      this.order = order
      this.getList()
    },
    async openPanel() {
      const {
        product_id,
        class_id
      } = this.$route.query
      await this.$store.dispatch('filter/getList', {
        id: product_id,
        category_filter: class_id,
        type: 'taoxi'
      })
      this.$refs.panel.open()
    },
    loadMore(cb) {
      this.getList(false)
        .then(cb)
    },
    goDetail(item) {
      console.log(item)
      this.$go('/column-detail', {
        id: item.product_id,
        book_id: item.book_id,
        name: this.$route.query.name,
      })
    },
    getList (flag = true) {
      return this.$store
        .dispatch('category/getSubjectDetailList', {
          pageStart: flag?0:this.list.length,
          clean: flag,
          order: this.order,
          ...this.params,
          ...this.$route.query,
        })
    },
    getColumn (params) {
      this.params = params
      this.getList()
    }
  },
}
</script>


<template lang="pug">
  .page-subject-detail-list( )
    ColumnRightSelect(ref="panel" @getColumn="getColumn")
    Head( :name="$route.query.name")
    .wrapper
      ColumnSortBy(
        @select="select"
        @openPanel="openPanel"
        top="45px"
      )
      .content
        .main(v-if="list.length")
          ResultCount(top="80px" :num="resPage.total")
          Scroll(
            @loadMore="loadMore" 
            :isAutoLoad="false"
            top="100px"
          )
            .main 
              ResultCard( 
                v-for="item in list"
                @click.native="goDetail(item)"
                :key="item.id"
                :name="item.name"
                :type="item.book_info.components.base_type || item.book_info.components.type"
                :des="item.book_info.components.副标题"
                :time="item.book_info.components.发布时间"
                :fire="item.book_info.hot"
                :cpts="item.book_info.components"
                :number="item.book_info.components.案例编号"
              )
        NoData(v-else top="30px")
</template>