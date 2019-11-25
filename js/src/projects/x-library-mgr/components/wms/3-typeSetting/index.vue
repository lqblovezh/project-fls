<script>
import * as services from 'services/x-library/columnSetting'
export default {
  props: {
    navTab: {}
  },
  data() {
    return {}
  },
  computed: {
    type () {
      return this.$route.query.type||(this.navTab[0] && this.navTab[0].type)||''
    }
  },
  methods: {
    //路由跳转
    handleNavClick(index) {
      this.$router.replace({
        path: '/wms/typeSetting/case',
        query: { index: '/wms/typeSetting/case', type: this.navTab[index].type },
      })
    },
    checkSrc() {
      for (let list of this.navTab) {
        if (this.$route.path == list.href) {
          this.$set(list,'active','active')
        } else if (this.$route.path == '/wms/typeSetting') {
          this.$set(this.navTab[0],'active','active')
        } else {
          this.$set(list,'active','')
        }
      }
    },
  },
  created() {
    this.checkSrc()
  },
  watch: {
    //监听路由是否改变
    $route() {
      this.checkSrc()
    },
  },
}
</script>

<template lang="pug">
div
	div.settingsNavTab
		ul
			li(v-for="(item,index) in navTab"  :class="{active: type === item.type}" @click="handleNavClick(index)") {{item.txt}}
</template>


<style lang="stylus" scoped>
.settingsNavTab
  ul
    background rgba(242, 242, 242, 1)
    line-height 50px
    overflow hidden
    text-align center
    font-size 13px
    min-width 660px
    font-family '微软雅黑'
    li
      float left
      width 100px
      margin-right 2px
      transition 0.3s
      color #333
    li.active
      background rgba(215, 215, 215, 1)
    li:hover
      background rgba(215, 215, 215, 1)
      cursor pointer
</style>
