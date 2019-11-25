<script>
import * as commonServices from 'services/common/member'
import * as audioServices from 'services/x-read/audioInfo'
import { mapMutations, mapState } from 'vuex'
import { getHistoryLastAudio } from '@/utils/util'
import qs from 'qs'

export default {
  created() {
    this.init()
  },
  data() {
    return {
      loginType: 'phone',
      valiCode: null,
      phoneLoginData: {
        app_id: null,
        phone: null, //13344445555
        code_id: null,
        code_id_img: null,
        code_val: null, //123456
        code_val_img: null,
      },
      accountLoginData: {
        user_name: '', //13752819289
        user_pass: '', //123456
        code_val: '',
      },
      phoneCount: 60, //倒计时 ,
      openCount: false,
    }
  },
  computed: {
    ...mapState({
      isBook: state => state.isBook,
      userInfo: state => state.userInfo,
      historyList: state => state.historyList,
      thirdConf: state => state.thirdConf,
    }),
  },
  destroyed() {
    if (this.isBook) {
      this.setIsBook(false)
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setIsBook']),

    init() {
      this.getCode()
    },
    getCode() {
      //获取图片
      commonServices.codeImage().then(res => {
        this.valiCode = res.data
        this.phoneLoginData.code_id_img = res.data.code_id
      })
    },
    goReg() {
      if (this.isBook) {
        this.$go('/register')
      } else {
        this.$emit('hideLogin')
      }
    },
    async getPhoneCode() {
      // 获取手机验证码
      let num = this.$refs.phoneInp.value
      if (!num) {
        this.$Toast({
          message: '手机号不能为空!',
          duration: 2000,
        })
        return
      }
      await commonServices
        .codePhone({
          phone: num,
          not_check_user_exist: 0,
          ...this.phoneLoginData,
        })
        .then(res => {
          this.phoneLoginData.code_id = res.data.code_id
          this.$Toast({
            message: '已发送!',
            duration: 1000,
          })
          this.countDown() // 倒计时
        })
        .catch(({ message }) => {
          this.$Toast({
            message,
            duration: 2000,
          })
        })
    },
    // 倒计时
    countDown() {
      this.openCount = true
      let timer = setInterval(() => {
        if (this.phoneCount > 0) {
          this.phoneCount--
        } else {
          clearInterval(timer)
          this.openCount = false
          this.phoneCount = 60
        }
      }, 1000)
    },
    async phoneLogin() {
      //手机登陆
      try {
        let res = await commonServices.phoneLogin(this.phoneLoginData)
        sessionStorage.setItem('token', res.data.token)
        localStorage.token = res.data.token
        getHistoryLastAudio()
        commonServices.getUserInfo().then(res => {
          this.setUserInfo(res.data.user)
          sessionStorage.userInfo = JSON.stringify(res.data.user)
          this.$hideLoginPage()
        })
      } catch (e) {
        this.$Toast({
          message: e.message,
          duration: 1000,
        })
      }
    },
    logout() {
      this.$go('/login')
    },
    accountLogin() {
      commonServices
        .login({
          code_id: this.valiCode.code_id,
          ...this.accountLoginData,
        })
        .then(
          res => {
            getHistoryLastAudio()

            commonServices.getUserInfo().then(res => {
              this.setUserInfo(res.data.user)
              sessionStorage.userInfo = JSON.stringify(res.data.user)
              this.$hideLoginPage()
              })
          },
          e =>
            this.$Toast({
              message: e.payload.errors[0],
              duration: 1000,
            })
            
        )
    },
    thirdLogin(type) {
      // let back_url = location.origin + location.pathname + '#/home'
      // let str = this.historyList[this.historyList.length - 1].full
      // let str2 = str.substring(0, str.indexOf(this.historyList[this.historyList.length - 1].path));
      // let back_url = str2 + this.historyList[this.historyList.length - 1].path 
      let url1 = this.$url_parse(this.historyList[this.historyList.length - 1].full, true)
      let url2 = this.$url_parse(url1.hash.substr(1), true)
      delete url2.query.status
      delete url2.query.error
      delete url2.query.token_id
      url1.hash = '#' + url2.pathname + qs.stringify(url2.query, {
        addQueryPrefix: true,
      })
      let back_url  = url1.toString()
        commonServices.thirdLogin({ type, back_url }).then(res => {
          location.href = res.data.login_link
        }) 

    },
    registerEvent(res) {
      let ev = DBI.createEvent({
        event_class: 'User',
        event_data: [],
        event_target: book_id,
        event_type: '注册',
        event_source: 'WEB', //默认为WEB
        event_sources: '', //默认当前网址,可为空
        event_operator: user_id,
        event_temporary: 'temp_user_1',
        event_system: '', //可为空
        event_system_verison: '', //可为空
        event_terminal: '', //可为空
        event_terminal_verison: '', //可为空
      })
      ev.addData({
        User: [
          {
            user_id: '1',
            user_name: 'testuser',
            user_nick: '测试用户',
            user_sex: '男',
            user_birth_date: '1980-01-01',
            user_age: '21',
            user_title: '用户头衔',
            user_country: '用户国家',
            user_language: '用户默认语言',
            user_province: '用户所在省份|大行政区',
            user_city: '用户所在城市',
            user_address: '用户详细地址',
            user_email: '用户邮件地址',
            user_qq: '用户QQ号码',
            user_msn: '用户MSN号码',
            user_invitation: '邀请该用户的用户序号',
            user_source: '用户注册来源（WEB|PHONE|APP）',
            last_login_time: '',
            last_login_ipv4: '',
            last_login_source: '',
            update_time: '2018-01-01 14:00:00',
            update_ipv4: '127.0.0.1',
            create_time: '2018-01-01 14:00:00',
            create_ipv4: '127.0.0.1',
          },
        ],
      })
    },
  },
}
</script>

<template lang="pug">
  .login
    .top
      .button
        p
          a(@click=" loginType = 'phone' "  :class="{active: loginType === 'phone' } " ) 手机验证登陆
        p
          a(@click="loginType = 'account'" :class="{active: loginType === 'account' } ") 账户登陆
    form
      .phone(v-if="loginType === 'phone'")
        .group
          img(src='./img/user.png')
          input(placeholder='手机/绑定手机号的账号'
            autocomplete="off"
            v-model=" phoneLoginData.phone "
            ref="phoneInp")
        .group.valicode
          img(src='./img/msg.png' )
          input(placeholder='验证码' autocomplete="off"   v-model='phoneLoginData.code_val_img')
          img.vali(:src='valiCode.code_img' @click="getCode" v-if="valiCode" )
        .group.code
          img(src='./img/code.png')
          input(placeholder='短信验证码'  autocomplete="off" v-model=" phoneLoginData.code_val "   )
          .send-btn(@click="getPhoneCode" v-if="!openCount") 发送验证码
          .send-btn.disable( v-if="openCount") 倒计时: {{phoneCount}}
        .sendInfo(@click="phoneLogin") 登陆
      .account(v-if="loginType === 'account'")
        .group
          img(src='./img/user.png')
          input(placeholder='账号' autocomplete="off" v-model='accountLoginData.user_name')
        .group.code
          img(src='./img/code.png')
          input(placeholder='密码' type="password" autocomplete="off" v-model='accountLoginData.user_pass')
        .group.valicode
          img(src='./img/msg.png')
          input(placeholder='验证码' autocomplete="off"   v-model='accountLoginData.code_val')
          img.vali(:src='valiCode.code_img' @click="getCode" v-if="valiCode" )
        .sendInfo(@click="accountLogin") 登陆
    .register
        a(@click="goReg") 注册账号
    .otherLogin
      p 其他登陆方式
      .type
        img(src='./img/qq.png' @click='thirdLogin("qq_web")'   v-if="thirdConf.third_login.qq_web")
        img(src='./img/xl.png' @click='thirdLogin("sina_web")'  v-if="thirdConf.third_login.sina_web" )
        img(src='./img/wx.png' @click='thirdLogin("weixin_mp")' v-if="$isWeixin && thirdConf.third_login.weixin_mp")
        img(src='./img/wx.png' @click='thirdLogin("weixin_web")' v-if="!$isWeixin && thirdConf.third_login.weixin_web")

</template>

<style lang="stylus" scoped>
.login
  color #666
  .top
    height 1.1rem
    background #f4f5f7
    .button
      height 0.95rem
      background #fff
      p
        float left
        width 50%
        text-align center
        a
          font-size 0.3rem
          display inline-block
          line-height 0.95rem
          text-decoration none
          color #666
          border-bottom 0.04rem solid transparent
        .active
          color #3cb4ff
          border-color #3cb4ff
  form
    padding 0.6rem 0.6rem 0
    .group
      height 1rem
      line-height 1rem
      border-bottom 1px solid #e5e5e5
      input
        border none
        outline none
        width 90%
        float left
        font-size 0.3rem
        margin-top 0.37rem
      img
        margin-right 3%
        width 6%
        float left
        margin-top 0.38rem
        &.vali
          width 2rem
          position absolute
          margin-left -2rem
          margin-top 0.3rem
    .code
      input
        width 60%
      button
        float left
        border 1px solid #3cb4ff
        border-radius 5rem
        width 30%
        padding 0.1rem 0
        margin-top 0.2rem
        background transparent
        color #3cb4ff
        font-size 0.22rem
    .sendInfo
      border 1px solid #3cb4ff
      border-radius 0.44rem
      width 100%
      height 0.88rem
      line-height 0.88rem
      margin-top 0.83rem
      background #3cb4ff
      letter-spacing 0.15rem
      color rgba(255, 255, 255, 0.94)
      font-size 0.32rem
      text-align center
  .register
    text-align center
    padding 0.5rem 0
    a
      color #3cb4ff
      text-decoration none
  .otherLogin
    margin-top 0.5rem
    text-align center
  .type
    text-align center
    img
      width 0.9rem
      margin 0.5rem 0.3rem
</style>
