<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    return store.dispatch('category/getItemDetail', route.query)
  },
  computed: {
    ...mapState({
      meta: state => state.category.itemDetail && state.category.itemDetail.components
    }),
    keyword() {
      return this.meta && this.meta.keyword.split(";")
    }
  },
  methods: {
    goKeywordPage (keyword) {
      this.$go('/normal-list', { keyword })
    }
  }
}
</script>
<template lang="pug">
.page-keys
  Head(name="关键词列表" type="dark")
  .content.f14
    .tips.f12 当前关键词有
      span {{ keyword && keyword.length }}
      |个
    .keyword-list
      .keyword-item.flex(v-for="(item,index) in keyword" @click="goKeywordPage(item)")
        .text {{ item }}
        .icon-more
</template>
<style lang="stylus">
.page-keys
  .content
    padding 15px
    >.tips
      color #333
      >span
        margin 0 5px
        color #b1936a
    >.keyword-list
      margin-top 15px
      color #676a7b
      >.keyword-item
        height 58px
        align-items center
        justify-content space-between
        border-bottom 1px solid #F4F4F4
        &:first-child
          border-top 1px solid #F4F4F4
</style>