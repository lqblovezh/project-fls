<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    value: {},
    idx: {}
  },
  methods: {
    async goRead () {
      // 如果是管理状态，就不允许跳进阅读器
      if (this.value) {
        return
      }
      const {
        read_product_id: product_id,
        book_id,
        range,
        chapter_id
      } = this.item
      try {
        let res = await this.$service.category.getAccessCode({
          product_id
        })
        localStorage.access_code = res.data
        this.$go('/reader', {
          product_id,
          book_id,
          range,
          chapter_rid:chapter_id
        })
      } catch(e) {
        console.log(e)
      }
    },
  }
}
</script>
<template lang="pug">
.item-note(@click="goRead")
  .flex
    .item-checkbox(v-if="value")
      input(type="checkbox" @click="$emit('selectItem', {idx, item})" v-model="item.checked")
    .note-body
      .note-title.f15(v-if="item.book_info.components.type!=6")
        span {{ item.book_info.components.案例编号 }}
        |{{ item.book_name }}
      .note-title.f15(v-if="item.book_info.components.type==6")
        span {{ item.book_info.components.案例编号 }}
        |{{ item.chapter_name }}
      .note-content.f14.ellipsis-2(@click="goRead") {{ item.chapter_value }}
      .note-time.f12(v-if="item.book_info.components.type==6") 书名：{{item.book_name}}
      .note-time.f12 时间：{{ item.create_time|formateTime }}
  .line
</template>
<style lang="stylus">
.item-note
  padding 14px 12px 0
  >.flex
    align-items center
    >.note-body
      >.note-title
        margin-bottom 10px
        span
          color #B1936A
          margin-right 10px
      .note-content, .note-time
        color #A6AAC1
        margin-bottom 7px
      >.note-time
        color #999999
        margin-top 0px
        margin-bottom 2px
  >.line
    margin-left -12px
    margin-right -12px
</style>