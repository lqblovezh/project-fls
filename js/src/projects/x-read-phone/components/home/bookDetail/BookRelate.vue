<script>
import * as bookinfoServices from 'services/x-read/bookInfo'

export default {
  data() {
    return {
      list: [],
      page: {
        offset: 10,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(pageStart = 0, pageOffset = 5, isClean = false) {
      return bookinfoServices
        .bookRelate({ pageStart, pageOffset, id: this.$route.query.id })
        .then(res => {
          this.list = res.data
        })
    },
    itemClick(item) {
      // this.$go('/bookDetail', { id: item.book_id, inType: 'Read' })
      // if (item.book_type == 2) {
      //   this.$go('/home/themeDetail', { id: item.book_id })
      // } else {
      //   this.$go('/bookDetail', { id: item.book_id, inType: 'Read' })
      // }
      this.$go('/bookDetail', { id: item.book_id, inType: 'Read' })
    },
  },
}
</script>


<template lang="pug">
div(v-if="list.length") 
  ContentTitle(name="相关推荐")    
  ImgList(:list="list" @itemClick="itemClick")
</template>


<style lang="stylus" scoped>
</style>
