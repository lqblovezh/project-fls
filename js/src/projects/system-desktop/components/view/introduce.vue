<script>
import { getInfo } from 'services/system/home'
import Vue from 'vue'

export default {
  data() {
    return {
      info: null,
      ecosphere: [
        { name: 'X-PUBLISH', abs: '多媒体数字产品发布平台', ref: 'xp' },
        { name: 'X-READ', abs: '阅读视听社交生态圈', ref: 'xr' },
        { name: 'X-DATA', abs: '出版大数据分析管理', ref: 'xd' },
        { name: 'X-SYSTEM', abs: '出版社多账户管理', ref: 'xs' },
        { name: 'X-TEACH', abs: '在线教育学习平台', ref: 'xt' },
      ],
    }
  },
  mounted() {
    getInfo().then(res => {
      this.info = res
      console.log(res)
    })
  },
  methods: {
    scroll(e) {
      const currentY =
        document.documentElement.scrollTop || document.body.scrollTop
      this.scrollAnimation(currentY, e)
    },
    /**
     * @param { Number } currentY 当前位置
     * @param { Number } targetY 目标位置
     */
    scrollAnimation(currentY, targetY) {
      // 获取当前位置方法
      // const currentY = document.documentElement.scrollTop || document.body.scrollTop

      // 计算需要移动的距离
      let needScrollTop = targetY - currentY
      let _currentY = currentY
      setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        window.scrollTo(_currentY, currentY)
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(_currentY, targetY)
        } else {
          window.scrollTo(_currentY, targetY)
        }
      }, 1)
    },
    show() {
      this.$refs.contact.style.display = 'block'
    },
    hide() {
      this.$refs.contact.style.display = 'none'
    },
    login() {
      this.$refs.login.style.display = 'none'
    },
  },
}
</script>

<template lang="pug">
.box
  .banner(:style="{backgroundImage:'url('+info.loginInfo.banner.value +')'}" v-if="info")
  .group
    .title
    p 数字化，一体化，专业化，生态化，助你打造自己的数字出版生态圈
    .part.cfx
      .core.core1(@click="scroll($refs[item.ref].offsetTop)" v-for="item,index in ecosphere" :class="'core'+(index+1)")
        .img 
        h3 {{item.name}}
        span {{item.abs}}
  .xp(ref="xp")
    .xp-text
      .line 
      h2 X-PUBLISH
      span 专业的数字内容生产平台
      p 多形态内容生产，数字图书，文章制作，多媒体，3D，H5,AR/VR
      p 多渠道内容发布，亚马逊，当当，京东，x-read等平台
      p 自由化组装图书，创建你的多媒体图书
      p 智能化知识整合，提供跨内容知识点一键组合
  .xr(ref="xr")
    .xr-text
      .line 
      h2 X-READ
      span 便捷的移动分发平台
      p 针对移动互联网分发数字多媒体图书产品
      p 高度契合x-pulish生产平台，提供专业阅读体验
      p 结合阅读，社交，学习为一体的分发平台
  .xd(ref="xd")
    .xd-box
      .xd-text
        .line 
        h2 X-DATA
        span 图书大数据，提高营业率
        p 随时跟进全国图书数据变化
        p 掌握图书最新数据流向
        p 全面提高出版社营业额
  .xs(ref="xs")
    .xs-box 
      .xs-text
        .line 
        h2 X-SYSTEM
        span 出版社管理系统
        p 针对大型出版管理下属出版社
        p 随时监控，管理下属出版社权限
  .xt(ref="xt")
    .xs-box 
      .xs-text
        .line 
        h2 X-TEACH
        span 在线教育学习平台
        p 针对高校，出版社机构创建的在线教育平台，拥有移动端，pc端，
        p 为用户提供高效的课程创作与学习平台
</template>
<style lang="stylus" scoped>
btnColor = #f7793e
.box
  color #666
  background-color #fff
.head
  background-color hsla(0, 0%, 100%, 0.8)
.header
  height 84px
  padding 17px 0
  box-sizing border-box
  justify-content space-between
  line-height 50px
  .logo
    display flex
  img
    height 50px
    margin-right 5px
  .right
    display flex
  .menu
    span
      margin 0 6px
    .line
      color #c5c5c5
    .goPath
      cursor pointer
.active
  color #f7793e
.part
  width 1200px
  margin 0 auto
  display flex
.banner
  height 750px
  min-width 1200px
  background center center
.login
  background btnColor
  color #fff
  font-size 14px
  margin-top 6px
  line-height 38px
  height 38px
  width 100px
  text-align center
  border-radius 4px
  margin-left 20px
  cursor pointer
.group
  padding 85px 0 90px 0
  .title
    height 83px
    width 255px
    margin 0 auto
    padding 24px 0
    background url('./img/x-book-bg.png') center center no-repeat
  p
    font-size 18px
    color #555
    text-align center
