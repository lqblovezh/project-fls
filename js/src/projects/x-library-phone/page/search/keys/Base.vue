<script>
import AdvInput from '../comp/AdvInput'
import { mapState } from 'vuex'

export default {
  components: { AdvInput },
  asyncData({ store, route }) {
    return store.dispatch('advance/searchAdvanceKey', {
      clean: true,
      ...route.query,
    })
  },
  data() {
    return {
      data: {
        time_start: '',
        time_end: '',
      },
      form: {
        keyword: '',
      },
      citemCheckedId: '',
    }
  },
  mounted() {
    this.form.keyword = this.$route.query.keyword
  },
  beforeDestroy() {
    this.$store.state.advance.list = []
  },
  computed: {
    ...mapState({
      list: state => state.advance.list,
      citemChecked: state => state.advance.citemChecked,
      wordList: state => state.advance.wordList,
    }),
  },
  beforeRouteUpdate(to, from, next) {
    next()
    // const { route } = to
    this.$store.dispatch('advance/searchAdvanceKey', {
      clean: true,
      ...to.query,
    })
  },
  methods: {
    chooseTime() {
      console.log('object')
    },
    searchKey() {
      this.$replace('/search-exact', { keyword: this.form.keyword })
    },
  },
}
</script>

<template lang="pug">
  .comp-search-exact
    Head(name="精确匹配关键词检索" type="dark")
    .wrapper 
      .main
        .inp
          .comp-adv-input
            //- .ib.select
              select()
                option.opt 刑法
                option.opt 标题
            .ib.inp
              input(
                @keyup.enter="searchKey"
                placeholder="请输入关键词..." 
                v-model="form.keyword")
            .icon-tip(@click="searchKey")
              .icon.icon-home-search
        .ls.f14
          //- .bbtn.aac.f14  您要查找的根词是：
          router-view
</template>
<style lang="stylus">
.comp-search-exact
  >.wrapper
    padding 15px
    >.main
      padding 15px
      background #FFFFFF
      box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
      border-radius 4px
      margin-bottom 50px
      >.ls
        >.bbtn
          border-top-left-radius 0px
          border-bottom-left-radius 0px
          margin 15px 0
          transform translateX(-15px)
    >.search-exact-btn
      background #fff
      position fixed
      bottom 0
      left 0
      right 0
      height 50px
      line-height 50px
      >.cbtn
        font-size 0.3rem
</style>
