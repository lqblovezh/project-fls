
<script>
import Vue from 'vue'
import urljoin from 'url-join'

export default {
  asyncData({ store, route }) {
    return store.dispatch('init', 'xSystem')
  },
  data(){
    return {
    }
  },
  methods:{
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
	}
}
</script>
<template lang="html">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="stylus">
.dy_icon
  padding 0 4px
  cursor pointer
  font-size 16px
.dy_primary
  color #44c3aa
.dy_danger
  color #F56C6C
#app .el-tabs__item
  line-height 35px
#app .el-switch__label *
  font-size 16px
#app .is-active
  color #44c3aa
#app .el-table
  color #333
  &.hight
    line-height 20px
    font-size 14px
 .cell
    line-height 35px
    font-size 16px
    color #000
</style>
