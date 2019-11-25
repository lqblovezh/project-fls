<script>
import Item from './item'
import * as services from 'services/x-publish/video'
import '@/assets/js/minirefresh'
import * as homeServices from 'services/x-read/home'
import { mapMutations, mapState } from 'vuex'

export default {
  components: { Item },
  props: {
    list: Array,
    name: String,
  },
  created() {
    // type2 听读
    this.init()
  },
  data() {
    return {
      page: {
        offset: 10,
      },
      localList: [],
      query: {},
    }
  },
  computed: {
    ...mapState({
      columnList: state => state.home.columnList,
    }),
    pageStart() {
      return this.columnList.page.start + this.columnList.page.start.offset
    },
  },
  methods: {
    ...mapMutations(['setColumnList']),
    init() {
      this.query = this.$route.query
      this.getUserDefinedPageData(0, true)
    },
    getUserDefinedPageData(pageStart = 0, isClean = false) {
      let _promise
      let _query = {
        pageStart,
        pageOffset: this.page.offset,
        ...this.query,
      }
      if (this.query.type === 'theme') {
        _promise = homeServices.themeDetail(_query)
      } else {
        _promise = homeServices.getUserDefinedPageData(_query)
      }

      return _promise.then(res => {
        this.page = res.page
        if (isClean) {
          this.localList = res.data
        } else {
          this.localList = [...this.localList, ...res.data]
        }
        if (this.localList.length == res.page.total) {
          return true
        }
      })
    },
    loadMore(cb) {
      this.getUserDefinedPageData(this.localList.length).then(cb)
    },
    refresh() {
      // this.getUserDefinedPageData(0, 6, true)
    },
    itemClick(item) {
      if (item.type == 3) {
        // 课件转跳
        this.$go('/home/Course', {
          id: item.id,
          fromUrl: '/home/mediaList?type=kejian&name=讲课4',
        })
        return
      }
      let type = ''
      if (this.query.type.toLowerCase().indexOf('video') != -1) {
        type = 'Video'
      } else if (this.query.type.toLowerCase().indexOf('audio') != -1) {
        type = 'Audio'
      } else if (this.query.type.toLowerCase().indexOf('book') != -1) {
        type = 'Read'
      }
      // this.$go('/bookMedia', {id:item.id , type})
      this.$go('/bookDetail', { id: item.id, inType: type })
    },
  },
}
</script>

<template lang="pug">
.div
  Head(:name="query.name")
  .main( v-if="localList.length")
    Scroll( @loadMore="loadMore" @refresh="refresh" )
      .list 
        .item(v-for="item in localList" )  
          Item(:item="item" @itemClick="itemClick(item)")
          .line-single  
</template>
<style lang="stylus" scoped>
.list
  margin 0.25rem 0.3rem
  .item
    margin-top 0.25rem
    width 100%
</style>
