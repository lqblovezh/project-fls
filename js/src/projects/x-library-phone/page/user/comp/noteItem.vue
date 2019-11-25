<script>
export default {
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      // required: true
    },
    value: {},
    idx: {}
  },
  methods: {
    async goRead () {
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
.comp-note.c_f_bg
  .note-container.flex
    .item-checkbox(v-show="value")
      input(type="checkbox" @click="$emit('selectItem', {idx, item})" v-model="item.checked")
    .note-wrap
      .note-head {{ item.comm_text }}
      .note-info.flex-between-center.c_gray1.f12
        p
          span.icon.icon-write_color(@click = "$emit('updateNote', item)")
        p {{ item.create_time }}
      .note-content.f14(@click="goRead") {{ item.chapter_value }}
  .line
</template>
<style lang="stylus">
.comp-note
  position relative
  padding 15px 15px 0
  p
    margin 0
    padding 0
  >.line
    margin-left -15px
    margin-right -15px
  >.note-container
    align-items center
    >.note-wrap
      flex 1
      padding-bottom 30px
      >.note-head
        margin-bottom 10px
        color #373944
        line-height 22px
      >.note-info
        line-height 17px
      >.note-content
        margin-top 17px
        padding 9px 11px 11px 14px
        line-height 22px
        color #373944
        background-color #F0F2FE
</style>