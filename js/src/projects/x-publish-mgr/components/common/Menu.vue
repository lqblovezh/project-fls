<script>
import { mapGetters, mapMutations } from 'vuex'
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'

export default {
  props: ['curr'],
  components: {
    GliMenu,
    GliMenuTop,
    GliMenuItem,
  },
  data() {
    return {
      menuHeight: '800px',
    }
  },
  mounted() {
    // this.menuHeight = (document.documentElement.clientHeight -50) + "px"
    // window.onresize = ()=>{
    //   this.menuHeight = (document.documentElement.clientHeight -50) + "px"
    //   log(this.menuHeight)
    // }
  },
  computed: {
    defaultCurr() {
      if (this.curr) {
        return this.currcurr
      } else {
        return '/index'
      }
      // return  this.curr? this.curr: '/index'
    },
    isCollapse() {
      return this.$store.state.collapse
    },
    nav() {
      return this.$store.state.authority
    },
  },
  created() {
    this.right()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    coll() {
      //收缩菜单
      this.updateCollapse(!this.$store.state.collapse)
      this.right()
    },
    right() {
      setTimeout(() => {
        if (this.$store.state.collapse) {
          document.querySelector('.mainRight').classList.add('mini')
        } else {
          document.querySelector('.mainRight').classList.remove('mini')
        }
      }, 20)
    },
    menuItemClickHandler() {},
    menuFoldHandler() {
      this.coll()
    },
    getAuthority(type) {
      return this.nav[type] && this.nav[type].status
    },
    ...mapMutations(['updateCollapse']),
  },
}
</script>

