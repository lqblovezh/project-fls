<script>
export default {
  name: 'tree',
  inject: ['getItemSubInfo', 'name'],
  props: {
    item: {},
    startTime: {},
    endTime: {},
    level: {
      default: 2,
    },
    // name: {}
  },
  computed: {
    isGroup () {
      return (this.item.base_type || this.item.type) === 'group'
    }
  },
  methods: {
    select () {
      this.getItemSubInfo(this.item)
    }
  },
}
</script>
<template lang="pug">
.tree
  .tree-title.flex-between-center(:class="{'ui-title': item.is_hide === 2 }")
    .tree-title__name {{ item.name }}
    .tree-title__select.key-input(v-show="item.is_hide !== 2")
      input(type="radio" @click="select" :name="name"  :disabled="item.is_hide === 1" :checked="item.checked")
      span.ib
  .tree-body(v-if="item.children && item.children.length" :class="{p20: !item.isCategory}")
    tree(v-for="i in item.children" :item="i" :name="name")
</template>
<style lang="stylus">
.tree
  &-title
    margin-top 5px
    padding 3px 0
    align-items center
    flex 1
  >.p20
    padding-left 20px
</style>