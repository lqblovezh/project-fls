<script>
export default {
  props: ['list','type'],
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
      this.$emit('itemClickHandler', item,this.type)
    },
  },
  watch: {
    list() {
			console.log(this.list);
		},
  },
}
</script>

<template lang="pug">
.templateDetail
  .main()
    Scroll( @loadMore="loadMore" @refresh="refresh" )
      .ls-book()
        .list(v-if="")
          .item(v-for="item in list"  )
            NormalItem(:item="item" @click.native="itemClick(item)")
      //- .div(v-if="query.type == 2")
        .ls-theme
          div(  v-for="item in columnList.data" @click="itemClick(item)" )
            NormalThemeItem(:item="item")
</template>

<style lang="stylus" scoped>
</style>
