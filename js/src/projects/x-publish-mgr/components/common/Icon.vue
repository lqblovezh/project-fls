<script>
export default {
  name: 'Icon',
  props: ['type', 'click', 'title'],
  methods: {
    callMethod(param) {
      this.$emit('click')
    },
  },
}
</script>

<template lang="pug">
  span.icon(:class="type" @click='callMethod') {{title}}
</template>

<style lang="stylus" scoped>
.icon
  cursor pointer
  margin-right 10px
  color #44c3aa
  &:before
    content none
  &.icon-delete
    color #e75f5f
</style>


