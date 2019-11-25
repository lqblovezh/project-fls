<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    const { path } = route
    return (
      !/\/search\/result/g.test(path) &&
      store.dispatch('search/initTab', { hot: true })
    )
  },
  computed: {
    ...mapState('search', {
      firstCategory: state => state.cates,
      secondCategory: state => state.cateSecond,
    }),
  },
  data() {
    return {
      type: this.$route.query.type,
    }
  },
  methods: {
    nameChangeHandler(name) {
      const { cid, pid } = this.$route.query
      if (cid && pid) {
        this.$replace('/search/result', { cid, pid, name })
      } else {
        if (this.type == 'simple') {
          let searchDate = {
            where_type: 'or',
            keyword: name,
          }
          let data = {
            formData: JSON.stringify(searchDate),
          }
          this.$go('/search-simple', data)
        } else {
          this.$go('/search/result', {
            cid: this.secondCategory[0].id,
            pid: this.secondCategory[0].pid,
            name,
          })
        }
      }
    },
  },
}
</script>
<template lang="pug">
.page-search
  SearchHead(@nameChangeHandler="nameChangeHandler")
  router-view(:nameChangeHandler="nameChangeHandler")
</template>
<style lang="stylus"></style>