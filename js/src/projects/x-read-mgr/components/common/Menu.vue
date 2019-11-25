<script>
import '../../assets/css/incon-fomts2.styl';
import '../../assets/css/incon-fonts1.css';
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'

export default {
  components: { GliMenu, GliMenuTop, GliMenuItem },
  data(){
    return {
      isCollapse:false
    }
  },
  computed: {
    defaultActive() {
      let path = this.$route.path
      if(path == '/'){
        path = '/wms/home'
      }else{
        if(path.split('/').length>3){
          let index=path.lastIndexOf('/');
          path = path.substring(0,index)
        }
      }
      return path
    },
    nav() {
      return this.$store.state.authority
    }
  },
  methods:{
    handleOpen(){},
    handleClose(){},
    MenuCollapse(){
      this.isCollapse = !this.isCollapse ;
      var node = document.querySelector('#content');
      if(this.isCollapse){
        node.classList.add("mini")
      }else {
        node.classList.remove("mini")
      }
    },
    menuItemClickHandler(){},
    menuFoldHandler(){
      this.MenuCollapse()
    },
  }
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
    GliMenuTop( txt="首页")
      GliMenuItem(
        iconClass="icon-wms_indexSettings"
        txt="首页"
        index="/wms/home" v-if="nav['/wms/home'].status")
    GliMenuTop( txt="产品管理")
      GliMenuItem(
        iconClass="icon-wms_mediaBook"
        txt="融媒体产品"
        index="/wms/mediaBook" v-if="nav['/wms/mediaBook'].status")
      GliMenuItem(
        iconClass="icon-wms_theme"
        txt="主题产品"
        index="/wms/theme" v-if="nav['/wms/theme'].status")
      GliMenuItem(
        iconClass="icon-videos"
        txt="视读产品"
        index="/wms/video" v-if="nav['/wms/video'].status")
      GliMenuItem(
        iconClass="icon-voices"
        txt="听读产品"
        index="/wms/audio" v-if="nav['/wms/audio'].status")
      GliMenuItem(
        iconClass="icon-book"
        txt="视频课件"
        index="/wms/media" v-if="nav['/wms/media'].status")
    GliMenuTop( txt="设置X-Read")
      GliMenuItem(
        iconClass="icon-wms_indexSettings"
        txt="首页设置"
        index="/wms/indexSettings" v-if="nav['/wms/indexSettings'].status")
      GliMenuItem(
        iconClass="icon-wms_bookSettings"
        txt="书城设置"
        index="/wms/bookSettings" v-if="nav['/wms/bookSettings'].status")
      GliMenuItem(
        iconClass="icon-wms_rcmSettings"
        txt="推荐设置"
        index="/wms/rcmSettings" v-if="nav['/wms/rcmSettings'].status")
      GliMenuItem(
        iconClass="icon-wms_setting"
        txt="发现设置"
        index="/wms/findSetting" v-if="nav['/wms/findSetting'].status")
      GliMenuItem(
        iconClass="icon-wms_setting"
        txt="默认音频"
        index="/wms/defaultAudio" v-if="nav['/wms/defaultAudio'].status")
    GliMenuTop( txt="书圈管理")
      GliMenuItem(
        iconClass="icon-wms_bookManage1"
        txt="书圈管理"
        index="/wms/bookManage" v-if="nav['/wms/bookManage'].status")
    GliMenuTop( txt="订单管理")
      GliMenuItem(
        iconClass="icon-wms_orderManage"
        txt="订单管理"
        index="/wms/orderManage" v-if="nav['/wms/orderManage'].status")
    GliMenuTop( txt="分销管理")
      GliMenuItem(
        iconClass="icon-wms_saleslist"
        txt="分销列表"
        index="/wms/saleslist" v-if="nav['/wms/saleslist'].status")
      GliMenuItem(
        iconClass="icon-wms_cash"
        txt="兑现管理"
        index="/wms/cash" v-if="nav['/wms/cash'].status")
      GliMenuItem(
        iconClass="icon-wms_sales_setting"
        txt="分销设置"
        index="/wms/setting" v-if="nav['/wms/setting'].status")
    GliMenuTop( txt="统计分析")
      GliMenuItem(
        iconClass="icon-wms_cash1"
        txt="销售业绩"
        index="/wms/scaleInfo" v-if="nav['/wms/scaleInfo'].status")
      GliMenuItem(
        iconClass="icon-wms_statistics"
        txt="产品数据报表"
        index="/wms/statistics" v-if="nav['/wms/statistics'].status")
    GliMenuTop( txt="会员管理")
      GliMenuItem(
        iconClass="icon-wms_memberlist"
        txt="会员列表"
        index="/wms/memberlist" v-if="nav['/wms/memberlist'].status")
      GliMenuItem(
        iconClass="icon-userMsg"
        txt="用户反馈"
        index="/wms/userMsg" v-if="nav['/wms/userMsg'].status")
    GliMenuTop( txt="系统管理")
      GliMenuItem(
        iconClass="icon-wms_msgComment"
        txt="消息管理"
        index="/wms/msgComment" v-if="nav['/wms/msgComment'].status")
      //- GliMenuItem(
      //-   iconClass="icon-wms_auth"
      //-   txt="权限管理"
      //-   index="/wms/jurisdiction")

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
