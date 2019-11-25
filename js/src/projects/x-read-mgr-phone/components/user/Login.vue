<script>
import * as loginServices from 'services/common/manager'
import * as statisticsServices from 'services/x-read/statistics'

export default {
  created() {
    this.init()
  },
  data() {
    return {
      publishList: [],
      loginMsg: {
        app_id: null,
        user_name: null,
        user_pass: null
        // platform:'web',
      }
    }
  },
  methods: {
    init() {
      this.getPublishList()
    },
    getPublishList() {
      loginServices.getSelectOptions().then(res => {
        log(111111111)
        this.publishList = res.data
        this.loginMsg.app_id = res.data[0].id
      })
    },
    login() {
      loginServices.adminLogin(this.loginMsg).then(res => {
        sessionStorage.userInfo = JSON.stringify( res.data.user)
        this.$go('/index')
      }).catch(err => {
        this.$alert(err.message)
      })
    }
  }
}
</script>


<template lang="pug">
div
  .main
    .top-title
        .txt 欢迎来到
        .line X-Read运营管理平台！
    form.form
      .inp-wrap
        img(  src="./img/user.png")
        select(v-if="publishList" v-model="loginMsg.app_id"  )
          option( v-for="i in publishList" :value="i.id") {{i.name}}
      .inp-wrap
        img(  src="./img/user.png")
        input(placeholder="请输入账号" v-model="loginMsg.user_name"  )
      .inp-wrap
        img(  src="./img/lock.png")
        input(placeholder="请输入密码" v-model="loginMsg.user_pass"  type="password" )
      // .inp-wrap
      //   img(  src="./img/lock.png")
      //   input.code(placeholder="请输入验证码"  )
      //   label.send-btn 发送验证码
      .login-btn(@click="login") 登陆



</template>


<style lang="stylus" scoped>
.form
  margin-top 0.8rem
  .login-btn
    width 6.3rem
    height 0.88rem
    line-height 0.88rem
    margin-left 0.6rem
    background rgba(21, 175, 255, 0.9)
    text-align center
    color #fff
    font-size 16px
    border-radius 0.44rem
    margin-top 1rem
  .inp-wrap
    width 6.3rem
    margin-left 0.6rem
    border-bottom 1px solid rgba(153, 153, 153, 0.58)
    padding 0.6rem 0 0.3rem 0
    display flex
    .send-btn
      position absolute
      right 0.6rem
      margin-top -2px
      box-sizing border-box
    select
      outline none
      border none
      font-size 14px
      width calc(100% - 20px)
    input
      font-size 16px
      border none
      outline none
      &.code
        width 4rem
    img
      vertical-align middle
      width 14px
      height 17px
      margin-right 13px
.top-title
  font-size 18px
  text-align center
  line-height 30px
  color #444
  margin-top 1rem
</style>
