<script>
import { getInfo, sendInfo, isLogin, loginOut } from 'services/system/home'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import urlJoin from 'url-join'
import qs from 'qs'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      info: null,
      menu: [
        { name: '首页', isActive: false, url: '/home' },
        { name: '平台介绍', isActive: false, url: '/introduce' },
        { name: '文档与培训', isActive: false, url: '/about' },
        { name: '火鸟转档助手', isActive: false, url: '' },
        { name: '个人作品', isActive: false, url: '/personal' },
      ],
      contactDialog: false,
      form: {
        user_name: '',
        user_pass: '',
      },
      // loginDialog: false,
      loginInfo: null,
      scrollTop: 0,
    }
  },
  async mounted() {
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    window.addEventListener('scroll', this.handleScroll, true)
    this.change(this.$route.path)
    let session = sessionStorage.getItem('loginInfo')
      ? qs.parse(sessionStorage.getItem('loginInfo'))
      : null
    let token = sessionStorage.getItem('token')
    getInfo().then(res => {
      this.info = res
    })
    if (session || token) {
      await isLogin()
        .then(res => {
          this.loginInfo = res.data
          const first_publisher = this.loginInfo.publishers[0]
          let base_url = first_publisher.apps.find(
            item => item.type == 'publish'
          ).base_url
          restUrl_publish = first_publisher.base_url + base_url
        })
        .catch(err => {
          sessionStorage.clear()
        })
    }
  },
  computed: {
    ...mapState({
      loginDialog: state => state.loginDialog,
    }),
  },
  watch: {
    '$route.path'(to, from) {
      this.init(to)
    },
  },
  methods: {
    init(path) {
      this.change(this.$route.path)
    },
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
      let el = document.documentElement || document.body
      let needScrollTop = targetY - currentY
      let _currentY = currentY
      setTimeout(() => {
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        el.scrollTop = currentY
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollAnimation(_currentY, targetY)
        } else {
          el.scrollTop = currentY
        }
      }, 1)
    },
    change(url) {
      if (!url.includes(baseUrl)) {
        url = urlJoin(baseUrl, url)
      }
      this.$router.push({ path: url })
      this.menu.forEach(el => {
        el.isActive = urlJoin(baseUrl, el.url) == url
      })
    },
    send() {
      sendInfo(this.form).then(
        res => {
          if (res.data.publishers) {
            this.$message.success(res.message)
            const { token, expire_time } = res.data
            this.loginInfo = qs.parse(res.data)
            window.sessionStorage.setItem('token', token)
            window.sessionStorage.setItem('loginInfo', qs.stringify(res.data))
            window.sessionStorage.setItem(
              'userInfo',
              qs.stringify(res.data.user)
            )
            Cookies.set('token', token, {
              expires: new Date(expire_time),
              path: '/',
              domain: global.restUrl_system.replace('http://', '.'),
            })
            const first_publisher = res.data.publishers[0]
            let base_url = first_publisher.apps.find(
              item => item.type == 'publish'
            ).base_url
            restUrl_publish = first_publisher.base_url + base_url
            this.setLoginDialog(false)
          } else {
            this.$message.error('请先开通应用')
          }
        },
        err => {
          this.$refs.user.focus()
          this.$message.error('账号或密码错误')
        }
      )
    },
    loginOut() {
      this.$confirm('是否确认退出?')
        .then(_ => {
          loginOut().then(res => {
            sessionStorage.clear()
            this.loginInfo = null
            if (!this.$route.path.includes('home')) {
              this.$go('/home')
            }
          })
        })
        .catch(_ => {})
    },
    register() {
      this.$go('/cooperate')
      this.setLoginDialog(false)
      // this.loginDialog = false
    },
    backstage() {
      const { base_url, apps } = this.loginInfo.publishers[0]
      location.href =
        process.env.NODE_ENV == 'development'
          ? '/_md/publish/admin '
          : base_url + apps[0].base_url + '/admin'
    },
    navChange(url) {
      if (!url) {
        return this.$message.warning('开发中...敬请期待')
      }
      this.change(url)
    },
    handleScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
    },
    ...mapMutations(['setLoginDialog']),
  },
}
</script>

<template lang="pug">
.box()
  .head(ref="head" :class='{fadeIn:scrollTop>70}')
    .header
      .logo(@click="change('/home')")
        img(:src="info&&info.loginInfo.logo.value")
        span {{info&&info.loginInfo.title.value}}
      .right
        .menu
          span(v-for="(item,i) in menu")
            span.goPath(@click="navChange(item.url)" :class="{ 'active' : item.isActive }" v-if="item.url=='/personal'?loginInfo:true") {{item.name}}
        .btns
          el-button(type="primary" v-if="loginInfo" @click="backstage") 控制台
          el-button(type="primary" v-if="loginInfo" @click="loginOut" plain) 退出
          el-button(plain @click="setLoginDialog(true)" v-if="!loginInfo") 登录
  router-view.container-box
  .footer
    .footer-box
      .outLink(v-if="info")
        a(:href="item.value" v-for="item in info.outlink") {{item.key}}
      .contact
        .title 关注我们
        .list(v-if="info")
          .ewm(v-for="item in info.ewm")
            .txt {{item.key}}
            img(:src="item.value")
  .sideBar
    .concatBox(@mouseenter="contactDialog=true" @mouseleave="contactDialog=false")
      .content(v-if="contactDialog")
        .title 咨询联系
        .way(v-if="info")
          p.phone  {{info.contact.phone.value}}
          p.email  {{info.contact.email.value}}
          p.qq  {{info.contact.qq.value}}
    .goBack(@click="scroll(0)")
  .dialog(ref="dialog" v-if="loginDialog")
    form.loginInfo
      #close(@click="setLoginDialog(false)")
      .title
      p
        input.user(placeholder="请输入用户名" v-model="form.user_name" ref="user")
      p
        input.pwd(placeholder="请输入密码" type="password" v-model="form.user_pass" @keyup.enter="send")
      p
        input.button(type="button" @click="send"  value="登录")
      p.register(@click="register") 注册试用账户
</template>

<style lang="stylus" scoped>
btnColor = #f7793e
@keyframes fadeInTop
  from
    -webkit-transform translateY(-200px)
    transform translateY(-200px)
  to
    -webkit-transform translateY(0)
    transform translateY(0)
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
  background #f6f6f6
.head
  width 100%
  top 0
  left 0
  min-width 1200px
  background-color rgba(255, 255, 255, 1)
  z-index 22
  &.fadeIn
    position fixed
    top 0
    left 0
    z-index 99
    box-shadow 0 -2px 10px #888
    animation fadeInTop 0.5s
.header
  width 1300px
  margin 0 auto
  display flex
  height 70px
  padding 17px 0
  box-sizing border-box
  justify-content space-between
  line-height 36px
  .logo
    display flex
    cursor pointer
  img
    max-height 48px
    max-width 48px
    margin-right 5px
    object-fit contain
    font-family 'object-fit: contain'
  .right
    display flex
    .menu
      display flex
      font-size 0
      >span
        margin 0 24px
        font-size 16px
      .line
        color #c5c5c5
      .goPath
        cursor pointer
      .active
        color btnColor
        position relative
        &:before
          content '.'
          height 100%
          font-size 40px
          position absolute
          top -20px
          left -12px
.btns
  font-size 14px
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
  z-index 100
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
    .title
      color btnColor
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
    .register
      font-size 16px
      color #eee
      cursor pointer
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
