<script>
import * as commonServices from 'services/common/member'
import * as dbiServices from 'services/x-read/dbi'
import { mapMutations, mapState } from 'vuex'

export default {
  created() {
    this.init()
  },
  data() {
    return {
      user: {
        phone: '', //13344446611
        code_val: '', //123456
        code_id: '',
        pass: '', //123456
        code_val_img: null,
      },
      valiCode: null,
      phoneCount: 60, //倒计时 ,
      openCount: false,
    }
  },
  methods: {
    init() {
      this.getCode()
    },
    back() {
      if (this.$router.currentRoute.path == '/register') {
        this.$router.go(-1)
      } else {
        this.$emit('toggleLogin')
      }
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
    getCode() {
      // vali code
      commonServices.codeImage().then(res => {
        this.valiCode = res.data
      })
    },
    getPhoneCode() {
      let num = this.$refs.phoneInp.value
      if (!num) {
        this.$Toast({
          message: '请输入手机号码!',
          during: 2000,
        })
        return
      }
      commonServices
        .codePhone({
          phone: num,
          not_check_user_exist: 1,
          code_id_img: this.valiCode.code_id,
          code_val_img: this.user.code_val_img,
        })
        .then(res => {
          this.user.code_id = res.data.code_id
          this.$Toast({
            message: '已发送!',
            duration: 1000,
          })
          this.countDown() // 倒计时
        })
        .catch(err => {
          this.$Toast({
            message: err.message,
          })
        })
    },
    register() {
      commonServices.register(this.user).then(
        res => {
          this.$Toast({
            message: '注册成功! 转跳登陆中...',
            duration: 1000,
          })
          setTimeout(() => {
            this.back()
          }, 1000)
          this.registerEvent(res)
        },
        err => {
          this.$Toast({
            message: err.message,
          })
        }
      )
    },
    registerEvent(res) {
      let eventOpts = null
      let addData = null
      let cb = msg => {}
      let data = res.data

      eventOpts = {
        event_class: 'User',
        event_type: '注册',
        event_source: 'WEB', //默认为WEB
      }
      addData = {
        User: [
          {
            user_id: data.id,
            user_name: data.name,
            user_nick: data.nick_name,
            user_sex: '男',
            user_birth_date: '1980-01-01',
            update_time: data.update_time,
            update_ipv4: '',
            create_time: data.create_time,
            create_ipv4: '',
          },
        ],
      }
      dbiServices.declare(eventOpts, addData, cb)
    },
  },
}
</script>

<template lang="pug">
.login
    form
      .group
        img(src='./img/phone.png')
        input(placeholder='请输入手机号码' autocomplete="off"  ref="phoneInp" v-model='user.phone')
      .group
        img(src='./img/code.png')
        input(placeholder='请输入密码' autocomplete="off" type="password" ref="pass" v-model='user.pass')
      .group.valicode
        img(src='./img/msg.png' )
        input(placeholder='验证码' autocomplete="off"   v-model='user.code_val_img')
        img.vali(:src='valiCode.code_img' @click="getCode" v-if="valiCode" )
      .group.code
        img(src='./img/msg.png')
        input(placeholder='短信验证码' autocomplete="off" v-model='user.code_val' )
        .send-btn(@click="getPhoneCode"  v-if="!openCount") 发送验证码
        .send-btn.disable( v-if="openCount") 倒计时: {{phoneCount}}
      .sendInfo(@click='register') 注册
      .sendInfo.goBack( @click="back") 返回
</template>

<style lang="stylus" scoped>
.login
  form
    padding 1.1rem 0.6rem 0
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
        margin-top 0.3rem
      img
        margin-right 3%
        width 6%
        float left
        margin-top 0.3rem
        &.vali
          width 2rem
          position absolute
          margin-left -2rem
    .code
      input
        width 60%
    .sendInfo
      border 1px solid #3cb4ff
      border-radius 5rem
      width 100%
      line-height 0.8rem
      margin-top 0.83rem
      background #3cb4ff
      letter-spacing 0.15rem
      color #fff
      font-size 0.32rem
      text-align center
    .goBack
      background transparent
      color #3cb4ff
      margin-top 0.4rem
</style>