<template lang="pug" >
.menu(v-if="nav" :class="{'closeLeft':isCollapse}")
	gli-menu(
		@itemClickHandler="menuItemClickHandler"
		@foldHandler="menuFoldHandler"
		:changedRecreate="true"
		topPx="50px"
		:keepOneOpen="true"
		:default-active="$route.path"
		:router="true"
		:collapse="isCollapse"
		background-color="#333744"
		text-color="#fff"
		active-text-color="#44c3aa")
		GliMenuTop( txt="首页" index="/index" v-if="getAuthority('/index')")
			GliMenuItem(
				iconClass="icon-menu-home"
				txt="首页"
				style="display:none;"
				index="/index" v-if="getAuthority('/index')")
		GliMenuTop( txt="碎片管理")
			GliMenuItem(
				iconClass="icon-menu-debris-resources"
				txt="碎片资源"
				index="/contentLibrary/debrisResource" v-if="getAuthority('/contentLibrary/debrisResource')")
			GliMenuItem(
				iconClass="icon-menu-reorganization"
				txt="重组资源"
				index="/contentLibrary/recombResource" v-if="getAuthority('/contentLibrary/recombResource')")
		GliMenuTop( txt="内容仓库" iconClass="  ")
			GliMenuItem(
				iconClass="icon-menu-ebook"
				txt="电子书"
				index="/contentLibrary/digitalBook"
				v-if="getAuthority('/contentLibrary/digitalBook')")
			GliMenuItem(
				iconClass="icon-menu-article"
				txt="文章库"
				index="/contentLibrary/article" v-if="getAuthority('/contentLibrary/article')")
			GliMenuItem(
				iconClass="icon-menu-pic"
				txt="图片库"
				index="/contentLibrary/imgs" v-if="getAuthority('/contentLibrary/imgs')")
			GliMenuItem(
				iconClass="icon-menu-audio"
				txt="音频库"
				index="/contentLibrary/voices" v-if="getAuthority('/contentLibrary/voices')")
			GliMenuItem(
				iconClass="icon-menu-video"
				txt="视频库"
				index="/contentLibrary/videos" v-if="getAuthority('/contentLibrary/videos')")
			GliMenuItem(
				iconClass="icon-menu-d3"
				txt="3D内容库"
				index="/contentLibrary/3D" v-if="getAuthority('/contentLibrary/3D')")
			GliMenuItem(
				iconClass="icon-menu-h5"
				txt="H5作品库"
				index="/contentLibrary/H5" v-if="getAuthority('/contentLibrary/H5')")
			GliMenuItem(
			  iconClass="icon-menu-AR"
			  txt="AR内容库"
			  index="/contentLibrary/AR" v-if="getAuthority('/contentLibrary/AR')")
			GliMenuItem(
			  iconClass="icon-menu-VR"
			  txt="VR内容库"
			  index="/contentLibrary/VR" v-if="getAuthority('/contentLibrary/VR')")
			GliMenuItem(
			  iconClass="icon-menu-Panorama"
			  txt="全景图"
			  index="/contentLibrary/panorama" v-if="getAuthority('/contentLibrary/panorama')")
			GliMenuItem(
				iconClass="icon-menu-data-base-1"
				txt="数据库"
				index="/contentLibrary/database" v-if="getAuthority('/contentLibrary/database')")
			//- GliMenuItem(
			//- 	iconClass="icon-menu-ebook"
			//- 	txt="erp库"
			//- 	index="/contentLibrary/erp")
			GliMenuItem(
				iconClass="icon-menu-article"
				txt="习题库"
				index="/contentLibrary/question" v-if="getAuthority('/contentLibrary/question')")
			// GliMenuItem(
			// 	iconClass="icon-menu-file-transfer"
			// 	txt="导入导出列表"
			// 	index="/contentLibrary/transfer" v-if="getAuthority('/contentLibrary/transfer')")
		GliMenuTop( txt="数字产品库" iconClass="  ")
			GliMenuItem(
				iconClass="icon-menu-mixins"
				txt="融合发布库"
				index="/digitalProductLibrary/release" v-if="getAuthority('/digitalProductLibrary/release')")
			GliMenuItem(
				iconClass="icon-menu-multi-ebook"
				txt="电子书多格式"
				index="/digitalProductLibrary/polymorph" v-if="getAuthority('/digitalProductLibrary/polymorph')")
			GliMenuItem(
				iconClass="icon-menu-theme-prod"
				txt="主题产品"
				index="/digitalProductLibrary/themeLibary" v-if="getAuthority('/digitalProductLibrary/themeLibary')")
			GliMenuItem(
				iconClass="icon-menu-article-push"
				txt="文章推送产品"
				index="/digitalProductLibrary/pushArticle" v-if="getAuthority('/digitalProductLibrary/pushArticle')")
			GliMenuItem(
				iconClass="icon-menu-video-prod"
				txt="视读产品"
				index="/digitalProductLibrary/video" v-if="getAuthority('/digitalProductLibrary/video')")
			GliMenuItem(
				iconClass="icon-menu-audio-prod"
				txt="听读产品"
				index="/digitalProductLibrary/audio" v-if="getAuthority('/digitalProductLibrary/audio')")
			GliMenuItem(
				iconClass="icon-menu-video-courseware"
				txt="视频课件"
				index="/digitalProductLibrary/media" v-if="getAuthority('/digitalProductLibrary/media')")
			//- GliMenuItem(
			//-   iconClass="icon-menu-courseware"
			//-   txt="课件产品"
			//-   index="/digitalProductLibrary/courseware" v-if="getAuthority('/digitalProductLibrary/courseware')")
			//- GliMenuItem(
			//- 	iconClass="icon-menu-magazine"
			//- 	txt="杂志产品"
			//- 	index="/digitalProductLibrary/magazine" v-if="getAuthority('/digitalProductLibrary/magazine')")
			GliMenuItem(
				iconClass="icon-menu-set-product"
				txt="套系产品"
				index="/digitalProductLibrary/series" v-if="getAuthority('/digitalProductLibrary/series')")
			GliMenuItem(
				iconClass="icon-menu-article-product"
				txt="文章产品"
				index="/digitalProductLibrary/articles" v-if="getAuthority('/digitalProductLibrary/articles')")
			GliMenuItem(
				iconClass="icon-menu-course-product"
				txt="课程产品"
				index="/digitalProductLibrary/course" v-if="getAuthority('/digitalProductLibrary/course')")
			GliMenuItem(
				iconClass="icon-menu-course-product-pub"
				txt="共享产品课程"
				index="/digitalProductLibrary/pubCourse" v-if="getAuthority('/digitalProductLibrary/pubCourse')")
			//- GliMenuItem(
			//- 	iconClass="icon-menu-my-resources"
			//- 	txt="我的资源"
			//- 	index="/digitalProductLibrary/resource" v-if="getAuthority('/digitalProductLibrary/resource')")
			//- GliMenuItem(
			//- 	iconClass="icon-menu-resources-pub"
			//- 	txt="共享资源库"
			//- 	index="/digitalProductLibrary/pubResource" v-if="getAuthority('/digitalProductLibrary/pubResource')")
			GliMenuItem(
				iconClass="icon-menu-atlas"
				txt="图集"
				index="/digitalProductLibrary/qrcode" v-if="getAuthority('/digitalProductLibrary/qrcode')")
			GliMenuItem(
				iconClass="icon-menu-audio-set"
				txt="音频集"
				index="/digitalProductLibrary/qrcode/audio" v-if="getAuthority('/digitalProductLibrary/qrcode/audio')")
			GliMenuItem(
				iconClass="icon-menu-video-set"
				txt="视频集"
				index="/digitalProductLibrary/qrcode/video" v-if="getAuthority('/digitalProductLibrary/qrcode/video')")
			GliMenuItem(
				iconClass="icon-menu-essays"
				txt="文章集"
				index="/digitalProductLibrary/qrcode/article" v-if="getAuthority('/digitalProductLibrary/qrcode/article')")
			GliMenuItem(
				iconClass="icon-menu-book-set"
				txt="数字图书集"
				index="/digitalProductLibrary/qrcode/book" v-if="getAuthority('/digitalProductLibrary/qrcode/book')")
			GliMenuItem(
				iconClass="icon-menu-book-set"
				txt="试卷集"
				index="/digitalProductLibrary/qrcode/practice" v-if="getAuthority('/digitalProductLibrary/qrcode/practice')")
		GliMenuTop( txt="业务管理" iconClass="  ")
			GliMenuItem(
				iconClass="icon-menu-check"
				txt="发布审核"
				index="/publishCheck" v-if="getAuthority('/publishCheck')")
			GliMenuItem(
				iconClass="icon-menu-relate"
				txt="数据关系"
				index="/dataRelation" v-if="getAuthority('/dataRelation')")
			GliMenuItem(
				iconClass="icon-menu-other"
				txt="第三方平台授权管理"
				index="/thirdParty" v-if="getAuthority('/thirdParty')")
		GliMenuTop( txt="我的分发" iconClass="  ")
			GliMenuItem(
				iconClass="icon-menu-mydistribute"
				txt="我的分发"
				index="/distributed" v-if="getAuthority('/distributed')")
		//- GliMenuTop( txt="系统管理" iconClass="  ")
		//-   GliMenuItem(
		//-     iconClass="icon-menu-back"
		//-     txt="备份与还原"
		//-     index="/backupAndRestore" v-if="getAuthority('/backupAndRestore')")
		//- GliMenuItem(
		//-   iconClass="icon-menu-authority"
		//-   txt="权限管理"
		//-   index="/jurisdiction" v-if="getAuthority('/jurisdiction')")
</template>

<style lang="stylus" >
@import '~common/stylus/mixin'

.menu
  position fixed
  width 200px
  top 50px
  bottom 0
  z-index 112
  overflow hidden
  .el-menu
    width 220px
    height 100%
    overflow-y auto
    overflow-x hidden
    .el-menu-item
      padding-left 30px !important
    .el-submenu
      max-width 200px
      &.is-opened
        .el-submenu__title
          background-color #474f5e !important
          color #f2f6fc !important
      .el-submenu__title
        font-size 16px
        height 44px
        line-height 44px
        i
          margin-right 6px
      &.is-active
        .el-submenu__title
          i
            color #fff
  .company
    text-align center
    color #d9d9d9
    bottom 50px
    background #333744
    height 50px
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
      font-size 20px
.el-menu-item
  i
    margin-right 10px
    &:before
      font-size 16px
      display inline-block
.closeLeft
  &.menu
    width 50px
    .el-menu
      width 70px
  .el-submenu
    &.is-opened, .el-submenu__title
      text-align center
</style>
