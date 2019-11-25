<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      name: '',
    }
  },
  created() {
    this.name = this.$route.query.name
  },
  mounted() {
    this.$refs.inp.focus()
  },
  computed: {
    ...mapState({
      key: state => state.search.key,
      isHistoryVis: state => state.search.isHistoryVis,
      searchHistory: state => state.search.searchHistory,
      hots: state => state.search.hots,
    }),
  },
  methods: {
    searchHander() {
      this.$emit('nameChangeHandler', this.name)
      this.$store.state.search.isHistoryVis = false
      // this.$replace('/search-normal', { name: this.name })
    },
    back() {
      if (!this.$route.query.name) {
        this.$goBack()
        return
      }
      if (this.isHistoryVis) {
        this.$store.state.search.isHistoryVis = false
      } else {
        this.$goBack()
      }
    },
    focusHandler() {
      this.$store.state.search.isHistoryVis = true
    },
    blurHandler() {
      // this.$store.state.search.isHistoryVis = false
    },
    goKey(name) {
      this.name = name
      this.searchHander()
    },
  },
  watch: {
    '$route' (newVal, oldVal) {
      const name = this.$route.query.name
      this.name = name ? name : ''
    }
  }
}
</script>

<template lang="pug">
  .comp-normal-search.c_f_bg
    .wrapper.vm-all.flex
      .scan.tc.iconFlex(@click="back")
        .icon.icon-more.rotate_180.
      .inp
        .search.icon.icon-home-search(@click="searchHander")
        input(
          ref="inp"
          v-model="name"
          @keyup.enter="searchHander"
          @focus="focusHandler"
          @blur="blurHandler"
          @input="focusHandler"
          placeholder="搜索标题、书名、文件名、案号"
        )
        .close.icon.icon-close( v-if="name" @click="name=''")
      .column.tc(@click="searchHander")
        .ib
          span.f14.fixed 搜索
</template>
<style lang="stylus">
.comp-normal-search
  >.wrapper
    height 52px
    line-height 52px
    >.scan
      width 1rem
    >.column
      width 1rem
    >.inp
      position fixed
      left 10%
      top 0
      width 5.5rem  
      max-height 1rem
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      .icon
        position absolute
        top 0
        bottom 0
        width 30px
        height 30px
        margin auto
        &.search
          left 0
        &.close
          right 0
      input
        border 1px solid #fff
        background #F4F4F4
        border-radius 8px
        width 100%
        text-indent 25px
.fixed
  position fixed
  top 0
  right 5%
.iconFlex
  position fixed
  top 0
  left 0
</style>