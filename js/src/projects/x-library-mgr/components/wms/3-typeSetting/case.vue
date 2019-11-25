<script>
import * as services from 'services/x-read/headerSetting'
import Tree from './tree'

export default {
  components: {
    Tree,
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.$refs.tree.getList()
  },
  methods: {
  },
  watch: {
    $route (to,from) {
      if(to.fullPath != from.fullPath) {
        this.$refs.tree.getList()
      }
    }
  }
}
</script>

<template lang="pug">
div
	.content
		Tree(:dataList="list" ref="tree")
</template>


<style lang="stylus" scoped>
</style>
