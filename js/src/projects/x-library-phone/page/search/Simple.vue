<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import service from 'services/x-library/front'

export default {
  asyncData({ store, route }) {
    let form = route.query.formData ? JSON.parse(route.query.formData) : {}
    return store.dispatch('search/getSimpleSearch', {
      clean: true,
      ...route.query,
    })
  },
  computed: {
    ...mapState('search', {
      list: state => state.list,
      resPage: state => state.resPage,
    }),
  },
  mounted() {
    document.title = 'Xbook 小数据库'
  },
  data() {
    return {
      isFilter: false,
      params: {},
      page: {
        pageStart: 0,
        pageOffset: 20,
      },
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.clean()
    next()
  },
  beforeDestroy() {
    this.clean()
  },
  methods: {
    ...mapMutations('search', ['SET_LIST']),
    ...mapActions('search', ['getSimpleSearch']),
    openPanel() {
      this.$refs.panel.open()
    },
    loadMore(cb) {
      const { formData } = this.$route.query
      let form = formData ? JSON.parse(formData) : {}
      this.getSimpleSearch({
        pageStart: this.list.length,
        ...this.$route.query,
      }).then(res => {
        cb(res)
      })
    },
    async goDetail(item) {
      const { book_id, index, id, read_product, article_id } = item
      let res = await service.category.getAccessCode({
        id: article_id,
      })
      localStorage.access_code = res.data
      this.$go('/reader', {
        product_id: read_product,
        chapter_root: index,
        chapter_id: id,
        book_id,
      })
    },
    curr(e) {
      console.log(e)
    },
    clean() {
      this.$store.state.search.list = []
    },
    async chapterClick(item, parent) {
      const { book_id, index, id } = item
      let res = await service.category.getAccessCode({
        id: parent.article_id,
      })
      localStorage.access_code = res.data
      const { components } = parent.books_info
      this.$go('/reader', {
        product_id: components.read_product,
        chapter_root: index,
        chapter_id: id,
        book_id,
      })
    },
  },
}
</script>

<template lang="pug">
.page-search-normal
  .wrapper
    Head(name="检索结果")
    .content
      .main(v-if="list.length")
        .pageResult
          TopicTitle(:name="'检索结果 ('+resPage.total+'条)'" leftIcon="results" icon='' rname=" ")
        Scroll(top="90px" @loadMore="loadMore")
          .ls(@click="curr")
            ResultCard( 
              v-for="item,index in list"
              @click.native="goDetail(item)"
              @chapterclick="chapterClick"
              :key="index"
              :parent="item"
              :from="item.name"
              :name="item.chapter_name"
              :keyword="$route.query.name"
              :content="item.strip_text"
              :chapters="item.chapters"
            )
      NoData(v-else)
</template>
<style lang="stylus">
.page-search-normal
  min-height 100%
  background #fbfbfb
  >.wrapper
    .pageResult
      top 43px
      left 0
      color #755a46
      padding 15px 15px
      position absolute
      width 100%
      z-index 1
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
      // margin-top 200px
</style>