.cfx
  padding-top 80px
  justify-content space-between
  .core
    height 200px
    text-align center
    cursor pointer
    &:hover
      color #f88a55
    h3
      font-size 22px
      line-height 24px
      font-weight normal
      padding 20px 0 10px
    .img
      height 120px
      background center center no-repeat
      transition 0.3s
  .core1
    .img
      background-image url('./img/x-publish.png')
    &:hover .img
      background-image url('./img/x-publish-click.png')
  .core2
    .img
      background-image url('./img/x-read.png')
    &:hover .img
      background-image url('./img/x-read-click.png')
  .core3
    .img
      background-image url('./img/x-data.png')
    &:hover .img
      background-image url('./img/x-data-click.png')
  .core4
    .img
      background-image url('./img/x-system.png')
    &:hover .img
      background-image url('./img/x-system-click.png')
  .core5
    .img
      background-image url('./img/x-teach.png')
    &:hover .img
      background-image url('./img/x-teach-click.png')
.xp
  height 283px
  padding 131px 0 136px 0
  min-width 1200px
  background url('./img/x-publish-bg.png') center center no-repeat
.xp-text, .xr-text, .xd-text, .xs-text
  width 1200px
  margin 0 auto
  color #fff
  h2
    font-weight normal
    font-size 25px
    padding 25px 0 5px 0
  .line
    width 26px
    height 3px
    background #fff
  span
    font-size 24px
    padding-bottom 20px
    display block
  p
    line-height 38px
.xr
  width 1200px
  height 550px
  margin 0 auto
  padding 160px 0 0
  box-sizing border-box
  background url('./img/x-read-bg.png') 0 bottom no-repeat
  .xr-text
    float right
    width 335px
    h2
      color #f7793e
    .line
      background #f7793e
    span
      color #555
    p
      color #666
.xd
  height 550px
  box-sizing border-box
  padding 50px 0 0
  min-width 1200px
  background url('./img/x-data-bg.png') 0 center no-repeat
  .xd-box
    height 448px
    width 1033px
    margin 0 auto
    background url('./img/cd-text-bg.png') center center no-repeat
    .xd-text
      box-sizing border-box
      padding 90px 0 0 50px
      width 1033px
      h2
        color #f7793e
      .line
        background #f7793e
      span
        color #555
      p
        color #666
.xs,.xt
  margin 0
  .xs-box
    width 1200px
    margin 0 auto
    height 550px
    box-sizing border-box
    padding 180px 0 0 0
    background url('./img/x-system-left.png') 0 center no-repeat
    .xs-text
      box-sizing border-box
      background url('./img/x-system-bg.png') 0 0 no-repeat
      width 880px
      height 365px
      float right
      padding 0 0 0 540px
      h2
        color #f7793e
      .line
        background #f7793e
      span
        color #555
      p
        color #666
.xt
  background #f5f5f5
  .xs-box
    background url('./img/x-teach-right.png') 0 0 no-repeat
    background-position right 80px
    padding-top 95px
    .xs-text
      float inherit
      padding 0
      background #fff
      box-shadow: 0px 1px 12px 0px rgba(214, 120, 73, 0.25)
      margin initial
      width 624px
      height initial
      position relative
      left 24px
      padding 50px 60px
.footer
  background url('./img/bottom.gif')
  min-width 1200px
  .footer-box
    width 1200px
    margin 0 auto
    padding 30px 0
    display flex
  .outLink
    width 820px
    a
      display inline-block
      width 30%
      border-bottom 1px solid #978881
      line-height 40px
      margin 0 1.5%
      color #d8d2c5
      text-decoration none
      font-size 13px
  .contact
    flex 1
    color #f1e3a0
    padding 0 20px 0 60px
    .list
      display flex
      flex-wrap warp
      justify-content space-between
      color #d8d2c5
      padding-top 20px
      .ewm
        text-align center
      .txt
        line-height 40px
      img
        width 140px
        height 140px
.sideBar
  width 50px
  height 100px
  position fixed
  right 0px
  top 50%
.concatBox, .goBack
  height 50px
  width 50px
.goBack
  cursor pointer
  background url('./img/sidebar-top.png') no-repeat
.concatBox
  background url('./img/sidebar-contact.png') no-repeat
  margin-bottom 10px
  .content
    height 143px
    width 222px
    background url('./img/sidebar-bg.png') center center no-repeat
    position absolute
    left -259px
    top -30px
    padding 0 18px
    display none
    .title
      color #f7793e
      line-height 48px
      box-sizing border-box
      border-bottom 1px solid #e9e9e9
    .way
      text-indent 30px
      line-height 25px
      font-size 14px
      color #555
      padding 9px 0
      .phone
        background url('./img/sidebar-phone.png') 0 3px no-repeat
      .email
        background url('./img/sidebar-email.png') 0 3px no-repeat
      .qq
        background url('./img/sidebar-qq.png') 0 3px no-repeat
.loginInfo
  position absolute
  z-index 10
  height 100%
  width 100%
  top 0
  left 0
  background rgba(0, 0, 0, 0.3)
</style> 

