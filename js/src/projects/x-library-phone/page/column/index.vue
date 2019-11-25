<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    return store.dispatch('category/getColumnPageData')
  },
  computed: {
    ...mapState({
      column: state => state.category.column,
    }),
  },
  methods: {
    go(item) {
      this.$go('/column-nav', { name: item.name, id: item.id })
    },
  },
}
</script>

<template lang="pug">
  .page-column-index
    .bg-bg2
    Head(name="资源导航" type="dark")
    .wrapper
      .head.f34.tc.c_f.bg-bg-column
      .content.flex
        //- SubjectCard(
        //-   @click.native="go(item)"
        //-   v-for="item in column"
        //-   :key="item.id"
        //-   :icon="item.code" 
        //-   :title="item.name"
        //-   :img="item.img_src"
        //-   :intro="item.abs"
        //-   :num="item.number"
        //- )
        MenuItem(
          @click.native="go(item)"
          v-for="item in column"
          type="dark"
          :name="item.name"
          :des="item.abs"
          :img="item.img_src"
          :num="item.number"
        )
</template>
<style lang="stylus">
.page-column-index
  >.bg-bg2
    top -80px
  >.wrapper
    >.head
      height 170px
    >.content
      padding-top 15px
      flex-wrap wrap
      padding 15px
      justify-content space-between
      min-height 250px
      >div
        margin-top 10px
</style>
