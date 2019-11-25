<script>
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'
import urljoin from 'url-join'

export default {
  components: { GliMenu, GliMenuTop, GliMenuItem },
  created() {},
  data() {
    return {
      list: [
        {
        txt: '首页',
        items: [
          {
            iconClass: 'icon-4',
            txt: '出版社列表',
            index: urljoin(baseUrl, '/app/home')
          },
          {
            iconClass: 'icon-3',
            txt: '账户列表',
            index: urljoin(baseUrl, '/app/user')
          }
        ]
      },
       {
        txt: '系统设置',
        items: [
          {
            iconClass: 'icon-2',
            txt: '登录页设置',
            index: urljoin(baseUrl, '/app/systemSetting')
          },
          {
            iconClass: 'icon-2',
            txt: '作品设置',
            index: urljoin(baseUrl, '/app/systemSetting/production')
          },
          {
            iconClass: 'icon-2',
            txt: '系统设置',
            index: urljoin(baseUrl, '/app/systemSetting/info')
          },
          {
            iconClass: 'icon-1',
            txt: '系统管理',
            index: urljoin(baseUrl, '/app/systemManage/manager')  
          },
        ]
      }],
      isCollapse: false,
    }
  },
  methods: {
    menuItemClickHandler() { },
    menuFoldHandler(fold) {
      this.$emit('collspan', !fold)
    },
  }
}
</script>
<template>
  <div>
    <GliMenu @itemClickHandler="menuItemClickHandler"
      @foldHandler="menuFoldHandler"
      :menuRecreate="false"
      topPx="50px"
      :keepOneOpen="true"
      :default-active="$route.path"
      :router="true"
      :collapse="isCollapse"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#44c3aa">

      <GliMenuTop v-for="top in list"
        :txt="top.txt"
        :key="top.txt">
        <GliMenuItem v-for="item in top.items"
          :iconClass="item.iconClass"
          :txt="item.txt"
          :index="item.index"
          :key="item.index">

        </GliMenuItem>

      </GliMenuTop>

    </GliMenu>
  </div>
</template>


<style lang="stylus" scoped>
</style>
