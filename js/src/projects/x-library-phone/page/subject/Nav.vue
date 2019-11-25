<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    return store.dispatch('category/getSubjectPageData', route.query)
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.$store.dispatch('category/getSubjectList', {
      id: to.query.id,
      clean: true,
    })
    this.$unCheckedAll(this.subject, to.query.id)
  },
  beforeDestroy() {
    this.$store.state.category.subjectList = []
  },
  data() {
    return {
      list: [],
    }
  },
  computed: {
    ...mapState({
      subject: state => state.category.subject, // 顶部nav
      subjectList: state => state.category.subjectList, // 列表
    }),
  },
  mounted() {
    this.getMore()
  },

  methods: {
    itemClickHandler(item) {
      console.log(item)
      const { query } = this.$route
      this.$replace('/subject', { ...query, id: item.id })
      // @click="$go('/taoxi',{id:item.rel_id})"
    },
    touchMoveHandler(e) {
      console.log(e.target.scrollHeight)
    },
    getMore() {
      let promise, resolve, reject
      promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      setTimeout(() => {
        let arr = []
        for (let index = 0; index < 20; index++) {
          arr.push({
            id: Math.random(),
            name: 'item' + index,
          })
        }
        this.list.push(...arr)
        resolve()
      }, 1000)
      return promise
    },
    goDetail(item) {
      this.$go('/taoxi', {
        id: item.book_info.id,
        name: this.$route.query.name,
      })
    },
    loadMore(cb) {
      let data = {
        ...this.$route.query,
        pageStart: this.subjectList.length,
        id: this.$route.query.id,
      }

      this.$store.dispatch('category/getSubjectList', data).then(cb)
    },
  },
}
</script>

<template lang="pug">
  .page-subject-more
    Head(name="套系专题")
    .wrapper(v-if="subject.length")
      ColumNav(
        :list="subject"
        @itemClickHandler="itemClickHandler"
      )
      .content
        .main(v-if="subjectList.length")
          Scroll(@loadMore="loadMore" )
            .main 
              ResultSubjectCard( 
                v-for="item in subjectList"
                @click.native="goDetail(item)"
                :key="item.id"
                :name="item.name"
                :book_info="item.book_info"
                :img="item.book_info.components.img_src"
              )
        NoData(v-else)

</template>
<style lang="stylus">
.page-subject-more
  >.wrapper
    >.content
      margin-top 50px
</style>
