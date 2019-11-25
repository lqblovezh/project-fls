<script>
import { mapState } from 'vuex'

import CircleSortBy from './comp/CircleSortBy'
export default {
  components: { CircleSortBy },
  asyncData({ store, route }) {
    return store.dispatch('circle/getListPageData', route.query)
  },
  mounted() {
    // this.$service.circle.getList({})
    // this.$store.dispatch('circle/getList')
    console.log(navigator.onLine)
  },
  beforeRouteUpdate(to, from, next) {
    this.clean()
    next()
    return this.$store.dispatch('circle/getList', this.$route.query)
  },
  computed: {
    ...mapState({
      list: state => state.circle.list,
    }),
  },
  methods: {
    getList() {},
    clean() {
      this.$store.state.circle.list = []
    },
    loadMore(end) {
      // end 是回调函数  end(true), 表示没有数据了(返回空数组), false, 表示
      console.log('load more')
      this.$store
        .dispatch('circle/getList', {
          pageStart: this.list.length,
        })
        .then(end)
        .catch(err => end(true))
    },
    addCircle(item) {
      console.log(item)
      this.$addCircle(item)
    },
    goDetail(item) {
      // if (this.$isLock(item)) return
      this.$go('/circle-detail', { id: item.id })
    },
    search(data) {
      console.log(data)
      this.$replace('/circle', { ...this.$route.query, ...data })
    },
    select(order) {
      console.log(order)
      return
      this.$replace('/circle', { ...this.$route.query, order })
    },
  },
}
</script>


<template lang="pug">
  .page-book-circle 
    //- Head
    //- CircleSortBy(
      top="45px" 
      @search="search" 
      @select="select" 
      )
    .wrapper
      .content( v-if="list.length" )
        Scroll( 
          top="0px"
          bottom="60px"
          @loadMore="loadMore"
        )
          .ls
            CardCircle(
              v-for="item in list" 
              @goDetail="goDetail(item)"
              @addCircle="addCircle(item)"
              :key="item.id"
              :item="item"
            )
      NoData(v-else)
</template>


<style lang="stylus">
</style>
