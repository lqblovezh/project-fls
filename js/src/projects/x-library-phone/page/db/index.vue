<script>
import { mapState, mapActions } from 'vuex'

export default {
  asyncData({ store, route }) {
    return store.dispatch('dbHome/getData', route.query)
  },
  computed: {
    ...mapState('dbHome', {
      homeInfo: state => state.homeInfo,
      keyword: state => state.keyword,
    }),
    ...mapState('search', {
      hots: state => state.hots,
    }),
    ...mapState({
      config: state => state.config,
    }),
  },
  data() {
    return {
      name: '',
    }
  },
  created() {},
  mounted() {
    document.title = 'Xbook 小数据库'
    this.$nextTick(() => {
      console.log(this.config)
    })
  },
  methods: {
    goPage(keyword) {
      let searchDate = {
        name: keyword,
      }
      let data = {
        formData: JSON.stringify(searchDate),
      }
      this.$go('/search-simple', { name: keyword })
    },
    searchHander() {
      let searchDate = {
        name: this.name,
      }
      let data = {
        formData: JSON.stringify(searchDate),
      }
      this.$go('/search-simple', { name: this.name })
    },
    ...mapActions('dbHome', ['getData']),
  },
}
</script>
<template lang="pug">
.page-db
  .db-name {{homeInfo.name}}数据库
  .normal-search
    .wrapper
      .inp
        .search.icon.icon-home-search(@click="searchHander")
        input(
          ref="inp"
          v-model="name"
          @keyup.enter="searchHander"
          placeholder="请输入要检索的内容"
        )
        .buttom(@click="searchHander")
          span 检索
        .close.icon.icon-close( v-if="name" @click="name=''")
  .db-key
    .db-kw.db
      .db-kw__list
        .home-topic-title
          .name
            .ib.icon.icon-recommend
            span 推荐搜索:
        .item.flex-between-center(v-for="item,index in keyword" :key="index" @click="goPage(item.name)")
          .item-name {{item.name}}
    // .db-hot.db(v-if="hots.length")
    //   .db-kw__list
    //     TopicTitle(name="热门搜索：" leftIcon="hot" icon='' rname=" ")
    //     .item.flex-between-center(v-for="item,index in hots" :key="index" @click="goPage(item.keyword)")
    //       .item-name.f14 {{item.keyword}}
  .tc.producer
    p.f12 出品方：{{config.publisher&&config.publisher.name}}
</template>
<style lang="stylus" scoped>
@import './special.css'

.normal-search
  padding 0 0.3rem
  >.wrapper
    >.scan
      width 1rem
    >.column
      width 1rem
    >.inp
      width 100%
      border-radius 5px
      // overflow hidden
      position relative
      .icon
        position absolute
        top 0
        bottom 0
        width 0.7rem
        height @width
        margin auto
        &.search
          left 0
          background-size 0.3rem
          background-position center
        &.close
          right 1.5rem
      .buttom
        position absolute
        width 1.5rem
        height 0.73rem
        line-height 1
        font-size 0.28rem
        text-align center
        background #664832
        right 0
        top 0
        border-top-right-radius 5px
        border-bottom-right-radius 5px
        color #ffffff
        span
          position relative
          top 0.25rem
          line-height 1
      input
        border 1px solid #664832
        background none
        border-radius 5px
        font-size 0.3rem
        color #333
        width 100%
        padding 0
        height 0.73rem
        line-height 0.73rem
        padding-right 2.2rem
        text-indent 2em
        box-sizing border-box
        cursor pointer
        -webkit-appearance none
        &::placeholder
          color #8d8884
.producer
  position fixed
  // height 3em
  // line-height @height
  padding-bottom 0.7rem
  bottom 0
  width 100%
  color #664832
  opacity 0.9
  // background url('./img/bg.png')
  background-position center
  p
    margin 0
.page-db
  min-height 100%
  // background url('./img/bg.png')
  background-color #fff
  font-family 'PingFang-SC-Heavy'
  .db-name
    font-size 0.5rem
    font-weight bold
    color #664832
    text-align center
    padding 1.2rem 0.7rem 0.8rem
    line-height 0.66rem
  .db-key
    padding 0.3rem
    padding-bottom 3em
    .db
      margin-bottom 0.1rem
      font-size 0.24rem
      height 0.3rem
      line-height @height
      overflow hidden
      .home-topic-title
        display inline-block
        margin-right 0.2rem
        .name span
          color #444
          font-weight normal
        .icon
          background-size 0.2rem
          width 0.2rem
          height 0.2rem
          margin-right 0.14rem
          vertical-align baseline
    .db-kw__title
      padding-left 17px
      color #373944
      line-height 1
      &:before
        content ''
        position absolute
        top -2px
        left 0px
        display inline-block
        width 4px
        height 20px
        background linear-gradient(to right, #F6D27E, #B1936A)
    .db-kw__list
      .item
        display inline-block
        margin-right 0.2rem
        margin-bottom 0.2rem
        &-name
          color #664832
          font-size 0.24rem
          opacity 0.9
</style>
