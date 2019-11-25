<script>
import service from 'services/x-library/front'
import { close } from 'fs'

export default {
  data() {
    return {
      list: [],
      info: null,
      book_id: this.$route.query.id,
    }
  },
  created() {
    service.db
      .bookInfo({
        id: this.book_id,
      })
      .then(res => {
        this.list = res.data.chapters.filter(item => {
          if (item.pid == 'root') {
            return item
          }
        })
        this.info = res.data
      })
  },
  methods: {
    async goReader(item) {
      const { book_id, index, id } = item
      let res = await service.category.getAccessCode({
        id: this.info.article_id,
      })
      localStorage.access_code = res.data
      const { components } = this.info
      this.$go('/reader', {
        product_id: components && components.read_product,
        chapter_root: index,
        chapter_id: id,
        book_id,
      })
    },
  },
}
</script>
<template lang="pug">
.page-read
  Head(type="dark" name="全文阅读")
  .read-container
    .read-content
      .read-title.flex-between-center
        .name(v-if="info") 【{{info.name}}】
        .total 共{{list.length}}章
      .read-list.f14(v-for="item in list" @click="goReader(item)")
        .item {{item.chapter_name}}
</template>
<style lang="stylus">
.read-container
  padding 15px
  color #373944
  .read-content
    padding 20px 15px 30px
    border-radius 5px
    box-shadow 0 0 3px rgba(0, 0, 0, 0.3)
    .read-title
      .name
        color #373944
    .read-list
      .item
        height 50px
        line-height 50px
        border-bottom 1px solid #f4f4f4
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
</style>