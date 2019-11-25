<script>
import HomeSearch from './comp/HomeSearch'
import Banner from './comp/Banner'
import { mapState } from 'vuex'
export default {
  components: { HomeSearch, Banner },
  computed: {
    ...mapState({
      homeSubjectList: state => state.home.homeSubjectList,
      column: state => state.category.column,
    }),
  },
  asyncData({ store, route }) {
    return store.dispatch('home/getData', route.query)
  },
  data() {
    return {}
  },

  methods: {
    goColumn(item) {
      this.$go('/column-nav', { id: item.id, name: item.name })
    },
    homeSubjectClickHandler(item) {
      this.$go('/taoxi', {
        id: item.product_id,
        name: item.books_info.name,
      })
    },
  },
}
</script>


<template lang="pug">
.page-home
  .all-bg
  .wrapper.c_f_bg 
    HomeSearch
    Banner
    .topics
      TopicTitle(name="库内资源"  path="/column" :query="{}" rname="更多资源")
    .menu.flex
      .item.ib(
        :key="item.id"
        v-for="item,index in column"
        v-if="index < 4"
        @click="goColumn(item)"
      )
        MenuItem(
          :name="item.name"
          :des="item.abs"
          :img="item.img_src"
          :num="item.number"
        )
    .topics
      .item
        TopicTitle(name="系列出版物"  path="/subject" :query="{}" rname="更多套系")
        .ib(
          @click="homeSubjectClickHandler(item)"
          v-for="item in homeSubjectList"
          :key="item.id"
        )
          HomeCard(
            :name="item.books_info.name"
            :author="item.books_info.author"
            :img="item.books_info.img_src"
            :time="item.books_info.create_time"
            :abs="item.books_info.abs"
          )
    NoData(name="法律人的底线")
</template>

<style lang="stylus">
.page-home
  font-size 16px
  margin-bottom 70px
  >.wrapper
    .menu
      padding 0 15px
      margin-top 15px
      flex-wrap wrap
      >.item
        width calc(50% - 5px)
        margin-bottom 10px
        &:nth-of-type(odd)
          margin-right 10px
      &.path_1
        transform translateY(105px)
    >.topics
      padding 0 15px
</style>
