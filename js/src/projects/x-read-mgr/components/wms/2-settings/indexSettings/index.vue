<script>
export default {
  data() {
    return {
      navTab: [
        {
          txt: 'Banner设置',
          href: '/wms/indexSettings/banner',
          active: 'active',
        },
        { txt: '栏目设置', href: '/wms/indexSettings/columns', active: '' },
        { txt: '按钮设置', href: '/wms/indexSettings/button', active: '' },
      ],
    }
  },
  methods: {
    //路由跳转
    handleNavClick(index) {
      this.$router.push({
        path: this.navTab[index]['href'],
        query: { index: '/wms/indexSettings' },
      })
    },
    checkSrc() {
      for (let list of this.navTab) {
        if (this.$route.path == list.href) {
          list.active = 'active'
        } else if (this.$route.path == '/wms/indexSettings') {
          this.navTab[0]['active'] = 'active'
        } else {
          list.active = ''
        }
      }
    },
  },
  created() {
    const { type } = __PROJECT_INFO__
    if (type == 'library') {
      this.navTab = [
        {
          txt: 'Banner设置',
          href: '/wms/indexSettings/banner',
          active: 'active',
        },
        // { txt: '按钮设置', href: '/wms/indexSettings/button', active: '' },
        // { txt: '首页设置', href: '/wms/indexSettings/home', active: '' },
      ]
    }
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
       li(v-for="(item,index) in navTab"  :class="item.active" @click="handleNavClick(index)") {{item.txt}}
   router-view
</template>


<style lang="stylus" scoped>
.settingsNavTab
  color #333
  min-width 1200px
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
      width 218px
      height 50px
      margin-right 2px
      transition 0.3s
      cursor pointer
    li.active
      background rgba(215, 215, 215, 1)
    li:hover
      background rgba(215, 215, 215, 1)
</style>
