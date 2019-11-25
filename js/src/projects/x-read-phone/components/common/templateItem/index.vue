<script>
import { items, itemsMixins } from './items'
export default {
  components: { ...items },
  mixins: [itemsMixins],
  props: {
    type: {
      type: [String, Number],
      default: 3,
    },
    data: Array,
  },
  methods: {},
  computed: {
    currItem() {
      // 只有5个模板存在
      return 'Item' + (this.type * 1 > 8 ? 1 : this.type)
    },
  },
}
</script>

<template lang="pug">
  div(:data-type='currItem')
    component(:is="currItem" @itemClickHandler="itemClickHandler" :data="data")
</template>

<style lang="stylus" scoped>
</style>
