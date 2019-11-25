<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    return store.dispatch('normal/getLawList', route.query)
  },
  computed: {
    ...mapState('normal', {
      list: state => state.law_list
    }),
  },
  created() {
      console.log(this.list)
  },
  methods: {
    goDetail (laws) {
      if (
        laws.book_info.components.type == 6 ||
        laws.book_info.components.type == 8
      ) {
        this.$go('/column-bookproduct', {
          id: laws.book_info.product_id,
          name: laws.book_info.components.type_name,
        })
        return
      }
      this.$go('/column-detail', {
        id: laws.book_info.product_id,
        name: laws.type_name
      })
      console.log(laws)
    }
  }
}
</script>
<template lang="pug">
.page-keys
  Head(name="关联资源" type="dark")
  .content.f14
    .tips.f12 当前资源
      span {{ list && list.length }}
      |条
    .keyword-list
      .keyword-item.flex(v-for="(item,index) in list" @click="goDetail(item)")
        .text {{ item.name }}
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
        padding 15px 0
        align-items center
        justify-content space-between
        border-bottom 1px solid #F4F4F4
        .text
          flex 1
        .icon-more
          margin-left 15px
        &:first-child
          border-top 1px solid #F4F4F4
</style>