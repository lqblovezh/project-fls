<script>
import mixins from './mixins'
import NavTop from './NavTop'
import OtherLogin from './OtherLogin'
import { mapState } from 'vuex'

export default {
  components: { NavTop, OtherLogin },
  mixins: [mixins],
  activated() {
    if (!this.valiData.code_img.img_src) {
      this.$getImgCode()
    }
  },
  data() {
    return {
      valiData: {
        name: {
          // 验证所需字段
          display: '账号过短',
          rules: 'min_length(4)',
          // 组件额外字段
          cname: '账 户',
          type: 'text',
          isError: false,
          value: '',
          placeholder: '账 号',
        },
        pass: {
          display: '密码过短',
          rules: 'min_length(4)',
          cname: '密 码',
          type: 'password',
          isError: false,
          value: '',
          placeholder: '密 码',
          id:'register_pwd'
        },
        repassword: {
          // 验证所需字段
          display: '两次密码不相等',
          rules: 'same2(register_pwd)|min_length(1)',
          // 组件额外字段
          cname: '确认密码',
          type: 'password',
          value: '',
          isError: false,
        },
        code_img: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '验证码',
          type: 'text',
          isCode: true,
          isError: false,
          value: '',
          img_src: '',
          placeholder: '输入验证码',
          code_id_img: '', // 图片的id
        },
        phone: {
          // 验证所需字段
          display: '手机号码不正确',
          rules: 'is_phone',
          // 组件额外字段
          placeholder: '手机号',
          cname: '手机号',
          type: 'text',
          value: '',
          isError: false,
        },
        // 手机短信的codeval
        code_val: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '短信验证',
          placeholder: '手机验证码',
          type: 'text',
          isPhoneCode: true,
          isError: false,
          value: '',
        },
        // id, 短信发送成功后返回的字段
        code_id: {
          value: '',
          noRender: true,
        },
      },
    }
  },
  methods: {
    regist() {
      this.isPass()
        .then(res => {
          //console.log(res)
          // 因为code_id 字段不在渲染表单内, 但又需要发送
          return this.$service.signin.register(res)
        })
        .then(res => {
          console.log(res)
          this.$Toast('注册成功! 请登陆')
          this.$store.state.loginModalType = 'Account'
        })
        .catch(err => {
          // this.$message.error(err.message)
          this.$Toast(err.message)
        })
    },
    back() {
      this.$store.state.loginModalType = 'Account'
    },
  },
}
</script>
<template lang="pug">
  .comp-login-register
    .wrapper
      .content 
        form.form-login
          LoginInput(
            @phoneClickHander="getPhoneCodeHander"
            @imgClickHander="getImgCode"
            :ref="`inp_${key}`"
            v-for="item,key in valiData"
            :name="key"
            :key="key"
            :data="item"
            v-if="!item.noRender"
          )
        .tc.btn-ls
          .btn-login.linear-btn( @click="regist" )  注册
          .btn-login(@click="back")  返回
</template>
<style lang="stylus">
.comp-login-register
  .btn-ls
    >div
      margin-bottom 20px
</style>
