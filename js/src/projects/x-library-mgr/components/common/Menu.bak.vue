<script>
import '../../assets/css/incon-fomts2.styl';
import '../../assets/css/incon-fonts1.css';
export default {
  data() {
    return {
      isCollapse: false
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
    }
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
  }
}
//:unique-opened="true"  这里还不能改, 因为不是二级路由, 非常别扭
</script>


<template lang="pug">
.menu( :class="{'collLeft': isCollapse}")
	el-menu(
		:default-active="defaultActive"
		class="el-menu-vertical-demo"
		:unique-opened="true"
		@open="handleOpen"
		@close="handleClose"
		:collapse="isCollapse"
		background-color="#333744"
		text-color="#fff"
		:router="true"
		active-text-color="#44c3aa")
		.collapse(@click="MenuCollapse")
			i( class=" icon-wms_close" v-if='!isCollapse')
			i( class=" icon-wms_open" v-else='isCollapse')
		el-submenu( index="0")
			template( slot="title")
				i(class="icon-wms_home")
				span 首页
			el-menu-item( index="/wms/home")
				i( class="icon-wms_indexSettings")
				span(title="首页") 首页
		el-submenu( index="1")
			template(slot="title")
				i(class="icon-wms_product")
				span( slot="titke") 产品管理
			el-menu-item(index="/wms/article")
				i( class="icon-wms_mediaBook")
				span(title="文章产品") 文章产品
			el-menu-item(index="/wms/seriesProduct")
				i( class="icon-wms_theme")
				span(title="套系产品") 套系产品
		el-submenu( index="2")
			template(slot="title")
				i(class="icon-wms_setting")
				span( slot="titke") 前台设置
			el-menu-item(index="/wms/indexSettings")
				i( class="icon-wms_indexSettings")
				span(title="文章") 首页设置
			el-menu-item(index="/wms/findSetting")
				i( class="icon-wms_theme")
				span(title="套系产品") 发现设置
			el-menu-item(index="/wms/typeSetting")
				i( class="icon-wms_theme")
				span(title="套系产品") 分类设置
		el-submenu( index="3")
			template(slot="title")
				i(class="icon-wms_memberlist1")
				span( slot="titke") 用户管理
			el-menu-item(index="/wms/memberlist")
				i( class="icon-wms_memberlist")
				span(title="文章") 会员列表
			el-menu-item(index="/wms/memberfb")
				i( class="icon-userMsg")
				span(title="文章") 会员反馈
		el-submenu( index="4")
			template(slot="title")
				i(class="icon-wms_orderManage")
				span( slot="titke") 订单管理
			el-menu-item(index="/wms/orderManage")
				i( class="icon-wms_mediaBook")
				span(title="文章") 订单查询
		el-submenu( index="5")
			template(slot="title")
				i(class="icon-wms_product")
				span( slot="titke") 书圈管理
			el-menu-item(index="/wms/bookManage")
				i( class="icon-wms_mediaBook")
				span(title="文章") 书圈管理
		el-submenu( index="6")
			template(slot="title")
				i(class="icon-wms_total")
				span( slot="titke") 统计分析
			el-menu-item(index="/wms/scaleInfo")
				i( class="icon-wms_mediaBook")
				span(title="销售业绩") 销售业绩
			el-menu-item(index="/wms/statistics")
				i( class="icon-wms_mediaBook")
				span(title="产品数据报表") 产品数据报表
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
