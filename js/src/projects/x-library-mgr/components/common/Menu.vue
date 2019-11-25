<script>
import '../../assets/css/incon-fomts2.styl';
import '../../assets/css/incon-fonts1.css';
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'

export default {
  components: {
    GliMenu,
    GliMenuTop,
    GliMenuItem
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  computed: {
    defaultActive() {
      let path = this.$route.path
      if (path == '/') {
        path = '/wms/home'
      } else {
        if (path.split('/').length > 3) {
          let index = path.lastIndexOf('/');
          path = path.substring(0, index)
        }
      }
      return path
    },
    nav() {
      return this.$store.state.authority
    },
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    MenuCollapse() {
      this.isCollapse = !this.isCollapse;
      var node = document.querySelector('#content');
      if (this.isCollapse) {
        node.classList.add("mini")
      } else {
        node.classList.remove("mini")
      }
    },
    menuItemClickHandler() {},
    menuFoldHandler() {
      this.MenuCollapse()
    },
    getAuthority(type) {
      return this.nav[type]&&this.nav[type].status
    }
  },
}
//:unique-opened="true"  这里还不能改, 因为不是二级路由, 非常别扭
</script>


<template lang="pug">
.menu(v-if="nav" :class="{'collLeft': isCollapse}")
	gli-menu(
		@itemClickHandler="menuItemClickHandler"
		@foldHandler="menuFoldHandler"
		:menuRecreate="false"
		topPx="50px"
		:keepOneOpen="true"
		:default-active="$route.path"
		:router="true"
		:collapse="isCollapse"
		background-color="#333744"
		text-color="#fff"
		active-text-color="#44c3aa")
		//- GliMenuTop( txt="首页" index="/wms/home" v-if="getAuthority('/wms/home')")
		//- 	GliMenuItem(
		//- 		iconClass="icon-wms_home"
		//- 		txt="首页"
		//- 		style="display:none"
		//- 		index="/wms/home" v-if="getAuthority('/wms/home')")
		GliMenuTop( txt="产品管理")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="文章产品"
				index="/wms/article" v-if="getAuthority('/wms/article')")
			GliMenuItem(
				iconClass="icon-wms_theme"
				txt="套系产品"
				index="/wms/seriesProduct" v-if="getAuthority('/wms/seriesProduct')")
		GliMenuTop( txt="前台设置")
			GliMenuItem(
				iconClass="icon-wms_indexSettings"
				txt="首页设置"
				index="/wms/indexSettings" v-if="getAuthority('/wms/indexSettings')")
			GliMenuItem(
				iconClass="icon-wms_theme"
				txt="发现设置"
				index="/wms/findSetting" v-if="getAuthority('/wms/findSetting')")
			GliMenuItem(
				iconClass="icon-wms_theme"
				txt="分类设置"
				index="/wms/typeSetting/case" v-if="getAuthority('/wms/typeSetting')")
		GliMenuTop( txt="用户管理")
			GliMenuItem(
				iconClass="icon-wms_memberlist"
				txt="会员列表"
				index="/wms/memberlist" v-if="getAuthority('/wms/memberlist')")
			GliMenuItem(
				iconClass="icon-userMsg"
				txt="会员反馈"
				index="/wms/memberfb" v-if="getAuthority('/wms/memberfb')")
		GliMenuTop( txt="订单管理" v-if="$config.isTeacher")
			GliMenuItem(
				iconClass="icon-wms_orderManage"
				txt="订单查询"
				index="/wms/orderManage" v-if="getAuthority('/wms/orderManage')")
		GliMenuTop( txt="书圈管理" index="/wms/bookManage" v-if="getAuthority('/wms/bookManage')")
			GliMenuItem(
				iconClass="icon-wms_product"
				txt="书圈管理"
				style="display:none"
				index="/wms/bookManage" v-if="getAuthority('/wms/bookManage')")
		GliMenuTop( txt="统计分析")
			GliMenuItem(
				iconClass="icon-wms_total"
				txt="销售业绩"
				index="/wms/scaleInfo" v-if="getAuthority('/wms/scaleInfo')")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="产品数据报表"
				index="/wms/statistics" v-if="getAuthority('/wms/statistics')")
</template>


<style lang="stylus" scoped>
.menu
  position: fixed;
  width: 200px;
  top: 50px;
  bottom: 0;
  z-index: 112;
  overflow: hidden;
  transition width 0.3s ease-in-out
  .el-menu
    width 220px
    height 100%
    overflow-y auto
    overflow-x hidden
    .el-menu-item
      padding-left 30px !important
    .el-submenu
      max-width 200px
      .el-submenu__title
        font-size 16px
        height 44px
        line-height 44px
        i
          font-size 16px
          margin-right 6px
.menu .el-menu {
  width: 220px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.menu .el-menu .el-submenu {
    max-width: 200px;
}
.collapse
  background #565E6E
  height 50px
  max-width 200px
  text-align center
  line-height @height
  color #ffffff
  font-size 16px
  cursor pointer
  user-select none
  i
    font-size 15px
.el-menu-item
  i
    margin-right 10px
    &:before
      font-size 16px
      display inline-block
.collLeft
  width 70px
  .el-menu
    width 70px
    transition width  0.3s ease-in-out
</style>
