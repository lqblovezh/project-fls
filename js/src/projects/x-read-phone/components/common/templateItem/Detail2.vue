<script>
export default {
  props: ['list'],
  mounted() {},
  data() {
    return {}
  },
  methods: {
    loadMore(cb) {
      this.$emit('loadMore', cb)
    },
    refresh(cb) {
      this.$emit('refresh', cb)
    },
    itemClick(item) {
      this.$emit('itemClickHandler', item , 'theme')
    },
  },
  watch: {
    list() {},
  },
}
</script>

<template lang="pug">
.templateDetail 
  .main()
    Scroll( @loadMore="loadMore" @refresh="refresh" )
      .ls-book()
        .list(v-if="") 
          .item(v-for="item in list"  @click="itemClick(item)" )
            NormalThemeItem(:item="item")
</template>

<style lang="stylus" scoped>
</style>
