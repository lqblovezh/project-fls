<script>
export default {
  inject: ['toggle'],
  props: {
    item: {},
    startTime: {},
    endTime: {}
  },
  computed: {
    isGroup () {
      return (this.item.base_type || this.item.type) === 'group'
    }
  },
  methods: {
    select () {
      this.$set(this.item, 'checked', !this.item.checked)
    }
  }
}
</script>
<template lang="pug">
li.tree-list
  .tree-parent.flex-between-center(v-show="!item.isCategory" @click="toggle(item)")
    .tree-parent__left {{ item.name }}
    .tree-parent__right(v-if="!isGroup")
      input(type="checkbox" @click="select" :checked="item.checked")
      span.ib
    .tree-parent__right(v-else)
      .icon-more(:class="{r90: item.show}" v-show="item.children && item.children.length")
  ul.tree-child(
    v-if="item.children && item.children.length"
    :class="{p20: !item.isCategory}"
    v-show="item.show || item.level === 0 || item.type ==='cate'"
  )
    TreeItem(v-for="i in item.children" :item="i")
  TimePicker(v-if="item.type === 'time'" ref="timepicker")
</template>
<style lang="stylus">
ul
  padding 0
.tree-list
  >.tree-parent
    // height 30px
    margin 5px 0
    align-items center
    >.tree-parent__right
      position relative
      margin-left 5px
      input[type="checkbox"]
        position absolute
        top 0
        right 0
        width 15px
        height 15px
        opacity 0
        z-index 2
        &:checked + span
          position relative
          background-color #F15A4A
          border-color #F15A4A
          z-index 1
          &:after
            content ''
            position absolute
            display block
            width 8px
            height 4px
            left 1px
            top 2px
            border-left 2px solid black
            border-bottom 2px solid black
            transform rotate(-45deg)
      >span
        width 13px
        height 13px
        border 1px solid #CCC
        border-radius 50%
  >.p20
    padding-left 20px
</style>