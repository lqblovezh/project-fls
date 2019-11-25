<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('search', {
      key: state => state.key,
      isHistoryVis: state => state.isHistoryVis,
      searchHistory: state => state.searchHistory,
      hots: state => state.hots,
      firstCategory: state => state.cates,
      secondCategory: state => state.cateSecond,
    }),
  },
  props: ['nameChangeHandler'],
  beforeRouteEnter(to, from, next) {
    // @TODO 从结果页面返回时，将搜索的关键字清除
    // console.log(to, from)
    next()
  },
  methods: {
    cleanHis() {
      this.$store.state.search.searchHistory = []
    },
    delHsi(index) {
      this.$store.dispatch('search/delSearchByIndex', index)
    },
    goKey(name) {
      this.nameChangeHandler(name)
      // const { cid, pid } = this.$route.query
      // if (!cid && !pid) {
      //   this.$go('/search/result', {
      //     cid: this.secondCategory[0].id,
      //     pid: this.secondCategory[0].pid,
      //     name,
      //   })
      // }
      // this.$store.state.search.isHistoryVis = false
    },
  },
}
</script>
<template lang="pug">
.page-home
  .search-tip.c_f_bg
    .history(v-show="searchHistory.length")
      TopicTitle( @more="cleanHis" name="历史足迹" icon="del" rname=" ")
      .ls.c_6.f14
        .p.flex(
          v-for="item,index in searchHistory" 
          :key="item.tid"
          @click="goKey(item.name)"
        )
          .val.ellipsis {{item.name}}
          .time.f12 {{item.time}}
          .icon.icon-close(@click.stop="delHsi(index)")
    .hot(v-if="hots.length")
      TopicTitle(name="热门搜索" icon="" rname=" ")
      .ls
        .dd(
          v-for="(item,index) in hots "
          :key="index"
           @click="goKey(item.keyword)"
        )
          HideText( :text="item.keyword" :index="index")
</template>
<style lang="stylus">
.page-home
  >.search-tip
    padding 15px
    position fixed
    left 0
    right 0
    top 45px
    z-index 125
    bottom 0
    overflow-y auto
    >div
      >.ls
        margin-top 20px
    >.history
      margin-bottom 20px
      >.ls
        >.p
          height 35px
          line-height 35px
          justify-content space-between
          padding-left 15px
          >div
            height 100%
          >.val
            width 4.3rem
          >.icon-close
            width 20px
            text-align right
</style>