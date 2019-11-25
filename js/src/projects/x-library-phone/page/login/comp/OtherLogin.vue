<script>
export default {
  props: {
    name: {
      default: '登录',
    },
    IsPhone:null
  },
  methods: {
    thirdLogin(e) {
      // return
      // console.dir(e.currentTarget)
      let node = e.target
      let type = node.getAttribute('type')
      if (!type) return
      let back_url = location.href
      this.$service.signin.thirdLogin({ type, back_url }).then(res => {
        location.href = res.data.login_link
      })
    },
    openRegisteModal() {
      this.$store.state.loginModalType = 'Register'
    },
    openPassword(){
      console.log(1)
      this.$store.state.loginModalType = 'Password'
    }
  },
}
</script>
<template lang="pug">
  .comp-login-other-nav
    .forget_psw(v-if="!IsPhone" @click="openPassword") 忘记密码 
    .tc
      .btn-login.linear-btn(@click="$emit('login')")  {{name}}
      .reg.f16.c_f(@click="openRegisteModal") 注册账号 
      .reg.f12.c_e.social-login 
        p 社交账号 一键登录
        .btns-bottom(@click="thirdLogin($event)") 
          .icon.icon-wx(type="weixin_mp")
          .icon.icon-qq(type="qq_web") 
          //- .icon.icon-xl(type="sina_web") 
</template>
<style lang="stylus">
.comp-login-other-nav
  >.forget_psw
    font-size 14px
    margin-left 75%
  >.tc
    >div
      margin-top 15px
    >.social-login
      p
        display inline-block
        position relative
        &::before
          content ''
          position absolute
          top 8px
          left -40px
          display inline-block
          width 30px
          height 1px
          background-color #FFF
        &::after
          content ''
          position absolute
          top 8px
          right -40px
          display inline-block
          width 30px
          height 1px
          background-color #FFF
  .btns-bottom
    padding-top 20px
    >div
      margin 0 15px
</style>