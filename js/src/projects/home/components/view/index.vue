<script>
import { adminLogin } from 'services/common/manager'
import { getIndexInfo } from 'services/common'
import swiperItem from './swiperItem'
import Vue from 'vue'
import { addFavicon } from 'projects/common/util'
import urlJoin from 'url-join'
import qs from 'qs'

export default {
  data() {
    return {
      info: null,
      form: {
        user_name: '',
        user_pass: '',
      },
      aboutList: ['关于我们', '联系我们', '公司首页'],
      loginDialog: false,
    }
  },
  mounted() {
    getIndexInfo().then(res => {
      this.info = res.data
      addFavicon(this.info.publisher.icon_absolute)
    })
  },
  components: { swiperItem },
  methods: {
    login() {
      this.loginDialog = true
    },
    send() {
      adminLogin(this.form).then(
        res => {
          const { token, expire_time } = res.data
          window.sessionStorage.setItem('token', token)
          window.sessionStorage.setItem('userInfo', qs.stringify(res.data))
          const { base_url, apps } = res.data.publisher
          location.href =
            process.env.NODE_ENV == 'development'
              ? '/_md/publish/admin '
              : base_url + apps[0].base_url + '/admin'
          // location.href = '/common/admin'
        },
        err => {
          this.$refs.user.focus()
          this.$message.error('账号或密码错误')
        }
      )
    },
    loginShow() {
      this.loginDialog = true
      this.$nextTick(() => {
        this.$refs.user.focus()
      })
    },
    backHome() {
      window.location.href =
        process.env.NODE_ENV == 'development'
          ? '/system'
          : restUrl_system + '/system'
    },
  },
}
</script>

<template lang="pug">
.box(ref="box")
  .head(ref="head") 
    .header.part
        .logo
          img(:src="info&&info.publisher.logo_absolute")
          span {{info&&info.publisher.name}}
        .right
          .login(@click="backHome") 官网首页
          .login(@click="loginShow") 云平台登录
  .banner
    swiperItem(:data="info.publisher.setting.banners" v-if="info&&info.publisher&&info.publisher.setting")
  .footer
    .footer-box
      .contact
        ul.about
          li(v-for="item in aboutList") {{item}} 
      .copyright 
        a(class="beian" target="_blank" )      京ICP备11027269号     
        img(class="ic_bottom" src="./img/icon_bottom.png")
        a(class="beian" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010602006813")      京公网安备 11010602006813号
  .dialog(ref="dialog" v-if="loginDialog")
    form.loginInfo
      #close(@click="loginDialog = false")
      .title 
      p
        input.user(placeholder="请输入用户名" v-model="form.user_name" ref="user")
      p
        input.pwd(placeholder="请输入密码" type="password" v-model="form.user_pass" @keyup.enter="send")
      p
        input.button(type="button" @click="send"  value="登录")
</template>
<style lang="stylus" scoped>
a:link,a:visited
  color #939393
  text-decoration none
.beian
  color #939393
  font-size 14px
.ic_bottom
  display inline-block
  vertical-align middle
btnColor = #f7793e
#close
  position absolute
  top 15px
  right 15px
  width 18px
  height 18px
  cursor pointer
  background url('img/login-close.png') no-repeat
.box
  color #666
.head
  position absolute
  width 100%
  top 0
  left 0
  min-width 1200px
  background-color rgba(255, 255, 255, 0.8)
  z-index 5
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
.active
  color btnColor
.part
  width 1200px
  margin 0 auto
  display flex
.banner
  height 100%
  min-width 1200px
  background center center
  position absolute
  left 0
  right 0
  bottom 100px
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
.footer
  background-color #6f6e6e
  min-width 1200px
  position absolute
  bottom 0
  left 0
  right 0
  background-image url('./img/footerBack.png')
  .footer-box
    width 1200px
    margin 0 auto
    height 100px
    position relative
    .copyright
      border-top 1px solid #575757
      height 30px
      width 100%
      text-align center
      font-size 14px
      line-height @height
      position absolute
      bottom 0
    .contact
      flex 1
      color #f1e3a0
      padding 24px
      ul.about
        font-size 14px
        li
          display inline-block
          padding-left 5px
          &:last-child
            &:after
              content ''
          &:after
            content '|'
.dialog
  position fixed
  height 100%
  width 100%
  background rgba(0, 0, 0, 0.2)
  top 0
  left 0
  z-index 99
  .loginInfo
    position fixed
    top 50%
    left 50%
    z-index 100
    min-height 300px
    background rgba(0, 0, 0, 0.6)
    padding 30px 50px
    transform translateX(-50%) translateY(-50%)
    .title
      background url('./img/icon_au15.png') center center no-repeat
      height 50px
      margin-bottom 30px
    p
      text-align center
      margin-bottom 20px
    input
      outline none
      height 45px
      width 338px
      border-radius 5px
      text-indent 50px
      border 1px solid rgba(0, 0, 0, 0.6)
      color #333
    .user
      background #fff url('./img/login-account.png') 15px center no-repeat
    .pwd
      background #fff url('./img/login-password.png') 15px center no-repeat
    .button
      text-indent 0
      font-size 18px
      cursor pointer
      background #f88953
      color #fff
</style> 

