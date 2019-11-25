
<script>
import { mapState } from 'vuex'
import Login from './login'
export default {
  components: { Login },
  created() {
    // 主要用来调试微信是否重新渲染了页面, 不需要打包后移除
    let _log = console.log
    _log('re-render')

    // 只能监听刷新, 不能监听关闭按钮!
    // global.onbeforeunload = function(e) {
    //   localStorage.name = 'dddddddddd'
    // }
  },
  beforeMount() {
    this.$getUserData()
  },
  mounted() {
    // 搜索记录
    if (localStorage.searchHistory) {
      this.$store.state.search.searchHistory = JSON.parse(
        localStorage.searchHistory
      )
      // 开发时, 多个项目之间vuex 带来混来
      //library 不需要vuex本地存储
      localStorage.vuex = ''
    }
  },
  computed: {
    ...mapState({
      isLoginShow: state => state.isLoginShow,
    }),
  },
}
</script>
<template lang="pug">
.second-router
  router-view
  Footer(v-if="$store.state.isFooterShow")
  Login(v-show="isLoginShow")
</template>
<style lang="stylus">

.second-router
  font-size 16px
</style>
